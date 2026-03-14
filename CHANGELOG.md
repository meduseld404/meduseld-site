# Changelog

All notable changes to the Meduseld services hub.

## [0.5.0-alpha] - 2026-03-14

### New Features

- **System Backup Button**: Trigger game save backups to Google Drive from the system page with confirmation modal and progress polling
- **System Reboot Button**: Remote server reboot from the system page with danger confirmation modal
- **Cloud Backup Modal**: Shows real-time backup progress, handles "already in progress" state, polls for completion
- **Remote Desktop Card**: Added coming soon card for screen sharing/collaboration
- **The Red Book Card**: Renamed Library card to "The Red Book" for e-books and audiobooks

### Bug Fixes

- **Fixed Reboot Token**: Set reboot auth token (was placeholder `CHANGE_ME`)
- **Fixed System Logs Endpoint**: Switched from `panel.meduseld.io` to `health.meduseld.io` for public access without auth
- **Fixed Discord Widget Mobile**: Resolved Crate widget cutoff on mobile viewports
- **Fixed iOS Background**: Background now covers status bar area on iOS Safari with `viewport-fit=cover`
- **Fixed Card Spacing**: Improved service card spacing and consistent button alignment
- **Fixed Speech Bubble**: Replaced broken Crate notify API with custom speech bubble implementation
- **Fixed Duplicate Viewport Meta**: Removed duplicate viewport meta tag missing `viewport-fit=cover`
- **Fixed Orphaned JS**: Removed server logs JavaScript that had no matching HTML element

### UI/UX Improvements

- **Bootstrap Icons Migration**: Replaced CoreUI icons with Bootstrap Icons across all pages
- **Palantir Rename**: Renamed Jellyfin to "Palantir" with film icon
- **Card Reordering**: Reorganized service cards, centered descriptions
- **Shared CSS**: Deduplicated CSS and moved shared styles to `style.css`
- **SSH Button Moved**: Relocated SSH button to bottom action row on system page
- **Trello Widget Replaced**: Swapped embedded Trello widget for a link button on system page
- **Apple Touch Icon**: Updated icon styling for iOS glass theme

### Configuration & Infrastructure

- **Commitlint Enforcement**: Added commit message validation with git hooks
- **Steering Documentation**: Added page functionality reference for all UI pages
- **Backup Auth**: Configured backup service authentication token
- **Cleaned Up Code**: Removed unused code and added missing static assets

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
