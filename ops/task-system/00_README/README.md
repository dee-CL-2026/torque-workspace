# Task System (v1)

Purpose: a simple, deterministic task queue + SOP library that cron-driven agents can run without spamming channels.

Core idea:
- A single canonical task queue: `01_TASKS/tasks.md`
- SOPs and agent operating rules live in `02_SOPS/` and `03_AGENTS/`
- Agents run on a staggered 15-minute pulse and:
  1) read SOPs,
  2) parse tasks,
  3) claim/execute tasks they are responsible for,
  4) write back updates to `tasks.md`,
  5) append a brief log entry.

Key constraint:
- Agents must not overwrite or reformat files beyond the defined sections.

Start here:
- `00_README/CRON_GUIDE.md`
- `02_SOPS/SOP_TASKS.md`
- `03_AGENTS/AGENTS.md`
