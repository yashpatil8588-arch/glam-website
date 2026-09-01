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

      window.location.href = 'mailto:hello@glamlicensing.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      if (note) note.textContent = 'Opening your email app… or write to us directly at hello@glamlicensing.com.';
    });
  }

  /* ---------- Brand Scroller (Auto-scroll / Infinite Loop / Controls / Drag) ---------- */
  var scroller = document.querySelector('.brand-scroller');
  if (scroller) {
    var track = scroller.querySelector('.brand-scroller-track');
    var btnPrev = scroller.querySelector('.scroller-btn.prev');
    var btnNext = scroller.querySelector('.scroller-btn.next');

    if (track) {
      // Clone items for seamless infinite looping
      var origItems = Array.prototype.slice.call(track.children);
      var origCount = origItems.length;
      if (origCount > 0) {
        origItems.forEach(function (el) {
          var clone = el.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          track.appendChild(clone);
        });
      }

      var halfWidth = 0;
      function updateMetrics() {
        if (track.children.length > origCount && track.children[origCount]) {
          halfWidth = track.children[origCount].offsetLeft - track.children[0].offsetLeft;
        }
      }
      updateMetrics();
      window.addEventListener('resize', updateMetrics, { passive: true });
      window.addEventListener('load', updateMetrics, { passive: true });

      var getScrollStep = function () {
        var item = track.querySelector('.brand-slot');
        return item ? item.offsetWidth + 18 : 240;
      };

      // State flags for smooth user experience
      var isHovered = false;
      var isInteracting = false;
      var isDragging = false;
      var isPaused = false;
      var resumeTimer = null;

      function pauseTemporarily(ms) {
        isPaused = true;
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () {
          isPaused = false;
        }, ms || 3000);
      }

      // Prev / Next button navigation
      if (btnPrev) {
        btnPrev.addEventListener('click', function () {
          pauseTemporarily(3500);
          var step = getScrollStep() * 2;
          if (track.scrollLeft - step < 0 && halfWidth > 0) {
            track.scrollLeft += halfWidth;
          }
          track.scrollBy({ left: -step, behavior: 'smooth' });
        });
      }

      if (btnNext) {
        btnNext.addEventListener('click', function () {
          pauseTemporarily(3500);
          var step = getScrollStep() * 2;
          track.scrollBy({ left: step, behavior: 'smooth' });
        });
      }

      // Pause when hovering with mouse
      scroller.addEventListener('mouseenter', function () {
        isHovered = true;
      });
      scroller.addEventListener('mouseleave', function () {
        isHovered = false;
      });

      // Pause during touch interactions
      track.addEventListener('touchstart', function () {
        isInteracting = true;
      }, { passive: true });
      track.addEventListener('touchend', function () {
        isInteracting = false;
        pauseTemporarily(2500);
      }, { passive: true });

      // Pause when focused (keyboard accessibility)
      scroller.addEventListener('focusin', function () {
        isHovered = true;
      });
      scroller.addEventListener('focusout', function () {
        isHovered = false;
      });

      // Mouse drag to scroll
      var isDown = false;
      var startX = 0;
      var startScrollLeft = 0;

      track.addEventListener('mousedown', function (e) {
        isDown = true;
        isDragging = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        startScrollLeft = track.scrollLeft;
      });

      window.addEventListener('mouseup', function () {
        if (!isDown) return;
        isDown = false;
        isDragging = false;
        track.classList.remove('is-dragging');
        pauseTemporarily(2500);
      });

      track.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - track.offsetLeft;
        var walk = (x - startX) * 1.5;
        track.scrollLeft = startScrollLeft - walk;
        if (halfWidth > 0) {
          if (track.scrollLeft >= halfWidth) track.scrollLeft -= halfWidth;
          if (track.scrollLeft < 0) track.scrollLeft += halfWidth;
        }
      });

      // Auto-scroll animation loop (smooth continuous drift)
      var scrollSpeed = 50; // pixels per second
      var lastTimestamp = null;

      function autoScroll(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        var elapsed = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        // Cap elapsed delta to prevent jumping when waking from background tab
        if (elapsed > 0.1) elapsed = 0.016;

        if (!reduceMotion && !isHovered && !isInteracting && !isDragging && !isPaused && document.visibilityState === 'visible') {
          track.scrollLeft += scrollSpeed * elapsed;
          if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
            track.scrollLeft -= halfWidth;
          }
        } else if (halfWidth > 0) {
          // Keep scroll position wrapped within bounds during manual scrolling
          if (track.scrollLeft >= halfWidth * 1.9) {
            track.scrollLeft -= halfWidth;
          } else if (track.scrollLeft < 0) {
            track.scrollLeft += halfWidth;
          }
        }

        requestAnimationFrame(autoScroll);
      }

      if (!reduceMotion) {
        requestAnimationFrame(autoScroll);
      }
    }
  }
})();
