# Workspace Audit Report

**Date:** 2026-02-09  
**Auditor:** Secretary agent (T034)

---

## 1. Current Structure Overview

```
torque-workspace/                      (~354M total)
├── .git/                              (git repo)
├── candid/                   72K      Business/product files (Candid)
├── command-centre/           72K      Main dashboard app
├── data/                     56K      JSON data, tasks, config
├── docs/                     44K      Reference docs, index.html
├── family/                   48K      Family info + separate command-centre
├── friends/                  12K      Contact profiles
├── memory/                   60K      Daily session logs
├── research/                  4K      Single file (SSH-CLIENTS-ANDROID.md)
├── scripts/                  32K      Python/bash utilities
├── team/                    104K      Agent specs + team specs
├── tmp/                      53M      ⚠️ Temp files + 52M node_modules
├── vault/                   301M      Obsidian vault + inbox (301M inbox)
│   ├── .obsidian/                     Obsidian config
│   ├── architecture/          4K      Knowledge layer doc
│   ├── family/                4K      Italy trip planning
│   ├── inbox/               301M      ⚠️ Bulk of storage (media files)
│   ├── research/             32K      Integration research docs
│   └── templates/            44K      Dashboard kit templates
├── 19 loose files at root             Various .md files
└── .gitignore
```

**Total files (excl .git):** ~130 workspace files + thousands in tmp/node_modules  
**Key insight:** 301M vault/inbox + 52M tmp/node_modules = 353M of 354M total. The actual working files are tiny.

---

## 2. Confirmed Duplicates — Safe to Delete

### 2a. Exact Binary Duplicates (verified via MD5)

| Keep | Delete | Size Saved |
|------|--------|-----------|
| `vault/inbox/GMT20260204-123059_Recording.m4a` | `vault/inbox/GMT20260204-123059_Recording (1).m4a` | **64MB** |
| `vault/inbox/GMT20260204-123059_Recording_640x360.mp4` | `vault/inbox/GMT20260204-123059_Recording_640x360 (1).mp4` | **82MB** |

**Total recoverable: ~146MB** from just these two duplicates.

### 2b. Obsidian Config Duplicates

- `vault/.obsidian/appearance.json` and `vault/.obsidian/app.json` are identical (both empty `{}`). Harmless but noted.

---

## 3. Files That Can Be Safely Deleted

### 3a. Temp / Processing Artifacts (~53M)

These are intermediate outputs from the telegram export processing task. The final results are already in `vault/inbox/`:

| Path | Notes |
|------|-------|
| `tmp/node_modules/` (52M) | Puppeteer + deps, leftover from a script run |
| `tmp/tg-chunks/chunk_00..10` (792K) | Raw telegram export chunks — processed |
| `tmp/tg-findings/chunk_00..10.md` + `new-messages.md` (108K) | Intermediate findings — merged |
| `tmp/tg-merge/tasks-batch-1..3.md` (20K) | Merge artifacts — already consolidated |
| `tmp/infographic.html` (8K) | One-off generated file |

**Recommendation:** `rm -rf tmp/` entirely, or at minimum `rm -rf tmp/node_modules/`

### 3b. Orphaned / Stale Root Files

| File | Issue | Recommendation |
|------|-------|----------------|
| `backlog.md` (1 line) | Contains a single item; superseded by `BACKLOG-OPENCLAW.md` (136 lines) | Merge the one item into BACKLOG-OPENCLAW.md, delete backlog.md |
| `vault/Untitled.md` | Contains only "TEST" | Delete |
| `OVERNIGHT-2026-02-05.md` | One-off overnight log from Feb 5 | Move to `memory/` or delete |
| `mission-control-infographic.png` | Loose image at root | Move to `docs/` or `vault/` |
| `NOTES-TO-SELF.md` | Likely superseded by MEMORY.md system | Review and merge into MEMORY.md, then delete |

### 3c. Superseded YouTube Files

| File | Lines | Recommendation |
|------|-------|----------------|
| `YOUTUBE-FINDINGS.md` | 184 | V1 — superseded by V2 |
| `YOUTUBE-FINDINGS-V2.md` | 261 | Move to `vault/research/youtube-findings.md` |
| `vault/youtube-summaries-2026-02-06.md` | 245 | Move to `vault/research/` |
| `vault/youtube-watchlist.md` | 177 | Move to `vault/research/` |

Delete V1 after confirming V2 has all content.

---

## 4. Overlapping / Confusing File Pairs

### 4a. TEAM.md Duplication
- `/TEAM.md` (160 lines) — root-level team overview
- `/team/TEAM.md` (167 lines) — slightly different version inside team/

**Recommendation:** Consolidate into `team/TEAM.md` as the single source of truth. Root `TEAM.md` can be a one-liner redirect or deleted.

### 4b. ideas.md vs IDEAS.md
- `ideas.md` (27 lines) — lowercase
- `IDEAS.md` (66 lines) — uppercase, more content

**Recommendation:** Merge into `IDEAS.md`, delete `ideas.md`.

### 4c. tasks.md vs data/tasks.md vs data/tasks.json
- `tasks.md` (67 lines) — root-level task list
- `data/tasks.md` (35 lines) — separate task file in data/
- `data/tasks.json` — structured task data

**Recommendation:** Consolidate. Keep `data/tasks.json` as the canonical structured store and `tasks.md` at root as the human-readable view. Delete `data/tasks.md`.

### 4d. research/ vs vault/research/
- `research/SSH-CLIENTS-ANDROID.md` — single file at root research/
- `vault/research/` — 4 research docs already

**Recommendation:** Move `research/SSH-CLIENTS-ANDROID.md` → `vault/research/`, delete empty `research/` folder.

### 4e. family/ vs vault/family/
- `family/` (root) — contacts, profiles, calendar, command-centre app
- `vault/family/italy-trip-2026.md` — single trip doc

**Recommendation:** Move `vault/family/italy-trip-2026.md` → `family/italy-trip-2026.md` to keep family content together. Or move all family content into vault/family/. Pick one home.

### 4f. Two command-centre apps
- `command-centre/` (root) — main dashboard (350+881+39+1193 = 2463 lines)
- `family/command-centre/` — family-specific dashboard (74+237+196 = 507 lines)

**Recommendation:** These are different apps. Rename `family/command-centre/` to `family/dashboard/` to avoid confusion.

### 4g. vault/inbox/ Telegram Export Versions
Multiple telegram export files are accumulating:
- `telegram-export-Claw_Torque-20260208-132802.json` (19K lines)
- `telegram-export-Claw_Torque-20260208-132802.txt` (20K lines)
- `telegram-export-full.txt` (25K lines)
- `telegram-export-delta.txt` (573 lines)
- `telegram-export-findings.md` (v1, 213 lines)
- `telegram-export-findings-v2.md` (383 lines)
- `Torque Catchup.txt` (586 lines)
- `Torque Catchup - Full Export.txt` (861 lines)

**Recommendation:** Keep only the latest full export + findings-v2. Archive or delete the rest. That's ~6 redundant files.

---

## 5. Suggested Folder Reorganisation

### Current issues:
1. **Root is cluttered** — 19 loose .md files at top level
2. **Duplicate locations** — research, family, tasks exist in multiple places
3. **tmp/ has cruft** — 53M of build artifacts
4. **vault/inbox is 301M** — duplicate media files inflating it

### Proposed clean structure:

```
torque-workspace/
├── AGENTS.md                    # Keep (core config)
├── SOUL.md                      # Keep (core config)
├── USER.md                      # Keep (core config)
├── TOOLS.md                     # Keep (core config)
├── MEMORY.md                    # Keep (core config)
├── HEARTBEAT.md                 # Keep (core config)
├── IDENTITY.md                  # Keep (core config)
├── .gitignore                   # Keep
│
├── tasks.md                     # Keep (human-readable task view)
├── tasks-done.md                # Keep
├── IDEAS.md                     # Consolidated (merge ideas.md in)
├── BACKLOG-OPENCLAW.md          # Keep (merge backlog.md item in)
│
├── candid/                      # Business files — good as is
├── command-centre/              # Main dashboard — good as is
├── data/                        # Structured data — remove tasks.md dupe
├── docs/                        # Reference docs — good as is
├── family/                      # Family — consolidate trip doc here
│   └── dashboard/               # Renamed from command-centre
├── friends/                     # Good as is
├── memory/                      # Daily logs — move OVERNIGHT into here
├── scripts/                     # Utilities — good as is
├── team/                        # Agent specs — consolidate TEAM.md here
│
├── vault/                       # Obsidian vault
│   ├── inbox/                   # Clean up dupes, archive processed exports
│   ├── research/                # Consolidate all research here
│   ├── architecture/            # Good as is
│   └── templates/               # Good as is
│
└── tmp/                         # EMPTY after cleanup (or removed)
```

### Files to REMOVE from root:
- `backlog.md` → merge into BACKLOG-OPENCLAW.md
- `ideas.md` → merge into IDEAS.md
- `TEAM.md` → consolidate into team/TEAM.md
- `NOTES-TO-SELF.md` → merge into MEMORY.md
- `OVERNIGHT-2026-02-05.md` → move to memory/
- `mission-control-infographic.png` → move to docs/
- `YOUTUBE-FINDINGS.md` → delete (superseded by V2)
- `YOUTUBE-FINDINGS-V2.md` → move to vault/research/

---

## 6. Quick Win Summary

| Action | Space Saved | Effort |
|--------|-----------|--------|
| Delete duplicate recordings in vault/inbox/ | **146MB** | Low |
| Delete tmp/node_modules/ | **52MB** | Low |
| Delete tmp/ entirely | **53MB** | Low |
| Clean up redundant telegram exports | ~10MB | Medium |
| Delete vault/Untitled.md | 0 | Trivial |
| Merge & delete backlog.md, ideas.md | 0 | Low |
| **Total potential savings** | **~200MB+** | |

---

## 7. No Action Needed (Healthy Areas)

- `candid/` — well-organized project files
- `command-centre/` — clean dashboard app
- `friends/` — compact, no issues
- `scripts/` — useful utilities
- `team/agents/` — clean agent specs
- `data/` — mostly well-structured (just remove tasks.md dupe)
- `memory/` — daily logs working as designed
- `vault/research/` — good research docs
- `vault/templates/` — reusable dashboard kit

---

*Report generated by Secretary agent, T034*
