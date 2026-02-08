/* ===========================================
   COMMAND CENTRE - Application Logic v2.1
   =========================================== */

let tasks = [];
let tasksDone = [];
let backlogCount = 0;
let teamRoster = { staff: [], consultants: [], roles: {} };
let heartbeatState = null;
let rateLimitData = null;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  setupCollapsibleSections();
  setupViewToggle();
  renderQuickLinks();
  renderRateLimits();
  await loadData();

  setInterval(loadData, CONFIG.refreshInterval);
  setInterval(updateRelativeTimes, 60000);
}

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

function setupViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      document.body.setAttribute('data-view', view);
      localStorage.setItem('commandCentreView', view);
    });
  });

  const savedView = localStorage.getItem('commandCentreView');
  if (savedView) document.querySelector(`[data-view="${savedView}"]`)?.click();
}

async function loadData() {
  try {
    // TEAM roster
    try {
      const teamResponse = await fetch(DATA_SOURCES.team + '?t=' + Date.now());
      if (teamResponse.ok) {
        const teamMd = await teamResponse.text();
        teamRoster = parseTeamRoster(teamMd);
      }
    } catch (e) {
      teamRoster = { staff: [], consultants: [], roles: {} };
    }

    // tasks.md
    try {
      const tasksResponse = await fetch(DATA_SOURCES.tasksMd + '?t=' + Date.now());
      if (tasksResponse.ok) {
        const tasksMd = await tasksResponse.text();
        tasks = parseTasksTable(tasksMd);
      }
    } catch (e) {
      tasks = [];
    }

    // tasks-done.md
    try {
      const doneResponse = await fetch(DATA_SOURCES.tasksDoneMd + '?t=' + Date.now());
      if (doneResponse.ok) {
        const doneMd = await doneResponse.text();
        tasksDone = parseDoneTable(doneMd);
      }
    } catch (e) {
      tasksDone = [];
    }

    // backlog.md
    try {
      const backlogResponse = await fetch(DATA_SOURCES.backlogMd + '?t=' + Date.now());
      if (backlogResponse.ok) {
        const backlogMd = await backlogResponse.text();
        backlogCount = countBacklogItems(backlogMd);
      }
    } catch (e) {
      backlogCount = 0;
    }

    // heartbeat
    try {
      const hbResponse = await fetch(DATA_SOURCES.heartbeat + '?t=' + Date.now());
      if (hbResponse.ok) {
        heartbeatState = await hbResponse.json();
      }
    } catch (e) {
      heartbeatState = null;
    }

    // rate limits
    try {
      const rateResponse = await fetch(DATA_SOURCES.rateLimits + '?t=' + Date.now());
      rateLimitData = rateResponse.ok ? await rateResponse.json() : DEFAULT_RATE_LIMITS;
    } catch (e) {
      rateLimitData = DEFAULT_RATE_LIMITS;
    }

    renderTasksBoard();
    renderAssignees();
    renderRoster();
    renderRecentDone();
    updateSummaryCounts();
    updateHUD();
    updateHeartbeatStatus();
    renderRateLimits();
    updateDataTimestamp();
    updatePulseIndicator(true);
  } catch (error) {
    console.error('Failed to load data:', error);
    updatePulseIndicator(false);
  }
}

// ---------- Rendering ----------

function renderTasksBoard() {
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const blockedTasks = tasks.filter(t => t.status === 'blocked');

  renderTaskColumn('pending-tasks', pendingTasks, 'No pending tasks');
  renderTaskColumn('inprogress-tasks', inProgressTasks, 'No tasks in progress');
  renderTaskColumn('blocked-tasks', blockedTasks, 'Nothing blocked');

  document.getElementById('pending-badge').textContent = pendingTasks.length;
  document.getElementById('inprogress-badge').textContent = inProgressTasks.length;
  document.getElementById('blocked-badge').textContent = blockedTasks.length;
}

function renderTaskColumn(containerId, list, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✨</div>
        <div class="empty-state-text">${emptyText}</div>
      </div>
    `;
    return;
  }

  const html = list.map(renderTaskItem).join('');
  container.innerHTML = `<ul class="task-list">${html}</ul>`;
}

function renderTaskItem(task) {
  return `
    <li class="task-item ${task.status === 'blocked' ? 'blocked-item' : ''}">
      <span class="task-priority ${task.status === 'blocked' ? 'blocked' : 'medium'}">
        ${task.status === 'blocked' ? '⚠' : '•'}
      </span>
      <div class="task-content">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-meta">
          ${task.assigned ? `<span class="task-assignee">@${escapeHtml(task.assigned)}</span>` : ''}
          <span class="task-id">${escapeHtml(task.id)}</span>
          ${task.added ? `<span class="task-date">${escapeHtml(task.added)}</span>` : ''}
        </div>
        ${task.notes ? `<div class="task-blocker">${escapeHtml(task.notes)}</div>` : ''}
      </div>
    </li>
  `;
}

function renderAssignees() {
  const container = document.getElementById('assignee-breakdown');
  if (!container) return;

  const counts = {};
  tasks.forEach(task => {
    const name = (task.assigned || 'Unassigned').trim();
    if (!counts[name]) counts[name] = { total: 0, pending: 0, inProgress: 0, blocked: 0 };
    counts[name].total++;
    if (task.status === 'pending') counts[name].pending++;
    if (task.status === 'in-progress') counts[name].inProgress++;
    if (task.status === 'blocked') counts[name].blocked++;
  });

  const rows = Object.entries(counts)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([name, c]) => `
      <div class="assignee-row">
        <div class="assignee-name">${escapeHtml(name)}</div>
        <div class="assignee-counts">
          <span class="pill pill-pending">${c.pending}</span>
          <span class="pill pill-progress">${c.inProgress}</span>
          <span class="pill pill-blocked">${c.blocked}</span>
          <span class="pill pill-total">${c.total}</span>
        </div>
      </div>
    `)
    .join('');

  container.innerHTML = rows || '<div class="empty-state"><div class="empty-state-text">No assignees yet</div></div>';
}

function renderRoster() {
  const container = document.getElementById('agent-roster');
  if (!container) return;

  const roleMap = teamRoster.roles || {};

  const staffHtml = teamRoster.staff.map(id => {
    const role = roleMap[id]?.role || 'Staff Agent';
    return `<span class="roster-pill">${escapeHtml(id)}<small>${escapeHtml(role)}</small></span>`;
  }).join('');

  const consultantHtml = teamRoster.consultants.map(id => {
    const role = roleMap[id]?.role || 'Consultant';
    return `<span class="roster-pill">${escapeHtml(id)}<small>${escapeHtml(role)}</small></span>`;
  }).join('');

  container.innerHTML = `
    <div class="roster-section">
      <div class="roster-title">Staff (${teamRoster.staff.length})</div>
      <div class="roster-list">${staffHtml || '<span class="muted">No staff listed</span>'}</div>
    </div>
    <div class="roster-section">
      <div class="roster-title">Consultants (${teamRoster.consultants.length})</div>
      <div class="roster-list">${consultantHtml || '<span class="muted">No consultants listed</span>'}</div>
    </div>
  `;
}

function renderRecentDone() {
  const container = document.getElementById('recent-activity');
  if (!container) return;

  if (!tasksDone.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div class="empty-state-text">No completed tasks yet</div>
      </div>
    `;
    return;
  }

  const sorted = [...tasksDone].sort((a, b) => (b.completed || '').localeCompare(a.completed || ''));
  const html = sorted.slice(0, 6).map(t => `
    <div class="activity-item">
      <span class="activity-icon">✅</span>
      <div class="activity-content">
        <div class="activity-title">${escapeHtml(t.title)}</div>
        <div class="activity-meta">${escapeHtml(t.assigned || '')}</div>
      </div>
      <span class="activity-time">${t.completed ? formatRelativeTime(new Date(t.completed)) : ''}</span>
    </div>
  `).join('');

  container.innerHTML = `<div class="activity-list">${html}</div>`;
}

function renderQuickLinks() {
  const container = document.getElementById('quick-links');
  if (!container) return;

  const html = QUICK_LINKS.map(link => `
    <a class="quick-link" href="${link.url}" target="_blank" rel="noopener">
      <span class="quick-link-icon">${link.icon}</span>
      <span class="quick-link-text">${link.label}</span>
    </a>
  `).join('');

  container.innerHTML = `<div class="quick-links-grid">${html}</div>`;
}

function renderRateLimits() {
  const container = document.getElementById('rate-limits');
  if (!container) return;

  const data = rateLimitData || DEFAULT_RATE_LIMITS;
  const updated = data.updatedAt ? `Updated ${formatRelativeTime(new Date(data.updatedAt))}` : 'No rate limit data';

  const rows = (data.providers || []).map(p => `
    <div class="rate-row">
      <div class="rate-name">${escapeHtml(p.name || 'Provider')}</div>
      <div class="rate-model">${escapeHtml(p.model || '')}</div>
      <div class="rate-usage">${escapeHtml(p.used || '—')} / ${escapeHtml(p.limit || '—')}</div>
      <div class="rate-reset">${escapeHtml(p.reset || '—')}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="rate-header">
      <span class="rate-title">Usage</span>
      <span class="rate-updated">${updated}</span>
    </div>
    <div class="rate-grid">
      <div class="rate-row rate-head">
        <div>Provider</div>
        <div>Model</div>
        <div>Used / Limit</div>
        <div>Reset</div>
      </div>
      ${rows || '<div class="empty-state"><div class="empty-state-text">No limits available</div></div>'}
    </div>
  `;
}

// ---------- Counts / HUD ----------

function updateSummaryCounts() {
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  const done = tasksDone.length;

  setText('pending-count', pending);
  setText('inprogress-count', inProgress);
  setText('blocked-count', blocked);
  setText('done-count', done);
  setText('backlog-count', backlogCount);
}

function updateHUD() {
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const blocked = tasks.filter(t => t.status === 'blocked').length;
  const total = pending + inProgress + blocked;

  setText('hud-tasks', `${inProgress}/${total}`);
  setText('hud-blocked', blocked);
  setText('hud-status', 'Online');

  const blockedEl = document.getElementById('hud-blocked');
  if (blockedEl) blockedEl.style.color = blocked > 0 ? 'var(--accent-orange)' : 'var(--accent-green)';
}

// ---------- Heartbeat / Pulse ----------

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

    if (statusEl) {
      statusEl.textContent = diffMinutes < 60 ? 'Active' : 'Stale';
      statusEl.style.color = diffMinutes < 60 ? 'var(--accent-green)' : 'var(--accent-yellow)';
    }

    if (lastEl) lastEl.textContent = formatTime(lastTime);
    if (pulseTimeEl) pulseTimeEl.textContent = formatTime(lastTime);
    if (pulseAgoEl) pulseAgoEl.textContent = `(${formatRelativeTime(lastTime)})`;
    if (hudHeartbeat) hudHeartbeat.textContent = formatRelativeTime(lastTime);
  } else {
    if (statusEl) statusEl.textContent = 'Unknown';
    if (lastEl) lastEl.textContent = '-';
    if (pulseTimeEl) pulseTimeEl.textContent = 'No data';
    if (pulseAgoEl) pulseAgoEl.textContent = '';
    if (hudHeartbeat) hudHeartbeat.textContent = '—';
  }
}

function updatePulseIndicator(healthy) {
  const indicator = document.getElementById('pulse-indicator');
  if (!indicator) return;
  const dot = indicator.querySelector('.pulse-dot');
  const text = document.getElementById('pulse-text');

  if (healthy) {
    dot.className = 'pulse-dot';
    if (text) text.textContent = 'Online';
  } else {
    dot.className = 'pulse-dot error';
    if (text) text.textContent = 'Error';
  }
}

function updateRelativeTimes() {
  updateHeartbeatStatus();
  renderRecentDone();
}

function updateDataTimestamp() {
  const el = document.getElementById('data-updated');
  if (el) el.textContent = formatTime(new Date());
}

function updateCurrentTime() {
  const el = document.getElementById('current-time');
  if (!el) return;
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

// ---------- Parsing ----------

function parseTasksTable(text) {
  const rows = [];
  const lines = text.split('\n');

  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    if (line.includes('---')) continue;

    const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
    if (cells.length < 6) continue;

    const [id, task, assigned, status, added, notes] = cells;
    if (!id || !id.startsWith('T')) continue;

    const normalizedStatus = (status || '').toLowerCase().trim();

    rows.push({
      id,
      title: task,
      assigned,
      status: normalizeStatus(normalizedStatus),
      added,
      notes
    });
  }

  return rows;
}

function parseDoneTable(text) {
  const rows = [];
  const lines = text.split('\n');

  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    if (line.includes('---')) continue;

    const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
    if (cells.length < 5) continue;

    const [id, task, assigned, completed, notes] = cells;
    if (!id || !id.startsWith('D')) continue;

    rows.push({
      id,
      title: task,
      assigned,
      completed,
      notes
    });
  }

  return rows;
}

function countBacklogItems(text) {
  return text.split('\n')
    .filter(line => line.trim().startsWith('- '))
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(line => line.length > 0)
    .length;
}

function parseTeamRoster(markdown) {
  const staff = [];
  const consultants = [];
  const roles = {};

  const lines = markdown.split('\n');
  let section = null;

  for (const line of lines) {
    if (line.startsWith('### Staff Agents')) section = 'staff';
    if (line.startsWith('### Consultant Agents')) section = 'consultants';

    const match = line.match(/^-\s+`([^`]+)`/);
    if (match && section === 'staff') staff.push(match[1]);
    if (match && section === 'consultants') consultants.push(match[1]);

    // Parse tables for roles
    if (line.includes('|') && line.includes('`')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells[0]?.includes('Role') || cells[0]?.includes('---')) continue;
      if (cells.length >= 3) {
        const role = cells[0]?.replace(/\*\*/g, '').trim();
        const idMatch = cells[1]?.match(/`([^`]+)`/);
        const id = idMatch ? idMatch[1].replace('(main)', '').trim() : null;
        if (id && role) roles[id] = { role };
      }
    }
  }

  return { staff, consultants, roles };
}

function normalizeStatus(status) {
  if (status === 'in-progress' || status === 'in progress') return 'in-progress';
  if (status === 'blocked') return 'blocked';
  return 'pending';
}

// ---------- Utilities ----------

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

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
