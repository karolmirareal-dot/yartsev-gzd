(function() {
  // Сохраняем тему ДО отрисовки — чтобы не мигало
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // ===== Тёмная тема: инжектим стили =====
  const style = document.createElement('style');
  style.textContent = `
    [data-theme="dark"] {
      --bg: #0f0f12;
      --surface: #18181b;
      --surface-2: #1f1f23;
      --text: #f4f4f5;
      --muted: #a1a1aa;
      --border: #2e2e33;
      --accent: #a78bfa;
      --accent-2: #f472b6;
      --accent-soft: #2e1f4d;
      --green: #34d399;
      --green-bg: #0d2e22;
      --green-ring: #166534;
      --shadow: 0 4px 14px rgba(0,0,0,.4);
      --shadow-lg: 0 16px 40px rgba(0,0,0,.5);
    }
    [data-theme="dark"] body { background: var(--bg); color: var(--text); }
    [data-theme="dark"] .topbar { background: rgba(15,15,18,.85); }
    [data-theme="dark"] .par-card,
    [data-theme="dark"] .subject-card,
    [data-theme="dark"] .book-card,
    [data-theme="dark"] .class-card,
    [data-theme="dark"] .num-btn,
    [data-theme="dark"] .task,
    [data-theme="dark"] .back-btn,
    [data-theme="dark"] .task-empty {
      background: var(--surface);
      color: var(--text);
      border-color: var(--border);
    }
    [data-theme="dark"] .par-card.locked {
      background: linear-gradient(180deg,#18181b 0%,#1f1f23 100%);
    }
    [data-theme="dark"] .par-card-info h3 { color: var(--text); }
    [data-theme="dark"] .par-card-info p,
    [data-theme="dark"] .crumbs,
    [data-theme="dark"] .hero p,
    [data-theme="dark"] .book-meta,
    [data-theme="dark"] .class-label { color: var(--muted); }
    [data-theme="dark"] .num-btn:hover {
      background: var(--accent);
      color: #18181b;
      border-color: var(--accent);
    }
    [data-theme="dark"] .num-btn.active { color: #18181b; }
    [data-theme="dark"] .answer {
      background: var(--green-bg);
      border-color: var(--green-ring);
    }
    [data-theme="dark"] .answer-body { color: #d1fae5; }
    [data-theme="dark"] .answer-body b { color: #a7f3d0; }
    [data-theme="dark"] .answer-body .col { background: var(--surface-2); }
    [data-theme="dark"] .answer-body .step { color: #d4d4d8; }
    [data-theme="dark"] .task-body { color: #d4d4d8; }
    [data-theme="dark"] .task-body b { color: var(--text); }
    [data-theme="dark"] .footer { background: #0a0a0c; }
    [data-theme="dark"] .back-btn:hover {
      background: var(--text);
      color: var(--bg);
      border-color: var(--text);
    }

    /* Кнопка переключения темы */
    .theme-toggle {
      background: transparent;
      border: 1px solid var(--border);
      width: 38px;
      height: 38px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform .2s, background .2s, border-color .2s;
      margin-left: 12px;
      color: var(--text);
      padding: 0;
      font-family: inherit;
      flex-shrink: 0;
    }
    .theme-toggle:hover {
      transform: scale(1.08);
      background: var(--surface-2);
      border-color: var(--accent);
    }
    .theme-toggle:active { transform: scale(0.95); }
  `;
  document.head.appendChild(style);

  // ===== Кнопка 🌙/☀️ в шапке =====
  function addToggle() {
    const nav = document.querySelector('.topnav');
    if (!nav || nav.querySelector('.theme-toggle')) return;

    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Переключить тему');
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';

    btn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });

    nav.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle);
  } else {
    addToggle();
  }
})();