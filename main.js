/* ================================================
   ORBYTE TECNOLOGIA — main.js
   ================================================ */

(() => {
  'use strict';

  /* ──────────────────────────────────────────
     CONFIG — edite aqui
  ────────────────────────────────────────── */
  const WA_NUMBER  = '5592981101510'; // 55 + DDD + número, sem espaços
  const WA_TEXT    = 'Olá! Vim pelo site da Orbyte Tecnologia e gostaria de saber mais sobre os serviços.';

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ──────────────────────────────────────────
     SCROLL-REVEAL (IntersectionObserver)
  ────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     NAV — scroll state + mobile toggle
  ────────────────────────────────────────── */
  const nav        = $('.nav');
  const navToggle  = $('.nav-toggle');
  const navMenu    = $('.nav-menu');

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  $$('.nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle?.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────────
     SMOOTH ANCHOR SCROLL
  ────────────────────────────────────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     SCROLL-TO-TOP BUTTON
  ────────────────────────────────────────── */
  const scrollBtn = $('#scrollTop');

  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     CONTACT FORM — UX feedback
  ────────────────────────────────────────── */
  const formBtn = $('#formSubmit');

  formBtn?.addEventListener('click', () => {
    const label = formBtn.textContent;
    formBtn.textContent = 'Mensagem enviada ✓';
    formBtn.style.background = '#39ffb0';
    formBtn.style.color = '#06090d';
    formBtn.disabled = true;

    setTimeout(() => {
      formBtn.textContent = label;
      formBtn.style.background = '';
      formBtn.style.color = '';
      formBtn.disabled = false;
    }, 3200);
  });

  /* ──────────────────────────────────────────
     WHATSAPP FLOAT
  ────────────────────────────────────────── */
  const waBubble  = $('#waBubble');
  const waClose   = $('#waClose');
  const waBtn     = $('#waBtn');

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;

  // Open WhatsApp in new tab
  waBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(waUrl, '_blank', 'noopener');
  });

  // Show bubble after 3 s (only once)
  let dismissed = false;

  const showBubble = () => {
    if (!dismissed) waBubble?.classList.add('open');
  };

  setTimeout(showBubble, 3000);

  // Close via X button
  waClose?.addEventListener('click', () => {
    waBubble?.classList.remove('open');
    dismissed = true;
  });

  // Auto-hide on scroll past hero
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500 && !dismissed) {
      waBubble?.classList.remove('open');
    }
  }, { passive: true });

})();