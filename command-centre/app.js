/* ===========================================
   COMMAND CENTRE - Application Logic v2.0
   =========================================== */

// State
let tasksData = null;
let heartbeatState = null;
let ideasData = null;
let agentsData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  
  setupCollapsibleSections();
  setupViewToggle();
  renderAgents();
  await loadData();
  
  // Refresh data periodically
  setInterval(loadData, CONFIG.refreshInterval);
  
  // Update relative times every minute
  setInterval(updateRelativeTimes, 60000);
}

// Setup collapsible sections
function setupCollapsibleSections() {
  document.querySelectorAll('.card-header.collapsible').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.getAttribute('data-section');
      const body = document.getElementById(section);
      const icon = header.querySelector('.collapse-icon');
      
      if (body) {
        body.classList.toggle('collapsed');
        icon.textContent = body.classList.contains('collapsed') ? '+' : '−';
      }
    });
  });
}

// Setup view toggle
function setupViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const view = btn.getAttribute('data-view');
      document.body.setAttribute('data-view', view);
      
      // Save preference
      localStorage.setItem('commandCentreView', view);
    });
  });
  
  // Restore saved view
  const savedView = localStorage.getItem('commandCentreView');
  if (savedView) {
    document.querySelector(`[data-view="${savedView}"]`)?.click();
  }
}

// Load all data
async function loadData() {
  try {
    // Load team roster from TEAM.md
    try {
      const teamResponse = await fetch(DATA_SOURCES.team + '?t=' + Date.now());
      if (teamResponse.ok) {
        const teamMd = await teamResponse.text();
        agentsData = parseTeamMarkdown(teamMd);
        if (agentsData.length === 0) agentsData = FALLBACK_AGENTS;
      }
    } catch (e) {
      console.log('Team roster not available, using fallback');
      agentsData = FALLBACK_AGENTS;
    }
    
    // Load tasks
    const tasksResponse = await fetch(DATA_SOURCES.tasks + '?t=' + Date.now());
    if (tasksResponse.ok) {
      tasksData = await tasksResponse.json();
      renderTasks();
      updateTaskCounts();
      updateHUD();
      renderAgentsWithCounts(); // Re-render agents with task counts
    }
    
    // Load heartbeat state
    try {
      const hbResponse = await fetch(DATA_SOURCES.heartbeat + '?t=' + Date.now());
      if (hbResponse.ok) {
        heartbeatState = await hbResponse.json();
        updateHeartbeatStatus();
      }
    } catch (e) {
      console.log('Heartbeat state not available');
    }
    
    // Load ideas
    try {
      const ideasResponse = await fetch(DATA_SOURCES.ideas + '?t=' + Date.now());
      if (ideasResponse.ok) {
        const text = await ideasResponse.text();
        ideasData = parseIdeasMarkdown(text);
        renderIdeas();
      }
    } catch (e) {
      console.log('Ideas not available');
      renderIdeasFallback();
    }
    
    updateDataTimestamp();
    updatePulseIndicator(true);
    
  } catch (error) {
    console.error('Failed to load data:', error);
    updatePulseIndicator(false);
  }
}

// Parse simple markdown ideas
function parseIdeasMarkdown(text) {
  const ideas = [];
  const lines = text.split('\n');
  let currentSection = null;
  
  for (const line of lines) {
    if (line.startsWith('## ') || line.startsWith('### ')) {
      currentSection = line.replace(/^#+\s*/, '').replace(/[*_]/g, '');
    } else if (line.match(/^- \[[ x]\]/)) {
      const checked = line.includes('[x]');
      const title = line.replace(/^- \[[ x]\]\s*/, '').replace(/\*\*/g, '');
      if (title.trim()) {
        ideas.push({
          title: title.split('—')[0].trim(),
          section: currentSection,
          done: checked,
          note: title.includes('—') ? title.split('—')[1]?.trim() : null
        });
      }
    }
  }
  return ideas;
}

// Render Ideas
function renderIdeas() {
  const container = document.getElementById('ideas-list');
  
  if (!ideasData || ideasData.length === 0) {
    renderIdeasFallback();
    return;
  }
  
  const html = ideasData.filter(i => !i.done).slice(0, 6).map(idea => `
    <div class="idea-item">
      <span class="idea-icon">💡</span>
      <div class="idea-content">
        <div class="idea-title">${escapeHtml(idea.title)}</div>
        ${idea.section ? `<div class="idea-section">${escapeHtml(idea.section)}</div>` : ''}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `<div class="ideas-list">${html || '<div class="empty-state"><div class="empty-state-text">No pending ideas</div></div>'}</div>`;
}

function renderIdeasFallback() {
  const container = document.getElementById('ideas-list');
  
  // Use backlog items tagged with specific projects as "ideas"
  const ideasFromBacklog = BACKLOG_IDEAS;
  
  if (ideasFromBacklog.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💭</div>
        <div class="empty-state-text">No ideas tracked yet</div>
      </div>
    `;
    return;
  }
  
  const html = ideasFromBacklog.map(idea => `
    <div class="idea-item">
      <span class="idea-icon">${idea.icon}</span>
      <div class="idea-content">
        <div class="idea-title">${escapeHtml(idea.title)}</div>
        <div class="idea-section">${escapeHtml(idea.category)}</div>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `<div class="ideas-list">${html}</div>`;
}

// Render Tasks
function renderTasks() {
  if (!tasksData || !tasksData.tasks) return;
  
  const tasks = tasksData.tasks;
  
  // Active tasks
  const activeTasks = tasks.filter(t => t.status === 'active');
  const activeContainer = document.getElementById('active-tasks');
  
  if (activeTasks.length === 0) {
    activeContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✨</div>
        <div class="empty-state-text">No active tasks</div>
      </div>
    `;
  } else {
    activeContainer.innerHTML = `<ul class="task-list">${activeTasks.map(renderTaskItem).join('')}</ul>`;
  }
  
  // Backlog tasks
  const backlogTasks = tasks.filter(t => t.status === 'backlog');
  const backlogContainer = document.getElementById('backlog-tasks');
  document.getElementById('backlog-badge').textContent = backlogTasks.length;
  
  if (backlogTasks.length === 0) {
    backlogContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-text">Backlog is empty</div>
      </div>
    `;
  } else {
    // Sort by priority
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    backlogTasks.sort((a, b) => (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3));
    backlogContainer.innerHTML = `<ul class="task-list">${backlogTasks.map(renderTaskItem).join('')}</ul>`;
  }
  
  // Blocked tasks (NEW)
  const blockedTasks = tasks.filter(t => t.status === 'blocked');
  const blockedContainer = document.getElementById('blocked-tasks');
  document.getElementById('blocked-badge').textContent = blockedTasks.length;
  
  if (blockedTasks.length === 0) {
    blockedContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✅</div>
        <div class="empty-state-text">Nothing blocked</div>
      </div>
    `;
  } else {
    blockedContainer.innerHTML = `<ul class="task-list">${blockedTasks.map(renderBlockedTaskItem).join('')}</ul>`;
  }
  
  // Recent activity (done tasks)
  const doneTasks = tasks.filter(t => t.status === 'done').slice(0, 5);
  const activityContainer = document.getElementById('recent-activity');
  
  if (doneTasks.length === 0) {
    activityContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div class="empty-state-text">No completed tasks yet</div>
      </div>
    `;
  } else {
    activityContainer.innerHTML = `<div class="activity-list">${doneTasks.map(renderActivityItem).join('')}</div>`;
  }
}

function renderTaskItem(task) {
  const priorityClass = task.priority || 'medium';
  const projectTag = task.project ? getProjectTag(task.project) : '';
  
  return `
    <li class="task-item">
      <span class="task-priority ${priorityClass}">${priorityClass.charAt(0).toUpperCase()}</span>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-meta">
          ${task.assignee ? `<span class="task-assignee">@${task.assignee}</span>` : ''}
          ${projectTag}
        </div>
      </div>
    </li>
  `;
}

function renderBlockedTaskItem(task) {
  const projectTag = task.project ? getProjectTag(task.project) : '';
  
  return `
    <li class="task-item blocked-item">
      <span class="task-priority blocked">⚠</span>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-meta">
          ${task.assignee ? `<span class="task-assignee">@${task.assignee}</span>` : ''}
          ${projectTag}
        </div>
        ${task.description ? `<div class="task-blocker">${escapeHtml(task.description.substring(0, 60))}...</div>` : ''}
      </div>
    </li>
  `;
}

// Project tag with color coding
function getProjectTag(project) {
  const projectColors = {
    'command-centre': { color: '#58a6ff', label: 'CC' },
    'candid-labs-tiered': { color: '#a371f7', label: 'Candid' },
    'candid': { color: '#a371f7', label: 'Candid' },
    'good-doctor': { color: '#3fb950', label: 'GD' },
    'infrastructure': { color: '#d29922', label: 'Infra' },
    'openclaw': { color: '#f97316', label: 'OC' }
  };
  
  const config = projectColors[project] || { color: '#8b949e', label: project };
  return `<span class="task-project" style="color: ${config.color}; border-color: ${config.color}">${config.label}</span>`;
}

function renderActivityItem(task) {
  const time = task.completedAt ? formatRelativeTime(new Date(task.completedAt)) : 
               task.updatedAt ? formatRelativeTime(new Date(task.updatedAt)) : '';
  
  return `
    <div class="activity-item">
      <span class="activity-icon">✅</span>
      <div class="activity-content">${escapeHtml(task.title)}</div>
      <span class="activity-time">${time}</span>
    </div>
  `;
}

// Update task counts
function updateTaskCounts() {
  if (!tasksData || !tasksData.tasks) return;
  
  const tasks = tasksData.tasks;
  const counts = {
    active: tasks.filter(t => t.status === 'active').length,
    backlog: tasks.filter(t => t.status === 'backlog').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    done: tasks.filter(t => t.status === 'done').length
  };
  
  document.getElementById('active-count').textContent = counts.active;
  document.getElementById('backlog-count').textContent = counts.backlog;
  document.getElementById('blocked-count').textContent = counts.blocked;
  document.getElementById('done-count').textContent = counts.done;
}

// Update HUD
function updateHUD() {
  if (!tasksData || !tasksData.tasks) return;
  
  const tasks = tasksData.tasks;
  const active = tasks.filter(t => t.status === 'active').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  const total = tasks.filter(t => t.status !== 'done' && t.status !== 'archived').length;
  
  document.getElementById('hud-tasks').textContent = `${active}/${total}`;
  document.getElementById('hud-blocked').textContent = blocked;
  document.getElementById('hud-blocked').style.color = blocked > 0 ? 'var(--accent-orange)' : 'var(--accent-green)';
  document.getElementById('hud-status').textContent = 'Online';
  document.getElementById('hud-status').style.color = 'var(--accent-green)';
}

// Render Agents with task counts
function renderAgentsWithCounts() {
  if (!tasksData || !tasksData.tasks) {
    renderAgents();
    return;
  }
  
  const container = document.getElementById('agent-roster');
  const tasks = tasksData.tasks;
  
  // Calculate counts per agent
  const agentCounts = {};
  tasks.forEach(task => {
    const assignee = task.assignee?.toLowerCase();
    if (!assignee) return;
    
    if (!agentCounts[assignee]) {
      agentCounts[assignee] = { active: 0, backlog: 0, blocked: 0 };
    }
    
    if (task.status === 'active') agentCounts[assignee].active++;
    else if (task.status === 'backlog') agentCounts[assignee].backlog++;
    else if (task.status === 'blocked') agentCounts[assignee].blocked++;
  });
  
  const agents = agentsData || FALLBACK_AGENTS;
  const html = agents.map(agent => {
    const counts = agentCounts[agent.id] || agentCounts[agent.name.toLowerCase()] || { active: 0, backlog: 0, blocked: 0 };
    const hasWork = counts.active > 0 || counts.backlog > 0 || counts.blocked > 0;
    const status = counts.active > 0 ? 'active' : (counts.blocked > 0 ? 'blocked' : agent.status);
    
    return `
      <div class="agent-item ${hasWork ? 'has-work' : ''}">
        <div class="agent-avatar">${agent.emoji}</div>
        <div class="agent-info">
          <div class="agent-name">${agent.name}</div>
          <div class="agent-role">${agent.role}</div>
        </div>
        <div class="agent-tasks">
          ${counts.active > 0 ? `<span class="agent-count active">${counts.active}</span>` : ''}
          ${counts.backlog > 0 ? `<span class="agent-count backlog">${counts.backlog}</span>` : ''}
          ${counts.blocked > 0 ? `<span class="agent-count blocked">${counts.blocked}</span>` : ''}
        </div>
        <span class="agent-status ${status}">${status}</span>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `<div class="agent-list">${html}</div>`;
}

// Basic agent render (without counts)
function renderAgents() {
  const container = document.getElementById('agent-roster');
  const agents = agentsData || FALLBACK_AGENTS;
  
  const html = agents.map(agent => `
    <div class="agent-item">
      <div class="agent-avatar">${agent.emoji}</div>
      <div class="agent-info">
        <div class="agent-name">${agent.name}</div>
        <div class="agent-role">${agent.role}</div>
      </div>
      <span class="agent-status ${agent.status}">${agent.status}</span>
    </div>
  `).join('');
  
  container.innerHTML = `<div class="agent-list">${html}</div>`;
}

// Update heartbeat status
function updateHeartbeatStatus() {
  const statusEl = document.getElementById('heartbeat-status');
  const lastEl = document.getElementById('last-heartbeat');
  const pulseTimeEl = document.getElementById('last-pulse-time');
  const pulseAgoEl = document.getElementById('pulse-ago');
  const hudHeartbeat = document.getElementById('hud-heartbeat');
  
  if (heartbeatState && heartbeatState.lastHeartbeat) {
    const lastTime = new Date(heartbeatState.lastHeartbeat);
    const now = new Date();
    const diffMinutes = Math.floor((now - lastTime) / 60000);
    
    statusEl.textContent = diffMinutes < 60 ? 'Active' : 'Stale';
    statusEl.style.color = diffMinutes < 60 ? 'var(--accent-green)' : 'var(--accent-yellow)';
    
    lastEl.textContent = formatTime(lastTime);
    pulseTimeEl.textContent = formatTime(lastTime);
    pulseAgoEl.textContent = `(${formatRelativeTime(lastTime)})`;
    hudHeartbeat.textContent = formatRelativeTime(lastTime);
  } else {
    statusEl.textContent = 'Unknown';
    lastEl.textContent = '-';
    pulseTimeEl.textContent = 'No data';
    pulseAgoEl.textContent = '';
    hudHeartbeat.textContent = '—';
  }
}

// Update pulse indicator
function updatePulseIndicator(healthy) {
  const indicator = document.getElementById('pulse-indicator');
  const dot = indicator.querySelector('.pulse-dot');
  const text = document.getElementById('pulse-text');
  
  if (healthy) {
    dot.className = 'pulse-dot';
    text.textContent = 'Online';
  } else {
    dot.className = 'pulse-dot error';
    text.textContent = 'Error';
  }
}

// Update relative times periodically
function updateRelativeTimes() {
  updateHeartbeatStatus();
  renderTasks(); // Re-render to update relative times
}

// Update timestamps
function updateDataTimestamp() {
  const el = document.getElementById('data-updated');
  el.textContent = formatTime(new Date());
}

function updateCurrentTime() {
  const el = document.getElementById('current-time');
  const now = new Date();
  el.textContent = now.toLocaleString('en-GB', {
    timeZone: CONFIG.timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Utility functions
function formatTime(date) {
  return date.toLocaleTimeString('en-GB', {
    timeZone: CONFIG.timezone,
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
