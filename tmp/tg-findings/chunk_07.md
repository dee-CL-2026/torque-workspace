## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Budget draft (Anders call) | Torque | In-Progress | 2026-02-06 | |
| Process YouTube watchlist (7 videos) | Torque | Pending | 2026-02-06 | |
| Connect Google calendar | Torque | Pending | 2026-02-06 | |
| Connect Outlook calendar | Torque | Pending | 2026-02-06 | |
| Fix model routing for sub-agents (haiku allowlist) | Torque | Pending | 2026-02-06 | |
| Wire Command Centre to read from tasks.md | Torque | Pending | 2026-02-06 | |
| Send 2024-2025 financial data to Anders | Dee | Pending | 2026-02-06 | |
| Ask Ryan for pitch deck + 3 marketing scenarios | Dee | Pending | 2026-02-06 | |
| Follow up: Teddy (KKS) | Dee | Pending | 2026-02-06 | |
| Follow up: PKF (Cheryl) | Dee | Pending | 2026-02-06 | |
| Follow up: Jules (zero cap accounts) | Dee | Pending | 2026-02-06 | |
| Push SKD for sales data + road show data | Dee | Pending | 2026-02-06 | |
| Get Ferry involved in all groups | Dee | Pending | 2026-02-06 | |
| Finns contract / co-branding data | Dee | Pending | 2026-02-06 | |

## Decisions
- Claude-as-chat-exporter trick is worth remembering and adding to mental toolbox.
- Full export from Day 1 (transcript) is valuable for context.
- Heartbeat mechanism exists, but its current configuration (checking only YouTube watchlist) is insufficient.
- Heartbeat is a built-in cron that fires every 30 min and says "check HEARTBEAT.md".
- A combination of heartbeat (general awareness) and cron (defined deliverables) is recommended, but *state tracking* is fundamental first.
- HEARTBEAT.md should be an orchestrator checklist, pointing to where work lives (domain-specific files like tasks.md), rather than containing all tasks itself.
- Heartbeat interval changed to 5 minutes for testing.
- Task list structure agreed upon: table format (Task | Assigned | Status | Added | Notes), active tasks in `tasks.md`, completed tasks in `tasks-done.md`.
- HEARTBEAT.md logic updated to read tasks.md, assign, start, continue, and archive.
- Team roster (`team/TEAM.md`) exists and should be used for assigning tasks.
- HEARTBEAT.md updated to check `vault/inbox/` for new files and extract tasks.
- Duplicate checking added to inbox processing step when extracting tasks.
- Full task/project management system should support assigning tasks to Torque, sub-agents, Dee, human staff/colleagues, and external parties.
- All 17 identified tasks were assigned to the appropriate owner (Dee, Torque, sub-agents).
- HEARTBEAT.md updated with explicit rules for Torque tasks (start directly), sub-agent tasks (spawn via `sessions_spawn`), and Dee/human tasks (leave pending).
- Main Torque agent should primarily orchestrate and spawn sub-agents; quick tasks (< 2 min) can be done directly, but anything substantial should be spawned to a worker (e.g., `torque-worker` sub-agent).
- Sub-agents will use `haiku` as the default model instead of `flash` to avoid rate limits (though a fallback to `opus` was observed due to an allowlist issue).
- HEARTBEAT.md updated with error-checking rule for model selection.
- Heartbeat interval changed to 15 minutes.
- Heartbeat will not be delegated to a sub-agent; the main session heartbeat is sufficient for responsiveness.
- Heartbeat-state.json will be updated on each heartbeat to ensure Command Centre shows current status.

## Context/Profile
- Agent name: Claw Torque.
- User name: Dieter Werwath (Dee).
- Working with Google Docs for drafting/exporting chat content.
- Claude (AI) is being used for composing/extracting.
- A Google Doc with budget draft (Anders call), Candid Labs review, WhatsApp silent monitoring research, etc., is being filled.
- The agent has a "mental toolbox" and "mental history" (memory files).
- Agent is aware of its own limitations regarding remembering tasks across sessions due to compaction and lack of persistent state.
- Agent's heartbeat mechanism runs every ~30 minutes but was previously only checking a low-value item (YouTube watchlist).
- The agent has an existing team roster (`team/TEAM.md`) and job descriptions (`team/wa-monitor.md`, `team/agents/`).
- The project involves various domains: Budget, YouTube, Command Centre, Candid Labs, Cloudflare, etc.
- The agent's capabilities include doing real work during heartbeats, checking multiple things, maintaining state via files, and spawning sub-agents.
- Agent is aware of token costs for API calls.
- User has paid subscriptions for Claude Max, Gemini, and GPT.
- OpenClaw might be routing to Gemini's free API tier despite a paid subscription.
- There's an existing Command Centre dashboard (v2.0) deployed on Cloudflare Pages (`torque-works.pages.dev`).
- The Command Centre dashboard uses `data/tasks.json` and `data/heartbeat-state.json`.
- Sub-agents were hitting Gemini rate limits (5 per minute per model for `gemini-2.5-flash`).
- Analyst sub-agent (using a different model) successfully completed its task.
- Haiku is defined in config but not allowed for sub-agents, causing a fallback to Opus for spawned agents.

## Backlog Ideas
- Run Claude through entire history to create `memory/full-transcript-2026-02-05-onwards.md`.
- Work separation (Candid vs Good Doctor tagging).
- Meeting transcript pipeline.
- Ideas section for dashboard.
- Daily idea feature.
- "Overnight builds" concept.
- Deploy tiered fork to GAS.
- Cloudflare tunnel setup.
- Token usage tracking.
- Build `torque-worker` sub-agent for main Torque's deep work.
- Dig into docs and fix model routing for sub-agents (haiku allowlist).
- Consider a sub-agent that does grunt work (scan inbox, check calendar, poll APIs) and returns a structured summary to the main heartbeat.
- Define models per agent later if problems arise.
- BUDGET-2026-BUCKETS.md

## Done
- WhatsApp silent monitoring (friends group working).
- Parsed all source files (transcript, Excel, existing budget data).
- Extracted key numbers from Anders call.
- Saved today's session to memory (pre-compaction flush).
- Patched `agents.defaults.heartbeat.every` from "30m" to "5m".
- Heartbeat interval set to 5 minutes.
- Task list structure confirmed.
- HEARTBEAT.md updated (check tasks.md, check vault/inbox, YouTube watchlist).
- 17 tasks added to `tasks.md`.
- Duplicate checking added to inbox processing step.
- All 17 tasks assigned to owners.
- HEARTBEAT.md updated with explicit rules for Torque, sub-agents, and human tasks.
- Analyst task DONE: Created `candid/METRIC-DATA-MAPPING.md` (184 metrics mapped).
- HEARTBEAT.md updated with error-checking rules.
- `team/TEAM.md` defaults updated to haiku.
- 4 tasks re-spawned (running on opus fallback due to allowlist issue).
- Heartbeat interval changed to 15 minutes.
- Cockpit dashboard done: `candid/cockpit.html` created with 5 Phase 1 metrics.
- SKU Library done: `candid/SKU-LIBRARY.md` created with 11 SKUs.
- Command Centre upgrade done: New HUD bar, 3-column layout, blocked tasks section, collapsible cards, mobile optimization.
- candid-labs-tiered Phase 2 done: Production and inventory scripts built with full lineage tracking (57 of 184 metrics supported).
- All 4 sub-agent tasks complete (after re-spawning).
- Pushed updates to GitHub: Command Centre v2.0, `tasks.md`, `tasks-done.md`, `candid/` files, today's memory file.
- `data/heartbeat-state.json` updated with current timestamp and rule added to `HEARTBEAT.md`.