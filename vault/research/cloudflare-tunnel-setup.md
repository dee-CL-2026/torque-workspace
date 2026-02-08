# Cloudflare Tunnel on Chromebook (Crostini)

## 1) What it is & why it’s useful
Cloudflare Tunnel (cloudflared) creates outbound‑only connections from your origin to Cloudflare’s network. You do **not** need a public IP or inbound firewall ports. It can safely expose HTTP services, SSH, and other TCP services while keeping your origin hidden behind Cloudflare.

## 2) Prerequisites
- **Cloudflare account** and a **domain** added to Cloudflare.
- **Nameservers** switched to Cloudflare for that domain (required for routing DNS to the tunnel).
- **Chromebook Linux (Crostini)** enabled with Debian container.
- **cloudflared** installed (Cloudflare’s tunnel client).

## 3) Install cloudflared on Crostini (Debian)
Use either the package repo or the `.deb` release.

### Option A — Install the latest `.deb` release (simple)
```bash
# In the Linux container
sudo apt update
sudo apt install -y curl

# Download latest amd64 .deb (most Chromebooks w/ Linux are amd64)
curl -L -o cloudflared.deb \
  https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

sudo dpkg -i cloudflared.deb
sudo apt -f install -y

cloudflared --version
```

### Option B — Use Cloudflare’s package repo
Cloudflare publishes packages at https://pkg.cloudflare.com/ (follow their instructions if you prefer repo‑managed updates).

## 4) Create and configure a tunnel (CLI / locally‑managed)
From the Cloudflare docs (“create a locally‑managed tunnel”):

```bash
# Authenticate (opens a browser for Cloudflare login)
cloudflared tunnel login

# Create the tunnel
cloudflared tunnel create <TUNNEL_NAME>

# List tunnels to confirm
cloudflared tunnel list
```

Create a config file at `~/.cloudflared/config.yml`:

### Example: HTTP service
```yaml
# ~/.cloudflared/config.yml
url: http://localhost:8080

tunnel: <TUNNEL-UUID>
credentials-file: /home/<USER>/.cloudflared/<TUNNEL-UUID>.json
```

### Example: Private network (optional)
```yaml
# ~/.cloudflared/config.yml

tunnel: <TUNNEL-UUID>
credentials-file: /home/<USER>/.cloudflared/<TUNNEL-UUID>.json

warp-routing:
  enabled: true
```

Route DNS to your tunnel (creates CNAME record in Cloudflare DNS):
```bash
cloudflared tunnel route dns <TUNNEL-UUID or NAME> <hostname>
```

Run the tunnel:
```bash
cloudflared tunnel run <TUNNEL-UUID or NAME>
# or with config path
cloudflared tunnel --config /home/<USER>/.cloudflared/config.yml run <TUNNEL-UUID or NAME>
```

## 5) Expose OpenClaw Gateway or SSH
### A) OpenClaw Gateway (HTTP)
1. Start OpenClaw gateway on the Chromebook/Linux container.
2. In `config.yml`, set:
   ```yaml
   url: http://localhost:<gateway_port>
   tunnel: <TUNNEL-UUID>
   credentials-file: /home/<USER>/.cloudflared/<TUNNEL-UUID>.json
   ```
3. Route DNS:
   ```bash
   cloudflared tunnel route dns <TUNNEL-UUID> gateway.example.com
   ```
4. Visit `https://gateway.example.com` via Cloudflare.

### B) SSH access (TCP)
Cloudflare supports SSH via Tunnel; common pattern is to keep SSH private and use Cloudflare Access policies. One simple method is **client‑side cloudflared** on both ends, or use Cloudflare Access for browser SSH. If you want a direct hostname, configure the tunnel and Access policies for SSH.

Example (service running on localhost:22):
```yaml
# Add to config for SSH service
ingress:
  - hostname: ssh.example.com
    service: ssh://localhost:22
  - service: http_status:404
```
Then:
```bash
cloudflared tunnel route dns <TUNNEL-UUID> ssh.example.com
```

Consult Cloudflare’s SSH use‑case docs for the recommended Access‑secured options (client‑side cloudflared, browser SSH, or WARP‑based methods).

## 6) DNS / domain requirements
- Your domain must be **on Cloudflare** with nameservers pointed to Cloudflare.
- Use **CNAME** records created by `cloudflared tunnel route dns ...` to map `hostname` → `<tunnel-id>.cfargotunnel.com`.
- Ensure the hostname you use (e.g., `gateway.example.com`) is in the same Cloudflare zone.

## 7) Security considerations
- Tunnel is **outbound‑only**, so no inbound ports required.
- Use **Cloudflare Access** policies to restrict who can reach the tunnel (SSO, IP allowlists, MFA, etc.).
- Protect the `credentials-file` (`<TUNNEL-UUID>.json`) and `cert.pem` in `~/.cloudflared` — these are sensitive.
- Prefer Access token validation at the origin (Cloudflare recommends validating Access tokens or enabling “Protect with Access”).
- Keep `cloudflared` updated; Cloudflare supports versions within ~1 year of latest release.

## 8) Costs
- **Free tier** includes Cloudflare Tunnel for most use cases.
- **Paid plans** add advanced Access/Gateway features, audit logs, and enterprise controls.

---

## Sources
- Cloudflare Tunnel overview: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/
- Download cloudflared: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/
- Create locally‑managed tunnel: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/
- SSH use cases: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/
