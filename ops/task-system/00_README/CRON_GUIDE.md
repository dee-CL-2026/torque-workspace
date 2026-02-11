# Cron Guide

Goal: run scheduled tasks without “announce-back” noise.

Pattern:
- Use cron/agent-turn delivery with `mode: none` where supported.
- Each agent runs every 15 minutes, but with staggered start offsets.

Staggering rule:
- All agents use `FREQ=MINUTELY;INTERVAL=15`
- Each agent has a different DTSTART minute offset (e.g. +0, +3, +6, +9, +12)

Example (conceptual):
- Main (Opus): every 15m, offset 0
- Secretary: every 15m, offset 3
- Coder: every 15m, offset 6
- Qwen: every 15m, offset 9
- Flash (Gemini 2.5 Flash): every 15m, offset 12

Operational rule:
- If tasks.md is unchanged since last run, do nothing and log “no-op”.
