/* ===========================================
   COMMAND CENTRE - Application Logic v2.2
   =========================================== */

let tasks = [];
let tasksDone = [];
let allTasks = [];
let backlogCount = 0;
let backlogBreakdown = [];
let backlogByProject = null;
let activeProject = 'all';
let teamRoster = { staff: [], consultants: [], roles: {} };
let heartbeatState = null;
let rateLimitData = null;
let metricsSummary = { pending: 0, inProgress: 0, blocked: 0, done: 0, backlog: 0 };
let assigneeBreakdown = [];
let statusBreakdown = [];
let metricsUpdatedAt = null;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  setupCollapsibleSections();
  setupViewToggle();
  setupProjectFilter();
  setupSummaryScroll();
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

function setupProjectFilter() {
  const container = document.getElementById('project-filter');
  if (!container) return;

  container.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProject = btn.getAttribute('data-project') || 'all';
      renderAllViews();
    });
  });
}

function setupSummaryScroll() {
  document.querySelectorAll('.summary-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-scroll-target');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('highlighted');
      setTimeout(() => target.classList.remove('highlighted'), 1500);
    });
  });
}

async function loadData() {
  try {
    // Team roster
    try {
      const teamResponse = await fetch(DATA_SOURCES.team + '?t=' + Date.now());
      if (teamResponse.ok) {
        const teamMd = await teamResponse.text();
        teamRoster = parseTeamRoster(teamMd);
      }
    } catch (e) {
      teamRoster = { staff: [], consultants: [], roles: {} };
    }

    // Metrics JSON
    try {
      const metrics = await fetchJsonWithFallback([
        DATA_SOURCES.metrics + '?t=' + Date.now(),
        DATA_SOURCES.metricsFallback + '?t=' + Date.now()
      ]);

      applyMetrics(metrics || {});
    } catch (e) {
      applyMetrics({});
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

    renderAllViews();
    renderRoster();
    updateHeartbeatStatus();
    renderRateLimits();
    updateDataTimestamp();
    updatePulseIndicator(true);
  } catch (error) {
    console.error('Failed to load data:', error);
    updatePulseIndicator(false);
  }
}

function applyMetrics(metrics) {
  const summary = metrics.summary || metrics.totals || metrics.counts || {};
  metricsUpdatedAt = metrics.lastUpdated || metrics.updatedAt || metrics.generatedAt || metrics.meta?.lastUpdated || null;

  const rawTasks = extractTaskList(metrics);
  const normalizedTasks = rawTasks.map(normalizeTask).filter(t => t.title || t.id);
  allTasks = normalizedTasks;
  tasks = normalizedTasks.filter(t => ['pending', 'in-progress', 'blocked'].includes(t.status));

  const doneFromMetrics = extractDoneList(metrics);
  const doneFromTasks = normalizedTasks.filter(t => t.status === 'done');
  tasksDone = (doneFromMetrics.length ? doneFromMetrics : doneFromTasks).map(normalizeTask);

  const backlogFromMetrics = summary.backlog ?? metrics.backlog ?? metrics.backlogCount;
  backlogCount = Number.isFinite(backlogFromMetrics) ? backlogFromMetrics : normalizedTasks.filter(t => t.status === 'backlog').length;
  backlogBreakdown = normalizeBacklog(metrics.backlogBreakdown || metrics.backlogCategories || metrics.backlogByCategory || metrics.backlogMeta);
  backlogByProject = metrics.backlogByProject || metrics.backlogProjects || null;

  metricsSummary = {
    pending: summary.pending ?? countByStatus(normalizedTasks, 'pending'),
    inProgress: summary.inProgress ?? summary['in-progress'] ?? countByStatus(normalizedTasks, 'in-progress'),
    blocked: summary.blocked ?? countByStatus(normalizedTasks, 'blocked'),
    done: summary.done ?? countByStatus(normalizedTasks, 'done'),
    backlog: backlogCount
  };

  assigneeBreakdown = normalizeAssignees(metrics.byAssignee || metrics.assignees || metrics.assigneeBreakdown, normalizedTasks);
  statusBreakdown = normalizeStatuses(metrics.byStatus || metrics.statusBreakdown || metrics.statuses, metricsSummary);
}

async function fetchJsonWithFallback(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      // try next
    }
  }
  throw new Error('No metrics source available');
}

function extractTaskList(metrics) {
  if (!metrics) return [];
  if (Array.isArray(metrics.tasks)) return metrics.tasks;
  if (Array.isArray(metrics.items)) return metrics.items;
  if (Array.isArray(metrics.taskList)) return metrics.taskList;

  if (metrics.tasks && typeof metrics.tasks === 'object') {
    const list = [];
    const statusKeys = Object.keys(metrics.tasks);
    statusKeys.forEach(key => {
      const items = metrics.tasks[key];
      if (Array.isArray(items)) {
        items.forEach(item => list.push({ ...item, status: item.status || key }));
      }
    });
    return list;
  }

  return [];
}

function extractDoneList(metrics) {
  if (!metrics) return [];
  if (Array.isArray(metrics.recentDone)) return metrics.recentDone;
  if (Array.isArray(metrics.doneRecent)) return metrics.doneRecent;
  if (Array.isArray(metrics.doneItems)) return metrics.doneItems;
  if (Array.isArray(metrics.completed)) return metrics.completed;
  if (Array.isArray(metrics.tasksDone)) return metrics.tasksDone;
  return [];
}

function normalizeTask(task) {
  if (!task) return {};
  return {
    id: task.id || task.taskId || task.key || '',
    title: task.title || task.task || task.name || task.summary || '',
    project: task.project || task.domain || task.area || '',
    assigned: task.assigned || task.assignee || task.owner || '',
    status: normalizeStatus(task.status || task.state || ''),
    added: task.added || task.createdAt || task.created || task.addedAt || '',
    notes: task.notes || task.blocker || task.reason || task.detail || '',
    completed: task.completed || task.completedAt || task.doneAt || task.closedAt || ''
  };
}

function normalizeAssignees(source, fallbackTasks) {
  if (Array.isArray(source)) {
    return source.map(item => ({
      name: item.name || item.assignee || item.id || 'Unassigned',
      pending: item.pending ?? 0,
      inProgress: item.inProgress ?? item['in-progress'] ?? 0,
      blocked: item.blocked ?? 0,
      total: item.total ?? (item.pending ?? 0) + (item.inProgress ?? item['in-progress'] ?? 0) + (item.blocked ?? 0)
    }));
  }

  if (source && typeof source === 'object') {
    return Object.entries(source).map(([name, counts]) => ({
      name,
      pending: counts.pending ?? 0,
      inProgress: counts.inProgress ?? counts['in-progress'] ?? 0,
      blocked: counts.blocked ?? 0,
      total: counts.total ?? (counts.pending ?? 0) + (counts.inProgress ?? counts['in-progress'] ?? 0) + (counts.blocked ?? 0)
    }));
  }

  // derive from tasks
  const counts = {};
  fallbackTasks.forEach(task => {
    if (!['pending', 'in-progress', 'blocked'].includes(task.status)) return;
    const name = (task.assigned || 'Unassigned').trim();
    if (!counts[name]) counts[name] = { pending: 0, inProgress: 0, blocked: 0 };
    if (task.status === 'pending') counts[name].pending++;
    if (task.status === 'in-progress') counts[name].inProgress++;
    if (task.status === 'blocked') counts[name].blocked++;
  });

  return Object.entries(counts).map(([name, c]) => ({
    name,
    pending: c.pending,
    inProgress: c.inProgress,
    blocked: c.blocked,
    total: c.pending + c.inProgress + c.blocked
  }));
}

function normalizeStatuses(source, summary) {
  if (Array.isArray(source)) {
    return source.map(item => ({
      status: normalizeStatus(item.status || item.name || item.label || ''),
      count: item.count ?? item.total ?? 0
    }));
  }

  if (source && typeof source === 'object') {
    return Object.entries(source).map(([status, count]) => ({
      status: normalizeStatus(status),
      count: count ?? 0
    }));
  }

  return [
    { status: 'pending', count: summary.pending || 0 },
    { status: 'in-progress', count: summary.inProgress || 0 },
    { status: 'blocked', count: summary.blocked || 0 },
    { status: 'done', count: summary.done || 0 },
    { status: 'backlog', count: summary.backlog || 0 }
  ];
}

function normalizeBacklog(source) {
  if (!source) return [];
  if (Array.isArray(source)) {
    return source.map(item => ({
      label: item.label || item.name || item.category || 'Other',
      count: item.count ?? item.total ?? 0
    }));
  }
  if (typeof source === 'object') {
    return Object.entries(source).map(([label, count]) => ({ label, count: count ?? 0 }));
  }
  return [];
}

function countByStatus(list, status) {
  return list.filter(t => t.status === status).length;
}

// ---------- Rendering ----------

function renderAllViews() {
  const filteredTasks = filterByProject(tasks);
  const filteredDone = filterByProject(tasksDone);
  const summary = getSummaryCounts(filteredTasks, filteredDone);

  renderTasksBoard(filteredTasks);
  renderAssignees(filteredTasks);
  renderStatusBreakdown(summary);
  renderRecentDone(filteredDone);
  renderBacklogPanel(summary);
  updateSummaryCounts(summary);
  updateHUD(summary);
}

function renderTasksBoard(list) {
  const pendingTasks = list.filter(t => t.status === 'pending');
  const inProgressTasks = list.filter(t => t.status === 'in-progress');
  const blockedTasks = list.filter(t => t.status === 'blocked');

  renderTaskColumn('pending-tasks', pendingTasks, 'No pending tasks');
  renderTaskColumn('inprogress-tasks', inProgressTasks, 'No tasks in progress');
  renderTaskColumn('blocked-tasks', blockedTasks, 'Nothing blocked');

  document.getElementById('pending-badge').textContent = pendingTasks.length;
  document.getElementById('inprogress-badge').textContent = inProgressTasks.length;
  document.getElementById('blocked-badge').textContent = blockedTasks.length;

  collapseIfEmpty('pending-tasks', pendingTasks.length);
  collapseIfEmpty('inprogress-tasks', inProgressTasks.length);
  collapseIfEmpty('blocked-tasks', blockedTasks.length);
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
  const project = normalizeProject(task.project);
  return `
    <li class="task-item ${task.status === 'blocked' ? 'blocked-item' : ''}">
      <div class="task-item-header">
        <div class="task-title">${escapeHtml(task.title)}</div>
        <span class="task-id">${escapeHtml(task.id)}</span>
      </div>
      <div class="task-meta">
        ${task.assigned ? `<span class="task-assignee">${escapeHtml(task.assigned)}</span>` : ''}
        ${project ? `<span class="task-project ${project}">${escapeHtml(project)}</span>` : ''}
        ${task.added ? `<span class="task-date">${escapeHtml(task.added)}</span>` : ''}
      </div>
      ${task.notes ? `<div class="task-blocker">${escapeHtml(task.notes)}</div>` : ''}
    </li>
  `;
}

function renderAssignees(list) {
  const container = document.getElementById('assignee-breakdown');
  if (!container) return;

  const breakdown = activeProject === 'all'
    ? assigneeBreakdown
    : normalizeAssignees(null, list);

  const rows = breakdown
    .sort((a, b) => b.total - a.total)
    .map(({ name, pending, inProgress, blocked, total }) => `
      <div class="assignee-row">
        <div class="assignee-name">${escapeHtml(name)}</div>
        <div class="assignee-counts">
          <span class="assignee-dot pending">${pending}</span>
          <span class="assignee-dot progress">${inProgress}</span>
          <span class="assignee-dot blocked">${blocked}</span>
          <span class="assignee-dot total">${total}</span>
        </div>
      </div>
    `)
    .join('');

  container.innerHTML = rows || '<div class="empty-state"><div class="empty-state-text">No assignees yet</div></div>';
  collapseIfEmpty('assignee-breakdown', breakdown.length);
}

function renderStatusBreakdown(summary) {
  const container = document.getElementById('status-breakdown');
  if (!container) return;

  const breakdown = activeProject === 'all'
    ? statusBreakdown
    : normalizeStatuses(null, summary);

  const rows = breakdown
    .sort((a, b) => b.count - a.count)
    .map(item => `
      <div class="status-row">
        <div class="status-name">${formatStatusLabel(item.status)}</div>
        <div class="status-count">${item.count}</div>
      </div>
    `)
    .join('');

  container.innerHTML = rows || '<div class="empty-state"><div class="empty-state-text">No status data</div></div>';
  collapseIfEmpty('status-breakdown', breakdown.length);
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

function renderRecentDone(list) {
  const container = document.getElementById('recent-activity');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div class="empty-state-text">No completed tasks yet</div>
      </div>
    `;
    collapseIfEmpty('recent-activity', 0);
    return;
  }

  const sorted = [...list].sort((a, b) => (b.completed || '').localeCompare(a.completed || ''));
  const html = sorted.slice(0, 10).map(t => `
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
  collapseIfEmpty('recent-activity', sorted.length);
}

function renderBacklogPanel(summary) {
  const container = document.getElementById('backlog-panel');
  if (!container) return;

  const rows = activeProject === 'all'
    ? backlogBreakdown
      .sort((a, b) => b.count - a.count)
      .map(item => `
        <div class="backlog-row">
          <span>${escapeHtml(item.label)}</span>
          <strong>${item.count}</strong>
        </div>
      `)
      .join('')
    : '';

  const breakdownHtml = rows || (activeProject === 'all'
    ? '<div class="muted">No category data</div>'
    : '<div class="muted">No category breakdown for this project</div>');

  container.innerHTML = `
    <div class="backlog-total">${summary.backlog}</div>
    <div class="backlog-meta">Total backlog items</div>
    <div class="backlog-breakdown">${breakdownHtml}</div>
  `;

  collapseIfEmpty('backlog-panel', summary.backlog);
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

// ---------- Filters & Summary ----------

function normalizeProject(project) {
  return String(project || '').toLowerCase().trim();
}

function filterByProject(list) {
  if (!Array.isArray(list)) return [];
  if (activeProject === 'all') return list;
  return list.filter(item => normalizeProject(item.project) === activeProject);
}

function getSummaryCounts(filteredTasks, filteredDone) {
  const pending = filteredTasks.filter(t => t.status === 'pending').length;
  const inProgress = filteredTasks.filter(t => t.status === 'in-progress').length;
  const blocked = filteredTasks.filter(t => t.status === 'blocked').length;
  const done = filteredDone.length;
  const backlog = getBacklogCount();

  return { pending, inProgress, blocked, done, backlog };
}

function getBacklogCount() {
  if (activeProject === 'all') return metricsSummary.backlog;
  if (backlogByProject && backlogByProject[activeProject] !== undefined) {
    return backlogByProject[activeProject];
  }
  return 0;
}

// ---------- Counts / HUD ----------

function updateSummaryCounts(summary) {
  setText('pending-count', summary.pending);
  setText('inprogress-count', summary.inProgress);
  setText('blocked-count', summary.blocked);
  setText('done-count', summary.done);
  setText('backlog-count', summary.backlog);
}

function updateHUD(summary) {
  const total = summary.pending + summary.inProgress + summary.blocked;
  setText('hud-tasks', `${summary.inProgress}/${total}`);
  setText('hud-blocked', summary.blocked);
  setText('hud-status', 'Online');

  const blockedEl = document.getElementById('hud-blocked');
  if (blockedEl) blockedEl.style.color = summary.blocked > 0 ? 'var(--accent-orange)' : 'var(--accent-green)';
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
  renderRecentDone(filterByProject(tasksDone));
  updateDataTimestamp();
}

function updateDataTimestamp() {
  const el = document.getElementById('data-updated');
  const hud = document.getElementById('hud-updated');
  const activity = document.getElementById('activity-updated');
  const stamp = metricsUpdatedAt ? new Date(metricsUpdatedAt) : new Date();

  if (el) {
    el.textContent = stamp.toLocaleString('en-GB', { timeZone: CONFIG.timezone });
  }
  if (hud) {
    hud.textContent = formatRelativeTime(stamp);
  }
  if (activity) {
    activity.textContent = `Last updated: ${formatRelativeTime(stamp)}`;
  }
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
  const normalized = String(status || '').toLowerCase().trim();
  if (normalized === 'in progress') return 'in-progress';
  if (normalized === 'in-progress') return 'in-progress';
  if (normalized === 'blocked') return 'blocked';
  if (normalized === 'done' || normalized === 'completed') return 'done';
  if (normalized === 'backlog') return 'backlog';
  return normalized || 'pending';
}

function formatStatusLabel(status) {
  if (status === 'in-progress') return 'In Progress';
  if (status === 'backlog') return 'Backlog';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function collapseIfEmpty(sectionId, count) {
  const body = document.getElementById(sectionId);
  const header = document.querySelector(`[data-section="${sectionId}"]`);
  if (!body || !header) return;

  const icon = header.querySelector('.collapse-icon');
  if (count === 0) {
    body.classList.add('collapsed');
    if (icon) icon.textContent = '+';
  } else {
    body.classList.remove('collapsed');
    if (icon) icon.textContent = '−';
  }
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
