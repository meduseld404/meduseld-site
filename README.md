# Meduseld Site

<div align="center">
  <img src="static/logo.png" alt="Meduseld" width="150">
</div>

Static frontend pages for the Meduseld server management platform. Served via Cloudflare Pages.

## Pages

### meduseld.io — Landing Page

**File:** `index.html`

Minimal splash page with a "404 Server Not Found" joke theme.

- "Enter the Great Hall" button → navigates to `services.meduseld.io`
- Footer with quietarcade link and GitHub version badge

### services.meduseld.io — The Great Hall (Main Hub)

**File:** `services/index.html`

Central navigation hub for all Meduseld services. Status checks run every 5 seconds via a Cloudflare Worker health API.

**Service Cards (Active):**

- **Icarus Server** — game server control panel with live status badge, links to `panel.meduseld.io`
- **Edoras (Jellyfin/Media)** — media streaming with live status badge, links to `jellyfin.meduseld.io`
- **SSH Access** (admin only) — web terminal with live status badge, links to `ssh.meduseld.io`
- **System Monitor** (admin only) — server diagnostics, links to `system.meduseld.io`

**Service Cards (Coming Soon):** VPN Access, Game Wiki, The Red Book, Trivia Game, Remote Desktop, Hall of Fame

**Other Sections:**

- **Profile widget** — top-right avatar/name with dropdown (role, Admin Panel link, logout)
- **Game News panel** — collapsible, fetches latest Steam news for the current game
- **Games Up Next** — ranked list with Steam prices, sale badges, localized currency
- **Server Specifications** — hardware specs display
- **Quick Links** (admin only) — Cloudflare Dashboard, GitHub repos, Gmail, Google Drive
- **Discord widget** — Widgetbot Crate chat bubble with speech bubble notification
- **Changelog modal** — placeholder (coming soon)
- **Restricted access toast** — shown when non-admin users are redirected from admin pages

### system.meduseld.io — System Monitor (Admin Only)

**File:** `system/index.html`

Server logs viewer and system management page. Non-admin users are redirected to services.

- **Server logs panel** — fetches from the health API, color-coded (ERROR/WARNING/INFO), auto-refreshes every 30s
- **Action buttons** — SSH Terminal, Trello Board, System Backup, Reboot Server
- **System monitoring** — status cards (CPU, RAM, disk, temp, power), power breakdown, cost estimates
- **Charts** — CPU, RAM, and power draw over time (Chart.js)
- **Game server status** — state, players, uptime, server CPU/RAM, health
- **Backup modal** — triggers backup via standalone microservice, polls for status, shows filename on success
- **Reboot modal** — danger confirmation, triggers server reboot

### admin.meduseld.io — User Management (Admin Only)

**File:** `admin/index.html`

Admin page for managing user roles and account status. Non-admin users are redirected to services.

- **Users table** — avatar, display name, Discord ID, role, session status, last login
- **Actions** — promote/demote (admin/user), activate/deactivate accounts
- **Self-protection** — cannot modify your own account
- **Backend offline state** — graceful fallback when Flask is unreachable

## Shared Assets

### auth.js — Client-Side Authentication

**File:** `static/auth.js`

Handles authentication on all static pages without requiring the Flask backend.

- Decodes `CF_Authorization` cookie for basic user info
- Fetches `/cdn-cgi/access/get-identity` for full Discord user data including `is_admin`
- Admin role determined client-side from `discord_user.is_admin` claim
- Best-effort sync to Flask backend (`/api/sync-identity`, `/api/me`)
- Profile widget rendering with avatar, name, role badge, and dropdown
- Works even when the Flask backend is offline

### style.css — Shared Styles

**File:** `static/style.css`

Common styles used across all pages (dark theme, gold accents).

## Status Monitoring

Services perform automatic health checks every 5 seconds via a Cloudflare Worker at `meduseld-health.404-41f.workers.dev`, detecting:

- Service availability (green = online, red = offline)
- Cloudflare tunnel status (orange if tunnel is down but server may be running)

## Configuration

The services page uses a config object:

```javascript
const CONFIG = {
  gameName: 'Icarus',
  gameAppId: '1149460',
  panelUrl: 'https://panel.meduseld.io',
  sshUrl: 'https://ssh.meduseld.io',
  jellyfinUrl: 'https://jellyfin.meduseld.io',
  healthApiUrl: 'https://meduseld-health.404-41f.workers.dev',
};
```

## Project Structure

```
meduseld-site/
├── index.html              # Landing page (meduseld.io)
├── services/
│   └── index.html          # Services hub (services.meduseld.io)
├── system/
│   └── index.html          # System monitor (system.meduseld.io)
├── admin/
│   └── index.html          # User management (admin.meduseld.io)
├── static/
│   ├── auth.js             # Client-side authentication
│   ├── style.css           # Shared styles
│   ├── logo.png            # Logo
│   └── favicon.ico         # Favicon
└── README.md               # This file
```

## Local Development

Static HTML — just open any `index.html` in a browser. Auth features require being behind Cloudflare Access.

## Deployment

Served via Cloudflare Pages. Push to main and Cloudflare auto-deploys.

## Version

**0.5.0-alpha**
