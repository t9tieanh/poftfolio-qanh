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

  /* Image lightbox as a social-post card — Social Post (p3) & Tixgo (p4) */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lbAvatar      = document.getElementById('lbAvatar');
  const lbName        = document.getElementById('lbName');
  const lbSub         = document.getElementById('lbSub');
  const lbDesc        = document.getElementById('lbDesc');

  if (lightbox && lightboxImg) {
    const CHANNELS = {
      laban: {
        name: 'La Bàn', logo: 'images/channel/labanfood.jpg',
        sub:  { vi: 'Dịch vụ & Tuyển dụng', en: 'Services & Recruitment' },
        desc: { vi: 'La Bàn – Hệ sinh thái cung cấp dịch vụ giao hàng, du lịch và tuyển dụng, mang đến giải pháp tiện lợi và cơ hội việc làm cho khách hàng trên khắp Việt Nam.',
                en: 'La Bàn – A service ecosystem for delivery, travel and recruitment, bringing convenient solutions and job opportunities to customers across Vietnam.' }
      },
      learnova: {
        name: 'Learnova', logo: 'images/channel/learnova.jpg',
        sub:  { vi: 'Nền tảng học tập trực tuyến', en: 'Online learning platform' },
        desc: { vi: 'Learnova – Hệ thống học tập trực tuyến giúp người học tiếp cận kiến thức dễ dàng thông qua các khóa học chất lượng và trải nghiệm học tập hiện đại.',
                en: 'Learnova – An online learning system that helps learners access knowledge easily through quality courses and a modern learning experience.' }
      },
      tixgo: {
        name: 'Tixgo', logo: 'images/channel/tixgo.jpg',
        sub:  { vi: 'Nền tảng du lịch trực tuyến', en: 'Online travel platform' },
        desc: { vi: 'Tixgo là nền tảng du lịch trực tuyến giúp du khách dễ dàng đặt vé tham quan, tour du lịch, khách sạn và các trải nghiệm hấp dẫn trên khắp Việt Nam.',
                en: 'Tixgo is an online travel platform that helps travelers easily book sightseeing tickets, tours, hotels and exciting experiences across Vietnam.' }
      },
      neng: {
        name: 'Néng', logo: 'images/channel/neng.jpg',
        sub:  { vi: 'Hải sản khô Đà Nẵng', en: 'Da Nang dried seafood' },
        desc: { vi: 'Néng – Thương hiệu hải sản khô Đà Nẵng mang tinh thần nắng miền Trung: mạnh mẽ, nồng hậu và chân chất.',
                en: 'Néng – A Da Nang dried seafood brand carrying the spirit of Central Vietnam’s sunshine: strong, warm and genuine.' }
      }
    };
    /* map each poster image to its channel */
    const POSTS = {
      'p3-laban-xemay.jpg': 'laban', 'p3-laban-xetai.jpg': 'laban',
      'p3-laban-tour.jpg':  'laban', 'p3-laban-tts.jpg':   'laban',
      'p3-learnova-1.jpg':  'learnova', 'p3-learnova-2.jpg': 'learnova', 'p3-learnova-3.jpg': 'learnova',
      'p4-fireworks.jpg': 'tixgo', 'p4-chill.jpg': 'tixgo', 'p4-cungduong.jpg': 'tixgo',
      'p4-diff.jpg': 'tixgo', 'p4-songngu.jpg': 'tixgo'
    };

    const posterImgs = document.querySelectorAll('#page-3 .poster img, #page-4 .poster img');
    function curLang() { return document.documentElement.getAttribute('lang') === 'vi' ? 'vi' : 'en'; }

    function openLightbox(img) {
      const file = (img.getAttribute('src') || '').split('/').pop().split('?')[0];
      const ch = CHANNELS[POSTS[file]];
      const lang = curLang();
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      if (ch) {
        if (lbAvatar) { lbAvatar.src = ch.logo || ''; lbAvatar.alt = ch.name || ''; }
        if (lbName) lbName.textContent = ch.name || '';
        if (lbSub)  lbSub.textContent  = ch.sub[lang]  || ch.sub.en  || '';
        if (lbDesc) lbDesc.textContent = ch.desc[lang] || ch.desc.en || '';
      }
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    posterImgs.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { openLightbox(img); });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (!e.target.closest('.lb-card')) closeLightbox();
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

  /* Intro popup → Behance (once per session) */
  const pfModal = document.getElementById('pfModal');
  if (pfModal) {
    function openPf()  { pfModal.classList.add('open'); document.body.classList.add('pf-lock'); }
    function closePf() {
      pfModal.classList.remove('open');
      document.body.classList.remove('pf-lock');
      try { sessionStorage.setItem('pf-intro-seen', '1'); } catch (e) {}
    }
    pfModal.querySelectorAll('[data-pf-close]').forEach(function (el) {
      el.addEventListener('click', closePf);
    });
    pfModal.addEventListener('click', function (e) { if (e.target === pfModal) closePf(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pfModal.classList.contains('open')) closePf();
    });

    let seen = false;
    try { seen = sessionStorage.getItem('pf-intro-seen') === '1'; } catch (e) {}
    if (!seen) window.setTimeout(openPf, 900);
  }
})();
