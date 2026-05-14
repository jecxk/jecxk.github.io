/* =========================================================
   Nguyen Trong Bach — Portfolio
   Minimal vanilla JS: nav toggle, scroll state, reveal-on-scroll.
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

    // Close menu when a link is tapped on mobile
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });

    // Close menu on resize up to desktop
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

  // ---------- Reveal-on-scroll ----------
  // Tag every section + key cards as reveal targets.
  var revealTargets = document.querySelectorAll(
    '.section, .hero-container, .project-card, .skill-card, .interest, ' +
    '.timeline-item, .masters-card, .about-card, .coursework-grid li'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: just show everything
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }
})();
