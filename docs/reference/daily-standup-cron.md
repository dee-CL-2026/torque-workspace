# Daily Standup Cron — Draft

*Reference: Mission Control guide Part 9*

---

## Purpose
Automated daily summary sent to Telegram showing:
- ✅ Completed today
- 🔄 In progress
- 🚫 Blocked
- 👀 Needs review
- 📝 Key decisions

## Cron Configuration

```json
{
  "name": "daily-standup",
  "schedule": {
    "kind": "cron",
    "expr": "30 23 * * *",
    "tz": "Asia/Jakarta"
  },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Generate daily standup summary. Read tasks.md, tasks-done.md, and memory/2026-*.md (today). Format as:\n\n📊 DAILY STANDUP — [date]\n\n✅ COMPLETED TODAY\n• [task]: [brief summary]\n\n🔄 IN PROGRESS\n• [task]: [status]\n\n🚫 BLOCKED\n• [task]: [blocker]\n\n👀 NEEDS REVIEW\n• [items needing Dee's attention]\n\n📝 KEY DECISIONS\n• [any decisions made today]\n\nKeep it concise. Send to Telegram.",
    "model": "anthropic/claude-3-5-haiku-20241022",
    "timeoutSeconds": 120
  },
  "delivery": {
    "mode": "announce"
  }
}
```

## Implementation Notes

1. **Time:** 23:30 Jakarta (11:30 PM) — end of day summary
2. **Model:** Haiku (cheap, sufficient for summarization)
3. **Requires:** 
   - Cheaper model config working (blocked on API key)
   - Delivery to Telegram channel configured

## Alternative: Main Session System Event

If isolated sessions remain problematic:

```json
{
  "name": "daily-standup-reminder",
  "schedule": {
    "kind": "cron", 
    "expr": "30 23 * * *",
    "tz": "Asia/Jakarta"
  },
  "sessionTarget": "main",
  "payload": {
    "kind": "systemEvent",
    "text": "[DAILY STANDUP] Generate and send daily summary to Dee."
  }
}
```

---

## Status
**Draft** — waiting on cheaper model config before implementing.

*Created: 2026-02-07*
