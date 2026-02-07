# YouTube Watchlist

**Playlist:** [Torque OC](https://www.youtube.com/playlist?list=PLEuV9uYkW6HCcjyHTjT-p0NhUqkTvo_XY)

---

## How This Works

1. Dee adds video to playlist + shares link with Torque
2. Torque processes: fetches transcript, summarizes, logs here
3. Heartbeat reviews: flags items older than 14 days for cleanup
4. Dee confirms → Torque removes from playlist (manual for now)

---

## Queue (To Process)

| Added | Video | URL | Status |
|-------|-------|-----|--------|
| — | *none pending* | — | — |

---

## Processed

### 1. How I Use Clawdbot to Run My Business and Life 24/7
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/YRhGtHfs1Lw

**Summary:**
Greg Isenberg interviews Kitze about using Clawdbot/OpenClaw as a "personal OS" that runs across Discord, Telegram, and other chat surfaces. Kitze demonstrates a one-gateway setup connecting to multiple personas (Guilfoyle for engineering, Kevin for accounting, Dr Cox for health, Darlene for home management). Each persona has distinct skills, tone, and scope. The conversation covers Discord as a control center with sections/channels/threads for organizing agent output, and enabling shell/network access so the agent can discover devices, build dashboards, and automate workflows.

Key topics include customer support through spawning sub-agent threads, self-learning through Home Assistant/network device discovery, and high-leverage use cases like AntiCaptcha integration, programmable rings for voice input, and TRMNL e-ink displays. They also cover Spellbook—a prompt organizer that turns templates into variable-driven forms.

**Relevant Ideas for Our Setup:**
- **Persona-based routing**: Create distinct personas for different task domains (engineering, health, home, etc.)
- **Discord structure**: Use sections/channels as durable hubs, threads as temporary tasks
- **Device discovery**: Let agent explore network to find printers, smart home devices via Home Assistant
- **Sub-agent spawning**: Spawn customer/task threads with summaries and action plans
- **TRMNL integration**: Consider e-ink dashboard for life OS display
- **Parameterized prompts**: Build reusable prompt templates with variables

---

### 2. Clawdbot/OpenClaw Clearly Explained (and how to use it)
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/U8kXfk8enrY

**Summary:**
Alex Finn explains his Moltbot/Clawdbot setup treating it as a proactive AI teammate named "Henry." The core workflow: Henry sends daily morning briefs, researches while Alex sleeps, and ships work as pull requests for review. The key to success is feeding the bot deep personal and business context, then setting clear expectations for proactive behavior. Alex separates "brain" (Opus for reasoning) from "muscle" (Codex for heavy coding).

A standout feature is "Mission Control"—a Kanban-style task tracker that Henry built and maintains to show autonomous work progress. The video covers hardware options (cloud vs local Mac Mini/Studio), and security considerations around prompt injection and account access. Alex shares his actual onboarding prompt for getting agents to be proactive rather than reactive.

**Relevant Ideas for Our Setup:**
- **Morning brief workflow**: Automate daily summary of news/tasks/priorities
- **Proactive expectations**: Explicitly tell the agent to be proactive, not wait for commands
- **PR-based work delivery**: Have agent ship work as reviewable pull requests
- **Mission Control board**: Build a visual task tracker for autonomous work visibility
- **Model separation**: Use stronger models (Opus) for reasoning, cheaper models for execution
- **Onboarding prompt**: Create a proper context-rich onboarding prompt setting expectations

---

### 3. Clawdbot to Moltbot to OpenClaw: The 72 Hours That Broke Everything
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/p9acrso71KU

**Summary:**
Nate B Jones provides an investigative breakdown of OpenClaw's explosive growth (100,000+ GitHub stars in weeks) and the chaos that followed. The video covers: the 10-second window during a rebrand that let crypto scammers steal $16+ million, what security researchers found when probing exposed Moltbot instances, and the architectural tension between useful AI agents and dangerous attack surfaces.

The honest assessment: OpenClaw works—and that's exactly what makes it risky. The video explains the "compute squeeze" driving the Mac Mini frenzy, why Big Tech assistants failed, and what Moltbot actually does well. It's a balanced look at both the potential and the genuine security risks of running an agentic AI system.

**Relevant Ideas for Our Setup:**
- **Security first**: Don't expose instances publicly; understand the attack surface
- **Harm reduction**: Follow security best practices from the linked guide
- **Architectural awareness**: Understand that agent capabilities = attack surface
- **Instance isolation**: Keep instances properly firewalled and access-controlled
- **Rebrand awareness**: Watch for impersonation/scam attempts during project changes

---

### 4. Full Tutorial: Set Up Your 24/7 AI Employee in 20 Minutes (OpenClaw)
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/4zXQyswXj7U

**Summary:**
Peter Yang's practical setup tutorial for OpenClaw. He demonstrates the core capabilities: texting at anytime to manage emails, edit documents, push code, and more. The video addresses whether you actually need a Mac Mini (spoiler: not necessarily), and provides a step-by-step setup guide with emphasis on safety.

The three main steps: (1) Run the install script and setup wizard, (2) Connect messaging apps like Telegram/Discord, (3) Give access to GitHub, X, and Google Workspace. The tutorial is extremely practical and beginner-friendly, with links to documentation and resources.

**Relevant Ideas for Our Setup:**
- **Written takeaways**: Check Peter's newsletter for companion guides
- **Safety-first setup**: Follow the security recommendations during install
- **Integration priority**: GitHub, X, Google Workspace as primary integrations
- **Mac Mini optional**: Cloud/VM hosting is viable alternative
- **Incremental access**: Add capabilities gradually rather than all at once

---

### 5. 10 INSANE ClawdBot/Openclaw Use Cases You Can Use Instantly
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/zX-9xXlBTtA

**Summary:**
This video provides 10 battle-tested prompts from top Clawdbot power users and builders. The core message: stop treating Clawdbot like ChatGPT. These aren't theoretical—they're prompts pulled from people shipping with this tool daily.

Key workflows covered: making the bot proactive (not reactive), overnight autonomy prompts that build while you sleep, daily briefings tailored to YOUR interests, error analysis prompts that stop repeat mistakes, and memory tricks so the bot actually remembers things. The video is linked to an Agents Lab community (Skool) for deeper tutorials.

**Relevant Ideas for Our Setup:**
- **Proactive prompts**: Explicitly configure for proactive behavior
- **Overnight autonomy**: Set up tasks that run and complete while sleeping
- **Error analysis**: Implement prompts that help the agent learn from mistakes
- **Memory systems**: Use memory tricks (files, logs) for persistence
- **Daily briefings**: Customize morning summaries to personal interests
- **Community resource**: Consider Agents Lab Skool for advanced patterns

---

### 6. OpenClaw use cases: 9 automations + 4 wild builds that actually work
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/52kOmSQGt_E

**Summary:**
A showcase of what's possible with OpenClaw when committed to daily use. Features 9 automations that work in production and 4 "wild builds" showing the ceiling of what's possible, plus security guardrails to keep it safe.

The 9 automations include: (1) Morning briefing, (2) Email triage, (3) Homelab daily report, (4) Slack customer support, (5) PR review → Telegram notifications, (6) Multi-agent "dream team" setup, (7) Camera trigger automation, (8) TRMNL dashboard integration, and more. The video includes a cautionary "$120 disaster story" about runaway costs, emphasizing the need for guardrails.

**Relevant Ideas for Our Setup:**
- **Morning briefing**: Daily automated summary
- **Email triage**: Auto-categorize and summarize incoming email
- **Homelab daily report**: Automated infrastructure status reports
- **PR review notifications**: Push PR updates to Telegram
- **Multi-agent team**: Set up specialized agents working together
- **Camera triggers**: Automate actions based on camera/motion events
- **Cost guardrails**: Implement spending limits to prevent runaway costs
- **TRMNL dashboard**: E-ink life dashboard display

---

### 7. How OpenClaw's Creator Uses AI to Run His Life (Peter Steinberger)
**Added:** 2026-02-06 | **Processed:** 2026-02-07  
**URL:** https://youtu.be/AcwK1Uuwc0U

**Summary:**
Peter Yang interviews Peter Steinberger, the creator of OpenClaw (formerly Molt). Steinberger describes it as "having a new weird friend that lives on your computer." The interview covers his personal favorite use cases: automatic flight check-ins, home control (lights, adjustable bed), and security camera monitoring. One memorable moment: the agent sent him a voice message unprompted—a feature he never explicitly set up.

Hot takes include: no plan mode is better, MCPs (Model Context Protocols) aren't great, and "the way to learn AI is to play." Steinberger predicts 80% of phone apps will disappear as agents handle their functions. There's discussion of the "agentic trap"—fancy AI workflows that produce slop—emphasizing simplicity and iteration.

**Relevant Ideas for Our Setup:**
- **Flight check-in automation**: Auto check-in to flights when window opens
- **Home control**: Lights, bed adjustment, general smart home integration
- **Security camera monitoring**: Overnight camera watching with alerts
- **Voice messages**: Explore TTS for proactive voice updates
- **Play to learn**: Experiment freely rather than over-planning
- **Avoid the agentic trap**: Keep workflows simple, avoid over-engineering
- **No plan mode**: Sometimes just doing > planning first
- **App consolidation**: Think about which app functions can become agent tasks

---

## Archive (Removed from Playlist)

| Date | Video | Why Archived |
|------|-------|--------------|
| — | *none yet* | — |

---

## Cleanup Rules

- Videos older than 14 days in "Processed" → flag for archive review
- If no action items remain → archive
- Keep archive for reference (searchable)

---

*Last updated: 2026-02-07*
