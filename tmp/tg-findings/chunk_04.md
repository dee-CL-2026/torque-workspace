## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Create `TEAM.md` documenting roles + when to use each | Torque | In Progress | 2026-02-05 | |
| Start with Analyst for delegation | Torque | To Do | 2026-02-05 | |
| Add more agents as patterns emerge | Torque | To Do | 2026-02-05 | |
| Rebuild budget with new revenue buckets, SKU mix, new SKUs, and marketing | Torque | In Progress | 2026-02-05 | |
| Clarify marketing units (monthly/annual) | Dieter | Pending | 2026-02-05 | |
| Clarify "Finns" context | Dieter | Pending | 2026-02-05 | |
| Create `BUDGET-2026-BUCKETS.md` (bottom-up alternative), marking gaps | Torque | Done | 2026-02-05 | |
| Add note about Modern Trade cases/outlet/month to doc | Torque | Done | 2026-02-05 | |
| Share historical data from SKD to assess Modern Trade | Dieter | To Do | 2026-02-05 | |
| Look at OpEx (Staff etc.) | Torque | In Progress | 2026-02-05 | |
| Flag OpEx section as TBD in the doc | Torque | Done | 2026-02-05 | |
| Founder salary goes in the OpEx model | Torque | In Progress | 2026-02-05 | |
| Get pixel watch integration sorted later | Dieter | Backlog | 2026-02-05 | |
| Continue work on candid Labs (candid-labs-tiered) | Torque | In Progress | 2026-02-05 | |
| Deploy tiered scripts to GAS (via clasp) | gas-dev | To Do | 2026-02-05 | |
| Run against real data | gas-dev | To Do | 2026-02-05 | |
| Compare output to legacy scripts | gas-dev | To Do | 2026-02-05 | |
| Fix any discrepancies | gas-dev | To Do | 2026-02-05 | |
| Set up basic team (gas-dev, frontend, analyst, finance) | Torque | Done | 2026-02-05 | |
| Give PA some personality | Torque | Done | 2026-02-05 | |
| Test-drive PA with a quick task | Dieter | To Do | 2026-02-05 | |
| Get gas-dev moving on the tiered fork first | Dieter | To Do | 2026-02-05 | |
| Explore voice setup | Dieter/Torque | Parked | 2026-02-05 | |
| Pull transcripts and summarize OpenClaw YouTube videos | Torque | To Do | 2026-02-05 | For Torque's Watch List |
| Create a YouTube playlist for Torque's Watch List | Dieter | To Do | 2026-02-05 | |
| Set up Heartbeat | Torque | To Do | 2026-02-05 | |

## Decisions
- Dieter will review budget directly.
- Claw Torque will draft `TEAM.md` for sub-agent structure.
- Dieter wants to keep sub-agent team plan internal for now.
- Budget draft was initially thought to be unfinished, but then confirmed as done.
- Dieter wants an alternative bucket version of the budget, not overwriting the top-down option.
- `BUDGET-2026-BUCKETS.md` will be created as the bottom-up alternative.
- Marketing is USD 70k, annual.
- Finns co-brand: They pay packaging upfront, balance per can on filling, MoQ of 3,500 cases/SKU.
- Dieter's salary: min 75jt/month.
- Sales staff: 1-2 additional, budget 20jt/month.
- Country Lead: 150jt/month THP (parked for now).
- Expense classification audit is a good idea.
- Leaner scope for CRM and Project Viz: Contact Directory (Google Sheets, MVP), Project Viz (Plain Markdown, MVP).
- Hybrid approach for dashboards: Keep Looker for boring stuff, build ONE custom dashboard for personal use, test for a month.
- Build a reusable dashboard kit first, then apply to Candid as a test case.
- Made GitHub repo public for HTML preview.
- Decide on project dashboard navigation: Tabs vs Sidebar vs Hybrid (Option B sidebar recommended by Torque, but left to Dieter).
- Set up basic team with `gas-dev`, `frontend`, `analyst`, `finance` roles.
- Build out the entire matrix in `TEAM.md`, mark as 'available' when ready.
- Go lean on job descriptions (trim `gas-dev` and `pa`).
- Give PA some personality.
- Park voice setup for now.
- Park Torque's voice for later.
- Therapist agent = Scarlett Johansson.
- Pink needs a role.
- Simple YouTube playlist approach for Torque's Watch List.
- Set up Heartbeat ASAP.

## Context/Profile  
- Dedicated agents have their own workspace, model, identity, more setup.
- Proposed starter team: Analyst (Flash/Haiku), Writer (Sonnet), Builder (Sonnet/Flash). Torque (Opus) is the orchestrator.
- Budget for 2026 draft was created (`BUDGET-2026-DRAFT.md`, `budget-data-2026.js`). Base scenario: 9.66B revenue (+75%), 870M net profit (+95%).
- Clawdbot (Automation & Ops, Persistent) -> Torque (orchestrator).
- Claude Cowork (Deep Work, Session-based) -> Sub-agents.
- Chrome Extension (Quick, Ephemeral) -> Ad-hoc spawns for one-offs.
- Customization pieces: `SOUL.md`/`AGENTS.md` (Claude.md), Skills folder (SKILL.md), Memory files (persistent context).
- Obsidian parked for later, vault structure works via symlinks.
- Excel parsing: SharedStrings extracted (839 text values showing P&L structure, SKUs, expense categories). Next step: cracking worksheet XMLs for numbers.
- Dieter has vivid mental blueprints; Torque needs to ask clarifying questions before building.
- `USER.MD` is Dieter's profile. `SOUL.MD` is Torque's profile. `MEMORY.MD` is shared memory.
- Sub-agents are ephemeral; main agent (Torque) persists.
- Can give personality (soul) to customer/Dee-facing agents.
- Current available agents: Torque (Chief of Staff), PA (Personal Assistant), gas-dev (GAS Developer).
- Heartbeat is a periodic "pulse" where OpenClaw wakes me up to check if anything needs attention, controlled by `HEARTBEAT.md`.
- Torque can't "watch" YouTube videos directly but can fetch transcripts/captions, extract frames, get metadata.
- Can create a public/unlisted YouTube playlist for Torque to process.
- MindsetStack templates have a clean style: ring gauges, percentage completion, day columns, task lists with strikethrough, muted green/pink/lavender palettes, all caps for section headers, clean sans-serif. Reproducible in HTML/CSS.
- Looker (Studio) vs Custom HTML dashboards trade-offs discussed. Hybrid approach recommended.
- Reusable dashboard kit created: `dashboard-kit/` with `dashboard-base.css`, `dashboard-components.js`, `template.html`, `README.md`.
- GitHub repo is `dee-CL-2026/torque-workspace`.

## Backlog Ideas
- Share sub-agent team plan with Ryan via group.
- Look at the "reality of Finns" (data).
- Park pixel watch integration for later.
- Random point for discussion later: OpenClaw in smart glasses.
- Finns data.
- Marketing budget clarification ("70k 50k" = ?).
- SKD historical data for MT turnover calibration.
- Your salary target for OpEx.
- Expense classification audit on the roadmap.
- Create starter templates in Google Drive / vault for Contact Directory and Project Viz.
- Explore Gemini web interface or direct API call to Imagen 3 for one-off graphics.
- Share Mindstacks/Claude examples for style analysis.
- Add sketches or notes to `SPEC-project-dashboard.md`.
- Legal/Compliance (overkill for now).
- Product (new SKU development).
- Customer Success (post-sale relationships).
- Add more agents to the team (hr-ga, marketing, customer-success, ops, product, data-eng).
- Explore voice setup (ElevenLabs, default TTS).
- Scarlett Johansson for therapist agent.
- Pink for a role (Marketing?).
- Fancier YouTube Watch List (YouTube Data API, auto-process overnight).

## Done
- Budget draft landed (`BUDGET-2026-DRAFT.md`, `budget-data-2026.js`).
- Created both files: `BUDGET-2026-DRAFT.md` and `budget-data-2026.js`.
- Confirmed files exist and are populated properly.
- Captured new revenue buckets, SKU mix, new SKUs.
- Created `BUDGET-2026-BUCKETS.md` (bottom-up version with gaps flagged).
- Created `budget-data-2026-buckets.js` (companion data file).
- Added note about Modern Trade cases/outlet/month to the doc.
- Noted OpEx side needs work (Headcount, staff costs).
- Noted founder salary is a key input.
- Added pixel watch integration to the list.
- Implemented candid-labs-tiered Phase 1 — full sales_master spoke with lineage tracking.
- Both candid-labs repos pushed to GitHub.
- Spawned sub-agent for CRM scoping (docs/CRM-SCOPE.md ready).
- Spawned sub-agent for Project Management scoping (docs/PROJECT-MANAGEMENT-SCOPE.md ready).
- Marketing numbers fixed in budget docs.
- Both agents (Contact Directory and Project Viz) landed on free, friction-free options.
- Contact Directory → Google Sheets (template ready).
- Project Viz → Plain Markdown (`PROJECTS.md`).
- Both docs saved to `candidlabs/docs/` and committed.
- Built team matrix (`team/TEAM.md`, `team/agents/gas-dev.md`, `team/agents/pa.md`).
- Trimmed `gas-dev.md` and `pa.md` to lean format.
- Added "Dee has vivid mental blueprints. Ask clarifying questions before building." to `USER.md`.
- PA now has a "soul" (personality description).
- Parked voice setup for now.
- Parked Torque's voice for now.
- Therapist agent = Scarlett Johansson (noted).
- Pink needs a role (noted).
- Torque can fetch YouTube transcripts/captions, extract frames, get metadata.
- YouTube playlist idea for Torque's Watch List.
- Heartbeat 101 explanation provided.
