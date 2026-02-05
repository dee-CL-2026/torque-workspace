# Dashboard Kit

Reusable dashboard template with MindsetStack-inspired aesthetic.

## Files

| File | Purpose |
|------|---------|
| `dashboard-base.css` | Core styles, themes, components |
| `dashboard-components.js` | JS helper functions for building UI |
| `template.html` | Working example with all components |

## Quick Start

1. Copy the 3 files to your project folder
2. Edit `template.html` — replace sample data with yours
3. Open in browser

## Components Available

### Ring Gauge
```javascript
createRingGauge(percent, label, options)
// percent: 0-100
// label: text below gauge
// options: { size, strokeWidth }
```

### Stat Card
```javascript
createStatCard(value, label, change)
// value: "5.52B" or number
// label: "YTD Revenue"
// change: { value: 9.6, period: 'YoY' } or null
```

### Progress Bar
```javascript
createProgressBar(percent, leftLabel, rightLabel)
```

### Task List
```javascript
createTaskList([
  { text: 'Task name', done: true },
  { text: 'Another task', done: false }
])
```

### Data Table
```javascript
createTable(headers, rows, options)
// headers: ['Col1', 'Col2', 'Col3']
// rows: [['a', 'b', 'c'], ['d', 'e', 'f']]
// options: { compare: true } for right-aligned numbers
```

### Status Badge
```javascript
createBadge('Active', 'success')
// types: success, warning, danger, info, neutral
```

### Number Formatting
```javascript
formatNumber(1234567, 'Rp ', '')  // "Rp 1,234,567"
formatIDR(5520000000)             // "5.5B"
```

## Theming

Edit CSS variables in `dashboard-base.css`:

```css
:root {
  /* Change these for a new color scheme */
  --accent-primary: #7cb083;      /* Main color */
  --accent-secondary: #a8d5ae;    /* Lighter shade */
  --accent-muted: #e8f5e9;        /* Background tint */
}
```

### Preset Palettes

**Sage Green (default)**
```css
--accent-primary: #7cb083;
--accent-secondary: #a8d5ae;
--accent-muted: #e8f5e9;
```

**Pink/Lavender**
```css
--accent-primary: #c9a0c9;
--accent-secondary: #e0c5e0;
--accent-muted: #f8f0f8;
```

**Blue**
```css
--accent-primary: #5b8fb9;
--accent-secondary: #8bb8d9;
--accent-muted: #e8f4fc;
```

## Connecting to Live Data

### Option 1: Google Sheets (Simple)
Use Sheets API or publish as CSV, fetch in JS:
```javascript
fetch('YOUR_SHEETS_CSV_URL')
  .then(r => r.text())
  .then(csv => { /* parse and update data object */ });
```

### Option 2: GAS Web App
Publish your GAS as web app returning JSON:
```javascript
fetch('YOUR_GAS_WEB_APP_URL')
  .then(r => r.json())
  .then(data => { /* update and render */ });
```

### Option 3: Static Export
Generate HTML with data baked in (what Torque can do for daily snapshots).

## Usage Pattern

1. **Daily Cockpit** — Single page you check each morning
2. **Project Dashboard** — One per major initiative
3. **Investor Update** — Clean view for sharing externally

## Files Location

```
~/.openclaw/workspace/vault/templates/dashboard-kit/
├── README.md
├── dashboard-base.css
├── dashboard-components.js
└── template.html
```

Copy to project folder and customize from there.
