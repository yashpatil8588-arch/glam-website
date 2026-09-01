/* GLAM Licensing & Consulting — shared behaviour
   Minimal, dependency-free. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Top bar scroll state ---------- */
  var topbar = document.querySelector('.topbar');
  function onScroll() {
    if (!topbar) return;
    topbar.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function setNav(open) {
    if (!toggle || !mobileNav) return;
    if (open) mobileNav.hidden = false;
    /* allow the un-hide to paint before transitioning */
    requestAnimationFrame(function () {
      mobileNav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = open ? 'hidden' : '';
      document.body.classList.toggle('nav-open', open);
      if (!open) {
        window.setTimeout(function () {
          if (!mobileNav.classList.contains('is-open')) mobileNav.hidden = true;
        }, reduceMotion ? 0 : 480);
      }
    });
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll reveals ---------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Enquiry form (opens the visitor's mail client) ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      var name = form.querySelector('#f-name');
      var email = form.querySelector('#f-email');
      var message = form.querySelector('#f-message');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        if (note) note.textContent = 'Please add your name, email and message so we can respond.';
        (!name.value.trim() ? name : !email.value.trim() ? email : message).focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (note) note.textContent = 'That email address doesn’t look complete — please check it.';
        email.focus();
        return;
      }

      var company = form.querySelector('#f-company').value.trim();
      var phone = form.querySelector('#f-phone').value.trim();
      var interest = form.querySelector('#f-interest').value;

      var subject = 'Website enquiry — ' + interest;
      var body = [
        'Name: ' + name.value.trim(),
        'Company: ' + (company || '—'),
        'Email: ' + email.value.trim(),
        'Phone: ' + (phone || '—'),
        'Interested in: ' + interest,
        '',
        message.value.trim()
      ].join('\n');

      window.location.href = 'mailto:ceo@glamlicensing.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      if (note) note.textContent = 'Opening your email app… or write to us directly at ceo@glamlicensing.com.';
    });
  }

  /* ---------- Brand Scroller (Touch, Drag & Infinite Auto-scroll) ---------- */
  var scroller = document.querySelector('.brand-scroller');
  if (scroller) {
    var wrap = scroller.querySelector('.brand-scroller-wrap');
    var track = scroller.querySelector('.brand-scroller-track');
    var groups = scroller.querySelectorAll('.brand-scroller-group');
    var btnPrev = scroller.querySelector('.scroller-btn.prev');
    var btnNext = scroller.querySelector('.scroller-btn.next');

    if (wrap && track && groups.length >= 2) {
      var speed = 0.75; // px per frame
      var direction = 1; // 1 = right, -1 = left
      var isPaused = false;
      var isUserInteracting = false;
      var isDragging = false;
      var startX = 0;
      var scrollStart = 0;
      var resumeTimer = null;
      var isVisible = true;

      function getGroupWidth() {
        if (!groups[0]) return 0;
        var style = window.getComputedStyle(track);
        var gap = parseFloat(style.columnGap || style.gap || 0) || 0;
        return groups[0].offsetWidth + gap;
      }

      // Initialize scroll position to middle group for seamless bidirectional scrolling
      function initScrollPosition() {
        var gw = getGroupWidth();
        if (gw > 0 && wrap.scrollLeft === 0) {
          wrap.scrollLeft = gw;
        }
      }

      // Handle wrapping at edges
      function checkWrap() {
        var gw = getGroupWidth();
        if (gw <= 0) return;
        if (wrap.scrollLeft >= gw * 2) {
          wrap.scrollLeft -= gw;
        } else if (wrap.scrollLeft <= 10) {
          wrap.scrollLeft += gw;
        }
      }

      // Pause interaction timer helper
      function queueResume(delay) {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
          isUserInteracting = false;
        }, delay || 2500);
      }

      // Scroll listener for wrapping during user touch/drag
      wrap.addEventListener('scroll', function () {
        checkWrap();
      }, { passive: true });

      // Touch events (Mobile phones & tablets)
      wrap.addEventListener('touchstart', function () {
        isUserInteracting = true;
        if (resumeTimer) clearTimeout(resumeTimer);
      }, { passive: true });

      wrap.addEventListener('touchend', function () {
        queueResume(2000);
      }, { passive: true });

      wrap.addEventListener('touchcancel', function () {
        queueResume(1000);
      }, { passive: true });

      // Mouse drag to scroll (Desktop)
      wrap.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return; // primary button only
        isDragging = true;
        isUserInteracting = true;
        startX = e.pageX - wrap.offsetLeft;
        scrollStart = wrap.scrollLeft;
        wrap.classList.add('is-dragging');
        if (resumeTimer) clearTimeout(resumeTimer);
      });

      window.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.pageX - wrap.offsetLeft;
        var walk = (x - startX);
        wrap.scrollLeft = scrollStart - walk;
      });

      window.addEventListener('mouseup', function () {
        if (isDragging) {
          isDragging = false;
          wrap.classList.remove('is-dragging');
          queueResume(2000);
        }
      });

      // Hover pause for desktop
      wrap.addEventListener('mouseenter', function () {
        isPaused = true;
      });

      wrap.addEventListener('mouseleave', function () {
        if (!isDragging) {
          isPaused = false;
        }
      });

      // Arrow navigation buttons
      if (btnPrev) {
        btnPrev.addEventListener('click', function () {
          direction = -1;
          isUserInteracting = true;
          var step = Math.max(wrap.clientWidth * 0.65, 240);
          wrap.scrollBy({ left: -step, behavior: 'smooth' });
          queueResume(3000);
        });
      }

      if (btnNext) {
        btnNext.addEventListener('click', function () {
          direction = 1;
          isUserInteracting = true;
          var step = Math.max(wrap.clientWidth * 0.65, 240);
          wrap.scrollBy({ left: step, behavior: 'smooth' });
          queueResume(3000);
        });
      }

      // Visibility observer to save battery/CPU when offscreen
      if ('IntersectionObserver' in window) {
        var visObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        visObserver.observe(scroller);
      }

      // Animation loop
      function step() {
        if (isVisible && !reduceMotion && !isPaused && !isUserInteracting && !isDragging) {
          wrap.scrollLeft += speed * direction;
          checkWrap();
        }
        requestAnimationFrame(step);
      }

      // Start after initial layout
      window.addEventListener('load', function () {
        initScrollPosition();
      });
      initScrollPosition();
      requestAnimationFrame(step);

      window.addEventListener('resize', function () {
        checkWrap();
      }, { passive: true });
    }
  }
})();
