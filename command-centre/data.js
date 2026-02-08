/* ===========================================
   COMMAND CENTRE - Static Data & Config v2.1
   =========================================== */

// Data source URLs (GitHub raw content)
const DATA_SOURCES = {
  metrics: '../data/dash-metrics.json',
  metricsFallback: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/dash-metrics.json',
  heartbeat: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/heartbeat-state.json',
  team: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/team/TEAM.md',
  rateLimits: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/rate-limits.json'
};

// Quick access links (raw files)
const QUICK_LINKS = [
  { label: 'dash-metrics.json', url: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/dash-metrics.json', icon: '📊' },
  { label: 'tasks.md', url: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/tasks.md', icon: '📝' },
  { label: 'tasks-done.md', url: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/tasks-done.md', icon: '✅' },
  { label: 'backlog.md', url: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/backlog.md', icon: '📥' },
  { label: 'TEAM.md', url: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/team/TEAM.md', icon: '👥' },
  { label: 'Workspace Repo', url: 'https://github.com/dee-CL-2026/torque-workspace', icon: '🗂️' }
];

// Rate limit HUD fallback (when rate-limits.json missing)
const DEFAULT_RATE_LIMITS = {
  updatedAt: null,
  providers: [
    { name: 'Anthropic', model: 'opus', limit: '—', used: '—', reset: '—' },
    { name: 'Google', model: 'gemini-flash', limit: '—', used: '—', reset: '—' },
    { name: 'OpenAI', model: 'gpt-4o', limit: '—', used: '—', reset: '—' }
  ]
};

// Config
const CONFIG = {
  refreshInterval: 60000, // 1 minute
  timezone: 'Asia/Jakarta',
  morningReportTime: '07:00'
};
