## Tasks
| Task | Assigned | Status | Date | Notes |
|---|---|---|---|---|
| Use Mindstax for one week, track 3 habits | Dieter | Pending | N/A | Before designing Mindstax 2.0 |
| Generate questions/data requests for Candid | Claw | Done | 2026-02-05 | Completed overnight task. |
| Dictate responses/answers to overnight doc via voice note | Dieter | In Progress | 2026-02-05 | Attempted long voice note, encountered issues. |
| Transcribe, structure, and add to the doc | Claw | In Progress | 2026-02-05 | Processed key takeaways from Dieter's voice note. |
| Review candidlabs codebase, data doctrine fork, and draft scaffold for sales_master spoke | Claw | Pending | N/A | Awaiting further context/guardrails. |
| Create shared Google Drive folder for docs and give Linux access | Dieter | Done | 2026-02-05 | Shared "Candid CMS" drive. |
| Set up Obsidian-ready folder structure in the workspace | Claw | Pending | N/A | To be done after Obsidian setup walkthrough. |
| Export key docs as Markdown from Google Docs | Dieter | Pending | N/A | Cherry-pick critical docs initially. |
| Draft GAS export script for bulk export of Google Docs to Markdown/PDF | Claw | Pending | N/A | For later implementation. |

## Decisions
*   **Family Logistics:** A shared family system (Google Calendar or lightweight custom solution) is needed to improve communication.
*   **Smart Home:** To build out a smart home using local control (Home Assistant) when a Mac Mini arrives, due to patchy Jakarta internet.
*   **Fitness:** Claw will help Dieter build a "personal operating system" for fitness, leveraging competition, community, and data.
*   **Mindstax:** Dieter purchased Mindstax physical tracker cards. He will use them for one week, tracking 3 habits, before considering improvements/monetization.
*   **ISM (It Starts Monday):** Dieter is exploring bringing the UK "It Starts Monday" movement to Indonesia.
*   **Claw's Operating Modes:** Claw will operate in two modes: "Work Torque" (logical, systematic, clear) for business tasks and "Personal Torque" (listener, talker, human) for personal conversations, with overlap allowed.
*   **Overnight Task:** Claw accepted the task to generate questions/data requests for Candid for Dieter to wake up to.
*   **Chromebook Power Settings:** Dieter configured his Chromebook to stay awake.
*   **Overnight Doc Delivery:** Overnight summaries will be delivered as a 5-bullet summary in Telegram with a link to the full doc on GitHub.
*   **GitHub Integration:** Claw set up a private GitHub repository for Dieter's `torque-workspace` for version control and mobile access to documents.
*   **Voice Capability:** Claw has voice capability; initial voice was female, but Dieter prefers male (due to "Torque" being a childhood imaginary friend). Different voices for different personas to be explored later.
*   **Voice Note Workflow:** A workflow was agreed upon where Dieter dictates responses via voice note, and Claw transcribes and structures them.
*   **Long Voice Notes:** For long voice notes (e.g., 18 minutes), they should be broken into smaller chunks or transcribed locally by Dieter due to processing limitations.
*   **WhatsApp Setup:** WhatsApp setup is to be deferred due to previous issues; sharing rules and a dedicated local number are prerequisites.
*   **Google Drive Access:** Dieter shared the "Candid CMS (Corp Drive)" Google Drive with Linux. Claw will operate under an honor system for read-only access for now, with full transparency.
*   **Obsidian Setup:** An Obsidian vault will be set up in the workspace, and critical Google Docs will be exported as Markdown. A GAS script for bulk export to Markdown/PDF will be considered for the future.

## Context/Profile
*   **Dieter Werwath:**
    *   **Family:** Married to Sinead (deputy head at international school, sometimes forgets shared logistics). Two children, Evie and Connie.
    *   **Background:** British. Only child, third culture kid. Complex family history: Ghanaian grandfather, Welsh grandmother, German POW great-grandfather (maybe), English mum, Black dad (left at 3, but "same person"). Mum, dad, and stepdad died within 7 months. Siblings include one brother, twin brother/sister, and step-siblings. Lived in UK, Spain, Indonesia, potentially moving again in 2 years.
    *   **Personality:** Hyperfocused on interesting things, procrastinates on "should-do" tasks. Stubborn. Requires external systems/accountability. Many projects started, few finished ("configuration, not character flaw"). Self-deprecating humor. Loves rom-coms/weepy coming-of-age TV, singing, and almost all music genres.
    *   **Health & Habits:** Struggles with sleep (brain has no off switch). Recently quit a big Coca-Cola habit, replaced with soda water.
    *   **Fitness:** Big Arsenal fan (still plays football at 46, mini-soccer on Tuesdays). Did a sprint triathlon with no training, beating his wife. Has "capacity" but lacks a "system" for personal fitness. Finds motivation in competition, community, and data (e.g., "It Starts Monday" movement). Recently started playing padel (Thursdays, social, competitive).
    *   **Business & Aspirations:** Runs two companies (Candid, Good Doctor), four investments. Side projects include TSLC, SuperheroNinjaPirate, betting bots. Aspirations: smart home, stretching studio, yoga app, writing "memoirs" (life stories).
    *   **Challenges:** Patchy internet in Jakarta. Communication gaps with wife. Sleep issues. Procrastination on personal routines.
    *   **Tools/Workflow:** Uses Google Drive extensively. Exploring Obsidian for notes. Prefers dictating long responses.
*   **Claw (Assistant):** Operating as "Torque," an imaginary friend from Dieter's childhood. Has voice capabilities. Supports GitHub integration, Google Drive access (read-only by policy for now), and can help with personal systems, business analysis, and documentation.
*   **Candid (Company):**
    *   **Products:** Club Soda, Imperio Tonic, Ginger (hybrid). R&D in Green Tea and Nipis Madu (lemon soda).
    *   **Market:** Finn's Beach Club deal (co-brand), potential Australia expansion. Website: candidmixers.com.
    *   **Team:** 5 co-founders (one problematic). Dieter is the only one working day-to-day. One VA in Philippines. Sales team in field. Distributor: SKD Cahaya Jaya (issues with data visibility).
    *   **Structure:** Singapore holding company (99% Indonesia). 4 Indo founders, 5 equal shareholders in SG.
    *   **Timeline:** Founded 2022, Launched 2023, Investor 2024, Big distributor 2025.
    *   **Vision:** 1-year: stabilize, grow team. 3-year: first real funding round (possibly next year).
    *   **Pain Points:** Understaffed, time-constrained, manual processes (common in Indonesia), poor distributor data (limited visibility on Modern Trade, "awful, janky, slow").
    *   **Financials (per budget-data.js):** Gross margin improved from 40.7% (FY2024) to 54.8% (FY2025) due to volume, cheaper Club Soda, less expensive Ginger. OpEx up 60% (salaries, consulting eating gains). Net profit flat. Consulting spike due to legal/accounting cleanup for investor readiness (expected to drop).
    *   **Priorities for CandidLabs:** User roles & permissions, "Daily Pulse" homepage, potential to ditch Looker UI for direct reports in candidlabs, share 183 metrics list.
*   **Good Doctor (Investment):** Dieter is locked in until end of 2026 (ESOP/shares). Frustrated with CEO Danny (different styles, no data culture). Considering part-time or consultant role. Partner Julian shares frustrations.
*   **Ryan's Setup:** Ryan (also on OpenClaw journey) has his vault in Obsidian and uses a bot in WhatsApp (@tagged, private data kept private, helpful for general questions, research, brainstorming, drafting).

## Backlog Ideas
*   Build a lightweight shared family system for events/commitments with reminders for both Dieter and Sinead.
*   Set up Home Assistant on a Raspberry Pi or old laptop for local smart home control, integrated with family routines/reminders.
*   Claw to track EPL fixtures and provide heads-up to Dieter.
*   Explore bringing "It Starts Monday" (ISM) movement to Indonesia.
*   Bring "Park Run" to Indonesia.
*   Start working on Dieter's "memoirs" / "stories" / "The Collection" / "Life, Unfiltered" / journaling, with Claw's help to capture, timestamp, and tag.
*   Claw to help build a personal operating system for Dieter with the same rigor as Candid's data infrastructure.
*   Explore different voices for Claw for different personas/modes.
*   Set up WhatsApp for Claw, establish sharing rules, and connect with Ryan's bot.
*   Build a simple candidlabs "Torque Notes" page that pulls from workspace/notes for mobile-friendly access to documents.
*   Implement user roles & permissions for candidlabs.
*   Develop a "Daily Pulse" homepage for candidlabs showing Month-to-Date (MTD) numbers.
*   Consider building reports directly within candidlabs, potentially moving away from Looker UI.
*   Share the "183 metrics list" with Claw.
*   Create a Google Apps Script (GAS) for bulk export of Google Docs (as Markdown or PDF) to a shared Drive folder that syncs with Linux.

## Done
*   Read `tmp/tg-chunks/chunk_02`.
*   Dieter provided extensive context about his family, businesses, and personal life.
*   Claw acknowledged the two modes of operation (Work Torque, Personal Torque).
*   Claw completed the overnight task of generating questions/data requests for Candid.
*   Dieter configured his Chromebook to stay awake.
*   Claw successfully set up a private GitHub repository for `torque-workspace`.
*   Claw demonstrated voice capability.
*   Dieter shared "Candid CMS (Corp Drive)" Google Drive with Linux.
*   Dieter provided a transcribed voice note containing updates on Candid, Good Doctor, and financials.
*   Claw processed the key takeaways from Dieter's transcribed voice note.
*   Claw confirmed the ability to see the shared Google Drive content.
*   Claw identified that the Google Drive share had write access, not read-only, and promised to adhere to read-only by policy.
