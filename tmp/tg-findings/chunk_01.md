## Tasks
| Task | Assigned | Status | Date | Notes |
|------|----------|--------|------|-------|
| Add `npm run restart` script to `package.json` | Claw Torque | To Do | 2026-02-03 | For easier NanoClaw restarts |
| Set up PM2 to prevent duplicate NanoClaw instances | Claw Torque | To Do | 2026-02-03 | |
| Set up systemd service for NanoClaw auto-restart and prevention of duplicate instances | Claw Torque | To Do | 2026-02-03 | Recommended for stability |
| Re-authenticate WhatsApp | Dieter Werwath | To Do | 2026-02-03 | Stop process, delete `creds.json`, run `npm start`, scan QR |
| Create a backup script that zips `~/.openclaw/` | Claw Torque | To Do | 2026-02-04 | For easy Mac Mini migration |
| Push workspace to git remote | Claw Torque | To Do | 2026-02-04 | For extra redundancy |
| Set up auto-transcription for incoming voice notes using Whisper | Claw Torque | To Do | 2026-02-04 | |
| Install Tasker and AutoWear on phone | Dieter Werwath | To Do | 2026-02-04 | Required for Pixel Watch integration |
| Draft Tasker profile for Pixel Watch integration (C-lite) | Claw Torque | To Do | 2026-02-04 | For initial setup, full Iron Man later |
| Set up Google Drive access using `rclone mount` with a small cache | Claw Torque | To Do | 2026-02-04 | To avoid local storage issues |
| Configure cheaper models (Sonnet 4, Haiku) for sub-agents | Claw Torque | To Do | 2026-02-04 | To optimize costs |
| Provide a brain dump of active projects or specific things to remember | Dieter Werwath | To Do | 2026-02-04 | For agent to assist with management |

## Decisions
- Voice note transcription is fully integrated and working after process conflict resolution (Telegram): Confirmed working.
- Images are working perfectly: Confirmed working.
- Local file access: Confirmed full access to workspace and home directory.
- Git access: Confirmed access to `candid-labs`, `candidlabs`, `candid-labs-tiered` repos.
- Use `rclone mount` for Google Drive access: Decided against `rclone sync` to save local disk space, with a small cache.
- Proceed with setting up Pixel Watch integration via Tasker and Telegram, starting with Option C-lite: Bookmarked for later, but decided on the approach.
- Use Whisper.cpp for local voice transcription: Confirmed as a free and working solution.
- Implement a sub-agent architecture using cheaper models for heavy lifting (Sonnet 4, Haiku) and Opus 4.5 for orchestration: Agreed as the correct architectural approach.

## Context/Profile
- Dieter Werwath is running on a low-end Lenovo Chromebook Plus and plans to port to a Mac Mini soon.
- Dieter's Linux container has 41GB free out of 50GB.
- OpenClaw workspace is `~/.openclaw/` (772KB) and is portable for migration.
- `whisper.cpp` is built and available with `ggml-base.en` model (148MB).
- Dieter uses Google Pixel 9a and Pixel Watch.
- Dieter is a night owl, excited, and impatient.
- Dieter wants help managing projects and remembering things.
- Dieter wants to understand agent capabilities and prefers free tool options.
- Claw Torque can perform coding tasks across various languages, file management, git operations, package installations, debugging, and building applications.

## Backlog Ideas
- Set up PM2 to prevent duplicate NanoClaw instances.
- Set up a systemd service for NanoClaw auto-restart and prevention of duplicate instances.
- Google Calendar integration.
- Email access.
- Explore Dieter's project repos.
- Implement full Iron Man version of Pixel Watch integration (Option C).
- Set up health monitoring for connections.

## Done
- Resolved multiple NanoClaw instance conflicts.
- Killed all conflicting NanoClaw instances.
- Telegram working (single instance).
- Reactions working.
- Images working.
- Whisper transcription working locally (tested with voice message: "Can you process voice messages?").
- System health checked.
- Migration plan documented.
