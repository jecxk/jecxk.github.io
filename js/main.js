/* =========================================================
   Nguyen Trong Bach — Portfolio
   Vanilla JS: nav toggle, scroll state, active-section highlight,
   reveal-on-scroll, project filtering.
   ========================================================= */

(function () {
  'use strict';

  // ---------- Footer year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeNav();
    });
  }

  // ---------- Navbar scroll state ----------
  var navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ---------- Active section highlight ----------
  // Watch each section and set .active on the matching nav link.
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navAnchors = navLinks
    ? Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'))
    : [];

  function clearActive() {
    navAnchors.forEach(function (a) { a.classList.remove('active'); });
  }
  function setActive(id) {
    clearActive();
    var match = navAnchors.find(function (a) { return a.getAttribute('href') === '#' + id; });
    if (match) match.classList.add('active');
  }

  if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      // Pick the entry whose section is most prominently visible.
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    }, {
      // Trigger when section is near the top of the viewport.
      rootMargin: '-40% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  // ---------- Reveal-on-scroll ----------
  var revealTargets = document.querySelectorAll(
    '.section, .hero-content, .hero-card, .project-card, .skill-card, .interest, ' +
    '.timeline-item, .masters-card, .about-mini-card, .coursework-grid li, ' +
    '.contact-cta, .contact-channel'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---------- Project category filter ----------
  var filterChips = document.querySelectorAll('.filter-chip');
  var projectCards = document.querySelectorAll('.project-card[data-category]');
  var projectsEmpty = document.getElementById('projectsEmpty');

  function applyFilter(filter) {
    var visibleCount = 0;
    projectCards.forEach(function (card) {
      var categories = (card.getAttribute('data-category') || '').split(/\s+/);
      var match = filter === 'all' || categories.indexOf(filter) !== -1;
      card.classList.toggle('filter-hidden', !match);
      if (match) visibleCount++;
    });
    if (projectsEmpty) projectsEmpty.hidden = visibleCount > 0;
  }

  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter') || 'all';
      filterChips.forEach(function (c) {
        var isActive = c === chip;
        c.classList.toggle('is-active', isActive);
        c.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      applyFilter(filter);
    });
  });
})();
