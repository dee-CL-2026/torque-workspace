# Android SSH Clients Comparison

**Context:** JuiceSSH no longer available. Need alternative for managing OpenClaw from phone.

---

## Quick Comparison

| App | Rating | Size | Downloads | Free | Key Mgmt | Notes |
|-----|--------|------|-----------|------|----------|-------|
| **Termius** | 4.9★ | 33MB | 1M+ | Freemium | ✅ | Modern UI, cross-platform sync (paid) |
| **ConnectBot** | 4.4★ | 1.7MB | 5M+ | Free/OSS | ✅ | Lightweight classic, no frills |
| **PortX** | 4.6★ | 12MB | 50K+ | Freemium | ✅ | NetSarang (makers of Xshell) |
| **DaRemote** | 4.6★ | 16MB | 10K+ | Freemium | ✅ | Also does docker, sftp |
| **Tempest** | — | 36MB | 10K+ | ? | ? | Less known |
| **SSH Terminal** | — | 9.8MB | 5K+ | ? | ? | Basic |

---

## 🏆 Recommendation: **Termius**

**Why:**
- Most polished modern UI
- 4.9★ rating with 1M+ downloads
- Cross-platform (iOS, Android, Mac, Windows, Linux)
- Free tier is sufficient for basic SSH
- Good key management
- Snippets for common commands
- SFTP built-in

**Free tier includes:**
- Unlimited hosts
- SSH key auth
- Local terminal
- Basic SFTP

**Paid features (not needed for our use):**
- Cloud sync across devices
- Teams/sharing
- SFTP sync

---

## Runner-up: **ConnectBot**

**Why you might prefer it:**
- Completely free and open source
- Tiny (1.7MB)
- Been around forever, battle-tested
- No account needed
- Just works

**Downsides:**
- UI is dated
- No cross-platform sync
- Less active development

---

## Setup Steps (Termius)

1. **Install** from Play Store
2. **Open app** → Skip account creation (or create for sync)
3. **Add host:**
   - Label: `OpenClaw` or `Chromebook`
   - Address: `100.115.92.203`
   - Port: `22`
   - Username: `dieterwerwath`
   - Auth: Password (or import SSH key)
4. **Save** and connect
5. **Test:** Run `openclaw gateway status`

---

## Useful Commands to Save as Snippets

```bash
# Restart gateway
openclaw gateway restart

# Check status
openclaw gateway status

# Start SSH server (if not running)
sudo mkdir -p /run/sshd && sudo /usr/sbin/sshd
```

---

## Gotchas

- **Same network required** — Phone must be on same WiFi as Chromebook
- **SSH not auto-start** — May need to start sshd after Chromebook reboot
- **IP may change** — Consider setting static IP or using hostname

---

## Future: Remote Access (outside home)

Options to explore later:
- **Tailscale** — Zero-config VPN, free tier
- **Cloudflare Tunnel** — Expose safely without port forwarding
- **ZeroTier** — Similar to Tailscale

---

*Created: 2026-02-05*
