## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Command Centre dashboard - GitHub Pages setup | Claw Torque | Needs Deployment | 2026-02-06 | Initial build ✅, needs deployment to make accessible. |
| Task/backlog module | Claw Torque | In progress | 2026-02-06 | |
| Improve Command Centre layout | Claw Torque | Active | 2026-02-06 | Layout fixes: side-by-side/tabbed Tasks+Backlog, fixed height, scrollable, add channel status bar. |
| Activity log file creation and update | Claw Torque | To Do | 2026-02-06 | Append every significant action to `data/activity.json`. |
| Task hygiene and logging | Claw Torque | To Do | 2026-02-06 | Mark tasks done, write down every completed action. |
| Reconcile and log past events | Claw Torque | To Do | 2026-02-06 | List out what actually happened since last night and log it properly. |

## Decisions
- Claw Torque can handle both DMs and group chats, but group JIDs need to be added to config.
- The "It's All Torque" family group was added to config with `requireMention: false` (Claw Torque is an active member).
- Aaron group rules were established: no trigger required, no Candid business details, no personal life from MEMORY.md, OpenClaw help/setup tips/general banter are OK, surface-level family refs are fine. Tech buddy mode.
- Custom domain for Candidlabs is recommended for a real business due to professionalism, branding, portability, and control, despite a small annual cost. Cloudflare Registrar is preferred for integration.
- The Command Centre (personal) and Family dashboards will be hosted on Cloudflare Pages (`torque-workspace`), while Candidlabs (business) will be on `candidmixers.com/candidlab` or `candidlab.co` later.
- Cloudflare Tunnel and Pages are separate but can share a domain via subdomains (e.g., `tunnel.yourdomain.com`, `app.yourdomain.com`, `yourdomain.com`).
- A personal Gmail account should be used to create the Cloudflare free account.
- For Cloudflare Pages deployment of the Command Centre, no build command is needed as it's static HTML/CSS/JS.
- Cloudflare project names cannot be changed later as they become the subdomain.
- The production branch for `torque-workspace` on Cloudflare Pages is `master`.
- The Cloudflare project, initially set up as a Workers project, needed to be deleted and recreated as a pure Pages project due to mandatory deploy commands in Workers.
- The build output directory for the Cloudflare Pages project should be `command-centre`.
- Candidlabs site will be pulled into Cloudflare Pages with Access protection, then the GitHub Pages will be disabled, and the repo potentially privatized.
- Data loading for tasks will be fixed by updating `data/heartbeat-state.json` and `tasks.json` with completion timestamps and pushing to GitHub.

## Context/Profile
- Claw Torque needs full context before responding to ensure appropriate communication.
- "It's All Torque" is a family group with JID `120363426498709975@g.us`.
- Aaron Milburn is a "next convert" for OpenClaw.
- The user had a wedding breakfast scheduled for 10am.
- Aaron is a Kiwi with an Aussie wife and 3 kids; 2 eldest are similar ages to Evie & Connie (user's daughters), attended the same school, and were friends. He is a close family friend who knows Sinead and the kids well.
- The family group intro cron job was mistakenly scheduled for 7am instead of 6am.
- The user was up until ~1:17am setting up OpenClaw.
- Claw Torque was supposed to be positioned as "the proper version" of Sinead's holiday GPT.
- Claw Torque sent Aaron an intro explaining the WhatsApp quirk (looks like user messaging) and offered a 🇳🇿 emoji as a signature.
- Claw Torque noted the user had less than 5 hours of sleep available and advised them to sleep.
- The user's desk environment includes a Candid soda can, Kratos, and an ultrawide monitor.
- The user's wedding breakfast location is 6-7 minutes away from their house.
- The `torque-workspace` repository is hosted on GitHub (`dee-CL-2026/torque-workspace`).

## Backlog Ideas
- Deploy tiered fork to GAS.
- Set up a Torque email address.
- Implement a Cloudflare tunnel for remote access to the Chromebook.
- Populate `candid/` directory with colleagues' files.
- Review the full Sinead chat context.
- Process 7 unprocessed YouTube videos.
- Set up Cloudflare account for personal Gmail.
- Add Cloudflare Access for login protection for the Command Centre.
- Add `candidlabs-site` as a second Cloudflare Pages project.
- Integrate Session stats into Command Centre (requires pulling from OpenClaw API).
- Implement a real-time activity log file for the Command Centre.
- Fine-tune Command Centre layout (e.g., tabs, more granular time display for pulse).

## Done
- **Group JID captured for "It's All Torque":** `120363426498709975@g.us`
- **"It's All Torque" group added to config:** ✅ (Active member, `requireMention: false`)
- **6am intro scheduled and Gateway restarted:** ✅ (Initial setup for family group)
- **Aaron group rules established and confirmed:** ✅ (Tech buddy mode, no personal/Candid business from MEMORY.md)
- **"OpenClaw for Aaron" group JID captured and configured:** `120363404970214457@g.us` (No trigger required)
- **Intro sent to Aaron:** ✅ (Explained WA quirk, offered 🇳🇿 emoji)
- **Morning Report cron confirmed working:** ✅
- **Heartbeat confirmed running:** ✅
- **WhatsApp groups mapped:** ✅
- **`people/friends/aaron.md` created:** ✅ (with context from last night)
- **Context-separated contact system restructured:** ✅ (Family, Friends, Candid folders with JID mapping in files)
- **Sinead intro sent to "It's All Torque":** ✅ (Manually pushed after cron job failed)
- **Cloudflare Pages project `torque-works` deployed:** ✅ (Command Centre is live)
- **Data loading for Command Centre fixed:** ✅ (GitHub raw URL fetch for `tasks.json`)
- **Heartbeat data updated and pushed:** ✅ (Dashboard now reflects recent pulse)
- **`tasks.md` and `tasks.json` updated with completion timestamps for done tasks:** ✅ (Reflects actual work done)
- **Morning report cron:** ✅ 2026-02-06 06:33
- **Command Centre v0.1 built:** ✅ 2026-02-06 06:40
- **Sinead intro sent:** ✅ 2026-02-06 07:07
- **Context folders + contact files created:** ✅ 2026-02-06 07:08
- **Cloudflare Pages deployed:** ✅ 2026-02-06 08:10
- **Data loading fixed for dashboard:** ✅ 2026-02-06 08:14