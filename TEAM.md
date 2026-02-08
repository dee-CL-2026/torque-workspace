# Torque's Team Roster (TEAM.md)

This document provides an overview of the agents assisting Torque, outlining their roles, responsibilities, and operational models.

---

## Agent Type Distinction

*   **Staff Agents:** These agents are always active and typically run on a periodic cron schedule (heartbeat). They handle ongoing, routine tasks and proactive monitoring.
*   **Consultant Agents:** These agents are spawned on-demand by Torque for specific, non-routine tasks. They do not have their own cron schedules.

---

## Team Summary

| Agent ID          | Role Title                | Type       | Default Model           |
|-------------------|---------------------------|------------|-------------------------|
| analyst           | Analyst                   | Consultant | google/gemini-2.5-flash |
| customer-success  | Customer Success          | Consultant | google/gemini-2.5-flash |
| data-eng          | Data Engineer             | Consultant | openai/gpt-5.2-codex    |
| docs-bot          | OpenClaw Documentation Expert | Consultant | google/gemini-2.5-flash |
| finance           | Finance                   | Consultant | google/gemini-2.5-flash |
| frontend          | Frontend Developer        | Consultant | openai/gpt-5.2-codex    |
| gas-dev           | GAS Developer             | Consultant | openai/gpt-5.2-codex    |
| hr-ga             | HR & General Affairs      | Consultant | google/gemini-2.5-flash |
| marketing         | Marketing                 | Consultant | google/gemini-2.5-flash |
| ops               | Operations                | Staff      | google/gemini-2.5-flash |
| pa                | Personal Assistant (PA)   | Staff      | google/gemini-2.5-flash |
| product           | Product                   | Consultant | google/gemini-2.5-flash |
| sales-ops         | Sales Operations          | Consultant | google/gemini-2.5-flash |
| secretary         | Secretary Agent           | Staff      | google/gemini-2.5-flash |

---

## Agent Details

### analyst

*   **Agent ID:** `analyst`
*   **Role Title:** Analyst
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Research and analysis tasks, video/content summarization, data mapping and documentation, market research and competitive intel, extracting actionable insights from sources.
*   **Cron Schedule:** N/A

### customer-success

*   **Agent ID:** `customer-success`
*   **Role Title:** Customer Success
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Customer feedback tracking and analysis, client relationship management support, retention and satisfaction monitoring, complaint/issue resolution tracking, customer communication drafts, NPS/satisfaction reporting.
*   **Cron Schedule:** N/A

### data-eng

*   **Agent ID:** `data-eng`
*   **Role Title:** Data Engineer
*   **Type:** Consultant Agent
*   **Default Model:** `openai/gpt-5.2-codex`
*   **Core Responsibilities:** Design and maintain data pipelines, database schema design and optimization, ETL/ELT process development, data quality monitoring and validation, integration between systems (Sheets, databases, APIs), query optimization and performance.
*   **Cron Schedule:** N/A

### docs-bot

*   **Agent ID:** `docs-bot`
*   **Role Title:** OpenClaw Documentation Expert
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Search OpenClaw's official documentation and provide accurate, factual answers.
*   **Cron Schedule:** N/A

### finance

*   **Agent ID:** `finance`
*   **Role Title:** Finance
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Financial reporting and analysis, budget tracking and forecasting, cost analysis (COGS, OpEx, margins), invoice and receivables tracking, investor reporting support, P&L analysis.
*   **Cron Schedule:** N/A

### frontend

*   **Agent ID:** `frontend`
*   **Role Title:** Frontend Developer
*   **Type:** Consultant Agent
*   **Default Model:** `openai/gpt-5.2-codex`
*   **Core Responsibilities:** Build and maintain web dashboards (HTML/CSS/JS), Cloudflare Pages deployments, data visualization and charting, responsive design (mobile + desktop), infographic/image rendering.
*   **Cron Schedule:** N/A

### gas-dev

*   **Agent ID:** `gas-dev`
*   **Role Title:** GAS Developer
*   **Type:** Consultant Agent
*   **Default Model:** `openai/gpt-5.2-codex`
*   **Core Responsibilities:** Develop and maintain GAS scripts for data pipelines, deploy code via clasp, validate script outputs, implement tiered data architecture, maintain lineage tracking, debug and fix script errors, document changes.
*   **Cron Schedule:** N/A

### hr-ga

*   **Agent ID:** `hr-ga`
*   **Role Title:** HR & General Affairs
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Team documentation and org charts, policy drafting and compliance, onboarding/offboarding checklists, office and logistics coordination, vendor management support, leave and schedule tracking.
*   **Cron Schedule:** N/A

### marketing

*   **Agent ID:** `marketing`
*   **Role Title:** Marketing
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Marketing campaign planning, content creation and copywriting, brand positioning and messaging, social media strategy, competitor analysis, co-branding partnerships, event marketing.
*   **Cron Schedule:** N/A

### ops

*   **Agent ID:** `ops`
*   **Role Title:** Operations
*   **Type:** Staff Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Production tracking and scheduling, supply chain coordination, logistics and shipping management, process optimization, inventory monitoring, quality control tracking, vendor/supplier coordination.
*   **Cron Schedule:** Periodic heartbeat (every 15 min via main cron).

### pa

*   **Agent ID:** `pa`
*   **Role Title:** Personal Assistant (PA)
*   **Type:** Staff Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Calendar management and reminders, task follow-ups and nagging, quick lookups and fact-finding, routine communications drafting, travel and logistics coordination, expense tracking reminders, meeting prep, personal errands and admin.
*   **Cron Schedule:** Periodic heartbeat (every 15 min via main cron); Daily morning briefing cron task.

### product

*   **Agent ID:** `product`
*   **Role Title:** Product
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Product roadmap management, R&D tracking, market research for new products, packaging and labeling decisions, product specs and documentation, competitive product analysis.
*   **Cron Schedule:** N/A

### sales-ops

*   **Agent ID:** `sales-ops`
*   **Role Title:** Sales Operations
*   **Type:** Consultant Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Sales pipeline tracking and reporting, distributor (SKD) data coordination, order processing and fulfillment tracking, sales forecasting, territory and channel analysis, road show planning support.
*   **Cron Schedule:** N/A

### secretary

*   **Agent ID:** `secretary`
*   **Role Title:** Secretary Agent
*   **Type:** Staff Agent
*   **Default Model:** `google/gemini-2.5-flash`
*   **Core Responsibilities:** Task routing, documentation, meeting prep. Specifically, monitoring and updating `tasks.md`, archiving completed tasks to `tasks-done.md`, and flagging overdue or blocked tasks.
*   **Cron Schedule:** Periodic heartbeat (every 15 min via main cron).