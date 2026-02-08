| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Create new Telegram group, add Ryan McClure, add @ClawTorqueBot, make @ClawTorqueBot admin, ask Ryan to add his bot | Dee | To Do | 2026-02-02 | Bot cannot create groups directly. |
| Close any other WhatsApp Web sessions | Dee | To Do | 2026-02-02 | To resolve "conflict: replaced" error. |
| Go to WhatsApp on phone -> Settings -> Linked Devices -> Remove any devices not recognized | Dee | To Do | 2026-02-02 | To resolve "conflict: replaced" error. |
| Run bash command to restart NanoClaw after .env update | Dee | To Do | 2026-02-02 | `cd ~/nanoclaw && pkill -f "node dist/index" && ENABLE_WHATSAPP=true TELEGRAM_BOT_TOKEN=8571291784:AAFI7ZLOc9PltP2uRRDMpjBIXRKrZk8sgbo node dist/index.js` |
| Send a message from self-chat to get JID for 2-way WhatsApp | Dee | To Do | 2026-02-02 | To register self-chat as main WhatsApp channel. |
| Get a second SIM card for dedicated bot WhatsApp number | Dee | Deferred | 2026-02-02 | To enable true 2-way conversation on WhatsApp without conflicts. |
| Review Candid OS project files and scripts | Torque | Scheduled | 2026-02-03 07:00 | Scheduled for morning. |
| Share folder containing family passport files with Linux | Dee | To Do | 2026-02-03 | To allow Torque to access all personal Drive files. |
| Drop Dieter's passport into "Torque's Folder" | Dee | To Do | 2026-02-03 | To add Dieter's passport details to memory. |
| Send test photo to Torque | Dee | To Do | 2026-02-03 | To verify image attachment handling. |
| Investigate current image/voice note handling for both platforms | Torque | In Progress | 2026-02-03 | |
| Run `/login` in terminal for Claude Code token | Dee | To Do | 2026-02-03 | To refresh expired Claude Code token. |
| Send "🔄 Working on it..." message when starting processing | Torque | To Do | 2026-02-03 | Quick fix for visibility of background work. |
| Add a status file that Dee could check for background work | Torque | Idea | 2026-02-03 | Better fix for visibility of background work. |
| Set up a webhook/notification when starting & finishing background work | Torque | Idea | 2026-02-03 | Best fix for visibility of background work. |
| Add `npm run restart` script to `package.json` | Torque | To Do | 2026-02-03 | For easier NanoClaw restarts |
| Set up PM2 to prevent duplicate NanoClaw instances | Torque | To Do | 2026-02-03 | |
| Set up systemd service for NanoClaw auto-restart and prevention of duplicate instances | Torque | To Do | 2026-02-03 | Recommended for stability |
| Re-authenticate WhatsApp | Dee | To Do | 2026-02-03 | Stop process, delete `creds.json`, run `npm start`, scan QR |
| Create a backup script that zips `~/.openclaw/` | Torque | To Do | 2026-02-04 | For easy Mac Mini migration |
| Push workspace to git remote | Torque | To Do | 2026-02-04 | For extra redundancy |
| Set up auto-transcription for incoming voice notes using Whisper | Torque | To Do | 2026-02-04 | |
| Install Tasker and AutoWear on phone | Dee | To Do | 2026-02-04 | Required for Pixel Watch integration |
| Draft Tasker profile for Pixel Watch integration (C-lite) | Torque | To Do | 2026-02-04 | For initial setup, full Iron Man later |
| Set up Google Drive access using `rclone mount` with a small cache | Torque | To Do | 2026-02-04 | To avoid local storage issues |
| Configure cheaper models (Sonnet 4, Haiku) for sub-agents | Torque | To Do | 2026-02-04 | To optimize costs |
| Provide a brain dump of active projects or specific things to remember | Dee | To Do | 2026-02-04 | For agent to assist with management |
| Use Mindstax for one week, track 3 habits | Dee | Pending | N/A | Before designing Mindstax 2.0 |
| Generate questions/data requests for Candid | Torque | Done | 2026-02-05 | Completed overnight task. |
| Dictate responses/answers to overnight doc via voice note | Dee | In Progress | 2026-02-05 | Attempted long voice note, encountered issues. |
| Transcribe, structure, and add to the doc | Torque | In Progress | 2026-02-05 | Processed key takeaways from Dee's voice note. |
| Review candidlabs codebase, data doctrine fork, and draft scaffold for sales_master spoke | Torque | Pending | N/A | Awaiting further context/guardrails. |
| Create shared Google Drive folder for docs and give Linux access | Dee | Done | 2026-02-05 | Shared "Candid CMS" drive. |
| Set up Obsidian-ready folder structure in the workspace | Torque | Pending | N/A | To be done after Obsidian setup walkthrough. |
| Export key docs as Markdown from Google Docs | Dee | Pending | N/A | Cherry-pick critical docs initially. |
| Draft GAS export script for bulk export of Google Docs to Markdown/PDF | Torque | Pending | N/A | For later implementation. |
| Try VS Code for vault (`code ~/.openclaw/workspace/vault`) | Dee | TODO | 2026-02-05 | |
| Add `All Raw Data` ID to Database Registry and run analyzer | Dee | TODO | 2026-02-05 | |
| Copy/paste Tab Analysis Log output to chat (or use auto-export once implemented) | Dee | TODO | 2026-02-05 | |
| Push GAS code after adding schema export to file | Dee | TODO | 2026-02-05 | Includes git commit |
| Deep-dive into GAS files to map the current state and tab relationships | Torque | TODO | 2026-02-05 | To understand full data flow |
| Push latest GAS code to CandidLabs_Control_Centre | Dee | TODO | 2026-02-05 | After `clasp login` and git commit |
| Refresh VS Code to see symlinked docs | Dee | DONE | 2026-02-05 | Used "Reload Window" |
| Update VS Code | Dee | DONE | 2026-02-05 | Offered an update and clicked "Always" for git tracking |
| Run `clasp login` to re-authenticate Google | Dee | DONE | 2026-02-05 | After "invalid_grant" error |
| Run `clasp push` after login | Dee | DONE | 2026-02-05 | To push `GlobalAnalyser.js` and `OpenOn.js` changes |
| Run `CMS Tools → 📋 Setup Database Registry` in Control Centre | Dee | DONE | 2026-02-05 | To create/refresh the config tab |
| Set `Active = TRUE` for DBs to include in registry | Dee | DONE | 2026-02-05 | (Initial manual step, later automated) |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` in Control Centre | Dee | DONE | 2026-02-05 | To generate schema logs |
| Push latest GAS code to CandidLabs_Control_Centre | Dee | DONE | 2026-02-05 | After script revisions |
| Run `CMS Tools → 📋 Setup Database Registry` (again after script revisions) | Dee | DONE | 2026-02-05 | To populate with auto-discovered/hardcoded DBs |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` (again after script revisions) | Dee | DONE | 2026-02-05 | To generate updated schema logs |
| Run `CMS Tools → 📋 Setup Database Registry` (final run for clean list) | Dee | DONE | 2026-02-05 | Before final Global Tab Analyser run |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` (final run) | Dee | DONE | 2026-02-05 | To generate final schema logs |
