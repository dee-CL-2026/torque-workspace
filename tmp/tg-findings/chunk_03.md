## Tasks
| Task | Assigned | Status | Date | Notes |
|------|----------|--------|------|-------|
| Try VS Code for vault (`code ~/.openclaw/workspace/vault`) | Dieter | TODO | 2026-02-05 | |
| Add `All Raw Data` ID to Database Registry and run analyzer | Dieter | TODO | 2026-02-05 | |
| Copy/paste Tab Analysis Log output to chat (or use auto-export once implemented) | Dieter | TODO | 2026-02-05 | |
| Push GAS code after adding schema export to file | Dieter | TODO | 2026-02-05 | Includes git commit |
| Deep-dive into GAS files to map the current state and tab relationships | Torque | TODO | 2026-02-05 | To understand full data flow |
| Push latest GAS code to CandidLabs_Control_Centre | Dieter | TODO | 2026-02-05 | After `clasp login` and git commit |
| Refresh VS Code to see symlinked docs | Dieter | DONE | 2026-02-05 | Used "Reload Window" |
| Update VS Code | Dieter | DONE | 2026-02-05 | Offered an update and clicked "Always" for git tracking |
| Run `clasp login` to re-authenticate Google | Dieter | DONE | 2026-02-05 | After "invalid_grant" error |
| Run `clasp push` after login | Dieter | DONE | 2026-02-05 | To push `GlobalAnalyser.js` and `OpenOn.js` changes |
| Run `CMS Tools → 📋 Setup Database Registry` in Control Centre | Dieter | DONE | 2026-02-05 | To create/refresh the config tab |
| Set `Active = TRUE` for DBs to include in registry | Dieter | DONE | 2026-02-05 | (Initial manual step, later automated) |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` in Control Centre | Dieter | DONE | 2026-02-05 | To generate schema logs |
| Push latest GAS code to CandidLabs_Control_Centre | Dieter | DONE | 2026-02-05 | After script revisions |
| Run `CMS Tools → 📋 Setup Database Registry` (again after script revisions) | Dieter | DONE | 2026-02-05 | To populate with auto-discovered/hardcoded DBs |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` (again after script revisions) | Dieter | DONE | 2026-02-05 | To generate updated schema logs |
| Run `CMS Tools → 📋 Setup Database Registry` (final run for clean list) | Dieter | DONE | 2026-02-05 | Before final Global Tab Analyser run |
| Run `CMS Tools → 🌐 Run Global Tab Analyser` (final run) | Dieter | DONE | 2026-02-05 | To generate final schema logs |

## Decisions
- **Obsidian parked for now**: Due to janky performance on Chromebook; VS Code to be used for markdown editing.
- **20 Candid .docx files converted to .md**: All document files in `inbox/` were converted.
- **Original .docx files deleted from vault**: To keep the vault clean, but originals are safe in Drive.
- **Converted .md files moved to candid/ folder**: For organization within the vault.
- **Excel files not converted directly to markdown**: Due to complexity; options include CSV export or keeping as Excel.
- **Automated CSV export for frequently updated sheets (long-term)**: Via GAS script. Manual CSV export to `vault/inbox/` for now.
- **"183 metrics" CSV moved to `candid/Metric Tracker - Master List.md`**: For reference.
- **Screenshots for dashboard tabs initially**: For progress snapshots, with a plan to build project dashboards later.
- **`vault/candid/roadmap.md` created for BI metrics roadmap**: Separate from the site/portal roadmap initially, but later merged.
- **Project documentation restructured**: `~/candidlabs/docs/` as the single source of truth, symlinked into `~/.openclaw/workspace/vault/candid/`.
- **General project template established**: Own repo with `docs/` symlinked to vault for code/builds; pure notes/personal directly in vault.
- **Candid Labs restructure prioritized**: Before templating for other projects.
- **Global Tab Analyzer script to be drafted and tested**: For database schema analysis.
- **Global Tab Analyzer script revised for auto-discovery and core DB inclusion**: To streamline registry population.
- **Schema will be exported to a text file in Drive**: To enable Torque to read it directly without copy-pasting.
- **Git commits required when pushing GAS code**: To track changes.
- **`All Raw Data` spreadsheet ID to be added to Database Registry**: For analysis.

## Context/Profile
- **Dieter Werwath:** User, operates on a Chromebook, uses VS Code, Obsidian (janky), Google Sheets (databases), Google Apps Scripts (GAS), Google Drive. Prefers automated processes and centralized, structured documentation. Aims for a data architecture of "1 input (All Raw), processing layer, 1 set of outputs".
- **Torque:** AI assistant, manages files, converts documents, provides technical guidance, writes scripts, interacts with Git and local system.
- **Obsidian-Vault:** User's markdown vault, intended for notes and document management.
- **Candid Labs:** Main project Dieter is working on, involving documentation, metric tracking, BI dashboards, and underlying data sources/tools.
    - **`~/candidlabs/`**: Repository for portal code and `ROADMAP.md` (site/portal roadmap).
    - **`~/candid-labs-tiered/`**: Repository for data governance/doctrine.
    - **`~/.openclaw/workspace/vault/`**: Obsidian vault location.
- **Google Apps Script (GAS) Projects:**
    - `CandidLabs_Control_Centre`: Contains the tab analyzer and will house the Global Tab Analyser.
    - `Candid_Labs_Sales_Tool`
    - `Production_Master`
    - `Sales_MASTER`
    - `Candid Labs Loan Tracker`
    - `Candid Labs - Sales Data Updates`
- **Data Flow Goal:** Single input (`All Raw Data`) -> Processing Layer (Sales DB, Production DB) -> Outputs (Looker dashboards, slim, read-only).
- **Existing Documentation:** CR Docs (converted to vault), Metric Tracker, `candid-labs-tiered/00_DOCTRINE`, Database schemas.
- **Missing Documentation (as identified by Torque):** Full data flow mapping (which raw tabs feed which processed tabs), transformation logic docs, "how we got here" context docs.

## Backlog Ideas
- Revisit Obsidian for full functionality (e.g., graph view) on a more compatible device (Mac Mini).
- Add `[[wiki links]]` to markdown documents for better Obsidian graph visualization, either manually or via Torque analysis/suggestions.
- Build comprehensive project dashboards for everything.
- Develop a "Global Tab Analyzer" script to output the structure of every DB in the platform, going beyond the current summary.
- Implement a GAS API endpoint for Torque to perform read-only queries on Sheets and get fresh data.
- Set up GAS triggers to auto-export database schemas to a file in Drive that Torque can periodically read.
- Automate the export of key Google Sheets to CSV on a regular schedule, landing in a Drive staging area for Torque to pull.
- Create a full data flow diagram that explicitly maps which raw tabs feed which processed tabs.
- Document specific `IMPORTRANGE` mappings used in the Google Sheets.
- Create "how we got here" context documents for the project's evolution.

## Done
- **Obsidian installed**: [2026-02-05]
- **VS Code setup as markdown editor**: [2026-02-05]
- **20 Candid .docx files converted to .md**: [2026-02-05]
- **Original .docx files deleted from vault**: [2026-02-05]
- **Converted .md files moved to `candid/` folder**: [2026-02-05]
- **Metric tracker (184 metrics) imported**: [2026-02-05]
- **Metric tracker moved to `candid/Metric Tracker - Master List.md`**: [2026-02-05]
- **`vault/candid/roadmap.md` created for BI metrics roadmap**: [2026-02-05]
- **Restructured Candid Labs documentation**: `~/candidlabs/docs/` as single source of truth, symlinked into `~/.openclaw/workspace/vault/candid/`. [2026-02-05]
- **Wiki links added**: ROADMAP ↔ BRAINSTORM, ROADMAP → Metric Tracker, ROADMAP → Manifest, System Architecture. [2026-02-05]
- **Both `candidlabs` and `torque-workspace` repos pushed to GitHub**: [2026-02-05]
- **`GlobalAnalyser.js` created and `OpenOn.js` modified**: For Global Tab Analyser functionality. [2026-02-05]
- **`GAS-Records` made Git-tracked**: [2026-02-05]
- **Database schemas for core DBs saved to `candidlabs/docs/database-schema.md`**: Including Sales DB, Production DB, Sales Tools, Loan Tracker, Sales Updates. [2026-02-05]
- **Function added to export schema to a text file in Drive**: `📤 Export Schema to File`. [2026-02-05]