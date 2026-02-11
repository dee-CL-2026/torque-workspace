# Task Queue

<!-- TABLE:START -->
| ID | Priority | Task | Project | Assigned | Status | Added | Notes |
|---:|:-------:|------|---------|----------|--------|-------|------|
| 1 | P2 | Bootstrap task system: verify cron pulses, ensure no channel noise | Ops | main | TODO | 2026-02-11 | First run: confirm read/parse/update loop works |
<!-- TABLE:END -->

## Status values
- TODO
- IN_PROGRESS
- BLOCKED
- DONE
- CANCELLED

## Rules
- New task rows MUST be inserted immediately before the `<!-- TABLE:END -->` marker.
- Only update: Assigned, Status, Notes for existing tasks.
- Do not reorder rows.
- Do not edit anything outside the `<!-- TABLE:START -->` / `<!-- TABLE:END -->` block.
