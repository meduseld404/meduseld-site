# Deployment TODO

## Reboot Microservice (`reboot.meduseld.io`)

- [ ] Generate a secret token for `REBOOT_SECRET`
- [ ] Create systemd service `/etc/systemd/system/meduseld-reboot.service`:

  ```ini
  [Unit]
  Description=Meduseld Reboot API
  After=network.target

  [Service]
  User=vertebra
  WorkingDirectory=/srv/apps/meduseld
  Environment="REBOOT_SECRET=your-secret-here"
  ExecStart=/usr/bin/python3 /srv/apps/meduseld/reboot/reboot_server.py
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```

- [ ] Add sudoers rule: `vertebra ALL=(ALL) NOPASSWD: /sbin/reboot`
- [ ] Add Cloudflare Tunnel route: `reboot.meduseld.io` → `http://localhost:5002`
- [ ] Update `rebootToken` in `system/index.html` CONFIG to match the secret
- [ ] Enable and start: `sudo systemctl daemon-reload && sudo systemctl enable --now meduseld-reboot`

## Backup Microservice (`backup.meduseld.io`)

- [ ] Generate a secret token for `BACKUP_SECRET`
- [ ] Create systemd service `/etc/systemd/system/meduseld-backup-api.service`:

  ```ini
  [Unit]
  Description=Meduseld Backup API
  After=network.target

  [Service]
  User=vertebra
  WorkingDirectory=/srv/apps/meduseld
  Environment="BACKUP_SECRET=your-secret-here"
  ExecStart=/usr/bin/python3 /srv/apps/meduseld/reboot/backup_server.py
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```

- [ ] Add sudoers rule: `vertebra ALL=(ALL) NOPASSWD: /usr/bin/systemctl start meduseld-backup.service`
- [ ] Add Cloudflare Tunnel route: `backup.meduseld.io` → `http://localhost:5003`
- [ ] Update `backupToken` in `system/index.html` CONFIG to match the secret
- [ ] Enable and start: `sudo systemctl daemon-reload && sudo systemctl enable --now meduseld-backup-api`

## System Logs Public Endpoint

- [ ] Add Cloudflare Access Bypass policy for `/public/*` on `panel.meduseld.io`
- [ ] Run `sudo usermod -aG adm vertebra` for syslog read access
