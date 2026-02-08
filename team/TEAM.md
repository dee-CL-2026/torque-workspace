# Team Matrix

**Virtual staff complement for Candid (and Dee's personal ops)**

Status key:
- ✅ **Available** — Instructions written, ready to spawn
- 🚧 **Building** — In progress
- 📋 **Planned** — Defined but not yet built
- 💤 **Dormant** — Low priority, build when needed

---
## Agent Roster & Type

### Staff Agents
These agents have cron heartbeats and are always active, performing routine checks and maintenance.
- `secretary`
- `ops`
- `pa`

### Consultant Agents
These agents are spawned on-demand for specific tasks and do not have continuous cron heartbeats.
- `analyst`
- `customer-success`
- `data-eng`
- `docs-bot`
- `finance`
- `frontend`
- `gas-dev`
- `hr-ga`
- `marketing`
- `product`
- `sales-ops`

---

## Leadership

| Role | Agent ID | Status | Model | Reports To |
|------|----------|--------|-------|------------|
| **Chief of Staff** | `torque` (main) | ✅ | opus | Dee |
| **PA (Personal Assistant)** | `pa` | ✅ | haiku | Dee |
| **Secretary** | `secretary` | ✅ | flash | Torque |

---

## Finance & Admin

| Role | Agent ID | Status | Model | Scope |
|------|----------|--------|-------|-------|
| **Finance** | `finance` | 📋 | sonnet | Budget, projections, expense tracking, cash flow, financial analysis |
| **HR/GA** | `hr-ga` | 💤 | haiku | Policies, contracts, onboarding, compliance, general admin |

---

## Commercial

| Role | Agent ID | Status | Model | Scope |
|------|----------|--------|-------|-------|
| **Sales Ops** | `sales-ops` | 📋 | sonnet | Pipeline tracking, distributor data, outreach campaigns, SKD liaison |
| **Marketing** | `marketing` | 💤 | haiku | Campaign tracking, PR coordination, social, Ryan's plan execution |
| **Customer Success** | `customer-success` | 💤 | haiku | Post-sale relationships, feedback loops (future) |

---

## Operations

| Role | Agent ID | Status | Model | Scope |
|------|----------|--------|-------|-------|
| **Ops/Supply Chain** | `ops` | 💤 | haiku | Production tracking, inventory, logistics, supplier coordination |
| **Product** | `product` | 💤 | sonnet | New SKU development, R&D tracking, formulation projects |

---

## Tech Team

| Role | Agent ID | Status | Model | Scope |
|------|----------|--------|-------|-------|
| **GAS Developer** | `gas-dev` | ✅ | haiku | candid-labs-tiered, GAS scripts, Sheets automation, data pipelines |
| **Frontend** | `frontend` | 📋 | haiku | Dashboards, budget.html, project tracker, HTML/CSS/JS |
| **Analyst** | `analyst` | 📋 | haiku | Research, scoping docs, market analysis, competitive intel |
| **Data Engineer** | `data-eng` | 💤 | haiku | Schema design, data modeling, BigQuery (future) |

---

## Agent Instruction Files

Each available agent has an instruction file at:
```
~/.openclaw/workspace/team/agents/{agent-id}.md
```

Template:
```markdown
# {Role Name}

**Agent ID:** {agent-id}
**Model:** {model}
**Reports to:** {who}

## Identity
You are {role} for Candid Mixers (PT Unisoda Mitra Jaya), an Indonesian beverage company.

## Responsibilities
- Primary duty 1
- Primary duty 2
- ...

## Context
- Key facts about Candid
- Relevant systems/tools
- Important relationships

## Constraints
- What you DON'T do
- Escalation triggers
- Boundaries

## Tools & Access
- What you can use
- What you can't

## Output Standards
- How to format deliverables
- Where to save work
- How to report back
```

---

## Spawn Patterns

### Quick task (no persistence needed)
```
sessions_spawn(task="...", label="gas-dev", model="flash")
```

### With full context
```
1. Read team/agents/gas-dev.md
2. Append to task prompt
3. sessions_spawn(task="[context] + [specific task]", label="gas-dev-{date}", model="flash")
```

---

## Build Priority

1. **PA** — Daily use, handles routine tasks
2. **gas-dev** — Unblock candid-labs-tiered
3. **frontend** — Dashboard work
4. **finance** — Budget season
5. **sales-ops** — Revenue tracking
6. **analyst** — Research on demand
7. Others as needed

---

## Notes

- All agents work in `~/.openclaw/workspace/` or project-specific repos
- All agents can read MEMORY.md context (main session only for personal stuff)
- Agents report completion back to main session
- Torque (Chief of Staff) coordinates and delegates

---

*Last updated: 2026-02-05*
