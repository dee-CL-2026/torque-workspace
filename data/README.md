# Data Directory

Central data store for dashboards and tracking.

---

## Files

| File | Purpose | Format |
|------|---------|--------|
| `tasks.json` | All tasks (source of truth) | JSON |
| `tasks.md` | Human-readable task view | Markdown |

---

## Adding Tasks via Telegram

**Simple format:**
```
task: Deploy tiered fork to GAS
```

**With details:**
```
task: Deploy tiered fork to GAS
priority: high
due: Friday
project: candid-data
```

**Quick capture:**
```
task: Call Anders about Q1 projections
```

Torque parses, assigns to best agent, adds to tasks.json, confirms.

---

## Task Schema

```json
{
  "id": "task-001",
  "title": "Task title",
  "description": "Optional longer description",
  "status": "backlog|active|blocked|done|archived",
  "priority": "low|medium|high|urgent",
  "assignee": "gas-dev|pa|analyst|etc|null",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp",
  "dueDate": "ISO date or null",
  "tags": ["tag1", "tag2"],
  "project": "project-id or null",
  "notes": ["Note 1", "Note 2"]
}
```

---

## Sync Pattern

1. Tasks added via Telegram → Torque updates tasks.json
2. tasks.md regenerated from tasks.json (for human reading)
3. Dashboard pulls from tasks.json

---

*MVP — will evolve*
