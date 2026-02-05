# Command Centre - Design Spec

**Status:** 🧠 Outline  
**Created:** 2026-02-05  
**For:** Dee (private GitHub Pages)

---

## Vision

A single-page dashboard showing the entire operation at a glance. The nerd's happy place. Data, structure, status — all in one view.

---

## Sections

### 1. Staff Overview (Hero)

```
┌─────────────────────────────────────────────────────────────┐
│  COMMAND CENTRE                          Last sync: 21:45  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐              │
│   │  3  │  │  1  │  │  0  │  │  5  │  │  2  │              │
│   │ ███ │  │ ██░ │  │ ░░░ │  │ ███ │  │ █░░ │              │
│   └─────┘  └─────┘  └─────┘  └─────┘  └─────┘              │
│   Torque    PA     gas-dev  frontend  analyst              │
│   Active   Ready   Idle     Active    Ready                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Each agent card shows:
- Task count
- Mini progress ring
- Status badge (Active / Ready / Idle / Building)

---

### 2. Task Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│  TASKS                                                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   📥 NEW     │  🔄 ACTIVE   │  ⏸️ BLOCKED  │   ✅ DONE      │
│      8       │      5       │      2       │      23        │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ • Budget Q1  │ • Tiered fork│ • SKD data   │ • Team matrix  │
│ • Dashboard  │ • PA setup   │ • API auth   │ • HEARTBEAT    │
│ • CRM scope  │ • ...        │              │ • Budget docs  │
│ • ...        │              │              │ • ...          │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

Kanban-style columns with counts and recent items.

---

### 3. Staff Roster

```
┌────────────────────────────────────────────────────────────┐
│  STAFF ROSTER                                              │
├──────────┬──────────┬────────┬───────┬───────┬────────────┤
│ Agent    │ Role     │ Status │ Tasks │ Model │ Last Run   │
├──────────┼──────────┼────────┼───────┼───────┼────────────┤
│ torque   │ CoS      │ ✅     │ 3     │ opus  │ now        │
│ pa       │ PA       │ ✅     │ 1     │ haiku │ —          │
│ gas-dev  │ GAS Dev  │ ✅     │ 0     │ flash │ —          │
│ frontend │ Frontend │ 📋     │ —     │ flash │ —          │
│ analyst  │ Research │ 📋     │ —     │ sonnet│ —          │
│ finance  │ Finance  │ 📋     │ —     │ sonnet│ —          │
│ ...      │          │        │       │       │            │
└──────────┴──────────┴────────┴───────┴───────┴────────────┘
```

Full team matrix with live status.

---

### 4. Recent Activity

```
┌────────────────────────────────────────────────────────────┐
│  ACTIVITY LOG                                              │
├────────────────────────────────────────────────────────────┤
│ 21:45  torque   Created SPEC-command-centre.md             │
│ 21:42  torque   Enabled heartbeat (30 min)                 │
│ 21:31  torque   Added PA soul/personality                  │
│ 21:19  torque   Built team matrix                          │
│ 21:08  gas-dev  [pending] Deploy tiered scripts            │
│ ...                                                        │
└────────────────────────────────────────────────────────────┘
```

Recent commits, spawns, completions.

---

### 5. System Health (Footer)

```
┌────────────────────────────────────────────────────────────┐
│ Gateway: ● Online │ Heartbeat: 30m │ WhatsApp: ● │ TG: ●  │
│ Last heartbeat: 21:45 │ Next: ~22:15 │ Uptime: 4h 23m     │
└────────────────────────────────────────────────────────────┘
```

---

## Data Sources

| Section | Source |
|---------|--------|
| Staff Overview | `team/TEAM.md` + spawn history |
| Task Pipeline | Need to create: `tasks/` or central tracker |
| Staff Roster | `team/TEAM.md` |
| Activity Log | Git log + session transcripts |
| System Health | Gateway status API |

---

## Implementation Path

1. **Static mockup** — HTML with sample data (dashboard-kit)
2. **Data files** — JSON exports from md files (manual or scripted)
3. **GitHub Pages** — Private repo, Pages enabled
4. **Auto-refresh** — Script that regenerates HTML from data
5. **Future: live** — Pull from API/webhooks

---

## Hosting: GitHub Pages (Private)

1. Create private repo: `dee-CL-2026/command-centre`
2. Enable Pages (Settings → Pages → main branch)
3. Push HTML dashboard
4. Access via: `https://dee-CL-2026.github.io/command-centre/`

Note: Private repo + GitHub Pages = still needs auth (GitHub login).

---

## Open Questions

- [ ] Where do tasks live? (Central file vs per-agent?)
- [ ] How to track task status changes?
- [ ] Auto-sync or manual refresh?
- [ ] Include Candid metrics or keep this meta/operational only?

---

## Priority

**Not urgent** — but high dopamine value. Worth building incrementally.

Phase 1: Static mockup with manual data
Phase 2: Scripted data extraction
Phase 3: Auto-refresh / live-ish

---

*Add ideas below:*

