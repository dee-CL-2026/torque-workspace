# Overnight Task: Candid/Candidlabs Context Questions
*Generated 2026-02-05 ~02:40 GMT+7*
*For Dee to review when waking up*

---

## What I Know So Far

From exploring your repos tonight:

- **candidlabs** — Internal portal with budget planner, tools page, dashboards
- **candid-labs-tiered** — Data governance doctrine (Raw → Cleaned → Ready)
- **Roadmap** — 7 phases from tool connections through CRM
- **Budget planner** — PKF Indonesia FY24-25 data imported, scenarios working
- You're a **cofounder**, learning git/dev tooling, ~10 days into this journey

---

## Questions to Help Me Give Better Ideas

### 1. The Business

- [ ] What does Candid Mixers actually make? (Mixers for cocktails? Sodas? RTD beverages?)
- [ ] How big is the team? (Headcount, departments)
- [ ] What's the current stage? (Revenue? Pre-revenue? Growth phase?)
- [ ] Who are the other cofounders/key stakeholders?
- [ ] What's the 1-year vision? 3-year?

### 2. The Pain Points

- [ ] What's the #1 operational problem you're trying to solve right now?
- [ ] What takes too long or happens too manually?
- [ ] Where do things fall through the cracks?
- [ ] What decisions do you wish you had better data for?

### 3. The Tools Ecosystem

- [ ] What Google Sheets currently power the business? (You mentioned CoreOS Hub, Production Master, Sales Master, Financial Tracker, Loan Tracker, KAA Generator)
- [ ] What does each one do / who owns it?
- [ ] What's Looker Studio currently tracking?
- [ ] Any other tools in the stack? (Accounting software? Inventory? CRM?)

### 4. The Candidlabs Platform

- [ ] Who are the primary users? (Just you? Whole team? Specific roles?)
- [ ] What's the most urgent feature after budget planner?
- [ ] Is this hosted anywhere yet, or local only?
- [ ] What would "success" look like for candidlabs in 3 months?

### 5. The Data Doctrine

- [ ] The Raw → Cleaned → Ready framework is solid. Is this implemented yet, or still planning?
- [ ] What's the first "spoke" you're migrating?
- [ ] Where does the raw data come from? (Manual entry? Integrations? Exports?)

### 6. Your Role & Time

- [ ] How much time per week do you realistically have for Candid vs Good Doctor?
- [ ] What tasks do you WANT to delegate but currently can't?
- [ ] What would free up the most mental energy if it "just worked"?

---

## Data/Access Requests

If you're comfortable sharing, these would help me help you:

1. **Access to a sample Google Sheet** (any of the core ones) — so I understand the data structure
2. **The PKF Indonesia financials summary** — or just the key metrics you're modeling
3. **Org chart or team list** — even informal
4. **Screenshots of Looker dashboards** — if they exist
5. **Any pitch deck or one-pager** — helps me understand how you describe the business

---

## What I Did Overnight

- [x] Reviewed candidlabs repo structure
- [x] Read ROADMAP.md, BRAINSTORM.md, PLAN-budget-planner.md
- [x] Reviewed candid-labs-tiered doctrine files
- [x] **Deep dive into budget-data.js** — this is gold
- [x] Compiled this question list
- [ ] Deeper code review (waiting for your go-ahead)

---

## What I Learned From Your Data

**Company:** PT Unisoda Mitra Jaya (Candid Mixers)

**Products:**
- Club Soda (3,750 IDR/can)
- Imperial (4,250 IDR/can)
- Ginger (4,250 IDR/can)
- Green Tea & Finn's Breeze (inactive)

**Sales Channels:**
- On Trade (Hotels, Restaurants, Bars): **100% of revenue**
- Modern Trade (Supermarkets): **0** ← opportunity
- E-commerce: **0** ← opportunity

**Financials (IDR):**
| Metric | FY2024 | FY2025 | Change |
|--------|--------|--------|--------|
| Revenue | 5.0B | 5.5B | +10% |
| Gross Margin | 40.7% | 54.8% | 🎉 +14pts |
| OpEx | 1.6B | 2.5B | +60% 😬 |
| Net Profit | 471M | 445M | -5% |
| Net Margin | 9.4% | 8.1% | -1.3pts |

**Key Insight:**
Your COGS efficiency is *crushing it* — gross margin jumped 14 points! But OpEx is eating the gains:
- Salaries: 170M → 605M (+255%)
- Consulting: 71M → 322M (+353%)
- Subscriptions: 40M → 125M (+212%)

This is classic growth-stage investment. You're building capacity. The question is: **when does it pay off?**

---

## Ideas Based on What I Found

### 💡 Idea 1: Modern Trade / E-commerce Push

You're 100% On Trade (bars, restaurants, hotels). Zero in Modern Trade and E-commerce.

**The question:** Is this intentional, or an opportunity?

If opportunity:
- E-commerce could be quick win (Tokopedia, Shopee) with minimal COGS impact
- Modern Trade is harder (listing fees, payment terms) but bigger volume

Your FY2024 data shows 111M IDR in "Listing Fee" expense that went to 0 in FY2025. What happened there?

---

### 💡 Idea 2: OpEx Efficiency Tracking

Your gross margin is excellent (55%). But OpEx jumped 60% YoY and ate your profit growth.

**Suggestion:** Add an OpEx efficiency dashboard to candidlabs:
- OpEx as % of revenue (target vs actual)
- Category breakdown (where's the growth?)
- Cost per head (you added people — is productivity scaling?)

This helps answer: "Are we investing, or are we leaking?"

---

### 💡 Idea 3: Sales Seasonality Tool

Your monthly data shows clear patterns:
- Apr-Sep: Strong (555M → 629M peaks)
- Jan-Mar, Nov-Dec: Weaker (148M → 324M troughs)

**Opportunity:** Build a seasonality view into candidlabs to help with:
- Inventory planning (don't overstock in Q1)
- Marketing timing (push harder in shoulder months)
- Cash flow forecasting

---

### 💡 Idea 4: The Data Doctrine is Solid — Now Ship It

The Raw → Cleaned → Ready doctrine is impressive. But 01_COREOS only has a manifest.md.

**Question:** What's blocking the first spoke migration (sales_master)?

If it's time/bandwidth, this is exactly the kind of task a sub-agent could help with. Give me the source sheet structure, I can draft the scaffold.

---

### 💡 Idea 5: Quick Win — "Daily Pulse" Homepage

Before you build full Looker integration, what if candidlabs homepage showed:

```
┌────────────────────────────────────────┐
│ CANDID PULSE — Wed 5 Feb 2026          │
├────────────────────────────────────────┤
│ MTD Revenue: IDR 412M (vs 450M target) │
│ Gross Margin: 54.2% ✓                  │
│ Open Orders: 12                        │
│ Last Updated: 2 hours ago              │
├────────────────────────────────────────┤
│ [View Budget] [Sales Master] [CoreOS]  │
└────────────────────────────────────────┘
```

No Looker. Just fetch from your existing sheets and display. Could build this in a day.

---

## Summary: My Overnight Read

**Candid is healthy.** Gross margin improvement is real. Revenue growing. Profit stable despite heavy investment in team and systems.

**The risk:** OpEx outpacing revenue growth. If FY2026 revenue doesn't accelerate, margins compress.

**The opportunity:** Modern Trade, E-commerce, and better operational visibility.

**What I need from you:** Answers to the questions above, and permission to dig into the actual Google Sheets when you're ready.

---

*Ready when you are.*

— Torque 🔧
