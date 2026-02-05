# ⚙️ Torque Command Centre

Personal operations dashboard for Dee & Torque.

## Features

- **Task Pipeline** — Live view of active, backlog, blocked, and completed tasks
- **Agent Roster** — Status of all sub-agents
- **Pulse Monitor** — Last heartbeat timestamp (bottom of page)
- **System Status** — Heartbeat health, morning report schedule

## Data Sources

- `../data/tasks.json` — Task list (auto-refreshes every 60s)
- `../data/heartbeat-state.json` — Last heartbeat timestamp

## Local Development

```bash
cd command-centre
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deployment (GitHub Pages)

1. Push to main branch
2. Enable GitHub Pages in repo settings (source: main, folder: /command-centre)
3. Access at: `https://dee-CL-2026.github.io/torque-workspace/command-centre/`

## Mobile Shortcut

On Android/iOS, open the URL in browser and "Add to Home Screen".

---

*Last updated: 2026-02-06*
