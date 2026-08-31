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

  /* ---------- Brand Scroller (Horizontal scroll / buttons / drag) ---------- */
  var scroller = document.querySelector('.brand-scroller');
  if (scroller) {
    var track = scroller.querySelector('.brand-scroller-track');
    var btnPrev = scroller.querySelector('.scroller-btn.prev');
    var btnNext = scroller.querySelector('.scroller-btn.next');

    var getScrollStep = function () {
      var item = track ? track.querySelector('.brand-slot') : null;
      return item ? item.offsetWidth + 18 : 240;
    };

    if (btnPrev && track) {
      btnPrev.addEventListener('click', function () {
        track.scrollBy({ left: -getScrollStep() * 2, behavior: 'smooth' });
      });
    }
    if (btnNext && track) {
      btnNext.addEventListener('click', function () {
        track.scrollBy({ left: getScrollStep() * 2, behavior: 'smooth' });
      });
    }

    /* Mouse drag to scroll */
    if (track) {
      var isDown = false;
      var startX = 0;
      var scrollLeft = 0;

      track.addEventListener('mousedown', function (e) {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      window.addEventListener('mouseup', function () {
        if (!isDown) return;
        isDown = false;
        track.classList.remove('is-dragging');
      });

      track.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - track.offsetLeft;
        var walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
      });
    }
  }
})();
