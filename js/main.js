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

  /* Image lightbox — Social Post (page 3) & Tixgo (page 4) */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    const posterImgs = document.querySelectorAll('#page-3 .poster img, #page-4 .poster img');

    function openLightbox(img) {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    posterImgs.forEach(function (img) {
      img.addEventListener('click', function () { openLightbox(img); });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    /* click anywhere on the backdrop (but not the image itself) closes it */
    lightbox.addEventListener('click', function (e) {
      if (e.target !== lightboxImg) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  /* Language switch — VI / EN */
  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    const langBtns  = Array.from(langSwitch.querySelectorAll('.lang-btn'));
    const i18nNodes = Array.from(document.querySelectorAll('[data-vi][data-en]'));
    let currentLang;

    try { currentLang = localStorage.getItem('pf-lang'); } catch (e) { currentLang = null; }
    if (currentLang !== 'vi' && currentLang !== 'en') currentLang = 'en';

    function applyLang(lang) {
      currentLang = lang;
      document.documentElement.setAttribute('lang', lang);
      i18nNodes.forEach(function (el) {
        const val = el.getAttribute('data-' + lang);
        if (val == null) return;
        if (el.hasAttribute('data-html')) el.innerHTML = val;
        else el.textContent = val;
      });
      langBtns.forEach(function (b) {
        const on = b.getAttribute('data-lang') === lang;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      try { localStorage.setItem('pf-lang', lang); } catch (e) {}
    }

    langBtns.forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
    });

    applyLang(currentLang);
  }
})();
