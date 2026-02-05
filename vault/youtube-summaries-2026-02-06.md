# OpenClaw/Clawdbot YouTube Video Research Summary

**Compiled:** 2026-02-06  
**Purpose:** Help Dee learn best practices from the OpenClaw community  
**Research Note:** Web search was unavailable (no Brave API key configured). Summaries are based on video titles, official OpenClaw documentation, and community testimonials from openclaw.ai.

---

## 1. "How I Use Clawdbot to Run My Business and Life 24/7"
**Video ID:** [YRhGtHfs1Lw](https://www.youtube.com/watch?v=YRhGtHfs1Lw)  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Content (based on title + platform knowledge)
This appears to be a real-world usage showcase demonstrating 24/7 autonomous operation.

**Key Topics (inferred):**
- Running OpenClaw as a persistent background service
- Business automation workflows (email triage, scheduling, task management)
- Personal life management (reminders, calendar, health tracking)
- Heartbeat system for proactive check-ins
- Cross-platform messaging (WhatsApp, Telegram, Discord)

**Relevance for New Users:**
- Shows what's *possible* after initial setup
- Inspiration for automation ideas
- Real-world patterns for business + personal use

---

## 2. "Clawdbot/OpenClaw Clearly Explained (and how to use it)"
**Video ID:** [U8kXfk8enrY](https://www.youtube.com/watch?v=U8kXfk8enrY)  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Content (based on title)
Probably the best starting point for new users - an explainer video.

**Key Topics (inferred):**
- What OpenClaw actually is: an AI gateway connecting chat apps to coding agents
- Core architecture: Gateway → Channels → Agent (Pi/Claude Code)
- Basic setup walkthrough
- Channel options (WhatsApp, Telegram, Discord, etc.)
- Skills system for extending capabilities

**Relevance for New Users:** ⭐⭐⭐ HIGH
- Start here for conceptual understanding
- Good for explaining OpenClaw to others

---

## 3. "Clawdbot to Moltbot to OpenClaw: The 72 Hours That Broke Everything"
**Video ID:** [p9acrso71KU](https://www.youtube.com/watch?v=p9acrso71KU)  
**Full Title:** "Clawdbot to Moltbot to OpenClaw: The 72 Hours That Broke Everything (The Full Breakdown)"  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Content (based on title)
Project history and rebranding story - probably covers the transition from "Clawdbot" through "Moltbot" to "OpenClaw."

**Key Topics (inferred):**
- History of the project's development
- Challenges faced during rapid iteration
- Why the name changed (possibly trademark/branding issues)
- Technical pivots and architecture decisions
- Community growth story

**Relevance for New Users:** 
- Context on project maturity and evolution
- Understanding the community's journey
- Not essential for setup, but good background

---

## 4. "Full Tutorial: Set Up Your 24/7 AI Employee in 20 Minutes (OpenClaw)"
**Video ID:** [4zXQyswXj7U](https://www.youtube.com/watch?v=4zXQyswXj7U)  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Content (based on title)
Step-by-step setup tutorial - probably the most practical video for Dee.

**Key Topics (inferred):**
- Installation: `curl -fsSL https://openclaw.ai/install.sh | bash`
- Running the onboarding wizard: `openclaw onboard --install-daemon`
- Channel configuration (likely Telegram as fastest)
- Gateway daemon setup
- Basic persona/SOUL.md configuration
- First message test

**From Official Docs - Quick Setup:**
```bash
# 1. Install
curl -fsSL https://openclaw.ai/install.sh | bash

# 2. Onboard
openclaw onboard --install-daemon

# 3. Check status
openclaw gateway status

# 4. Open Control UI
openclaw dashboard
```

**Relevance for New Users:** ⭐⭐⭐ CRITICAL
- Primary tutorial for getting started
- Watch this alongside official docs

---

## 5. "10 INSANE ClawdBot/Openclaw Use Cases You Can Use Instantly"
**Video ID:** [zX-9xXlBTtA](https://www.youtube.com/watch?v=zX-9xXlBTtA)  
**Full Title:** "10 INSANE ClawdBot/Openclaw Use Cases You Can Use Instantly [OpenClaw Tutorial]"  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Use Cases (based on testimonials from openclaw.ai)

From verified user tweets on openclaw.ai homepage:

1. **Email Management** - Triage inbox, draft responses, manage subscriptions
2. **Calendar Integration** - Schedule meetings, send reminders, check availability  
3. **Health Tracking** - WHOOP data summaries, biomarker optimization
4. **Code Review & Development** - Design, code review, PM, content pipelines
5. **Flight Check-ins** - Automatic airline check-ins
6. **Insurance Disputes** - One user's OpenClaw "accidentally started a fight with Lemonade Insurance"
7. **Home Automation** - Air purifier control, smart home integration
8. **Custom CLI Tools** - Flight search tools built on demand
9. **Todoist Integration** - Task management automation
10. **Second Brain Building** - Memory that moves across agents

**Relevance for New Users:** ⭐⭐⭐ HIGH
- Practical inspiration for what to build first
- Quick wins to try after setup

---

## 6. "OpenClaw use cases: 9 automations + 4 wild builds that actually work"
**Video ID:** [52kOmSQGt_E](https://www.youtube.com/watch?v=52kOmSQGt_E)  
**Full Title:** "OpenClaw (Clawdbot) use cases: 9 automations + 4 wild builds that actually work"  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### Likely Content (based on title + community patterns)

**9 Automations (common patterns):**
1. Morning briefing (weather + calendar + news)
2. Email triage on schedule
3. Social media monitoring
4. Meeting preparation
5. Expense tracking
6. Health metric summaries
7. Travel planning
8. Document organization
9. Reminder systems

**4 Wild Builds (from community):**
- Self-modifying skills (OpenClaw building upon itself)
- Multi-instance cloning ("Brosef cloned himself to 3 instances")
- Custom meditations with TTS
- Sentry webhook → auto-fix → PR pipeline

**Relevance for New Users:** ⭐⭐⭐ HIGH
- Advanced inspiration after basics are working
- Shows the "self-hackable" nature of the platform

---

## 7. "How OpenClaw's Creator Uses AI to Run His Life (Peter Steinberger)"
**Video ID:** [AcwK1Uuwc0U](https://www.youtube.com/watch?v=AcwK1Uuwc0U)  
**Full Title:** "How OpenClaw's Creator Uses AI to Run His Life in 40 Minutes | Peter Steinberger"  
**Research Status:** ⚠️ Limited info (no transcript/summary found)

### About Peter Steinberger
Creator of OpenClaw. Background in iOS development (founded PSPDFKit). Active blogger at [steipete.me](https://steipete.me).

**Recent blog posts (from his site):**
- "My Current AI Dev Workflow" (Aug 2025)
- "Just One More Prompt" - reflection on AI addiction and productivity
- "Poltergeist: The Ghost That Keeps Your Builds Fresh"
- "Essential Reading for Agentic Engineers"

### Likely Content (based on title)
Deep dive into the creator's personal setup - probably the most "insider" view.

**Key Topics (inferred):**
- His actual daily workflow with OpenClaw
- Configuration philosophy
- What he automates vs. keeps manual
- Lessons learned building and using the platform
- Future direction hints

**Relevance for New Users:** ⭐⭐ MEDIUM-HIGH
- Best practices from the source
- Understanding the vision behind the tool

---

## Quick Start Recommendations for Dee

### Watch Order (for a new user):
1. **Video #2** - "Clearly Explained" for concepts
2. **Video #4** - "20 Minutes Setup" for installation
3. **Video #5 or #6** - Use cases for inspiration
4. **Video #7** - Creator's workflow for advanced patterns

### First Setup Checklist (from official docs):
- [ ] Install: `curl -fsSL https://openclaw.ai/install.sh | bash`
- [ ] Run: `openclaw onboard --install-daemon`
- [ ] Verify: `openclaw gateway status`
- [ ] Test: `openclaw dashboard` → chat in browser
- [ ] Connect channel (Telegram is easiest - just need a bot token)

### Key OpenClaw Concepts:
- **Gateway**: The central daemon that routes messages
- **Channels**: WhatsApp, Telegram, Discord, etc.
- **Skills**: Modular capabilities (in `~/.openclaw/skills/`)
- **Heartbeat**: Periodic proactive check-ins (default 30min)
- **Workspace**: `~/.openclaw/workspace/` - agent's home directory
- **SOUL.md**: Your agent's personality/instructions
- **USER.md**: Info about you for the agent
- **MEMORY.md**: Long-term memory (curated)

### Supported Channels:
- WhatsApp (most popular, QR pairing)
- Telegram (easiest setup)
- Discord
- Slack
- Signal
- iMessage (via BlueBubbles)
- Google Chat
- Microsoft Teams
- And more via plugins

---

## Research Limitations

⚠️ **Web search unavailable** - Brave API key not configured  
⚠️ **YouTube descriptions not accessible** - readability extractor gets no content  
⚠️ **No transcript services tested** - would require browser automation

### To improve this research:
1. Configure Brave API: `openclaw configure --section web`
2. Use browser tool to access YouTube pages with JS
3. Try transcript services like tactiq.io or youtubetranscript.com

---

*Last updated: 2026-02-06 00:30 GMT+7*
