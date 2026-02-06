/* ===========================================
   COMMAND CENTRE - Static Data & Config
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
  }
];

// Data source URLs (GitHub raw content)
const DATA_SOURCES = {
  tasks: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/tasks.json',
  heartbeat: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/data/heartbeat-state.json'
};

// Config
const CONFIG = {
  refreshInterval: 60000, // 1 minute
  timezone: 'Asia/Jakarta',
  morningReportTime: '07:00'
};
