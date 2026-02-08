# Command Centre V2 Dashboard Specification

**URL:** `torque-works.pages.dev`
**Responsible Agent:** `frontend`

## 1. Current State

The existing Command Centre is a basic web interface served from the `command-centre/` directory, consisting of `index.html`, `app.js`, `styles.css`, and `data.js`. As described in `docs/reference/mission-control-guide.md`, it likely provides a basic view of agent activities and tasks. The `frontend` agent is currently responsible for its maintenance and deployment to Cloudflare Pages.

Based on the `mission-control-guide.md`, the current UI likely includes:
- Activity Feed
- Task Board (Kanban columns)
- Agent Cards
- Document Panel
- Detail View (for tasks)

The `frontend.md` agent spec confirms its current responsibilities include "Live subagent status" and "`tasks.md` integration".

## 2. Proposed Modules

### a. Agent Roster
- **Description:** Displays a list of all active agents.
- **Details:**
    - Distinguish between "Staff" (e.g., core agents like Jarvis) and "Consultants" (e.g., temporary or specialized agents).
    - Show active/idle status for each agent.
    - Indicate the `currentTaskId` or last known activity for active agents.

### b. Task Board
- **Description:** A Kanban-style board visualizing tasks.
- **Details:**
    - Reads tasks from a single `tasks.md` file (as per `frontend.md`).
    - Tasks displayed by status (e.g., Inbox, Assigned, In Progress, Review, Done, Blocked).
    - Show task assignee(s).
    - Display counts of tasks per status and per assignee.
    - Support filtering tasks (see Dee's requirements).

### c. Cron Timeline
- **Description:** Visual representation of scheduled cron jobs.
- **Details:**
    - List active cron jobs registered with OpenClaw.
    - Show the `last run` timestamp.
    - Show the `next run` timestamp.
    - Highlight overdue or failed cron jobs.

### d. Cost Tracker
- **Description:** Monitors and displays token usage.
- **Details:**
    - Show token usage per agent per day.
    - Provide a daily total token usage.
    - Potentially break down usage by model if different models are used by agents.

### e. Nightly Digest Status
- **Description:** Displays the status of the daily digest generation and export.
- **Details:**
    - Show the `last export` timestamp (when data was last gathered for digest).
    - Show the `last digest` timestamp (when the digest was last sent to the user).
    - Indicate success or failure of the digest process.

## 3. Data Sources

### a. Agent Roster
- **Source:** OpenClaw Gateway status (`clawdbot gateway status` or similar API), potentially supplemented by a static `team/agents/*.md` directory or a Convex `agents` table (if the Convex setup is integrated). The `mission-control-guide.md` indicates a Convex `agents` table with `name`, `role`, `status`, `currentTaskId`, and `sessionKey`.

### b. Task Board
- **Source:** `tasks.md` file, which is the canonical source for tasks. `mission-control-guide.md` also mentions a Convex `tasks` table with `title`, `description`, `status`, `assigneeIds`. Given `frontend.md` explicitly mentions `tasks.md` integration, this will be the primary source for V2, with potential for Convex integration in a later phase.

### c. Cron Timeline
- **Source:** OpenClaw Gateway API to list cron jobs (`clawdbot cron list`).

### d. Cost Tracker
- **Source:** OpenClaw Gateway logs or dedicated token usage logs that record agent activity and associated token consumption. This would likely require parsing log files or querying a persistent store.

### e. Nightly Digest Status
- **Source:** A dedicated status file (e.g., `data/nightly-digest-status.json` or `memory/nightly-digest.md`) updated by the nightly digest cron job, or queries against a Convex `activities` table if the digest process logs there.

## 4. Tech Approach

- **Hosting:** Static site deployed to Cloudflare Pages (`torque-works.pages.dev`).
- **Frontend:** Vanilla HTML, CSS, and JavaScript, as specified in `team/agents/frontend.md`. Avoidance of heavy frameworks to keep it lightweight.
- **Data Update Mechanism:**
    - **Push-based for dynamic data:** A background process or a dedicated agent (e.g., the `frontend` agent itself, or a new `dashboard-updater` agent) will periodically gather data from various sources (OpenClaw APIs, log files, `tasks.md`).
    - This agent will then update a `data.js` file or generate small JSON files within the `command-centre/data/` directory.
    - The Cloudflare Pages deployment can be triggered by a Git push whenever `data.js` or data JSON files are updated, ensuring the dashboard reflects the latest state.
    - Alternatively, for real-time updates without redeployment, the frontend JS could make direct HTTP requests to a local OpenClaw gateway endpoint if accessible, or to a Convex database if integrated. For MVP, periodic data file updates and re-deploys are preferred for simplicity.
- **Rendering:** Client-side JavaScript will read the `data.js` or JSON files and dynamically render the dashboard modules.

## 5. MVP vs. Full Implementation

### Minimum Viable Product (MVP)
- **Agent Roster:** Basic list of agents with active/idle status (derived from last activity timestamp or explicit status). Staff vs. Consultant distinction can be hardcoded or read from a simple config file.
- **Task Board:** Read and display tasks from `tasks.md` by status. Basic counts per status.
- **Cron Timeline:** List cron jobs with last and next run times.
- **Dee's Requirements:**
    - **Desk/Mobile Filter:** Implement basic CSS media queries for responsive layout, offering different views for desktop and mobile.
    - **Quick Access Links:** A static list of predefined important links in the UI.

### Full Implementation (Future Enhancements)
- **Agent Roster:** Integrate with Convex `agents` table for richer data (roles, `currentTaskId`).
- **Task Board:**
    - Advanced filtering (by assignee, keywords).
    - Interactive task updates (click to change status, assign).
    - Integration with Convex `tasks` table for real-time updates and richer task attributes (description, comments).
- **Cron Timeline:**
    - Visual timeline view (e.g., Gantt-like).
    - Ability to trigger/pause cron jobs from the UI (requires more complex API integration).
    - Detailed error logging for failed crons.
- **Cost Tracker:**
    - Historical trends (daily, weekly, monthly usage).
    - Cost breakdown by model.
    - Budget alerts.
- **Nightly Digest Status:**
    - Detailed log of digest content.
    - Ability to re-trigger digest generation.
- **Dee's Requirements:**
    - **Rate Limit HUD:** Integrate with OpenClaw Gateway API for real-time rate limit information. This is complex for a static site and might require a small backend proxy or WebSocket connection.
    - **Output File Links on Task Completion:** Tasks in the Task Board will display clickable links to output files generated by agents (e.g., research reports, generated images). This requires a mechanism for agents to register their output files in a structured way (e.g., within `tasks.md` or a Convex `documents` table).

## 6. Dee's Requirements from Chat

The following requirements from Dee will be incorporated:

- **Desk/Mobile Filter:** The dashboard must be responsive, providing an optimized viewing experience for both desktop and mobile devices. This will be achieved through media queries and flexible layouts.
- **Rate Limit HUD (Head-Up Display):** A small, persistent overlay or section on the dashboard to display the current API rate limits and usage. This provides real-time visibility into operational constraints. *Note: As discussed in Tech Approach, this might be an MVP-later feature due to static site limitations for real-time API polling.*
- **Quick Access Links:** A clearly visible section with links to frequently used resources or agent-related tools. These will be configurable.
- **Output File Links on Task Completion:** When an agent completes a task and generates an output file (e.g., a report, an image), a clickable link to this file should be displayed on the corresponding task entry in the Task Board. This assumes a structured way for agents to report output file paths.