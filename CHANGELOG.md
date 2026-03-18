# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.6.0-alpha](https://github.com/meduseld404/meduseld-site/compare/v0.5.0-alpha...v0.6.0-alpha) (2026-03-18)


### New Features

* **services:** Add admin badges to cards and move admin link to dropdown ([2828097](https://github.com/meduseld404/meduseld-site/commit/2828097941bb521606095ab3dd5f4966a84a8990))
* **services:** Add auth.js and profile widget to services and system pages ([6bddb60](https://github.com/meduseld404/meduseld-site/commit/6bddb60f1f643172ce1c9aaacddd56b5ff4b8dd9))
* **services:** Add Edoras auto-login via Jellyfin SSO ([fc35fb9](https://github.com/meduseld404/meduseld-site/commit/fc35fb9257850b35c782de74ecfbbdb6cb688bd1))
* **services:** Add Edoras management page and admin button in modal ([4c50dd5](https://github.com/meduseld404/meduseld-site/commit/4c50dd57b0eda8f92e8fa7463ee4011c853bcef2))
* **services:** Add Edoras modal with View and Request options ([8bd15df](https://github.com/meduseld404/meduseld-site/commit/8bd15dfb5716470e5da1f06a8a0c38d1dbe6133d))
* **services:** Add live changelog modal with Site and Backend tabs ([5a7bada](https://github.com/meduseld404/meduseld-site/commit/5a7badadd11f7c8b0c453539e929fea5da598e10))
* **services:** Add role-based access control and admin user management page ([20626e7](https://github.com/meduseld404/meduseld-site/commit/20626e707ecaa286a3145b2eca289932a35f0032))
* **services:** Make Gmail and Drive quick links visible to all users ([ef1f307](https://github.com/meduseld404/meduseld-site/commit/ef1f307a767d940dbcad1c97d34e987e8bfe894c))
* **services:** Send is_admin flag in sync-identity payload ([cfbb162](https://github.com/meduseld404/meduseld-site/commit/cfbb162aaeed643405183c4bbf579d8362724231))
* **system:** Add power monitoring and system stats dashboard ([8a12914](https://github.com/meduseld404/meduseld-site/commit/8a129144a8095fb9a672199ab1a5d9a294b53c99))
* **system:** Display backup filename in success modal ([ca931a7](https://github.com/meduseld404/meduseld-site/commit/ca931a70308b2bd02f6e646caedeeee39b333021))
* **system:** Use standalone monitoring service for system stats ([ec89342](https://github.com/meduseld404/meduseld-site/commit/ec89342d1b92867784dc57ccdb65dd8b168230de))
* **ui:** Add client-side JWT auth with backend user sync ([2dce140](https://github.com/meduseld404/meduseld-site/commit/2dce140a9ac061e50d078834c6016bf7d6d496d6))
* **ui:** Add logout button to profile dropdown ([803566c](https://github.com/meduseld404/meduseld-site/commit/803566c780c858e71855548fbda1fd99dbcee7dd))
* **ui:** Add user profile display to services and system pages ([8811881](https://github.com/meduseld404/meduseld-site/commit/8811881e0e4289e74736862b17f84213e8b20316))
* **ui:** Fetch Cloudflare Access identity endpoint for Discord user data ([e867334](https://github.com/meduseld404/meduseld-site/commit/e86733412ff6a01ab42c77107b9bee36361adf07))
* **ui:** Sync Discord identity from Cloudflare to backend via /api/sync-identity ([fe7737f](https://github.com/meduseld404/meduseld-site/commit/fe7737f2ff7a0e7acd5777c82d963a5841c679d3))
* **ui:** Use Discord role for immediate admin detection on static pages ([09733a1](https://github.com/meduseld404/meduseld-site/commit/09733a13ae22db405bacccd5c0600252a4307d5e))


### Bug Fixes

* **services:** Directly show Edoras manage button for admins after modal DOM ([ba93fe6](https://github.com/meduseld404/meduseld-site/commit/ba93fe60526242c6208a3da81077ef680720a0a0))
* **services:** Fix auth.js path for subdomain routing and guard syncUser call ([1119023](https://github.com/meduseld404/meduseld-site/commit/11190237d70140bef9ecfea927c7615c24363f10))
* **services:** Fix Edoras button not working on mobile ([d410d7f](https://github.com/meduseld404/meduseld-site/commit/d410d7f60e6e001b663119afbf9500478f3a0dc5))
* **services:** Handle Cloudflare Access auth redirect on admin page ([0be0f37](https://github.com/meduseld404/meduseld-site/commit/0be0f3780fb4b6617abb913e16f02a1ba0674f81))
* **services:** Keep quick links on same line for admin users ([a784a8c](https://github.com/meduseld404/meduseld-site/commit/a784a8c30176705cfb56e9f04a7b83a79f87a03c))
* **services:** Log error in Edoras SSO catch block ([894a0ee](https://github.com/meduseld404/meduseld-site/commit/894a0ee397df97482f720bef7a5eafd22e618536))
* **services:** Replace Edoras request dropdown with simple Overseerr link ([c57e4cb](https://github.com/meduseld404/meduseld-site/commit/c57e4cb0ec3c191b93eb449be97c324f53f934d1))
* **services:** Show Edoras manage button by re-running admin check after modal DOM ([9305c1f](https://github.com/meduseld404/meduseld-site/commit/9305c1fc8ce6443988651e6ea5da310e33a40725))
* **services:** Use DOM APIs for restricted toast to prevent XSS ([0bb045f](https://github.com/meduseld404/meduseld-site/commit/0bb045fbe42290fa2f9cf8bc0abf1d393e35e1dd))
* **services:** Use same-tab navigation for Edoras to fix mobile popup blocker ([ab6d0d8](https://github.com/meduseld404/meduseld-site/commit/ab6d0d83952d557cc84a950b8746b7945a72c3b8))
* **system:** Fix charts not rendering due to non-existent dataset references ([540da72](https://github.com/meduseld404/meduseld-site/commit/540da72517a9a6ad72bb1405bfb494abbca01d5d))
* **system:** Improve text readability and stats error handling ([eca3d11](https://github.com/meduseld404/meduseld-site/commit/eca3d11bd4b732d7187a0c43db9cf50fd5b59a34))
* **system:** Update currency to USD at 14.5 cents per kWh ([49f58ed](https://github.com/meduseld404/meduseld-site/commit/49f58edd9f07d9e510be06ed878f0eefdcd9cafa))
* **ui:** Add contents read permission to auto-assign workflow ([ad186f2](https://github.com/meduseld404/meduseld-site/commit/ad186f246467f65b86c4b30ce917da4c6b4f3930))
* **ui:** Fix profile container position on services and system pages ([5bbbe12](https://github.com/meduseld404/meduseld-site/commit/5bbbe120596e72ac39d8b2e3c5f18aa66a617231))
* **ui:** Log auth sync errors instead of swallowing them ([332df03](https://github.com/meduseld404/meduseld-site/commit/332df0319b2eb5f70b70f5b536268db73b3b3ce1))
* **ui:** Move profile container into header nav bar to avoid notch cutoff ([8c3e227](https://github.com/meduseld404/meduseld-site/commit/8c3e2274dd6bcb68188b49e5f5f55b3d83890793))
* **ui:** Prevent duplicate document click listeners in renderProfile ([4402a9b](https://github.com/meduseld404/meduseld-site/commit/4402a9bdc257ee87dd6b16320297fea394d08ad0))
* **ui:** Use custom field instead of oidc_fields for Discord identity data ([abffe99](https://github.com/meduseld404/meduseld-site/commit/abffe99e24a2ab6b0584e7e427e1f65bc1c0faa1))
* **ui:** Use relative paths for auth.js and fix UTF-8 JWT decoding ([4855bb2](https://github.com/meduseld404/meduseld-site/commit/4855bb23a92de519fac6129195f54a155b54e416))


### Styling

* **services:** Add speech bubble tail to Discord widget notification ([02c13cd](https://github.com/meduseld404/meduseld-site/commit/02c13cd8a549eb7d53f400028b383380f12470af))
* **services:** Hide production/development mode badge ([925d748](https://github.com/meduseld404/meduseld-site/commit/925d748815abdec521cebab35b773fc275463a22))
* **services:** Increase mobile profile avatar size and update VPN text ([4766c6d](https://github.com/meduseld404/meduseld-site/commit/4766c6de2bf99d4378ecaad4d889596540ecc651))
* **services:** Make quick links admin-only and use Online badge for System Monitor ([1a08a8d](https://github.com/meduseld404/meduseld-site/commit/1a08a8df3a75237b93f7cd774c3d7954a2670fe6))
* **services:** Rename Palantir card to Edoras and VPN to Palantir ([dd50d34](https://github.com/meduseld404/meduseld-site/commit/dd50d34ce158e09f49b814e26415b479551548a7))
* **system:** Improve backup modal success state ([7c504da](https://github.com/meduseld404/meduseld-site/commit/7c504da8267a7713ac0d2b9eeff6fce9d0c9d990))
* **ui:** Lighten username and role text in profile dropdown ([40e9f9d](https://github.com/meduseld404/meduseld-site/commit/40e9f9d4a81a79cb55a6d2d85aad0192eb0915b5)), closes [#a0a0b8](https://github.com/meduseld404/meduseld-site/issues/a0a0b8)
* **ui:** Polish admin and services page UI ([36830b5](https://github.com/meduseld404/meduseld-site/commit/36830b59920912e770926f196b74f4553d3d8dda))

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
