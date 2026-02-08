# Backlog — Ideas & Someday/Maybe

Items here are not assigned or scheduled. Promote to tasks.md when ready.

## Infrastructure
- Cloudflare tunnel for remote Chromebook access (needs domain)
- Cloudflare Access on Command Centre + Candidlabs site
- Migrate candidlabs-site from GitHub Pages → Cloudflare Pages
- Buy candidlab.co domain
- Transfer TSLC domain from Squarespace to Cloudflare
- Set up auto-transcription for voice notes (Whisper)
- PM2 or systemd for process management
- Backup script for ~/.openclaw/

## Command Centre
- Activity log (data/activity.json) feeding live dashboard
- Session stats widget (tokens, context, sub-agents)
- Channel status bar (Gateway, TG, WA indicators)
- Context % indicator
- Tabs pattern (like Candid budget builder)
- Cost tracker per agent per day

## Candid
- Expense classification audit (accounting vs operational categories)
- BUDGET-2026-BUCKETS.md refinement
- Candid Daily Cockpit with real data
- Work separation tagging (Candid vs Good Doctor)
- Populate candid/ directory with colleague profiles
- SKD historical data for MT turnover calibration

## Agents & Automation
- Scraper agent (Precoro auto-approvals, Teams approvals, Zoom→email)
- Meeting transcript pipeline
- Build-and-ship nightly workflow
- Daily idea prompt (rotating domains)
- Sub-agent for grunt work (scan inbox, poll APIs, return summary)
- Watch button shortcut research (Pixel Watch)
- Voice setup (ElevenLabs, agent voices)
- Therapist agent (Scarlett Johansson voice)
- Give PA agent Emily Blunt voice via ElevenLabs

## Content & Personal
- "It's All Torque" podcast/blog documenting the journey
- SuperheroNinjaPirate (Jakarta flooding story)
- TSLC: The Shoeless Life Coach
- Betting analytics bot (had working edge, lost discipline)
- Private poker app (replace Pokerrrr2)
- Park Run Indonesia
- Yoga app (could be TSLC module)
- Stretching studio concept
- Character development platform (students + creators)
- Post podcasts/files on Spotify bot for streams

## Family
- Family Command Centre (watchlist, reading list, activities, chat gateway)
- Kids email chat gateway with guardrails
- Connie PAT Reading tracking
- Be Sinead's training ally (gentle nudges, accountability)

## Research
- OpenClaw in smart glasses
- Recreate NLM-style capabilities (knowledge base, embeddings, grounded agents)
- YouTube API for auto-processing watchlist
- Zoom transcript Chrome extension approach
- WhatsApp history export methods
- OpenClaw ecosystem links vault

## Deferred
- Mindstax: use for one week, track 3 habits before designing 2.0
- Obsidian graph view exploration (janky on Chromebook)
- Google Recorder → transcript pipeline for long voice notes
- Add multi-chat selection to Telegram export script (restore old capability)

## Feb 8 Evening Additions
- Supervisor agent on Gemini (cheaper alternative to Opus heartbeat)
- Session self-management (auto-compact at >80% context)
- Candidlabs Command Centre fork (same core, human team assignees, auth)
- TSLC domain for Cloudflare Tunnel
- Brave usage tracker + Command Centre widget
- Command Centre task CRUD (create/edit/assign from UI)
- Command Centre pages/tabs for detail views
- Dashboard "Update All" trigger button (needs backend — Cloudflare Worker or API endpoint)
- Nightly maintenance chain: metrics refresh + system audit + git push (cron already set, button for manual trigger)
