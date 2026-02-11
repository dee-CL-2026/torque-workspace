# Agents Operating Rules (v1)

## Roles (initial)
- flash: fast research, summaries, file audits, quick tasks (Gemini 2.5 Flash, free)
- main: orchestrator (Opus). Writes/curates tasks, assigns owners, resolves ambiguity.
- secretary: triage + assignment + follow-ups. Keeps tasks tidy and ensures every TODO has an owner.
- coder: executes coding / scripting tasks, writes outputs, updates task notes with paths.
- qwen: “free worker” for research/drafting/analysis tasks via OpenRouter.

## Critical distinction
- Bootstrapped agents: persistent agents in `agents.list` with their own model.
- Spawned agents: ephemeral forks (sessions_spawn) used only when explicitly required.

## Comms hygiene
- Avoid channel noise. Prefer cron delivery `mode: none`.
- When health-checking, do it silently and report only a single summary in main.

## File discipline
- Only modify:
  - `01_TASKS/tasks.md` table fields (Assigned/Status/Notes)
  - log append in `05_LOGS/LOGS.md`
  - new artifacts in `04_WORKFLOWS/` or project folders, then link in Notes
