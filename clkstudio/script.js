/* CLK Studio — three small behaviours. No dependencies. */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Local clock in the header ----------------------------------------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var d = new Date();
      clock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    };
    tick();
    setInterval(tick, 1000);
  }

  /* 2. Reveal on first entry --------------------------------------------- */
  /* Elements carry data-reveal and optionally data-reveal-delay="240" (ms).
     Each fires once; scrolling back up does not replay it. */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.setProperty('--reveal-delay', (el.dataset.revealDelay || 0) + 'ms');
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* 3. Mosaic video on hover --------------------------------------------- */
  /* Any <video class="m"> inside a .tile plays muted while pointed at.
     Left alone entirely when the visitor asked for reduced motion. */
  if (!reduced) {
    document.querySelectorAll('.tile').forEach(function (tile) {
      var video = tile.querySelector('video.m');
      if (!video) return;
      video.muted = true;
      tile.addEventListener('pointerenter', function () {
        var p = video.play();
        if (p && p.catch) p.catch(function () { /* autoplay refused — poster stands */ });
      });
      tile.addEventListener('pointerleave', function () {
        video.pause();
        video.currentTime = 0;
      });
    });
  }
})();
