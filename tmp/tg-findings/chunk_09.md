## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Get pay-per-use API key from console.anthropic.com | Dieter Werwath | Pending | 2026-02-07 | Needed for Haiku/Sonnet access |
| Handle config for new API key (with approval) | Claw Torque | Pending | 2026-02-07 | Once key is provided by Dieter |
| Grab an API key from console.anthropic.com | Dieter Werwath | Pending | 2026-02-07 | When at desk |
| Save Mission Control Guide to workspace | Claw Torque | Done | 2026-02-07 | Saved to `docs/reference/mission-control-guide.md` |
| Add WORKING.md template | Claw Torque | Done | 2026-02-07 | Created `memory/WORKING.md` |
| Draft daily standup cron | Claw Torque | Done | 2026-02-07 | Drafted at `docs/reference/daily-standup-cron.md` |
| Create API Key at console.anthropic.com | Dieter Werwath | Pending | 2026-02-07 | Speedrun steps provided |
| Revert auth to safe state | Claw Torque | Pending | 2026-02-07 | If needed to restore main session |
| Post question in Discord about config | Claw Torque | Pending | 2026-02-07 | For expert eyes on model not allowed issue |
| Look into whether OpenClaw supports different auth configs per agent/subagent | Claw Torque | Pending | 2026-02-07 | Research needed |
| Reorder auth: MAX first, API second | Claw Torque | Pending | 2026-02-07 | For proper model routing |
| Change subagent model: Opus → Haiku | Claw Torque | Pending | 2026-02-07 | For cheaper subagent operations |
| Restart gateway | Claw Torque | Pending | 2026-02-07 | After config changes |
| Mark sub-agent tasks as blocked | Claw Torque | Done | 2026-02-07 | To prevent expensive Opus spawns overnight |
| Debug subagent execution | Claw Torque | Done | 2026-02-08 | Identified as timing issue, now working |
| Set up a basic morning briefing cron | Claw Torque | Done | 2026-02-08 | Will provide daily briefings |
| Review what Claw Torque can do directly without subagents | Claw Torque | Pending | 2026-02-08 | Proactive work rotation |
| Reassign research tasks to Claw Torque | Claw Torque | Done | 2026-02-08 | Can do via web search |
| Actually work during heartbeats | Claw Torque | Done | 2026-02-08 | Instead of just checking |
| Update HEARTBEAT.md to be less passive | Claw Torque | Done | 2026-02-08 | |
| Validate task currency before surfacing | Claw Torque | Done | 2026-02-08 | Lesson learned from Sinead's passport |
| Research Gemini API setup steps | Claw Torque | Pending | 2026-02-08 | To integrate Gemini for subagents |
| Inventory subscriptions | Claw Torque | Pending | 2026-02-08 | To understand all available AI services |
| Research API access for each subscription | Claw Torque | Pending | 2026-02-08 | Determine models, limits, authentication |
| Configure OpenClaw with all available providers | Claw Torque | Pending | 2026-02-08 | Set up routing for main and subagents |
| Document OpenClaw configuration | Claw Torque | Pending | 2026-02-08 | Create clear guide for knowledge retention |
| Get Gemini API key from aistudio.google.com | Dieter Werwath | Done | 2026-02-08 | Key obtained |
| Add Gemini API key to OpenClaw config | Claw Torque | Pending | 2026-02-08 | Once key is provided |
| Switch subagents to Gemini Flash | Claw Torque | Pending | 2026-02-08 | For free tier usage |
| Add Google to the auth order | Claw Torque | Pending | 2026-02-08 | To allow Gemini models |
| Set `api` field for Google provider | Claw Torque | Pending | 2026-02-08 | Specify API type |
| Ask Discord if multi-provider subagents are supported | Claw Torque | Pending | 2026-02-08 | Due to OpenClaw blocking non-Anthropic models |

## Decisions
*   **Mission Control Tables:** Use 6 tables: agents, tasks, messages, activities, documents, notifications.
*   **Our Equivalent (Files):** `tasks.md`, `team/agents/*.md`, `memory/*.md`.
*   **SOUL Personalities:** Constraints focus agents.
*   **Memory Stack (4 layers):** Session (JSONL), Working (WORKING.md), Daily (memory/YYYY-MM-DD.md), Long-term (MEMORY.md).
*   **Heartbeat Frequency:** 15 minutes (sweet spot).
*   **Golden Rule:** "If you want to remember something, write it to a file. Mental notes don't survive."
*   **Agent Levels:** Intern (needs approval), Specialist (independent), Lead (full autonomy).
*   **Lessons Learned:** Start smaller (1->10 too fast), cheaper models for routine work, memory is hard (files > mental notes), let agents surprise you.
*   **Telegram Export Strategy:** Replace is cleaner (avoids duplicate handling).
*   **Recommendation for Subagent Models:** Do both Gemini API (free primary) and Anthropic Haiku (pay-as-you-go fallback).
*   **Immediate action for current config:** Wait until tomorrow for desktop access to avoid breaking mobile access. (Reverted)
*   **Overnight spawns:** Mark sub-agent tasks as blocked to prevent expensive Opus spawns. (Actioned)
*   **Morning Briefings:** Will be done daily now.
*   **Heartbeat Improvement:** Will involve proactive work rotation and direct handling of Torque tasks.
*   **Sinead's Passport:** Removed from tasks as already renewed.

## Context/Profile
*   **SOUL System:** Matches existing, coordination layer is level-up.
*   **Mission Control:** 6 tables (agents, tasks, messages, activities, documents, notifications).
*   **Our Equivalent Files:** `tasks.md`, `team/agents/*.md`, `memory/*.md`. Missing `WORKING.md`.
*   **Agent CLI Interaction:** `npx convex run tasks:update`, `npx convex run messages:create`.
*   **SOUL Personalities:** Constraints focus agents (e.g., skeptical tester).
*   **Memory Stack:** Session (JSONL), Working (WORKING.md), Daily (memory/YYYY-MM-DD.md), Long-term (MEMORY.md). `WORKING.md` is a recognized gap.
*   **Heartbeat Checklist:** Load context, check urgent, scan activity, act or HEARTBEAT_OK.
*   **Heartbeat Why 15 min:** 5 min too expensive, 30 min too slow.
*   **Golden Rule:** If you want to remember something, write it to a file. Mental notes don't survive.
*   **@Mentions Delivery:** Daemon polls every 2 sec, delivers on next heartbeat.
*   **The Squad (10 specialized agents):**
    *   Jarvis: Squad Lead (Coordinator, primary interface)
    *   Shuri: Product Analyst (Skeptical tester, edge cases)
    *   Fury: Customer Researcher (Deep research, receipts)
    *   Vision: SEO Analyst (Keywords, search intent)
    *   Loki: Content Writer (Craft, Oxford comma)
    *   Quill: Social Media (Hooks, build-in-public)
    *   Wanda: Designer (Visuals, infographics)
    *   Pepper: Email Marketing (Drip sequences)
    *   Friday: Developer (Clean code)
    *   Wong: Documentation (Keeps nothing lost)
*   **Agent Levels:** Intern, Specialist, Lead.
*   **Daily Standup (11:30 PM):** Automated accountability with statuses (COMPLETED, IN PROGRESS, BLOCKED, NEEDS REVIEW, KEY DECISIONS).
*   **Thread Subscriptions:** Interact with task = auto-subscribed to comments.
*   **Task Flow Example:** Vision does keywords → Fury adds intel → Shuri tests → natural collaboration.
*   **Lessons Learned:** Start smaller, use cheaper models for routine work, files for memory, let agents surprise you.
*   **Where we are vs. Bhanu's setup:**
    *   SOUL.md: ✅ Bhanu, ✅ Us
    *   HEARTBEAT.md: ✅ Bhanu, ✅ Us
    *   Task system: Convex DB (Bhanu), tasks.md ✅ Us
    *   WORKING.md: ✅ Bhanu, ❌ Gap Us
    *   Daily standup: Automated (Bhanu), ❌ Gap Us
    *   Cheaper heartbeat model: ✅ Bhanu, ❌ Blocked Us
    *   Agent-to-agent comms: @mentions (Bhanu), sessions_send (broken) Us
*   **The real secret:** Treat AI agents like team members.
*   **MAX Subscription:** Opus only via API, separate API key needed for Haiku/Sonnet.
*   **API Key Creation (Anthropic):** console.anthropic.com.
*   **OpenClaw Config:**
    *   Auth profiles with `provider`, `mode`, `apiKey`.
    *   Subagents model setting.
*   **Sessions.json:** Can cause issues if deleted while gateway is running.
*   **Auth Order:** Global fallback chain, not per-agent.
*   **Claude MAX:** $100/month, API access only for Opus.
*   **ChatGPT Plus:** $20/month, web only (API separate).
*   **Gemini Advanced:** $20/month, web only (Google AI Studio has free tier API).
*   **Connie:** July 26, 2014, swimming + music, Stranger Things, high energy.
*   **Evie:** April 7, 2016, dogs, marine biology, space.
*   **Sinead's passport:** Expires March 2026 (outdated information).
*   **WhatsApp groups:** 3 configured (Sinead, Italy trip, Zenon), DoIT FC added as silent monitor.
*   **Subagent Execution Issue:** Was a timing issue, now resolved.
*   **Cost for 9,931 tokens:** ~$0.01-0.02 on Opus, ~$0.0002 on Haiku.
*   **Gemini for Subagents:** Configured but not authorized (no token stored). Needs API key from Google AI Studio. Free tier: 15 RPM, 1M tokens/day.
*   **Gemini Free Tier Quota:** Can be exhausted. `gemini-2.5-flash` found to be working.
*   **OpenClaw limitation:** Internal blocking of non-Anthropic models for subagents.

## Backlog Ideas
*   Improve heartbeat mechanism to be more proactive.
*   Implement morning reports.
*   Debug the "model not allowed" issue for non-Anthropic subagent models.
*   Research multi-provider subagent support in OpenClaw.
*   Explore OpenClaw Copilot for browser relay functionality.
*   Set up Brave Search API.
*   Connect Google calendar.
*   Connect Outlook calendar.
*   Set up Obsidian mobile + Git sync.
*   Set up meeting prep automation.
*   Research GPT/Codex integration options.
*   Analyze YouTube: Command Centre patterns.
*   Make Command Centre dynamic.
*   Build Family Command Centre.
*   Get second SIM for WhatsApp bot.
*   Implement acknowledgment of message receipt and task start.

## Done
*   Read `tmp/tg-chunks/chunk_09`.
*   Saved Mission Control Guide to `docs/reference/mission-control-guide.md`.
*   Created `memory/WORKING.md` template.
*   Removed duplicate Brave Search task.
*   Added "Get Anthropic API key" task.
*   Drafted daily standup cron at `docs/reference/daily-standup-cron.md`.
*   Saved config patch for subagents to `docs/reference/config-patch-subagents.json`.
*   Added DoIT FC as a silent monitor.
*   Marked sub-agent tasks as blocked to prevent overnight Opus spawns.
*   Performed a Morning Briefing.
*   Updated HEARTBEAT.md to be less passive.
*   Debugged and confirmed subagents are working (timing issue resolved).
*   Removed Sinead's passport renewal task (already done).
*   Obtained Gemini API key.
*   Tested Gemini API with `gemini-2.5-flash` successfully via `curl`.
*   Identified that OpenClaw is internally blocking non-Anthropic models for subagents.