# ⚙️ Torque Command Centre

Personal operations dashboard for Dee & Torque.

## Features

### v2.0 (2026-02-07)

**Layout & Usability**
- **Session HUD Bar** — Quick glance at status, last heartbeat, task counts, blocked items
- **3-Column Task View** — Active, Backlog, and Blocked tasks side-by-side
- **Collapsible Sections** — Click any card header to collapse/expand
- **View Toggle** — Switch between All/Work/Compact views
- **Mobile Optimized** — Better responsive layout for phone use

**New Sections**
- **💡 Ideas & Future** — Pulls from IDEAS.md or shows backlog ideas
- **🚧 Blocked Tasks** — Dedicated section with visual prominence
- **Agent Task Counts** — Shows active/backlog/blocked per agent in roster

**Visual Improvements**
- **Project Tags** — Color-coded labels (Candid, GD, CC, Infra, OC)
- **Priority Badges** — Single-letter badges (U/H/M/L) for cleaner look
- **Custom Scrollbars** — Styled scrollbars for card bodies
- **Hover Effects** — Subtle animations on cards and agents

### v1.0 (2026-02-06)

- Task Pipeline — Active, backlog, done tasks
- Agent Roster — Status of all sub-agents
- Pulse Monitor — Last heartbeat timestamp
- System Status — Heartbeat health, morning report schedule

## Data Sources

| File | Description |
|------|-------------|
| `../data/tasks.json` | Task list (auto-refreshes every 60s) |
| `../data/heartbeat-state.json` | Last heartbeat timestamp |
| `../IDEAS.md` | Ideas for the Ideas section |

## Local Development

```bash
cd command-centre
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deployment

**Cloudflare Pages** (primary):
- Auto-deploys from GitHub
- URL: `https://torque-workspace.pages.dev/command-centre/`

**GitHub Pages** (backup):
1. Push to main branch
2. Enable GitHub Pages in repo settings
3. Access at: `https://dee-CL-2026.github.io/torque-workspace/command-centre/`

## Mobile Shortcut

On Android/iOS, open the URL in browser and "Add to Home Screen".

## Keyboard Shortcuts

*(Planned for future)*
- `c` — Toggle compact mode
- `r` — Refresh data
- `1-4` — Jump to section

---

## Changelog

### v2.0 — 2026-02-07
- Added: Session HUD bar with quick stats
- Added: Blocked tasks section (3-column layout)
- Added: Ideas section (loads from IDEAS.md)
- Added: Agent roster shows task counts per agent
- Added: Collapsible card sections
- Added: View toggle (All/Work/Compact)
- Added: Project color-coded tags
- Improved: Mobile responsiveness
- Improved: Visual hierarchy and spacing
- Improved: Scrollbar styling

### v1.0 — 2026-02-06
- Initial release
- Task pipeline view
- Agent roster
- Pulse monitor
- GitHub raw data loading

---

*Last updated: 2026-02-07*
