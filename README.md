# Meduseld Menu Site

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

## Configuration

The site uses a configuration object in `menu/index.html`:

```javascript
const CONFIG = {
  gameName: 'Icarus',
  gameAppId: '1149460',
  panelUrl: 'https://panel.meduseld.io',
  sshUrl: 'https://ssh.meduseld.io',
  jellyfinUrl: 'https://jellyfin.meduseld.io',
  healthApiUrl: 'https://meduseld-health.404-41f.workers.dev'
};
```

## Status Monitoring

Services perform automatic health checks every 5 seconds via Cloudflare Worker, detecting:
- Service availability (green/red)
- Cloudflare tunnel status (orange if tunnel down)
- Real-time updates without page refresh
