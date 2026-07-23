/* ============================================================
   Portfolio 2026 — interactions
   Nav toggle · scroll spy · reveal on scroll
   ============================================================ */
(function () {
  'use strict';

  const navbar    = document.getElementById('navbar');
  const navLinks  = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const links     = Array.from(document.querySelectorAll('.nav-link'));
  const sections  = Array.from(document.querySelectorAll('.page'));

  /* Mobile menu */
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    links.forEach(function (l) {
      l.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Navbar shadow on scroll */
  function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll spy */
  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { spy.observe(s); });

  /* Reveal on scroll */
  const revealer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });
})();
