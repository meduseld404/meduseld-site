# Changelog

All notable changes to the Meduseld services hub.

## [0.4.0-alpha] - 2026-03-13

### Bug Fixes

- **Fixed Panel Redirect Issue**: Resolved catch-all route that was causing panel.meduseld.io to redirect incorrectly on some browsers
- **Fixed System Logs**: Updated system logs endpoint to use absolute paths and proper error handling for Ubuntu syslog access
- **Fixed Mobile Web App Meta Tag**: Replaced deprecated `apple-mobile-web-app-capable` with standard `mobile-web-app-capable`

### UI/UX Improvements

- **CoreUI Icon Library**: Migrated from custom icons to CoreUI icon library for better consistency
- **Button Improvements**: Enhanced restart button functionality and visual feedback
- **System Logs Panel**: Improved error messages and permission handling for system log viewing
- **Footer Updates**: Updated version display and styling for better mobile compatibility

### Technical

- **Log File Paths**: Changed to absolute paths for production (`/srv/meduseld/logs/webserver.log`, `/var/log/syslog`)
- **CORS Headers**: Enhanced cross-origin support for system monitoring endpoints
- **Error Handling**: Better error messages when log files are not readable or don't exist

## [0.1.0-alpha] - 2026-03-10

Initial release of the Meduseld service site.

### Features

- Service hub with real-time status monitoring for game server, SSH, and Jellyfin
- Game news panel with Steam API integration (collapsible)
- Games Up Next list with Steam pricing and sale badges
- Automatic currency detection (USD, GBP, EUR) based on user location
- Discord integration widget for community chat
- Server specifications display
- Development/Production mode toggle for panel access
- VPN Access placeholder (coming soon)
- Game Wiki placeholder (coming soon)
- Trivia Game placeholder (coming soon)
- Hall of Fame placeholder (coming soon)

### UI/UX

- Responsive Bootstrap 5 design
- Status indicators with color coding (green/orange/red)
- Cloudflare tunnel status detection
- Mobile-optimized layouts
- Animated status badges and hover effects
- Discord tooltip with auto-dismiss
- Profile container with authentication

### Technical

- Health check API integration via Cloudflare Worker
- Steam API integration for news and pricing
- CORS proxy using allorigins.win
- Geolocation-based currency detection via ipapi.co
- Real-time status updates every 5 seconds
- Bootstrap tooltips with click/hover support

## Recent Updates (Pre-Release)

### Services

- Added Jellyfin media server integration with status monitoring
- Enabled real-time status checks for game server panel
- Enabled SSH terminal access with availability monitoring
- Integrated Steam news feed for current game

### UI/UX Improvements

- Fixed game server panel title to display "{Game Name} Server" format
- Made tooltips clickable on mobile devices for better accessibility
- Added Bootstrap tooltip support with click and hover triggers
- Improved mobile experience for info icons and status badges

### Features

- Automatic service status checks every 30 seconds
- Collapsible game news panel with Steam API integration
- Server specifications display
- Games queue showing upcoming titles
- Discord integration widget

### Technical

- Status monitoring using fetch with timeout controls
- No-CORS mode for cross-origin status checks
- Responsive design with Bootstrap 5.3.2
- Dynamic content updates based on configuration
