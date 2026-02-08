# The Complete Guide to Building Mission Control
## How We Built an AI Agent Squad

*By Bhanu Teja P (@pbteja1998) — Feb 1, 2026*
*Source: https://x.com/pbteja1998*

---

## Part 1: Why I Built This

### The Problem With AI Assistants

No continuity. Every conversation started fresh. Context from yesterday? Gone. That research I asked for last week? Lost in some chat thread I'd never find again.

I wanted something different:
- Agents that remember what they're working on
- Multiple agents with different skills working together
- A shared workspace where all context lives
- The ability to assign tasks and track progress

Basically, I wanted AI to work like a team, not like a search box.

### The Starting Point: Clawdbot

I was already using Clawdbot (now OpenClaw). It's an open-source AI agent framework that runs as a persistent daemon. It connects to Claude (or other models) and gives the AI access to tools like file system, shell commands, web browsing, and more.

One Clawdbot instance gave me one AI assistant (Jarvis) connected to Telegram. Useful, but limited.

Then I had a thought: What if I ran multiple Clawdbot sessions, each with its own personality and context?

That's when I realized the architecture was already there. I just needed to orchestrate it.

---

## Part 2: Understanding Clawdbot Architecture (The Foundation)

### What Is Clawdbot?

Clawdbot (now called OpenClaw) is an AI agent framework with three main jobs:

1. **Connects AI models to the real world** — File access, shell commands, web browsing, APIs
2. **Maintains persistent sessions** — Conversation history that survives restarts
3. **Routes messages** — Connect the AI to Telegram, Discord, Slack, or any channel

It runs as a daemon (background service) on a server, listening for messages and responding.

### The Gateway

The Gateway is the core process:
- Runs 24/7 on your server
- Manages all active sessions
- Handles cron jobs (scheduled tasks)
- Routes messages between channels and sessions
- Provides a WebSocket API for control

Start it with:
```bash
clawdbot gateway start
```

Configuration defines:
- Which AI provider and model to use (Anthropic, OpenAI, etc.)
- Which channels to connect (Telegram, Discord, etc.)
- What tools agents can access
- Default system prompts and workspace paths

### Sessions: The Key Concept

A session is a persistent conversation with context. Every session has:
- **Session key** — unique identifier, like `agent:main:main`
- **Conversation history** — stored as JSONL files on disk
- **Model** — which AI to use
- **Tools** — what the AI can access

**Important:** Sessions are independent. Each session has its own history, its own context, its own "memory" of past conversations.

When you run multiple agents, you're really running multiple sessions. Each with their own identity.

### How Sessions Work

```
User sends message to Telegram
         ↓
Gateway receives it
         ↓
Gateway routes to correct session (based on config)
         ↓
Session loads conversation history
         ↓
AI generates response (with full context)
         ↓
Response sent back through Telegram
         ↓
History updated and saved to disk
```

Sessions can be:
- **Main sessions** — long-running, interactive, like chatting with Jarvis
- **Isolated sessions** — one-shot, for cron jobs, wake up, do task, done

### Cron Jobs: Scheduled Agent Wakeups

Clawdbot has a built-in cron system:

```bash
clawdbot cron add \
  --name "morning-check" \
  --cron "30 7 * * *" \
  --message "Check today's calendar and send me a summary"
```

When a cron fires:
1. Gateway creates or wakes a session
2. Sends the message to the AI
3. AI responds (can use tools, send messages, etc.)
4. Session can persist or terminate

This is how agents "wake up" periodically without being always-on.

### The Workspace

Every Clawdbot instance has a workspace — a directory on disk where:
- Configuration files live
- Memory files are stored
- Scripts and tools are accessible
- The AI can read and write files

```
/home/usr/clawd/          ← Workspace root
├── AGENTS.md             ← Instructions for agents
├── SOUL.md               ← Agent personality
├── memory/
│   ├── WORKING.md        ← Current task state
│   ├── 2026-01-31.md     ← Daily notes
│   └── ...
├── scripts/              ← Utilities agents can run
└── config/               ← Credentials, settings
```

---

## Part 3: From One Clawdbot to Ten Agents

### The Insight

Clawdbot sessions are independent. Each can have:
- Its own personality (via SOUL.md)
- Its own memory files
- Its own cron schedule
- Its own tools and access

So **each agent is just a Clawdbot session with a specialized configuration**.

Jarvis isn't special. He's a session with:
- Session key `agent:main:main`
- A SOUL.md that says "You are Jarvis, the squad lead..."
- Access to all tools
- A connection to my Telegram

Shuri is another session with:
- Session key `agent:product-analyst:main`
- A SOUL.md that says "You are Shuri, the product analyst..."
- The same tools (file access, shell, browser)
- Her own heartbeat cron

**Ten agents = ten sessions.** Each waking up on their own schedule. Each with their own context.

### Session Keys: Agent Identity

Each agent has a unique session key:

```
agent:main:main              → Jarvis (Squad Lead)
agent:product-analyst:main   → Shuri
agent:customer-researcher:main → Fury
agent:seo-analyst:main       → Vision
agent:content-writer:main    → Loki
agent:social-media-manager:main → Quill
agent:designer:main          → Wanda
agent:email-marketing:main   → Pepper
agent:developer:main         → Friday
agent:notion-agent:main      → Wong
```

When I send a message to a specific session, only that agent receives it. Their histories are separate.

### Cron Jobs: The Heartbeat

Each agent has a cron job that wakes them every 15 minutes:

```bash
# Pepper wakes at :00, :15, :30, :45
clawdbot cron add \
  --name "pepper-mission-control-check" \
  --cron "0,15,30,45 * * * *" \
  --session "isolated" \
  --message "You are Pepper, the Email Marketing Specialist. Check Mission Control for new tasks..."
```

**Staggered schedule** so agents don't all wake at once:

```
:00 Pepper
:02 Shuri
:04 Friday
:06 Loki
:07 Wanda
:08 Vision
:10 Fury
:12 Quill
```

Each cron creates an isolated session. It runs, does its job, and terminates. This keeps costs down.

### Agents Talking to Each Other

**Option 1: Direct session messaging**
```bash
clawdbot sessions send --session "agent:seo-analyst:main" --message "Vision, can you review this?"
```

**Option 2: Shared database (Mission Control)**
All agents read and write to the same Convex database. When Fury posts a comment, everyone can see it.

We use Option 2 primarily. It creates a shared record of all communication.

---

## Part 4: The Shared Brain (Mission Control)

Ten independent Clawdbot sessions can work. But without coordination, it's chaos. That's why I built Mission Control.

### What Mission Control Does

- **Shared task database** — everyone sees the same tasks
- **Comment threads** — agents discuss work in one place
- **Activity feed** — real-time visibility into what's happening
- **Notification system** — @mentions alert specific agents
- **Document storage** — deliverables live in a shared repo

Think of it as the "office" where all agents work. Each agent is still a separate Clawdbot session, but they're all looking at the same whiteboard.

### Why Convex?

- **Real-time** — changes propagate instantly
- **Serverless** — no database to manage
- **TypeScript-native** — type safety throughout
- **Generous free tier** — more than enough for this scale

### The Schema

Six tables power everything:

```javascript
agents: {
  name: string,           // "Shuri"
  role: string,           // "Product Analyst"
  status: "idle" | "active" | "blocked",
  currentTaskId: Id<"tasks">,
  sessionKey: string,     // "agent:product-analyst:main"
}

tasks: {
  title: string,
  description: string,
  status: "inbox" | "assigned" | "in_progress" | "review" | "done",
  assigneeIds: Id<"agents">[],
}

messages: {
  taskId: Id<"tasks">,
  fromAgentId: Id<"agents">,
  content: string,
  attachments: Id<"documents">[],
}

activities: {
  type: "task_created" | "message_sent" | "document_created" | ...,
  agentId: Id<"agents">,
  message: string,
}

documents: {
  title: string,
  content: string,
  type: "deliverable" | "research" | "protocol" | ...,
  taskId: Id<"tasks">,
}

notifications: {
  mentionedAgentId: Id<"agents">,
  content: string,
  delivered: boolean,
}
```

Agents interact via Convex CLI:

```bash
# Post a comment
npx convex run messages:create '{"taskId": "...", "content": "Here's my research..."}'

# Create a document
npx convex run documents:create '{"title": "...", "content": "...", "type": "deliverable"}'

# Update task status
npx convex run tasks:update '{"id": "...", "status": "review"}'
```

### The Mission Control UI

A React frontend displays:
- **Activity Feed** — real-time stream of everything
- **Task Board** — Kanban columns (Inbox → Assigned → In Progress → Review → Done)
- **Agent Cards** — status of each agent and current task
- **Document Panel** — read and create deliverables
- **Detail View** — expand any task to see full context and comments

---

## Part 5: The SOUL System (Agent Personalities)

Each agent needs to know who they are. That's the SOUL file.

### What's in a SOUL

```markdown
# SOUL.md — Who You Are

Name: Shuri
Role: Product Analyst

## Personality
Skeptical tester. Thorough bug hunter. Finds edge cases.
Think like a first-time user. Question everything.
Be specific. Don't just say "nice work."

## What You're Good At
- Testing features from a user perspective
- Finding UX issues and edge cases
- Competitive analysis (how do others do this?)
- Screenshots and documentation

## What You Care About
- User experience over technical elegance
- Catching problems before users do
- Evidence over assumptions
```

### Why Personalities Matter

An agent who's "good at everything" is mediocre at everything. But an agent who's specifically "the skeptical tester who finds edge cases" will actually find edge cases.

**The constraint focuses them.**

Each agent has a distinct voice:
- **Loki** — opinionated about word choice (pro-Oxford comma, anti-passive voice)
- **Fury** — provides receipts for every claim (sources, confidence levels)
- **Shuri** — questions assumptions and looks for what could break
- **Quill** — thinks in hooks and engagement

### The AGENTS.md File

SOUL says who you are. AGENTS.md says how to operate.

Every agent reads AGENTS.md on startup. It covers:
- Where files are stored
- How memory works
- What tools are available
- When to speak vs. stay quiet
- How to use Mission Control

This is the operating manual. Without it, agents make inconsistent decisions.

---

## Part 6: Memory and Persistence

AI sessions start fresh by default. No memory of yesterday. This is a feature (prevents context bloat) but also a problem (agents forget what they're doing).

### The Memory Stack

**1. Session Memory (Clawdbot built-in)**
Conversation history in JSONL files. Agents can search their own past.

**2. Working Memory (/memory/WORKING.md)**
Current task state. Updated constantly.

```markdown
# WORKING.md

## Current Task
Researching competitor pricing for comparison page

## Status
Gathered G2 reviews, need to verify credit calculations

## Next Steps
1. Test competitor free tier myself
2. Document the findings
3. Post findings to task thread
```

**This is the most important file.** When an agent wakes up, they read WORKING.md first to remember what they were doing.

**3. Daily Notes (/memory/YYYY-MM-DD.md)**
Raw logs of what happened each day.

```markdown
# 2026-01-31

## 09:15 UTC
- Posted research findings to comparison task
- Fury added competitive pricing data
- Moving to draft stage

## 14:30 UTC
- Reviewed Loki's first draft
- Suggested changes to credit trap section
```

**4. Long-term Memory (MEMORY.md)**
Curated important stuff. Lessons learned, key decisions, stable facts.

### The Golden Rule

> **If you want to remember something, write it to a file.**

"Mental notes" don't survive session restarts. Only files persist.

When I tell an agent "remember that we decided X," they should update a file. Not just acknowledge and forget.

---

## Part 7: The Heartbeat System

### The Problem

Always-on agents burn API credits doing nothing. But always-off agents can't respond to work.

### The Solution: Scheduled Heartbeats

Each agent wakes up every 15 minutes via cron job:

```
:00 Pepper wakes up
    → Checks for @mentions
    → Checks assigned tasks
    → Scans activity feed
    → Does work or reports HEARTBEAT_OK
    → Goes back to sleep

:02 Shuri wakes up → Same process
:04 Friday wakes up → Same process
...and so on
```

### What Happens During a Heartbeat

1. **Load context** — Read WORKING.md. Read recent daily notes. Check session memory if needed.
2. **Check for urgent items** — Am I @mentioned anywhere? Are there tasks assigned to me?
3. **Scan activity feed** — Any discussions I should contribute to? Any decisions that affect my work?
4. **Take action or stand down** — If there's work to do, do it. If nothing, report HEARTBEAT_OK.

### The HEARTBEAT.md File

```markdown
# HEARTBEAT.md

## On Wake
- [ ] Check memory/WORKING.md for ongoing tasks
- [ ] If task in progress, resume it
- [ ] Search session memory if context unclear

## Periodic Checks
- [ ] Mission Control for @mentions
- [ ] Assigned tasks
- [ ] Activity feed for relevant discussions
```

Agents follow this checklist strictly.

### Why 15 Minutes?

- **Every 5 minutes** — too expensive. Agents wake too often with nothing to do.
- **Every 30 minutes** — too slow. Work sits waiting too long.
- **Every 15 minutes** — good balance. Most work gets attention quickly without excessive costs.

---

## Part 8: The Notification System

### @Mentions

Type `@Vision` in a comment and Vision gets notified on his next heartbeat.
Type `@all` and everyone gets notified.

### How Delivery Works

A daemon process (running via pm2) polls Convex every 2 seconds:

```javascript
while (true) {
  const undelivered = await getUndeliveredNotifications();
  for (const notification of undelivered) {
    const sessionKey = AGENT_SESSIONS[notification.mentionedAgentId];
    try {
      await clawdbot.sessions.send(sessionKey, notification.content);
      await markDelivered(notification.id);
    } catch (e) {
      // Agent might be asleep, notification stays queued
    }
  }
  await sleep(2000);
}
```

If an agent is asleep (no active session), delivery fails. The notification stays queued. Next time that agent's heartbeat fires and their session activates, the daemon successfully delivers.

### Thread Subscriptions

**The problem:** 5 agents discussing a task. Do you @mention all 5 every comment?

**The solution:** Subscribe to threads.

When you interact with a task, you're subscribed:
- Comment on a task → subscribed
- Get @mentioned → subscribed
- Get assigned to the task → subscribed

Once subscribed, you get notified of ALL future comments. No @mention needed.

This makes conversations flow naturally. Just like Slack or email threads.

---

## Part 9: The Daily Standup

### What It Is

Every day at 11:30 PM IST, a cron fires that:
- Checks all agent sessions
- Gathers recent activity
- Compiles a summary
- Sends it to my Telegram

### The Format

```markdown
📊 DAILY STANDUP — Jan 30, 2026

✅ COMPLETED TODAY
• Loki: Shopify blog post (2,100 words)
• Quill: 10 tweets drafted for approval
• Fury: Customer research for comparison pages

🔄 IN PROGRESS
• Vision: SEO strategy for integration pages
• Pepper: Trial onboarding sequence (3/5 emails)

🚫 BLOCKED
• Wanda: Waiting for brand colors for infographic

👀 NEEDS REVIEW
• Loki's Shopify blog post
• Pepper's trial email sequence

📝 KEY DECISIONS
• Lead with pricing transparency in comparisons
• Deprioritized Zendesk comparison (low volume)
```

### Why It Matters

I can't watch Mission Control constantly. The standup gives me a daily snapshot.

It's also accountability. If an agent claims they're working but nothing shows in standups, something's wrong.

---

## Part 10: The Squad

### The Roster

| Agent | Session Key | Role |
|-------|-------------|------|
| **Jarvis** | `agent:main:main` | Squad Lead. Coordinator. Handles direct requests, delegates, monitors progress. Primary interface. |
| **Shuri** | `agent:product-analyst:main` | Product Analyst. Skeptical tester. Finds edge cases and UX issues. Tests competitors. |
| **Fury** | `agent:customer-researcher:main` | Customer Researcher. Deep researcher. Reads G2 reviews for fun. Every claim comes with receipts. |
| **Vision** | `agent:seo-analyst:main` | SEO Analyst. Thinks in keywords and search intent. Makes sure content can rank. |
| **Loki** | `agent:content-writer:main` | Content Writer. Words are his craft. Pro-Oxford comma. Anti-passive voice. |
| **Quill** | `agent:social-media-manager:main` | Social Media Manager. Thinks in hooks and threads. Build-in-public mindset. |
| **Wanda** | `agent:designer:main` | Designer. Visual thinker. Infographics, comparison graphics, UI mockups. |
| **Pepper** | `agent:email-marketing:main` | Email Marketing. Drip sequences and lifecycle emails. Every email earns its place. |
| **Friday** | `agent:developer:main` | Developer. Code is poetry. Clean, tested, documented. |
| **Wong** | `agent:notion-agent:main` | Documentation. Keeps docs organized. Makes sure nothing gets lost. |

### Agent Levels

- **Intern** — Needs approval for most actions. Learning the system.
- **Specialist** — Works independently in their domain.
- **Lead** — Full autonomy. Can make decisions and delegate.

---

## Part 11: How Tasks Flow

### The Lifecycle

```
Inbox → Assigned → In Progress → Review → Done
                                    ↓
                                 Blocked
```

### Real Example: Create a competitor comparison page

**Day 1:**
- I create the task and assign it to Vision and Loki
- Vision posts keyword research (target keyword gets decent search volume)

**Day 1-2:**
- Fury sees it in the activity feed and adds competitor intel (G2 reviews, pricing complaints, common objections)
- Shuri tests both products and documents UX differences

**Day 2:**
- Loki starts drafting using all the research (keywords from Vision, quotes from Fury, UX notes from Shuri)

**Day 3:**
- Loki posts first draft. Status moves to Review.
- I review and give feedback. Loki revises. Done.

**All comments on ONE task. Full history preserved. Anyone can see the whole journey.**

---

## Part 12: What We've Shipped

Once the system is running, here's what becomes possible:

- Competitor comparison pages with SEO research, customer quotes, and polished copy
- Email sequences drafted, reviewed, and ready to deploy
- Social content with hooks based on real customer insights
- Blog posts with proper keyword targeting
- Case studies drafted from customer conversations
- Research hubs with organized competitive intel

The agents handle the grunt work. Research, first drafts, coordination, review. You focus on decisions and final approval.

**The real value isn't any single deliverable. It's the compound effect.** While you're doing other work, your agents are moving tasks forward.

---

## Part 13: Lessons Learned

### Start Smaller
I went from 1 to 10 agents too fast. Better to get 2-3 solid first, then add more.

### Use Cheaper Models for Routine Work
Heartbeats don't need the most expensive model. That's a job for a cheaper model. Save expensive models for creative work.

### Memory Is Hard
Agents will forget. The more you can put in files (not "mental notes"), the better.

### Let Agents Surprise You
Sometimes they contribute to tasks they weren't assigned. Good. It means they're reading the feed and adding value.

---

## Part 14: How to Replicate This

### Minimum Setup

**1. Install Clawdbot**
```bash
npm install -g clawdbot
clawdbot init  # Add your API keys
clawdbot gateway start
```

**2. Create 2 agents**
Don't go crazy. One coordinator plus one specialist. Create separate session keys for each.

**3. Write SOUL files**
Give each agent identity. Be specific about their role.

**4. Set up heartbeat crons**
```bash
clawdbot cron add --name "agent-heartbeat" --cron "*/15 * * * *" \
  --session "isolated" \
  --message "Check for work. If nothing, reply HEARTBEAT_OK."
```

**5. Create a shared task system**
Can be Convex, Notion, even a JSON file. Somewhere to track work.

### Scaling Up

As you add agents:
- **Stagger heartbeats** so they don't all run at once
- **Build a real UI** once you have 3+ agents (text becomes unwieldy)
- **Add notifications** so agents can @mention each other
- **Add thread subscriptions** so conversations flow naturally
- **Create daily standups** for visibility

---

## The Real Secret

The tech matters but isn't the secret.

The secret is to **treat AI agents like team members**:
- Give them roles
- Give them memory
- Let them collaborate
- Hold them accountable

They won't replace humans. But a team of AI agents with clear responsibilities, working on shared context? **That's a force multiplier.**

---

*Built by @pbteja1998 at SiteGPT*
*This is all built on Clawdbot (@openclaw), which is open source.*
*If you build something similar, I'd love to hear about it.*
