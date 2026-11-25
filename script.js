(function () {
  // Mobile menu
  var sidebar = document.querySelector('.sidebar');
  var menuBtn = document.querySelector('.menu-toggle');
  menuBtn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('span').textContent = open ? '−' : '+';
  });

  // Works filter
  var filters = document.querySelectorAll('.filter');
  var works = document.querySelectorAll('.work');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filters.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      works.forEach(function (w) {
        w.hidden = f !== 'all' && w.dataset.tags.split(' ').indexOf(f) === -1;
      });
      if (window.matchMedia('(max-width: 760px)').matches) {
        document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight the nav link for the section in view
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('current'); });
          links[e.target.id].classList.add('current');
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('main section').forEach(function (s) { spy.observe(s); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
