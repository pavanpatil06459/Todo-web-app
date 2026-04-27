// ── State ──────────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem('taskly_v1') || '[]');
let filter = 'all';

// ── Persistence ────────────────────────────────────────
function save() {
  localStorage.setItem('taskly_v1', JSON.stringify(tasks));
}

// ── Helpers ────────────────────────────────────────────
function fmt(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function esc(s) {
  return s.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ── Stats ──────────────────────────────────────────────
function updateStats() {
  const done = tasks.filter(t => t.done).length;
  document.getElementById('totalCount').textContent = tasks.length;
  document.getElementById('pendingCount').textContent = tasks.length - done;
  document.getElementById('doneCount').textContent = done;
}

// ── Render ─────────────────────────────────────────────
function render() {
  const list = document.getElementById('taskList');

  const visible = tasks.filter(t => {
    if (filter === 'done')    return t.done;
    if (filter === 'pending') return !t.done;
    return true;
  });

  if (!visible.length) {
    const msgs = {
      all:     [ 'All clear!',        'Add a task above to get started.'],
      pending: [ 'Nothing pending!',  'All done for now.'],
      done:    [ 'Nothing done yet',  'Complete a task to see it here.'],
    };
    const [emoji, title, sub] = msgs[filter];
    list.innerHTML = `
      <div class="empty-state">
        <span class="emoji">${emoji}</span>
        <strong>${title}</strong>${sub}
      </div>`;
  } else {
    list.innerHTML = visible.map(t => `
      <div class="task-item ${t.done ? 'completed' : ''}" id="ti-${t.id}">
        <button class="check-btn ${t.done ? 'done' : ''}" onclick="toggle('${t.id}')"></button>
        <span class="task-text">${esc(t.text)}</span>
        <span class="task-meta">${fmt(t.ts)}</span>
        <button class="del-btn" onclick="remove('${t.id}')">×</button>
      </div>
    `).join('');
  }

  updateStats();
}

// ── Actions ────────────────────────────────────────────
function addTask() {
  const inp  = document.getElementById('taskInput');
  const text = inp.value.trim();
  if (!text) { inp.focus(); return; }

  tasks.unshift({ id: uid(), text, done: false, ts: Date.now() });
  save();
  render();

  inp.value = '';
  inp.focus();
}

function toggle(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); render(); }
}

function remove(id) {
  const el = document.getElementById('ti-' + id);
  if (!el) return;
  el.classList.add('removing');
  setTimeout(() => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, 240);
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── Event Listeners ────────────────────────────────────
document.getElementById('taskInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

// ── Init ───
render();
