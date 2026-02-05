/* ===========================================
   COMMAND CENTRE - Application Logic
   =========================================== */

// State
let tasksData = null;
let heartbeatState = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  
  renderAgents();
  await loadData();
  
  // Refresh data periodically
  setInterval(loadData, CONFIG.refreshInterval);
}

// Load all data
async function loadData() {
  try {
    // Load tasks
    const tasksResponse = await fetch(DATA_SOURCES.tasks);
    if (tasksResponse.ok) {
      tasksData = await tasksResponse.json();
      renderTasks();
      updateTaskCounts();
    }
    
    // Load heartbeat state
    try {
      const hbResponse = await fetch(DATA_SOURCES.heartbeat);
      if (hbResponse.ok) {
        heartbeatState = await hbResponse.json();
        updateHeartbeatStatus();
      }
    } catch (e) {
      // Heartbeat file may not exist yet
      console.log('Heartbeat state not available');
    }
    
    updateDataTimestamp();
    updatePulseIndicator(true);
    
  } catch (error) {
    console.error('Failed to load data:', error);
    updatePulseIndicator(false);
  }
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
  const tags = task.tags ? task.tags.slice(0, 2).map(t => `<span class="task-tag">#${t}</span>`).join(' ') : '';
  
  return `
    <li class="task-item">
      <span class="task-priority ${priorityClass}">${priorityClass}</span>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-meta">
          ${task.assignee ? `<span class="task-assignee">@${task.assignee}</span>` : ''}
          ${task.project ? `<span class="task-project">${task.project}</span>` : ''}
        </div>
      </div>
    </li>
  `;
}

function renderActivityItem(task) {
  const time = task.updatedAt ? formatRelativeTime(new Date(task.updatedAt)) : '';
  
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

// Render Agents
function renderAgents() {
  const container = document.getElementById('agent-roster');
  
  const html = AGENTS.map(agent => `
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
  
  if (heartbeatState && heartbeatState.lastHeartbeat) {
    const lastTime = new Date(heartbeatState.lastHeartbeat);
    const now = new Date();
    const diffMinutes = Math.floor((now - lastTime) / 60000);
    
    statusEl.textContent = diffMinutes < 60 ? 'Active' : 'Stale';
    statusEl.style.color = diffMinutes < 60 ? 'var(--accent-green)' : 'var(--accent-yellow)';
    
    lastEl.textContent = formatTime(lastTime);
    pulseTimeEl.textContent = formatTime(lastTime);
    pulseAgoEl.textContent = `(${formatRelativeTime(lastTime)})`;
  } else {
    statusEl.textContent = 'Unknown';
    lastEl.textContent = '-';
    pulseTimeEl.textContent = 'No data';
    pulseAgoEl.textContent = '';
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
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
