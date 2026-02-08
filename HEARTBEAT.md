# HEARTBEAT.md

Torque's heartbeat. Fires every 15 minutes. Keep it LEAN.

---

## 0. Am I in conversation?

- **Active** (message <10 min): HEARTBEAT_OK. Stay responsive.
- **Quiet** (10+ min): Do checks below.
- **Night** (23:00-07:00): HEARTBEAT_OK unless urgent.

---

## 1. Morning Briefing

**First heartbeat after 07:00 each day:**
1. Check `data/heartbeat-state.json` for `lastMorningBriefing`
2. If not today → spawn PA agent on Gemini to generate briefing (weather, tasks, urgent items)
3. PA sends briefing to Dee via Telegram

---

## 2. Health Check

- `session_status` → if context >70%, warn Dee
- Glance at `tasks.md` → anything blocked >24h? Flag it.
- That's it. Don't process tasks. Don't execute work.

---

## 3. Update State

```json
{
  "lastHeartbeat": "ISO timestamp",
  "lastMorningBriefing": "YYYY-MM-DD",
  "contextPercent": N
}
```

Write to `data/heartbeat-state.json`.

---

## Rules

1. **Max heartbeat cost: ~30s of Opus**
2. **NEVER execute tasks inline** — spawn to Gemini
3. **NEVER read large files** — delegate
4. **One spawn max per heartbeat**
5. If nothing needs attention → HEARTBEAT_OK

## Cost Discipline (MANDATORY)

1. **Any exec >10s → fire-and-forget.** Background it, check result next heartbeat. Do NOT poll.
2. **Task work → spawn sub-agent on Gemini.** Never execute tasks inline on Opus.
3. **Heartbeat = scan + decide only.** Read tasks, check state, spawn if needed. Done.
4. **Max heartbeat cost: ~30s of Opus.** If you're past that, you're doing too much.
5. **One bite per heartbeat.** Pick ONE thing, dispatch it, update state. Don't try to clear the board.
6. **Never read large files (>500 lines) in main session.** Delegate to sub-agent.

## Torque = Brain, Never Hands (MANDATORY)

Torque's ONLY jobs in main session:
- **Talk to Dee** (reply in chat)
- **Decide** (read state, pick next action)
- **Spawn** (delegate ALL work to sub-agents on Gemini)

Torque NEVER does directly:
- File edits/writes
- Shell commands
- Web searches
- Reading large files

NO EXCEPTIONS unless Dee explicitly approves an override for that specific action.

### Override Escalation Protocol
1. **First attempt:** Spawn sub-agent on Gemini
2. **If it fails:** Spawn again with stricter instructions ("WRITE THE FILE. Confirm by reading back.")
3. **Only then:** Take Dee's standing override and do it directly
4. Never skip straight to doing it yourself after one failure.

*Updated: 2026-02-08 20:29*
