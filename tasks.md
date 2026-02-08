# Tasks — Single Source of Truth

All tasks live here. Agents filter by their name in the Assigned column.
Secretary triages and assigns. Done tasks move to tasks-done.md.

| ID | Task | Assigned | Status | Added | Notes |
|----|------|----------|--------|-------|-------|
| T001 | Send 2024-2025 financial data to Anders | Dee | pending | 2026-02-06 | From Anders call |
| T002 | Ask Ryan for pitch deck + 3 marketing scenarios | Dee | pending | 2026-02-06 | From Anders call |
| T003 | Follow up: Teddy (KKS) | Dee | pending | 2026-02-06 | |
| T004 | Follow up: PKF (Cheryl) | Dee | pending | 2026-02-06 | |
| T005 | Follow up: Jules (zero cap accounts) | Dee | pending | 2026-02-06 | |
| T006 | Push SKD for sales data + road show data | Dee | pending | 2026-02-06 | |
| T007 | Get Ferry involved in all groups | Dee | pending | 2026-02-06 | |
| T008 | Get Finns co-branding contract | Dee | pending | 2026-02-06 | For budget data |
| T009 | Share historical data from SKD | Dee | pending | 2026-02-05 | For Modern Trade assessment |
| T010 | Get second SIM for WhatsApp bot | Dee | pending | 2026-02-02 | Dedicated bot number |
| T011 | Set up Obsidian mobile + Git sync | Dee | pending | 2026-02-07 | [desk] Deprioritised — using GitHub web + VS Code |
| T012 | Install OpenClaw Browser Relay extension | Dee | pending | 2026-02-08 | [desk] Chrome Web Store |
| T013 | Introduce Torque in Pizza Pasta Prosecco group | Dee | pending | 2026-02-08 | Mention @Torque to intro |
| T014 | Get Anthropic pay-per-use API key | Dee | pending | 2026-02-07 | console.anthropic.com, unlocks Sonnet/Haiku |
| T015 | Create YouTube playlist for Watch List | Dee | pending | 2026-02-05 | Public or unlisted |
| T016 | Get email address for Torque | Dee | pending | 2026-02-05 | Candid or personal? |
| T017 | Test-drive PA with a quick task | Dee | pending | 2026-02-05 | |
| T018 | Connect Google calendar | Torque | blocked | 2026-02-06 | Needs interactive auth [desk] |
| T019 | Connect Outlook calendar | Torque | blocked | 2026-02-06 | Needs interactive auth [desk] |
| T020 | Configure Anthropic Haiku/Sonnet as fallback | Torque | blocked | 2026-02-08 | Blocked on T014 |
| T021 | Italy trip planning support | Torque | pending | 2026-02-08 | Rome→Naples→Pompeii→Amalfi. Jun 22-Jul 13 |
| T022 | Process YouTube watchlist (7 videos) | Torque | pending | 2026-02-06 | Pull transcripts, summarize |
| T023 | Set up Whisper transcription reliably | Torque | pending | 2026-02-08 | whisper-cli keeps failing between sessions |
| T024 | Create Mission Control infographic (PNG) | Torque | pending | 2026-02-08 | Chromium now installed, HTML at tmp/infographic.html |
| T025 | Improve Command Centre layout | frontend | pending | 2026-02-06 | Side-by-side, scrollable, channel bar |
| T026 | Wire Command Centre to read from tasks.md | frontend | pending | 2026-02-06 | Replace data/tasks.json |
| T027 | Token usage tracking for Command Centre | frontend | pending | 2026-02-05 | |
| T028 | Build Family Command Centre | frontend | pending | 2026-02-07 | Watchlist, reading list, chat gateway |
| T029 | Make Command Centre dynamic | frontend | pending | 2026-02-07 | Live status, desk/mobile filter, rate limit HUD |
| T030 | Deploy tiered scripts to GAS | gas-dev | pending | 2026-02-05 | Via clasp, compare to legacy |
| T031 | Set up daily morning briefing cron | pa | pending | 2026-02-08 | 7-8am Jakarta, weather + tasks + urgent |
| T032 | Scope nightly build workflow | Torque | pending | 2026-02-08 | Scope before bed, agent builds overnight, morning review |
| T033 | Set up meeting prep automation | secretary | blocked | 2026-02-07 | Blocked on calendar integration |
| T034 | Audit Drive structure and consolidate | secretary | pending | 2026-02-05 | |
| T035 | Draft daily value-add idea prompt | Torque | pending | 2026-02-05 | Rotating: Candid/GoodDoctor/personal/family |
| T036 | Activity log file creation | Torque | pending | 2026-02-06 | data/activity.json |
| T037 | Set up scheduled messages in family chat | Torque | pending | 2026-02-05 | Cron jobs |
| T038 | Create WORKING.md template & wire into heartbeat | Torque | pending | 2026-02-08 | From Mission Control guide |
| T039 | Update TG export script for delta mode | Torque | pending | 2026-02-08 | Track last msg ID, only export new |
| T040 | Fix cross-channel messaging | analyst | pending | 2026-02-08 | TG→WA and vice versa |
| T043 | Set up Cloudflare Tunnel for remote SSH | ops | pending | 2026-02-08 | Scope: transfer/point TSLC domain to Cloudflare, configure tunnel, test SSH from mobile. Dep: Dee to provide Squarespace login or transfer domain |
| T044 | Set up mobile terminal access | ops | blocked | 2026-02-08 | Blocked on T043. Install Termux/JuiceSSH on phone, configure SSH to Chromebook via tunnel |
| T045 | Confirm Cloudflare Pages deploy path (git-linked or wrangler) | ops | pending | 2026-02-08 | Need to verify torque-works.pages.dev connection |
| T046 | Clone candidlabs-site repo locally | ops | pending | 2026-02-08 | Lost in powerwash |
| T047 | Migrate candidlabs-site to Cloudflare Pages + Access | frontend | pending | 2026-02-08 | Business data shouldn't be public on GH Pages |
| T048 | Command Centre layout fixes | frontend | pending | 2026-02-08 | Scroll, collapse empty, filter by assignee, links |
| T049 | Build supervisor/ops-monitor agent | ops | pending | 2026-02-08 | Gemini, checks sessions_list, flags stuck tasks |
| T050 | Investigate main heartbeat model routing | analyst | pending | 2026-02-08 | Config says gemini but heartbeat still polls Opus |
| T051 | Update secretary cron for single-list system | secretary | pending | 2026-02-08 | Still referencing old per-agent task files |
| T052 | Update TG export script for delta mode improvements | ops | pending | 2026-02-08 | Track last msg ID, incremental exports |

## Status Key
- **pending** — not yet started
- **in-progress** — actively being worked
- **blocked** — waiting on something
- **done** — ready to move to tasks-done.md

## Assignees
- **Dee** — Human tasks, relationships, approvals
- **Torque** — Orchestration, spawning, decisions
- **secretary** — Triage, scheduling
- **pa** — Briefings, memory, personal tasks
- **ops** — System health, git, monitoring
- **docs-bot** — OpenClaw documentation lookup
- **Consultants** (spawned on-demand): analyst, frontend, gas-dev, data-eng, finance, hr-ga, sales-ops, marketing, customer-success, product

## Rules
1. Single source of truth — no per-agent task files
2. Each agent reads this file and filters by their name
3. Secretary triages inbox and assigns
4. Done tasks move to tasks-done.md
5. IDs are sequential: T001, T002, etc.
