/* ===========================================
   DASHBOARD KIT - Reusable Components
   =========================================== */

/**
 * Create a ring gauge SVG
 * @param {number} percent - 0 to 100
 * @param {string} label - Text below gauge
 * @param {object} options - { size, strokeWidth, color }
 */
function createRingGauge(percent, label = '', options = {}) {
  const size = options.size || 120;
  const strokeWidth = options.strokeWidth || 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const center = size / 2;
  
  return `
    <div class="ring-gauge" style="width: ${size}px; height: ${size}px;">
      <svg viewBox="0 0 ${size} ${size}">
        <circle class="ring-gauge-bg" 
                cx="${center}" cy="${center}" r="${radius}" />
        <circle class="ring-gauge-fill" 
                cx="${center}" cy="${center}" r="${radius}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}" />
      </svg>
      <div class="ring-gauge-text">${Math.round(percent)}%</div>
    </div>
    ${label ? `<div class="ring-gauge-label">${label}</div>` : ''}
  `;
}

/**
 * Create a stat card
 * @param {string|number} value - Main value to display
 * @param {string} label - Description
 * @param {object} change - { value: number, period: string } for trend
 */
function createStatCard(value, label, change = null) {
  let changeHtml = '';
  if (change) {
    const direction = change.value >= 0 ? 'up' : 'down';
    const arrow = change.value >= 0 ? '↑' : '↓';
    changeHtml = `<div class="stat-change ${direction}">${arrow} ${Math.abs(change.value)}% ${change.period || ''}</div>`;
  }
  
  return `
    <div class="card stat-card">
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>
      ${changeHtml}
    </div>
  `;
}

/**
 * Create a progress bar with label
 * @param {number} percent - 0 to 100
 * @param {string} leftLabel - Left side text
 * @param {string} rightLabel - Right side text (defaults to percent)
 */
function createProgressBar(percent, leftLabel = '', rightLabel = null) {
  const right = rightLabel !== null ? rightLabel : `${Math.round(percent)}%`;
  return `
    <div class="progress-item">
      <div class="progress-label">
        <span>${leftLabel}</span>
        <span>${right}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}

/**
 * Create a task list
 * @param {Array} tasks - [{ text: string, done: boolean }]
 */
function createTaskList(tasks) {
  const items = tasks.map(task => `
    <li class="task-item ${task.done ? 'done' : ''}">
      <div class="task-checkbox ${task.done ? 'checked' : ''}"></div>
      <span class="task-text">${task.text}</span>
    </li>
  `).join('');
  
  return `<ul class="task-list">${items}</ul>`;
}

/**
 * Create a data table
 * @param {Array} headers - Column headers
 * @param {Array} rows - Array of row arrays
 * @param {object} options - { compare: boolean, striped: boolean }
 */
function createTable(headers, rows, options = {}) {
  const headerHtml = headers.map(h => `<th>${h}</th>`).join('');
  const rowsHtml = rows.map(row => 
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');
  
  const classes = ['table-wrapper'];
  if (options.compare) classes.push('table-compare');
  
  return `
    <div class="${classes.join(' ')}">
      <table>
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

/**
 * Create a status badge
 * @param {string} text - Badge text
 * @param {string} type - success|warning|danger|info|neutral
 */
function createBadge(text, type = 'neutral') {
  return `<span class="badge badge-${type}">${text}</span>`;
}

/**
 * Format number with thousands separator
 * @param {number} num
 * @param {string} prefix - e.g., 'Rp ' or '$'
 * @param {string} suffix - e.g., 'M' or 'K'
 */
function formatNumber(num, prefix = '', suffix = '') {
  const formatted = num.toLocaleString('en-US');
  return `${prefix}${formatted}${suffix}`;
}

/**
 * Format as Indonesian Rupiah (billions/millions)
 * @param {number} num - Number in full (e.g., 5520000000)
 * @param {boolean} inMillions - If true, input is already in millions
 */
function formatIDR(num, inMillions = false) {
  const millions = inMillions ? num : num / 1000000;
  if (millions >= 1000) {
    return `${(millions / 1000).toFixed(1)}B`;
  }
  return `${millions.toFixed(0)}M`;
}

/**
 * Create a card with header
 * @param {string} title - Card header text
 * @param {string} content - Inner HTML content
 */
function createCard(title, content) {
  return `
    <div class="card">
      <div class="card-header">${title}</div>
      ${content}
    </div>
  `;
}

// Export for module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createRingGauge,
    createStatCard,
    createProgressBar,
    createTaskList,
    createTable,
    createBadge,
    formatNumber,
    formatIDR,
    createCard
  };
}
