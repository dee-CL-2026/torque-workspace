## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Token usage tracking for Command Centre | frontend | medium | 2026-02-05 | Add to Command Centre |
| Watch button shortcut research | analyst | low | 2026-02-05 | |
| Deploy tiered fork to GAS | gas-dev | high | 2026-02-05 | |
| YouTube deep-dive + prompt patterns | yt-deep-dive | In Progress | 2026-02-05 | Agent spawned |
| Zoom transcript flow research | zoom-research | In Progress | 2026-02-05 | Agent spawned |
| WhatsApp history export scoping | whatsapp-research | In Progress | 2026-02-05 | Agent spawned |
| Audit Drive, create sensible structure, and consolidate | Secretary | To Do | 2026-02-05 | |
| Spec out a "knowledge layer" architecture | Torque | To Do | 2026-02-05 | |
| Remind about Obsidian UI | Torque | To Do | 2026-02-06 | After 12pm |
| Search for YouTube videos by title and presenter | Secretary | To Do | 2026-02-05 | If not found via research agent |
| Process YouTube watchlist | Research Agent | In Progress | 2026-02-05 | Overnight |
| Triage interesting links from Google discovery feed into `vault/openclaw-ecosystem.md` | Torque | To Do | 2026-02-05 | |
| Prep GAS validation checklist | Torque | To Do | 2026-02-05 | For Candid-labs-tiered push |
| Set up scheduled messages in family group chat | Torque | To Do | 2026-02-05 | Cron jobs |
| Draft daily value-add idea | Torque | To Do | 2026-02-05 | Rotates across Candid / Good Doctor / personal / family |
| Implement "Build and ship something new every night" | Torque | To Do | 2026-02-05 | Start small (research docs, specs) → grow into actual tools |
| Get an email address for Torque | Dieter | To Do | 2026-02-05 | Candid or personal |

## Decisions
- Parked the watch trigger for tonight due to stubborn bugs and late hour.
- Verified Tasker→Telegram flow works before wrestling with watch trigger.
- Skipped tile configuration for now and focused on Tasker→Telegram.
- Decided to set up a button that sends a test command (`torque test from watch`).
- Chose Option B (Static HTML dashboard) for Command Centre visibility.
- Decided to use card-based modular HTML blocks for Command Centre.
- Added Secretary to the agent matrix.
- Decided to use WhatsApp directly from the watch for messaging Torque.
- Pinned the self-chat in WhatsApp on the phone to appear at the top on the watch.
- Decided to leave the Gateway restart until morning.
- To consider Candid address for business automation email, personal for personal.
- To introduce Claw Torque as the "upgraded, actually-helpful" version of Sinead's holiday GPT experiment, with personality.
- To follow family chat rules: helpful first, cheeky second; light roasts only, never mean; actually track kids' stuff; be neutral party when needed.

## Context/Profile
- Dieter is getting into complex screens and finds it exciting.
- Dieter had a typo when entering the Telegram API body.
- Claw Torque notes Telegram API is forgiving about content type.
- Gemini is intercepting voice commands on Dieter's watch.
- Pixel Watch has limited button mapping customization.
- AutoWear app on Dieter's phone opens directly to Tasker.
- The Tasker→Telegram message sending is confirmed working.
- The AutoWear-to-watch connection is proving difficult.
- Dieter wants a watch solution that avoids complex app setups.
- Claw Torque emphasized checking obvious solutions first.
- Dieter works at his desk with local files.
- Claw Torque's session context is at 72% usage.
- Claw Torque lacks access to historical token usage aggregates.
- Claw Torque needs Brave API for robust transcript extraction.
- Dieter is "NOT a big socmed guy at all!".
- Dieter's YouTube history is heavily influenced by his kids' viewing.
- Dieter's Chromebook is experiencing performance issues.
- Obsidian UI is "janky" on Dieter's Chromebook via Flatpak.
- Dieter occasionally sees OpenClaw-related repos in his Google discovery feed.
- Dieter perceives his interactions with agents as evolved beyond "classic" prompts.
- Dieter is interested in building agents for web navigation (scrapers).
- Dieter has a strong memory for file names, despite files being disorganized across various drives.
- Dieter is enthusiastic about exploring Obsidian's linking capabilities.
- Dieter initially forgot Obsidian was a standalone application.
- Dieter is planning to initiate a group chat with Sinead and Torque.
- Sinead has an "aversion to WA" (WhatsApp).
- Sinead previously created a sarcastic custom GPT for her work trip and kids' activities.
- Dieter describes their relationship dynamic: Sinead as "the drama teacher," himself as "the drama queen."
- Dieter considers himself a "perfectionist" and "never wrong (EVER)".
- Dieter has "OCD/isms".
- Sinead is not allowed to comment on Dieter's driving as she hasn't passed her test.
- Sinead has been forewarned about Claw Torque's arrival.
- Sinead's typical schedule is 7 AM to 4 PM at school, with a 6 AM alarm (and snoozes).
- Sinead completed a triathlon with Dieter, who beat her despite less training.
- Sinead has recently started F45 training (after Dieter introduced her, then quit) and strongly encourages Dieter to resume training.
- Sinead expresses genuine concern about Dieter's work-life balance, stating "It's not sustainable my babes."
- Claw Torque understands Dieter's approach: building working MVPs, iterating, and avoiding overthinking.
- Claw Torque recognized the need for a separate "Secretary" agent role for bulk processing.
- Claw Torque confirmed the existence of Dieter's NotebookLM & Gemini Gems documents.
- Claw Torque identified the core principle from Dieter's documents: NotebookLM for truth, Gemini Gems for action.

## Backlog Ideas
- Usage tracking dashboard for Command Centre.
- "It's All Torque" podcast/blog concept, detailing the project journey.
- Recreating NotebookLM-style capabilities (without the full studio).
- Secretary agent to audit, structure, and consolidate files across Dieter's drives.
- Implementing a Cloudflare tunnel.
- Developing a scraper agent for: Precoro auto-approvals (up to a value), Teams approvals, and Zoom summary → email flow.
- Creating an `vault/openclaw-ecosystem.md` file to triage interesting OpenClaw-related links from Google discovery feed.

## Done
- Team matrix built (staff roster).
- PA and gas-dev agents ready to spawn.
- Heartbeat enabled (30 min interval).
- Task system structure (data/tasks.json) established.
- YouTube watchlist workflow implemented.
- Metric mapping completed (184 metrics, 78% coverage).
- Dashboard kit created.
- Command Centre specification outlined.
- NOTES-TO-SELF system initiated.
- SSH research completed.
- Tasker→Telegram message sending functionality confirmed.
- Command Centre live dashboard deployed to GitHub Pages ([https://dee-cl-2026.github.io/torque-workspace/](https://dee-cl-2026.github.io/torque-workspace/)).
- Three research agents deployed for YouTube deep-dive, Zoom transcript flow, and WhatsApp history export scoping.
- Secretary agent added to the agent matrix.
- `vault/architecture/KNOWLEDGE-LAYER.md` created with wiki links.
- YouTube videos retrieved and added to watchlist.
- Research agent deployed to gather YouTube video summaries (results in `vault/youtube-summaries-2026-02-06.md`).
- Backlog updated with 6 new tasks (task-004 through task-009).
- Reminder set for tomorrow after 12pm to explore Obsidian + Knowledge Layer document.
- Nudge set for 12:30 AM and a hard stop for 1 AM.
- "It's All Torque" podcast/blog idea logged in `IDEAS.md`.
- Sinead's profile updated with schedule, triathlon, F45 activities, and fitness return campaign details.
