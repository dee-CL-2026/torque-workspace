## Tasks
| Task | Assigned | Status | Date | Notes |
|------|----------|--------|------|-------|
| Create new Telegram group, add Ryan McClure, add @ClawTorqueBot, make @ClawTorqueBot admin, ask Ryan to add his bot | Dieter Werwath | To Do | 2026-02-02 | Bot cannot create groups directly. |
| Close any other WhatsApp Web sessions | Dieter Werwath | To Do | 2026-02-02 | To resolve "conflict: replaced" error. |
| Go to WhatsApp on phone -> Settings -> Linked Devices -> Remove any devices not recognized | Dieter Werwath | To Do | 2026-02-02 | To resolve "conflict: replaced" error. |
| Run bash command to restart NanoClaw after .env update | Dieter Werwath | To Do | 2026-02-02 | `cd ~/nanoclaw && pkill -f "node dist/index" && ENABLE_WHATSAPP=true TELEGRAM_BOT_TOKEN=8571291784:AAFI7ZLOc9PltP2uRRDMpjBIXRKrZk8sgbo node dist/index.js` |
| Send a message from self-chat to get JID for 2-way WhatsApp | Dieter Werwath | To Do | 2026-02-02 | To register self-chat as main WhatsApp channel. |
| Get a second SIM card for dedicated bot WhatsApp number | Dieter Werwath | Deferred | 2026-02-02 | To enable true 2-way conversation on WhatsApp without conflicts. |
| Review Candid OS project files and scripts | Claw Torque | Scheduled | 2026-02-03 07:00 | Scheduled for morning. |
| Share folder containing family passport files with Linux | Dieter Werwath | To Do | 2026-02-03 | To allow Torque to access all personal Drive files. |
| Drop Dieter's passport into "Torque's Folder" | Dieter Werwath | To Do | 2026-02-03 | To add Dieter's passport details to memory. |
| Send test photo to Torque | Dieter Werwath | To Do | 2026-02-03 | To verify image attachment handling. |
| Investigate current image/voice note handling for both platforms | Claw Torque | In Progress | 2026-02-03 | |
| Run `/login` in terminal for Claude Code token | Dieter Werwath | To Do | 2026-02-03 | To refresh expired Claude Code token. |
| Send "🔄 Working on it..." message when starting processing | Claw Torque | To Do | 2026-02-03 | Quick fix for visibility of background work. |
| Add a status file that Dee could check for background work | Claw Torque | Idea | 2026-02-03 | Better fix for visibility of background work. |
| Set up a webhook/notification when starting & finishing background work | Claw Torque | Idea | 2026-02-03 | Best fix for visibility of background work. |

## Decisions
- [Telegram as main channel]: Dee decided to use Telegram for main 2-way conversation.
- [WhatsApp for group commands]: Dee decided to use WhatsApp for `@Torque` commands in groups.
- [Strict WhatsApp group rules]: Dee decided to start with very strict rules for WhatsApp groups (acknowledge/log only, no file changes, no sharing sensitive data).
- [Hold on advanced permissions]: Dee decided to hold on per-group permission rules and multiple agent personas for later.
- [Deferred second SIM]: Dee decided to get a second SIM for Torque's dedicated WhatsApp number later.
- [Test WhatsApp with current number]: Dee decided to test WhatsApp with his current number, knowing it might kick out WhatsApp Web.
- [Proceed with WhatsApp authentication]: Dee decided for Torque to proceed with WhatsApp authentication.
- [Implement quick fix for visibility]: Dee decided to implement the quick fix for visibility (sending "🔄 Working on it...") when Torque starts processing.

## Context/Profile
- **Dieter Werwath (Dee):**
    - Has home folder directories: backups, candid-labs, candidlabs, CL Docs, GAS-Records, nanoclaw, outputs, tmp.
    - Has 19 GAS files in Candid Labs folders.
    - Uses a Chromebook (Linux).
    - Has Google Drive with `PT Unisoda Mitra Jaya` folder.
    - Personal Google Drive is "a mess".
    - Has a folder "Torque's Folder" shared with Linux, containing family passport images.
    - Has an old red British passport.
    - Youngest daughter: Evie, DOB 7 April 2016, born Jakarta.
    - Wife: Sinead, DOB 11 April 1983, born Johannesburg.
    - Daughter: Connie, DOB 26 July 2014, born Jakarta.
    - Uses WhatsApp in Indonesia for work.
    - Has poor sleep habits.
    - Current Claude Code token for manual use has expired, needs `/login`.
- **Claw Torque (AI Assistant):**
    - Main instruction file: CLAUDE.md.
    - Platform: NanoClaw (Node.js process, Claude Agent SDK subprocess).
    - Each group has isolated filesystem and memory.
    - Can see own files, home directory, and run commands on server.
    - Initial WhatsApp API (Baileys) did not have message reaction support wired up.
    - Telegram Bot API does not allow bots to create groups or add members.
    - Corrected understanding: WhatsApp allows up to 4 linked devices, not just one web connection.
    - Uses Dee's WhatsApp account, so messages appear to come from Dee.
    - WhatsApp trigger: `@Torque`.
    - Telegram trigger: None (direct 2-way conversation).
    - Remembers via session memory, CLAUDE.md files (persistent long-term memory), and conversation archives.
    - Initial `.env` had `ENABLE_WHATSAPP=false`.
    - WhatsApp connected to phone: 6282112747842 (Indonesia).
    - Telegram bot connected as @ClawTorqueBot.
    - Can schedule tasks.
    - Can implement image & voice note support.
- **Ryan McClure:** Contact to be added to Telegram group.
- **Projects:** Candid Labs, Candid OS, PT Unisoda Mitra Jaya (business), NanoClaw (Torque's platform).
- **Family Passports (as of 2026-02-03):**
    - **Sinead (Wife):** Full Name: Sinead Leigh Smith, DOB: 11 April 1983, Born: Johannesburg, Passport: 529114876, Expires: March 2026 (RENEW SOON!).
    - **Connie (Daughter):** Full Name: Connie Leigh Elizabeth Werwath, DOB: 26 July 2014, Born: Jakarta, Passport: 554939870, EXPIRED: Feb 2024 (NEEDS RENEWAL!).
    - **Evie (Daughter):** Full Name: Evie Quinn Alexandra Werwath, DOB: 07 April 2016, Born: Jakarta, Passport: 148126818, Issued: 24 May 2024, Expires: 24 May 2029 (new passport).
    - Note: Sinead and Connie's details are from older scans; they now have new (Black) passports. Evie's passport details are from a new photo.

## Backlog Ideas
- [Per-group permission rules for WhatsApp]: Implement a system where each WhatsApp group has its own `CLAUDE.md` with specific permissions.
- [Multiple agent personas]: Create different agents for specific roles (e.g., `@SalesBot`, `@OpsBot`, `@TaskBot`).
- [Organize Dieter's Google Drive]: Clean up the "mess" in Dieter's personal Google Drive.

## Done
- [Listed directories in home folder]: Claw Torque listed main and hidden directories. (2026-02-02 18:14:05)
- [Counted GAS files]: Claw Torque found 19 GAS files in Candid Labs folders. (2026-02-02 18:30:31)
- [Fixed "No response requested" bug]: Claw Torque fixed the bug by adding a filter in `src/index.ts`. (2026-02-02 18:37:59)
- [Added message reaction support]: Claw Torque implemented `sendReaction()` for WhatsApp and Telegram, `react_to_message` MCP tool, and updated IPC. (2026-02-02 18:43:25)
- [WhatsApp authenticated]: WhatsApp credentials saved without needing QR scan due to existing valid credentials. (2026-02-02 18:49:19)
- [Telegram and WhatsApp connected]: Both platforms are now connected and stable. (2026-02-02 19:01:43, 2026-02-02 19:02:02)
- [Created Evie's birthday countdown timer]: HTML file with animated background, sparkles, and falling emojis was built. (2026-02-03 00:14:53)
- [Read family passport details (Sinead, Connie, Evie)]: Extracted and saved details to memory (CLAUDE.md). (2026-02-03 00:34:34, 2026-02-03 00:34:44)
- [Rebuilt and restarted NanoClaw for bug fixes]: Improved "No response requested" filter and emoji reactions are now working consistently. (2026-02-03 00:42:11, 2026-02-03 00:45:00, 2026-02-03 00:46:32)
- [Implemented image & voice note support]: Torque can now download, save, and view images and voice notes. (2026-02-03 01:17:49)
- [Read Evie's new passport details]: Extracted and saved details from a newly provided image. (2026-02-03 01:23:29)
- [Session summary saved to CLAUDE.md]: Torque saved a summary of the session to memory. (2026-02-02 19:28:34)