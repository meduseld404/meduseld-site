# Meduseld Site

Service hub for managing game servers, media streaming, and other services hosted on meduseld.io.

## Version

v0.1.0-alpha - Initial release

## Features

- **Game Server Control**: Real-time status monitoring and control panel access for the current game server
- **Service Status Dashboard**: Live status checks for game panel, SSH terminal, and Jellyfin media server
- **Game News Feed**: Collapsible panel showing latest Steam news for the current game
- **Game Pricing**: Steam store prices with sale badges and currency detection (USD/GBP/EUR)
- **Discord Integration**: Embedded chat widget for community communication
- **Server Specs**: Hardware specifications display
- **Upcoming Games**: Queue of games being considered for the server

## Services

### Game Server Panel

Control and monitor the current game server (Icarus). Start, stop, restart, and check server status with real-time player count.

### Jellyfin Media Server

Stream movies, TV shows, and other media content through the Jellyfin server.

### SSH Access

Secure shell access to the server via web-based terminal.

### Coming Soon

- VPN Access (OpenVPN)
- Game Wiki
- Trivia Game
- Hall of Fame

## Making Changes

To contribute or modify the site:

### 1. Clone the Repo

```bash
git clone <repo-url>
cd meduseld-site
```

### 2. Create a New Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

Edit files as needed:

- `service/index.html` - Main service page
- `static/` - Static assets

### 4. Commit and Push Your Branch

```bash
git add .
git commit -m "Description of what you changed"
git push -u origin feature/your-feature-name
```

### 5. Open a Pull Request

- Go to the GitHub repository
- Click "Compare & pull request" for your branch
- Add a description of your changes
- Submit the PR for review

### 6. Deploy to Server (After PR is Merged)

SSH into the server and pull the changes:

```bash
ssh vertebra@meduseld.io
cd /srv/meduseld-site
git pull
```

Changes are live immediately (static site).

## Configuration

The site uses a configuration object in `service/index.html`:

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

## Status Monitoring

Services perform automatic health checks every 5 seconds via Cloudflare Worker, detecting:

- Service availability (green/red)
- Cloudflare tunnel status (orange if tunnel down)
- Real-time updates without page refresh
