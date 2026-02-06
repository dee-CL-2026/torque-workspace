/* ===========================================
   COMMAND CENTRE - Static Data & Config v2.0
   =========================================== */

// Agent Roster - Now loaded dynamically from team/TEAM.md
// See parseTeamMarkdown() and FALLBACK_AGENTS below

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
  ideas: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/IDEAS.md',
  team: 'https://raw.githubusercontent.com/dee-CL-2026/torque-workspace/master/team/TEAM.md'
};

// Parse TEAM.md markdown into agent roster
function parseTeamMarkdown(markdown) {
  const agents = [];
  const lines = markdown.split('\n');
  
  // Status emoji mapping
  const statusMap = {
    '✅': 'ready',
    '🚧': 'building', 
    '📋': 'planned',
    '💤': 'dormant'
  };
  
  // Role emoji mapping
  const emojiMap = {
    'chief of staff': '⚙️',
    'personal assistant': '📋',
    'secretary': '📝',
    'gas developer': '🔧',
    'frontend': '🎨',
    'analyst': '📊',
    'data engineer': '💾',
    'finance': '💰',
    'sales ops': '📈',
    'marketing': '📣',
    'wa monitor': '📱',
    'scraper': '🕷️'
  };
  
  let inTable = false;
  
  for (const line of lines) {
    // Look for table rows with agent data
    if (line.includes('|') && line.includes('`')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      
      // Skip header rows
      if (cells[0]?.includes('Role') || cells[0]?.includes('---')) continue;
      
      // Parse: | **Role** | `agent-id` | Status | Model | ...
      if (cells.length >= 4) {
        const role = cells[0]?.replace(/\*\*/g, '').trim();
        const idMatch = cells[1]?.match(/`([^`]+)`/);
        const id = idMatch ? idMatch[1] : null;
        const statusCell = cells[2]?.trim();
        const model = cells[3]?.toLowerCase().trim();
        
        if (id && role) {
          // Find status from emoji
          let status = 'planned';
          for (const [emoji, stat] of Object.entries(statusMap)) {
            if (statusCell?.includes(emoji)) {
              status = stat;
              break;
            }
          }
          
          // Find emoji for role
          let emoji = '🤖';
          const roleLower = role.toLowerCase();
          for (const [key, em] of Object.entries(emojiMap)) {
            if (roleLower.includes(key)) {
              emoji = em;
              break;
            }
          }
          
          agents.push({
            id,
            name: role.replace(/^(The\s+)?/, ''),
            emoji,
            role,
            status,
            model: model || 'haiku'
          });
        }
      }
    }
  }
  
  return agents;
}

// Fallback agents if TEAM.md fetch fails
const FALLBACK_AGENTS = [
  { id: 'torque', name: 'Torque', emoji: '⚙️', role: 'Orchestrator', status: 'active', model: 'opus' }
];

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
