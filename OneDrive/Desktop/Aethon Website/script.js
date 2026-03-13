/* ========================================================================
   AETHON INTELLIGENCE — Site Scripts
   Nav, scroll reveals, FAQ accordion, mobile menu
   ======================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Nav — scroll state + mobile menu
     ------------------------------------------------------------------ */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // initial check

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------------------------------
     Scroll-triggered reveals — IntersectionObserver
     ------------------------------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: just show everything */
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ------------------------------------------------------------------
     Hero stagger — fire immediately on load
     ------------------------------------------------------------------ */
  const heroStagger = document.querySelector('.hero-content.stagger');
  if (heroStagger) {
    const children = heroStagger.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      setTimeout(function () {
        child.classList.add('visible');
      }, 120 * i);
    });
  }

  /* Video box stagger — slightly after hero text */
  const heroVideo = document.querySelector('.hero-video.reveal');
  if (heroVideo) {
    setTimeout(function () {
      heroVideo.classList.add('visible');
    }, 700);
  }

  /* ------------------------------------------------------------------
     FAQ Accordion
     ------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      /* Close all others */
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      /* Toggle this one */
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------
     Smooth scroll for anchor links
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
