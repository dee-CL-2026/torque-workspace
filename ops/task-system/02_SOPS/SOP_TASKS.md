# SOP: Task Parsing + Updates

## Source of truth
- `01_TASKS/tasks.md` is the only canonical queue.

## Table structure
The task table is enclosed in sentinel markers:
```
<!-- TABLE:START -->
| ID | Priority | Task | ... |
|---:|:-------:|------|-----|
| 1  | P2      | ...  | ... |
<!-- TABLE:END -->
```
Everything between `<!-- TABLE:START -->` and `<!-- TABLE:END -->` is the table.
Everything after `<!-- TABLE:END -->` is metadata (Status values, Rules) — never write there.

## Parse rules
1. Read the file. Find lines between `<!-- TABLE:START -->` and `<!-- TABLE:END -->`.
2. Ignore the header row (first `|` row) and divider row (second `|---` row).
3. Each remaining row is a task with columns:
   - ID (int)
   - Priority (P0/P1/P2/P3)
   - Task (string)
   - Project (string)
   - Assigned (string: agent id or blank)
   - Status (enum: TODO, IN_PROGRESS, BLOCKED, DONE, CANCELLED)
   - Added (YYYY-MM-DD)
   - Notes (string)

## Row insertion rules
- New rows go **immediately before** the `<!-- TABLE:END -->` line.
- **NEVER** append rows after `<!-- TABLE:END -->`, `## Status values`, or `## Rules`.
- Each new row must be a valid pipe-delimited row matching the 8 header columns.
- ID assignment: `max(existing IDs) + 1`.

Pseudocode:
```
lines = read("01_TASKS/tasks.md").split("\n")
for i, line in enumerate(lines):
    if line.strip() == "<!-- TABLE:END -->":
        lines.insert(i, new_row)
        break
write("01_TASKS/tasks.md", "\n".join(lines))
```

## Claim rules
- An agent may claim a task if:
  - Status is TODO, and
  - Assigned is blank OR Assigned equals that agent id.
- Claim by setting:
  - Assigned = agent id (if blank)
  - Status = IN_PROGRESS
  - Notes = append timestamp + short intent

## Completion rules
- On completion:
  - Status = DONE
  - Notes = append timestamp + brief outcome + links/paths if relevant

## Blocking rules
- If blocked:
  - Status = BLOCKED
  - Notes = append timestamp + what is missing + next action

## Safety
- Only edit cells within the `<!-- TABLE:START -->` / `<!-- TABLE:END -->` block.
- Never change the markdown structure (pipe table, sentinel markers).
- Never edit anything after `<!-- TABLE:END -->`.
