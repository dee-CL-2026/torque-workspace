# Knowledge Layer Architecture

**Status:** Draft  
**Owner:** [[Torque]]  
**Based on:** [[Strategy – Candid AI Knowledge Architecture & Gemini Gems Plan – v1.0]]

---

## Core Principle

> **The vault is for knowing what is true. Agents are for deciding what to do about it.**

---

## Three-Layer Model

### 1. 📚 Truth Layer (Vault)

**What it is:** Canonical, approved, slow-changing documents.

**Lives in:**
- `vault/` — Obsidian-style knowledge base
- `candidlabs/docs/` — Candid operational docs
- `MEMORY.md` — Long-term curated memory

**Properties:**
- Read-mostly (changes are intentional)
- Linked via [[wiki links]]
- Searchable via `memory_search`
- Source of truth for all reasoning

**What goes here:**
- ✅ Final decisions
- ✅ Approved policies
- ✅ Reference material
- ✅ Canonical processes
- ❌ Drafts, brainstorms, experiments

---

### 2. 🧠 Reasoning Layer (Agents)

**What it is:** Agents that think *from* the truth layer.

**How it works:**
1. Query the vault (memory_search, file reads)
2. Reason from what's found
3. Propose actions, flag gaps
4. Never invent facts

**Agents:**
- [[Torque]] — Chief of Staff, orchestration
- [[PA]] — Personal assistant
- [[gas-dev]] — Technical implementation
- [[secretary]] — Bulk processing
- [[analyst]] — Research (queries vault heavily)

**Key rule:** Agents cite sources. If it's not in the vault, flag it as missing.

---

### 3. 🔬 Exploration Layer (Personal/Drafts)

**What it is:** Thinking space before things become canonical.

**Lives in:**
- `vault/drafts/` — Work in progress
- `vault/inbox/` — Unsorted incoming
- Chat conversations (ephemeral)
- Personal AI tools

**What goes here:**
- ✅ Brainstorms
- ✅ Hypotheses
- ✅ Early drafts
- ✅ Experiments

**Graduation:** When something is final → move to Truth Layer.

---

## Vault Structure

```
vault/
├── architecture/        ← Meta docs (this file)
│   └── KNOWLEDGE-LAYER.md
├── candid/              ← Symlink to candidlabs/docs
├── team/                ← Agent profiles, team docs
├── projects/            ← Active project docs
├── reference/           ← Stable reference material
├── drafts/              ← WIP, not canonical
├── inbox/               ← Unsorted incoming
└── templates/           ← Reusable templates
```

---

## Linking Convention

Use [[wiki links]] liberally:

- Link to people: [[Dee]], [[Torque]], [[Sinead]]
- Link to concepts: [[Candid Mixers]], [[SKD]]
- Link to docs: [[BUDGET-2026-DRAFT]], [[ROADMAP]]
- Link to projects: [[candid-labs-tiered]]

**Backlinks reveal relationships.** The more links, the richer the graph.

---

## Query Patterns

### "What do we know about X?"
```
memory_search("X") → read relevant docs → summarize
```

### "What should we do about X?"
```
memory_search("X") → reason from findings → propose actions → cite sources
```

### "Is this consistent with our policies?"
```
memory_search("policy Y") → compare → flag conflicts
```

---

## Related Docs

- [[MEMORY.md]] — Long-term curated memory
- [[AGENTS.md]] — How agents operate
- [[team/TEAM.md]] — Staff roster
- [[Strategy – How Candid Uses NotebookLM & Gemini Gems]]

---

*Last updated: 2026-02-06*
