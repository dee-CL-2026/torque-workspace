# HEARTBEAT.md

Checked every 5 minutes (test mode). Follow it strictly.

---

## 1. Check tasks.md

1. Read `tasks.md`
2. For each task:
   - **pending + unassigned** → Assign to team member (see `team/TEAM.md` for roster)
   - **assigned to Torque + pending** → Change to in-progress, start work directly
   - **assigned to sub-agent + pending** → Spawn sub-agent, update Notes with session label, change to in-progress
   - **assigned to Dee/human + pending** → Leave as pending (human will action)
   - **in-progress (Torque)** → Continue work
   - **in-progress (sub-agent)** → Check session status via `sessions_list`, update Notes
   - **blocked** → Note blocker, escalate if needed
   - **done** → Move row to `tasks-done.md`, remove from `tasks.md`

3. If ALL tasks are in-progress or blocked with nothing actionable → HEARTBEAT_OK

### Spawning sub-agents
When spawning, use:
```
sessions_spawn(task="[task description]", label="[agent-id]-[date]", model="haiku")
```
Update task Notes with: `Spawned: [label] @ [time]`

### Error checking (in-progress tasks)
For tasks marked in-progress with a spawned agent:
1. Check session status via `sessions_list`
2. If `stopReason: "error"` → check error message
3. **Rate limit / quota errors (429):** Mark blocked, note "Rate limited. Retry on haiku."
4. **Other errors:** Mark blocked, escalate to Dee
5. **Completed successfully:** Move to tasks-done.md with summary

Default model: **haiku** (reliable, no free-tier limits)
Upgrade to sonnet/opus only when task complexity requires it.

---

## 2. Check obsidian inbox

1. Read `vault/inbox/` for new files
2. For any new/unprocessed items:
   - Extract tasks → **check for duplicates in tasks.md first** → add if new
   - Extract reference material → move to appropriate vault folder
   - Mark/move processed files so they don't get re-read

**Duplicate check:** Before adding any task, scan tasks.md AND tasks-done.md for similar items. If exists, skip or merge.

---

## 3. Quick checks (only if tasks clear)

- [ ] YouTube watchlist: items >14 days in `vault/youtube-watchlist.md` → flag for cleanup

---

## Rules

- **Do NOT just say HEARTBEAT_OK if there's pending work**
- **Update task status in the file before starting work**
- **If spawning a sub-agent, note it in the task Notes column**

---

---

## 4. Update heartbeat-state.json

After completing checks, update `data/heartbeat-state.json` with:
- `lastHeartbeat`: current timestamp (ISO 8601)
- `lastChecks`: what was checked this cycle
- `stats.heartbeatsToday`: increment if same day
- `stats.lastProactiveAction`: brief note of what was done

Then commit and push so Command Centre dashboard stays current.

---

*Updated: 2026-02-07 06:49*
