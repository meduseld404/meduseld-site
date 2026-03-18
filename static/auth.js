/**
 * Meduseld Client Auth
 * Reads the Cloudflare Access JWT from the CF_Authorization cookie,
 * decodes the payload client-side, and optionally syncs the user
 * to the backend database (best-effort, non-blocking).
 *
 * Usage:
 *   MeduseldAuth.getUser()          → user object or null
 *   MeduseldAuth.isAuthenticated()  → boolean
 *   MeduseldAuth.getRole()          → string or null
 *   MeduseldAuth.syncUser()         → Promise (fire-and-forget)
 */
window.MeduseldAuth = (function () {
  var _user = null;
  var _synced = false;

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? match[1] : null;
  }

  function decodeJwtPayload(token) {
    try {
      var parts = token.split('.');
      if (parts.length !== 3) return null;
      // Base64url decode the payload (UTF-8 safe for emoji/unicode in Discord names)
      var payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      var binary = atob(payload);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      var decoded = new TextDecoder().decode(bytes);
      return JSON.parse(decoded);
    } catch (e) {
      console.warn('MeduseldAuth: Failed to decode JWT', e);
      return null;
    }
  }

  function extractUser(payload) {
    if (!payload) return null;

    var discordUser = payload.discord_user || {};
    var discordId = discordUser.id || payload.sub || '';
    var username = discordUser.username || payload.preferred_username || '';
    var displayName = discordUser.global_name || payload.name || username;
    var avatar = discordUser.avatar || null;
    var email = payload.email || '';

    if (!discordId) return null;

    var avatarUrl = null;
    if (avatar) {
      avatarUrl = 'https://cdn.discordapp.com/avatars/' + discordId + '/' + avatar + '.png';
    }

    return {
      discord_id: discordId,
      username: username,
      display_name: displayName,
      avatar_hash: avatar,
      avatar_url: avatarUrl,
      email: email,
      // Role comes from discord_user.is_admin claim, falls back to backend sync
      role: discordUser.is_admin ? 'admin' : 'user',
    };
  }

  function init() {
    var token = getCookie('CF_Authorization');
    if (!token) return;
    var payload = decodeJwtPayload(token);
    _user = extractUser(payload);

    // Try to get richer identity from Cloudflare Access identity endpoint
    // This includes the original OIDC claims with discord_user data
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/cdn-cgi/access/get-identity', false); // synchronous, fast local call
      xhr.send();
      if (xhr.status === 200) {
        var identity = JSON.parse(xhr.responseText);
        var custom = identity.custom || {};
        var discordUser = custom.discord_user || {};

        if (discordUser.id) {
          _user.discord_id = discordUser.id;
          _user.username = discordUser.username || _user.username;
          _user.display_name = discordUser.global_name || _user.display_name;
          _user.avatar_hash = discordUser.avatar || null;
          if (discordUser.avatar) {
            _user.avatar_url =
              'https://cdn.discordapp.com/avatars/' +
              discordUser.id +
              '/' +
              discordUser.avatar +
              '.png';
          }
          if (discordUser.is_admin) {
            _user.role = 'admin';
          }
        } else if (custom.sub) {
          _user.discord_id = custom.sub;
          _user.username = custom.preferred_username || _user.username;
          _user.display_name = custom.name || _user.display_name;
        }
      }
    } catch (e) {
      // Identity endpoint not available — use JWT data
    }
  }

  // Best-effort sync to backend — updates DB with Discord data.
  // Role is already set from discord_user.is_admin in the JWT/identity,
  // so this is non-critical. UI works even if the backend is offline.
  function syncUser() {
    if (_synced || !_user) return Promise.resolve();
    _synced = true;

    var syncPromise = Promise.resolve();
    if (_user.discord_id && _user.discord_id.length < 30) {
      syncPromise = fetch('https://panel.meduseld.io/api/sync-identity', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discord_id: _user.discord_id,
          username: _user.username,
          display_name: _user.display_name,
          avatar_hash: _user.avatar_hash,
          is_admin: _user.role === 'admin',
        }),
      }).catch(function (err) {
        console.warn('MeduseldAuth: sync-identity failed (non-critical)', err);
      });
    }

    return syncPromise
      .then(function () {
        return fetch('https://panel.meduseld.io/api/me', {
          credentials: 'include',
        });
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.authenticated && data.user) {
          _user.is_active = data.user.is_active;
          if (data.user.discord_id) {
            _user.discord_id = data.user.discord_id;
          }
          if (data.user.avatar_url) {
            _user.avatar_url = data.user.avatar_url;
          }
        }
      })
      .catch(function (err) {
        console.warn('MeduseldAuth: backend sync failed (non-critical)', err);
        _synced = false;
      });
  }

  // Track if document click listener is already bound
  var _documentListenerBound = false;

  // Render a profile widget into a target container element
  function renderProfile(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (!_user) {
      container.style.display = 'none';
      return;
    }

    var avatarHtml = _user.avatar_url
      ? '<img src="' +
        _user.avatar_url +
        '" alt="Avatar" style="width:36px;height:36px;border-radius:50%;border:2px solid #e6c65c;">'
      : '<i class="bi bi-person-circle" style="font-size:1.8rem;color:#e6c65c;"></i>';

    var roleBadge = '';
    if (_user.role === 'admin') {
      roleBadge =
        ' <span class="badge" style="font-size:0.65rem;background:#e6c65c;color:#0b1f14;vertical-align:middle;">Admin</span>';
    }

    container.innerHTML =
      '<div class="d-flex align-items-center gap-2" style="cursor:pointer;" id="profile-toggle">' +
      avatarHtml +
      '<span class="d-none d-md-inline text-light" style="font-size:0.95rem;">' +
      (_user.display_name || _user.username) +
      roleBadge +
      '</span>' +
      '<i class="bi bi-chevron-down text-light d-none d-md-inline" style="font-size:0.75rem;"></i>' +
      '</div>' +
      '<div id="profile-dropdown" class="position-absolute end-0 mt-2 py-2 rounded shadow-lg" ' +
      'style="display:none;min-width:220px;background:#1a1a2e;border:1px solid rgba(230,198,92,0.3);z-index:1050;">' +
      '<div class="px-3 py-2 border-bottom" style="border-color:rgba(230,198,92,0.2)!important;">' +
      '<div class="text-light" style="font-size:0.9rem;font-weight:600;">' +
      (_user.display_name || _user.username) +
      '</div>' +
      '<div style="font-size:0.8rem;color:#a0a0b8;">@' +
      _user.username +
      '</div>' +
      '</div>' +
      '<div class="px-3 py-2">' +
      '<div style="font-size:0.8rem;color:#a0a0b8;">Role: ' +
      (_user.role || 'user') +
      '</div>' +
      '</div>' +
      (_user.role === 'admin'
        ? '<a href="https://admin.meduseld.io" class="d-block px-3 py-2 text-decoration-none border-top" style="border-color:rgba(230,198,92,0.2)!important;font-size:0.85rem;color:#e6c65c;">' +
          '<i class="bi bi-people-fill me-1"></i>Admin Panel</a>'
        : '') +
      '<div class="px-3 py-2 border-top" style="border-color:rgba(230,198,92,0.2)!important;">' +
      '<a href="/cdn-cgi/access/logout" class="text-danger text-decoration-none" style="font-size:0.85rem;">' +
      '<i class="bi bi-box-arrow-right me-1"></i>Logout</a>' +
      '</div>' +
      '</div>';

    container.style.display = 'block';

    var toggle = document.getElementById('profile-toggle');
    var dropdown = document.getElementById('profile-dropdown');
    if (toggle && dropdown) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });
      if (!_documentListenerBound) {
        _documentListenerBound = true;
        document.addEventListener('click', function () {
          var dd = document.getElementById('profile-dropdown');
          if (dd) dd.style.display = 'none';
        });
      }
    }
  }

  // Run on load
  init();

  return {
    getUser: function () {
      return _user;
    },
    isAuthenticated: function () {
      return _user !== null;
    },
    getRole: function () {
      return _user ? _user.role : null;
    },
    hasRole: function (role) {
      if (!_user) return false;
      if (_user.role === 'admin') return true;
      return _user.role === role;
    },
    syncUser: syncUser,
    renderProfile: renderProfile,
  };
})();

// ===== Footer version badge =====
// Fetches the latest release tag from GitHub and updates the #version-badge link.
// Detects the repo from the badge's existing href (meduseld-site or meduseld-backend).
(function () {
  var badge = document.getElementById('version-badge');
  if (!badge) return;

  var href = badge.getAttribute('href') || '';
  var repo = href.indexOf('meduseld-backend') !== -1 ? 'meduseld-backend' : 'meduseld-site';
  var apiUrl = 'https://api.github.com/repos/meduseld404/' + repo + '/releases/latest';

  fetch(apiUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (data.tag_name) {
        badge.textContent = data.tag_name;
        badge.href = data.html_url;
      }
    })
    .catch(function (err) {
      console.error('Failed to fetch latest release version:', err);
      badge.textContent = 'v?.?.?';
    });
})();

// ===== Fast Bootstrap/CoreUI tooltips =====
// Converts native title attributes to Bootstrap tooltips with a short delay.
// Works with both Bootstrap 5 and CoreUI (which extends Bootstrap).
// Call MeduseldTooltips.refresh() after dynamically rendering content.
var MeduseldTooltips = (function () {
  var Tooltip =
    (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) ||
    (typeof coreui !== 'undefined' && coreui.Tooltip) ||
    null;

  function init(root) {
    if (!Tooltip) return;
    var els = (root || document).querySelectorAll('[title]');
    for (var i = 0; i < els.length; i++) {
      // Skip elements that already have a tooltip instance
      if (Tooltip.getInstance(els[i])) continue;
      // Skip <iframe>, <svg title>, and elements with empty titles
      var title = els[i].getAttribute('title');
      if (!title || els[i].tagName === 'IFRAME') continue;
      new Tooltip(els[i], { delay: { show: 150, hide: 0 }, placement: 'top' });
    }
  }

  // Init on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
    });
  } else {
    init();
  }

  return { refresh: init };
})();
