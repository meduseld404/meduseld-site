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
      // Base64url decode the payload
      var payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      var decoded = atob(payload);
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
      // Role comes from the backend sync — default to 'user' from JWT alone
      role: 'user',
    };
  }

  function init() {
    var token = getCookie('CF_Authorization');
    if (!token) return;
    var payload = decodeJwtPayload(token);
    _user = extractUser(payload);
  }

  // Best-effort sync to backend — updates DB and gets role back
  function syncUser() {
    if (_synced || !_user) return Promise.resolve();
    _synced = true;

    return fetch('https://panel.meduseld.io/api/me', {
      credentials: 'include',
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.authenticated && data.user) {
          // Update role from backend (the DB is the source of truth for roles)
          _user.role = data.user.role;
          _user.is_active = data.user.is_active;
        }
      })
      .catch(function () {
        // Backend is down — that's fine, we still have JWT data
        _synced = false;
      });
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
  };
})();
