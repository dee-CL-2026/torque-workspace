# HEARTBEAT.md

Checked every 15 minutes. Follow strictly.

---

## 0. Conversation State

Before heavy work, check: **Am I in active conversation with Dee?**

- **Active** (message <10 min): Stay responsive. Quick housekeeping only.
- **Quiet** (no message 10+ min): Do proactive work.
- **Night** (23:00-07:00): Work through backlog quietly.

---

## 1. Morning Briefing (REQUIRED)

**First heartbeat after 07:00 each day** → Send morning briefing to Dee:

1. Check `data/heartbeat-state.json` for `lastMorningBriefing` date
2. If not today → Generate and send briefing:
   - Weather outlook (use weather skill)
   - Tasks due today / urgent items from tasks.md
   - Any overnight activity or alerts
   - Quick "here's your day" summary
3. Update `lastMorningBriefing` to today's date

Don't skip this. If Dee is asleep, message anyway — they'll see it when they wake.

---

## 2. Check tasks.md

1. Read `tasks.md`
2. For each task:
   - **Torque + pending** → Start work NOW (see section 3)
   - **Sub-agent + pending** → Note: subagents currently broken. Reassign to Torque if doable directly, otherwise leave blocked
   - **Dee + pending** → Leave (human action)
   - **in-progress** → Continue or check status
   - **done** → Move to `tasks-done.md`

3. **DO NOT just log "stable" if there's pending Torque work**

---

## 3. Torque Direct Work (No Subagents Needed)

During quiet periods, I CAN and SHOULD do:

### Always Available
- **Web research** — search, fetch, summarize findings
- **File analysis** — read docs, extract info, write summaries
- **Memory maintenance** — review daily files, update MEMORY.md
- **Git sync** — commit changes, push to remote
- **Writing tasks** — drafts, docs, notes, analysis
- **Data processing** — parse files, extract patterns

### With Current Setup
- **Weather checks** — via skill
- **Telegram messaging** — proactive updates

### Blocked Until Setup
- Calendar integration (needs interactive auth)
- Email access (needs setup)

**Rule:** If a task can be done with web_search + read + write + exec, DO IT. Don't wait for subagents.

---

## 4. Proactive Work Rotation

When tasks.md is clear, rotate through these (track in heartbeat-state.json):

| Check | Frequency | How |
|-------|-----------|-----|
| Memory review | Daily | Read recent memory/*.md, update MEMORY.md |
| Git sync | Every 2h | Commit + push workspace changes |
| Weather | Morning + if going out | Weather skill |
| Inbox processing | Every heartbeat | vault/inbox/ for new files |
| YouTube watchlist | Weekly | Flag items >14 days old |

---

## 5. Obsidian Inbox

1. Read `vault/inbox/` for new files
2. For new/unprocessed items:
   - Extract tasks → check for duplicates → add if new
   - Move reference material to appropriate vault folder
   - Mark processed (move to vault/processed/ or delete)

---

## 6. Update State

After each heartbeat, update `data/heartbeat-state.json`:
```json
{
  "lastHeartbeat": "ISO timestamp",
  "lastMorningBriefing": "YYYY-MM-DD",
  "lastChecks": ["what was checked"],
  "lastGitSync": "ISO timestamp",
  "stats": {
    "heartbeatsToday": N,
    "lastProactiveAction": "what was done"
  }
}
```

Then commit + push if meaningful changes.

---

## Rules

1. **Do NOT say HEARTBEAT_OK if there's actionable work**
2. **Morning briefing is mandatory** — first heartbeat after 7am
3. **Subagents broken? Do it yourself** if possible
4. **Quiet period = work time**, not just monitoring
5. **Actually complete tasks**, don't just check boxes

---

*Updated: 2026-02-08 10:25*
