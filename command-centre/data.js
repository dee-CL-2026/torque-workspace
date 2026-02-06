/* ===========================================
   COMMAND CENTRE - Static Data & Config v2.0
   =========================================== */

// Agent Roster (from team/TEAM.md)
const AGENTS = [
  {
    id: 'torque',
    name: 'Torque',
    emoji: '⚙️',
    role: 'Orchestrator',
    status: 'active',
    model: 'opus'
  },
  {
    id: 'pa',
    name: 'PA',
    emoji: '📋',
    role: 'Personal Assistant',
    status: 'ready',
    model: 'sonnet'
  },
  {
    id: 'wa-monitor',
    name: 'WA Monitor',
    emoji: '📱',
    role: 'WhatsApp Monitor',
    status: 'ready',
    model: 'flash'
  },
  {
    id: 'gas-dev',
    name: 'GAS Dev',
    emoji: '🔧',
    role: 'Apps Script Developer',
    status: 'idle',
    model: 'sonnet'
  },
  {
    id: 'analyst',
    name: 'Analyst',
    emoji: '📊',
    role: 'Data & Research',
    status: 'ready',
    model: 'flash'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    emoji: '🎨',
    role: 'UI/Dashboard Builder',
    status: 'ready',
    model: 'sonnet'
  },
  {
    id: 'scraper',
    name: 'Scraper',
    emoji: '🕷️',
    role: 'Browser Automation',
    status: 'idle',
    model: 'sonnet'
  }
];

// Fallback ideas when ideas.md isn't available
const BACKLOG_IDEAS = [
  {
    title: 'Token usage tracking for dashboard',
    category: 'Command Centre',
    icon: '📊'
  },
  {
    title: 'Daily idea generator cron',
    category: 'Automation',
    icon: '💡'
  },
  {
    title: 'Meeting transcript processor',
    category: 'Agents',
    icon: '📝'
  },
  {
    title: 'Silent monitor mode for groups',
    category: 'OpenClaw',
    icon: '👁️'
  },
  {
    title: '"It\'s All Torque" podcast/blog',
    category: 'Content',
    icon: '🎙️'
  },
  {
    title: 'Family Command Centre',
    category: 'Future',
    icon: '👨‍👩‍👧'
  }
];

// Data source URLs (GitHub raw content)
const DATA_SOURCES = {
  tasks: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/tasks.json',
  heartbeat: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/heartbeat-state.json',
  ideas: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/IDEAS.md'
};

// Config
const CONFIG = {
  refreshInterval: 60000, // 1 minute
  timezone: 'Asia/Jakarta',
  morningReportTime: '07:00'
};

// Project color mapping
const PROJECT_COLORS = {
  'command-centre': { bg: 'rgba(88, 166, 255, 0.15)', color: '#58a6ff', label: 'CC' },
  'candid-labs-tiered': { bg: 'rgba(163, 113, 247, 0.15)', color: '#a371f7', label: 'Candid' },
  'candid': { bg: 'rgba(163, 113, 247, 0.15)', color: '#a371f7', label: 'Candid' },
  'good-doctor': { bg: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', label: 'GD' },
  'infrastructure': { bg: 'rgba(210, 153, 34, 0.15)', color: '#d29922', label: 'Infra' },
  'openclaw': { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316', label: 'OC' }
};
