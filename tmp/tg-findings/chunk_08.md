
## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Debug subagent execution | Dieter Werwath / Claw Torque | In Progress | 2026-02-07 | Needs debugging at desk; potential bug in OpenClaw 2026.2.1 or config issue |
| Look into WA config | Dieter Werwath / Claw Torque | Done | 2026-02-07 | Addressed over-engineering, found JID for "Pizza, Pasta & Prosecco!" |
| Get free API key from brave.com/search/api/ and store it via `openclaw configure --section web` | Dieter Werwath | To Do | 2026-02-07 | Needs credit card for free plan |
| Update OpenClaw (2.1 → 2.3-1) | Dieter Werwath / Claw Torque | To Do | 2026-02-07 | `openclaw update` followed by gateway restart |
| Research GPT/Codex integration options | Analyst | In Progress | 2026-02-07 | Spawned on haiku |
| Analyze YouTube: Command Centre patterns | Analyst | In Progress | 2026-02-07 | Spawned on haiku |
| Make Command Centre dynamic (frontend) | Frontend | In Progress | 2026-02-07 | Updated requirements: Live subagent status panel, tasks.md integration, desk/mobile filter, Rate limit HUD (pending OMC research), quick access links, links to files created when tasks are complete |
| OMC HUD analysis | Analyst | In Progress | 2026-02-07 | Spawned on haiku |
| Set up Telegram export | Dieter Werwath | Done | 2026-02-07 | Exported 1,738 messages |
| Meeting prep workflow | Secretary | To Do | 2026-02-07 | Blocked on calendar integration |
| Calendar integration | Dieter Werwath | To Do | 2026-02-07 | Desk task |
| Add pay-per-use API key for cheaper models | Dieter Werwath | To Do | 2026-02-07 | For subagents using Sonnet/Haiku |

## Decisions
- **Task list workflow:** Tasks are checked every 15 minutes on heartbeat. Tasks are assigned when processing the list, not when added.
- **Researcher vs Analyst:** Both roles are the same; "analyst" is preferred for its specificity.
- **Model allowlist:** The current setup (aliases for haiku, sonnet, opus, flash) will be maintained. GPT/Codex will be added to config when needed. Anthropic and Google models are currently allowed. OpenAI will be added when needed.
- **Telegram export method:** Recommended to export chat history via the Telegram app (Settings → Advanced → Export Telegram data).
- **Task tagging:** `[desk]` for tasks requiring physical keyboard/terminal/interactive auth, `[mobile]` for tasks doable from a phone, and no tag for tasks that can be done anywhere.
- **Command Centre filter:** A filter toggle for `[desk]` and `[mobile]` tasks makes sense.
- **Subagent model issue:** It was discovered that the MAX subscription OAuth token only allows Opus, not Haiku or Sonnet. Subagents will run on Opus for now.
- **Token burn:** The `maxConcurrent` setting will be reduced from 12 to 8.
- **Brave web search:** Brave is the default and best free option for OpenClaw's `web_search` tool, offering 2,000 queries/month on its free tier. It requires an API key.
- **Multi-model auth for subagents:** Decided to ask on OpenClaw Discord for a supported way to use MAX OAuth for the main session and a separate API key for subagents (to enable cheaper models like Haiku/Sonnet).
- **Family details storage:** Family details (e.g., Connie, Evie) will be added to individual markdown files in the `family/` folder (e.g., `family/connie.md`) rather than just `MEMORY.md`.

## Context/Profile
- **Dieter Werwath:** Chromebook user. Has a MAX subscription for Claude.ai. Father of Connie and Evie. Uses Telegram and WhatsApp. Experiencing high token usage and subagent issues. Needs to set up Brave API key.
- **Claw Torque (the agent):** Checks task list on heartbeat every 15 minutes. Assigns tasks during processing. Uses "analyst" and "researcher" interchangeably. Has a "secretary" role defined. Can do voice storytelling. Has access to family calendar data. Can use `web_search` (needs Brave API key). Previously experienced subagent failures and communication issues, which have been addressed. Can use reply threading in messages. Uses `whisper-cli` for voice transcription.
- **Connie:** Born July 26, 2014 (11, turning 12 soon). Loves swimming and music. Fan of Stranger Things. Described as having high energy.
- **Evie:** Born April 7, 2016 (9, turning 10 soon). Loves dogs. Aspires to be a marine biologist. Also likes space. Described as the "chill" and "thoughtful" one.
- **OpenClaw Environment:** `telegram-desktop` and `Telethon` (Python library for Telegram API) are installed. `whisper-cli` is confirmed working for voice transcription. Subagents were failing due to MAX subscription OAuth token not allowing Haiku/Sonnet models, only Opus.
- **WhatsApp Groups:** "Pizza, Pasta & Prosecco!" (JID: `120363405855089822@g.us`, `requireMention: true`) and "AI Agent" (JID: `120363425049345077@g.us`).
- **Family Calendar:** `family/ais-calendar-2026.md` contains school term dates and bank holidays.

## Backlog Ideas
- **Command Centre Enhancements:**
    - Implement a live subagent status panel.
    - Integrate `tasks.md` directly into the Command Centre.
    - Add a filter for `[desk]` and `[mobile]` tasks.
    - Implement a rate limit HUD (pending OMC research).
    - Add quick access links (high usage).
    - Add links to files created when tasks are complete.
- **Secretary Role Automation:**
    - Develop a meeting prep workflow.
    - Implement automation ideas such as a morning briefing cron job and an evening prep reminder.
- **Family Command Centre:** Create a chat gateway feature allowing Torque to chat with kids (Connie and Evie) via email with guardrails.
- **Model Cost Optimization:** Explore options for accessing cheaper models (Sonnet, Haiku, Gemini) for subagents while maintaining MAX subscription Opus for the main session. This likely requires configuring a separate pay-per-use API key.
- **OMC HUD Integration:** Implement the "Oh My Claude" (OMC) HUD functionality on the Command Centre to show live session limit status.

## Done
- Added 3 tasks to `tasks.md`: Research GPT/Codex integration options (analyst), Analyze YouTube: Command Centre patterns (analyst), Make Command Centre dynamic (frontend).
- Created the `scripts/telegram-export.py` script.
- Added "Set up Telegram export" to `tasks.md` with a `[desk]` tag.
- Spawned analyst tasks for GPT/Codex research, YouTube Command Centre patterns, and OMC HUD analysis.
- Created `team/agents/secretary.md` with meeting prep workflow, briefing format, and automation ideas.
- Confirmed the Telegram security alert (Dieter tapped "Yes, it's me").
- Confirmed `telegram-desktop` is installed.
- Confirmed `whisper-cli` is working for voice transcription after initial issues.
- Updated `family/connie.md` with Connie's birthday, interests, and personality.
- Added Evie's profile details (birthday, interests, aspirations).
- Reverted config changes related to WhatsApp (`groupPolicy: open`) that caused over-engineering.
- Added a lesson learned ("If it ain't broke, don't fix it") to `SOUL.md`.
- Successfully identified the JID for the "Pizza, Pasta & Prosecco!" WhatsApp group and added it to the config with `requireMention: true`.
- Restarted the gateway after WhatsApp config changes.
- Summarized the `family/ais-calendar-2026.md` content (term dates, breaks, holidays).
- Exported the full Telegram chat history (1,738 messages) to JSON and text formats.
- Attempted to switch to Sonnet model, which resulted in a crash and auth issues.
- Fixed authentication by regenerating an OAuth token via `claude setup-token` and configuring it.
- Diagnosed the subagent issue: MAX subscription OAuth token only allows Opus, not Haiku/Sonnet.
- Changed subagent model to Opus, confirming subagents are now working.
- Confirmed both test subagents completed successfully.
- Added the "AI Agent" WhatsApp group to the config.
