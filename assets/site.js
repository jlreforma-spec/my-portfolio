(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('ceel-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  const updateThemeButton = () => { if (themeButton) themeButton.textContent = root.dataset.theme === 'dark' ? '☀' : '☾'; };
  updateThemeButton();
  themeButton?.addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('ceel-theme', root.dataset.theme); updateThemeButton(); });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuButton?.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(isOpen)); menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation'); menuButton.textContent = isOpen ? '×' : '☰'; });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); if (menuButton) menuButton.textContent = '☰'; }));

  const cards = [...document.querySelectorAll('.project-card')];
  const search = document.getElementById('projectSearch');
  const filters = [...document.querySelectorAll('.filter-btn')];
  const count = document.getElementById('projectCount');
  const empty = document.getElementById('emptyState');
  let activeFilter = 'all';
  function filterProjects() {
    const term = (search?.value || '').trim().toLowerCase(); let visible = 0;
    cards.forEach(card => { const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter; const matchesText = (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(term); const show = matchesFilter && matchesText; card.hidden = !show; if (show) visible++; });
    if (count) count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    if (empty) empty.hidden = visible !== 0;
  }
  search?.addEventListener('input', filterProjects);
  filters.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; filters.forEach(item => item.classList.toggle('active', item === button)); filterProjects(); }));

  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', event => {
    event.preventDefault(); const data = new FormData(form);
    if (data.get('website')) return;
    const recipient = 'your-email@example.com';
    if (recipient === 'your-email@example.com') { document.getElementById('formNote').textContent = 'Please update the recipient email in assets/site.js before using this form.'; return; }
    const subject = encodeURIComponent(String(data.get('subject')).slice(0,120));
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
  const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
})();
