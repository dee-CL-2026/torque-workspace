# Project Dashboard - Design Spec

**Status:** 🧠 Ideation  
**Created:** 2026-02-05  
**Inspired by:** MindsetStack templates + Candid budget.html tab pattern

---

## Vision

A single dashboard where the team can flip between **project status** and **tasks**, with high-level metrics at a glance. Think: the budget builder's tab/sidebar UX, but for project & task management.

---

## Core Concepts

### 1. Hero Section
Top of page — quick snapshot that changes based on selection.

**Shows:**
- Ring gauge for overall completeness
- Next action / current blocker
- Key metric (e.g., days until deadline, % tasks done)

### 2. Navigation Pattern (TBD - pick one)

**Option A: Tabs (horizontal)**
```
[ Projects ] [ Tasks ] [ Timeline ]
```
- Familiar pattern
- Good for 2-4 top-level views
- Works well on mobile

**Option B: Sidebar with project list**
```
┌─────────────────────────────────────────┐
│ PROJECTS          │  [Hero Section]     │
│ ─────────────     │  Project: Website   │
│ ● Website         │  ████████░░ 73%     │
│   Candid Ops      │                     │
│   Holywings       │  Next: Review copy  │
│   Budget FY26     │                     │
│                   │  [Details below...] │
│ VIEWS             │                     │
│ ─────────────     │                     │
│   All Tasks       │                     │
│   My Tasks        │                     │
│   Timeline        │                     │
└─────────────────────────────────────────┘
```
- Click project → hero updates + shows project details
- Persistent project list always visible
- More scalable for many projects

**Option C: Hybrid**
- Sidebar for project list
- Tabs within the content area for different views of selected project

---

## Hero Section Detail

When a project is selected, the hero shows:

```
┌─────────────────────────────────────────────────────┐
│  PROJECT: Website Refresh                           │
│                                                     │
│    ┌─────┐                                          │
│    │ 73% │   Status: 🔥 Active                      │
│    │ ██░░│   Target: Feb 28                         │
│    └─────┘   Owner: Sarah                           │
│                                                     │
│  NEXT ACTION                                        │
│  ☐ Review homepage copy from Sarah                  │
│                                                     │
│  BLOCKED BY                                         │
│  ⚠️ Waiting on brand assets from design            │
└─────────────────────────────────────────────────────┘
```

---

## Content Views (below hero)

### Project Status View
- Task breakdown (done / in progress / blocked / backlog)
- Recent activity log
- Team assignments

### Tasks View
- Filterable task list
- Checkboxes for quick completion
- Group by: project, status, assignee

### Timeline View (future)
- Gantt-style or simple milestone view
- When things are due

---

## Data Structure

```javascript
const projects = [
  {
    id: 'website',
    name: 'Website Refresh',
    status: 'active',        // active | blocked | done | backlog
    owner: 'Sarah',
    target: '2026-02-28',
    percentComplete: 73,
    nextAction: 'Review homepage copy from Sarah',
    blockedBy: 'Waiting on brand assets from design',
    tasks: [
      { text: 'Wireframes', done: true },
      { text: 'Homepage copy', done: false },
      { text: 'Brand assets', done: false, blocked: true },
      // ...
    ]
  },
  // more projects...
];
```

---

## Reference: Budget Builder Pattern

From `candidlabs/budget.html`:
- **Sidebar navigation** with sections (Views, Scenarios, etc.)
- **Sticky sidebar** that stays visible on scroll
- **Active state styling** shows current selection
- **Content area updates** based on sidebar clicks
- **Responsive:** collapses to single column on mobile

---

## Open Questions

- [ ] Tabs vs sidebar vs hybrid?
- [ ] How many projects before this feels cluttered?
- [ ] Do we need per-user "My Tasks" view?
- [ ] Integration with actual task data (markdown files? Sheets? GAS?)
- [ ] Mobile-first or desktop-first?

---

## Next Steps

1. Pick navigation pattern (Option A/B/C)
2. Build static mockup with sample data
3. Test with real Candid projects
4. Decide on data source (manual JSON vs connected)

---

*Add notes / sketches / ideas below:*

