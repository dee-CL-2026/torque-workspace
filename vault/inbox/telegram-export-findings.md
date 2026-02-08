# Telegram Export Findings (Feb 2-7, 2026)

Extracted from: `telegram-export-Claw_Torque-20260207-104121.txt` (17K lines)

---

## Tasks Identified

### Already Completed ✅
| Task | Who | When |
|------|-----|------|
| WhatsApp integration | Torque | Feb 2 |
| Voice transcription (whisper-cli) | Torque | Feb 3 |
| Telegram reactions | Torque | Feb 2-3 |
| Fix "No response requested" bug | Torque | Feb 3 |
| Budget draft from Anders call | analyst | Feb 7 |
| SKU Library (11 SKUs) | gas-dev | Feb 7 |
| Metric data mapping (184 metrics) | analyst | Feb 7 |
| Command Centre v2.0 | frontend | Feb 7 |
| Candid Labs Phase 2 (57/184 metrics) | gas-dev | Feb 7 |
| YouTube watchlist processing (7 videos) | analyst | Feb 7 |
| YOUTUBE-FINDINGS-V2.md | analyst | Feb 7 |
| family/connie.md + family/evie.md profiles | Torque | Feb 7 |

### Pending [desk] Tasks
| Task | Notes |
|------|-------|
| Connect Google calendar | Needs interactive OAuth |
| Connect Outlook calendar | Needs interactive OAuth |
| Set up Obsidian mobile + Git sync | App installed, Git sync needed |
| Set up Brave Search API | Needs card even for free tier |
| Complete Telegram export | In progress - auth issue |
| Fix haiku model for subagents | Need separate API key |
| Debug subagent execution | Sessions created, LLM never fires |

### Pending Tasks (Assigned to Dee)
| Task | Notes |
|------|-------|
| Send 2024-2025 financial data to Anders | From Anders call |
| Ask Ryan for pitch deck + 3 marketing scenarios | From Anders call |
| Follow up: Teddy (KKS) | From Anders call |
| Follow up: PKF (Cheryl) | From Anders call |
| Follow up: Jules (zero cap accounts) | From Anders call |
| Push SKD for sales data + road show data | From Anders call |
| Get Ferry involved in all groups | Internal team |
| Get Finns co-branding contract | For budget data |

### Backlog/Future Tasks
| Task | Who | Notes |
|------|-----|-------|
| Get second SIM for WhatsApp bot | Dee | Dedicated bot number |
| Set up meeting prep automation | secretary | Blocked on calendar |
| Build Family Command Centre | frontend | Chat gateway for kids via email |
| Make Command Centre dynamic | frontend | Live subagent status, tasks.md integration, filters |
| Research GPT/Codex integration | analyst | Can we use existing subscriptions? |

---

## Key Decisions & Rules Established

### SOUL.md Addition
> **"If it ain't broke, don't fix it."** When adding something new, don't change working config. Ask for the missing piece instead of restructuring.

### Communication Rules
- After ANY tool call/spawn → "Done. Ready."
- If processing takes >5 sec → "Working on X..."
- Use reply threading for multiple items
- Never leave Dee wondering

### Task Workflow
- Quick tasks (<30s): Do directly
- Substantial work: Delegate to sub-agent OR mark [downtime]
- Torque = orchestrator, not worker
- Heartbeat checks every 15m

### Memory Rules
- Family details → `family/*.md` (not just MEMORY.md)
- Write before doing (log task first, then work)
- If interrupted, leave breadcrumb file

---

## Family Information

### Connie
- **DOB:** July 26, 2014 (age 11)
- **Interests:** Swimming (#1), music
- **Personality:** High energy, enthusiastic (the jazz-hands waver)
- **Fan of:** Stranger Things
- **File:** `family/connie.md`

### Evie  
- **DOB:** April 7, 2016 (age 9)
- **Interests:** Dogs, marine biology, space
- **Personality:** Thoughtful, curious
- **Birthday countdown:** Built at `/home/dieterwerwath/evie-countdown/`
- **File:** `family/evie.md`

### Sinead (Wife)
- **Role:** Deputy Head at AIS Jakarta
- **Communication style:** Often away from phone during school
- **Joke:** "I am bad, she is worse" at communicating
- **Passport:** Expires March 2026 - NEEDS RENEWAL

---

## WhatsApp Groups Configured

| Group | JID | Mode |
|-------|-----|------|
| It's All Torque (Sinead) | 120363426498709975@g.us | requireMention: true |
| Pizza, Pasta & Prosecco! (Italy trip) | 120363405855089822@g.us | requireMention: true |
| AI Agent (Zenon intro) | 120363425049345077@g.us | requireMention: true |

---

## Technical Issues Discovered

### Subagent Problem (CRITICAL)
- Sessions get created, model gets applied
- LLM never actually fires (0 tokens every time)  
- "Completed" work was Torque doing it directly, not subagents
- **Status:** Unresolved, need Discord help

### Model Allowlist Issue
- MAX OAuth token ONLY authorizes Opus
- Haiku/Sonnet fail with "model not allowed"
- Need separate pay-per-use API key for cheaper models
- Workaround: Everything runs on Opus (expensive)

### Token Spike
- 25% of 5hr limit used in 30 mins (Feb 7)
- Caused by: All work through main session + heavy debugging
- Fix: Get subagents working to delegate

---

## Project Ideas Mentioned (Backlog ~100)

### Active/Priority
- TSLC (The Shoeless Life Coach) - coaching/lifestyle concept
- SuperheroNinjaPirate - born from Jakarta flooding story
- Family Command Centre - watchlist, reading list, activities, chat gateway

### Mentioned but Parked
- Character development platform
- Private poker app (replace Pokerrrr2)
- Betting analytics bot (had working edge)
- Park Run Indonesia
- Yoga app / Stretching studio concept

---

## YouTube Video Findings (from YOUTUBE-FINDINGS-V2.md)

### Top Priority Items
1. **Email integration** - Google Workspace OAuth, Gmail triage
2. **Morning briefings** - Daily summary at 8am
3. **Scope→Build→Ship** - Overnight build cycle pattern
4. **Daily idea generator** - One fresh idea each morning
5. **Cost guardrails** - One person hit $120 runaway

### Quotes to Remember
- "Scope work before bed → Agent builds overnight → Ship as PR → Morning review"
- "$120 disaster story" - need cost monitoring

---

## Files Created During This Period

### Workspace Structure
- `tasks.md` - Active task tracking
- `tasks-done.md` - Completed archive  
- `HEARTBEAT.md` - Heartbeat rules (rewritten)
- `YOUTUBE-FINDINGS-V2.md` - Video analysis

### Candid Business
- `candid/BUDGET-DRAFT.md` - From Anders call
- `candid/SKU-LIBRARY.md` - 11 SKUs mapped
- `candid/METRIC-DATA-MAPPING.md` - 184 metrics
- `candid/cockpit.html` - Dashboard (5 Phase 1 metrics)

### Team Structure
- `team/TEAM.md` - Full org roster
- `team/agents/analyst.md` - Job description
- `team/agents/secretary.md` - Job description + meeting prep

### Family
- `family/connie.md` - Updated with details
- `family/evie.md` - Updated with details
- `family/ais-calendar-2026.md` - School calendar

---

## Action Items for Today (Feb 7)

### Immediate
1. ✅ Process this Telegram export
2. Complete Telegram API export (in progress)
3. Fix haiku model configuration

### Desk Session Needed
4. Brave Search API setup (card required)
5. Google/Outlook calendar OAuth
6. Debug subagent execution

### Later
7. Update tasks.md with any new items from this export
8. Clean up duplicates between this and existing tasks

---

*Processed: 2026-02-07*
