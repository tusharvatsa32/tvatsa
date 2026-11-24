(function () {
  var root = document.documentElement;

  // Theme toggle (remembers the choice when storage is available)
  var themeBtn = document.querySelector('.theme-toggle');
  themeBtn.addEventListener('click', function () {
    var current = root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var sidebar = document.querySelector('.sidebar');
  var menuBtn = document.querySelector('.menu-toggle');
  menuBtn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      sidebar.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Project filters
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('.card');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      cards.forEach(function (c) {
        c.hidden = f !== 'all' && c.dataset.tags.split(' ').indexOf(f) === -1;
      });
    });
  });

  // Highlight the nav link for the section in view, and reveal sections
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('main section').forEach(function (s) {
      spy.observe(s);
      if (s.id !== 'home') { s.classList.add('reveal'); reveal.observe(s); }
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
