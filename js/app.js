// js/app.js
// Taiwan Dashboard — App-Initialisierung
// Läuft nach allen anderen Scripts (letzter script-Tag in index.html)

(function() {
  'use strict';

  var PASSWORD    = 'sri30';
  var SESSION_KEY = 'taiwan_unlocked';

  // --- Passwort-Gate ---
  // Lokal (file:// oder localhost): auto-fill + auto-submit → keine Eingabe nötig
  // Remote (GitHub Pages): Gate erscheint, localStorage Session

  function initGate() {
    var overlay = document.getElementById('gate-overlay');
    var app     = document.getElementById('app');
    var input   = document.getElementById('gate-input');
    var btn     = document.getElementById('gate-btn');
    var errMsg  = document.getElementById('gate-error');

    function unlock() {
      overlay.classList.add('hidden');
      app.classList.remove('hidden');
      localStorage.setItem(SESSION_KEY, '1');
    }

    // Bereits entsperrt in dieser Session?
    if (localStorage.getItem(SESSION_KEY) === '1') {
      unlock();
      return;
    }

    // Lokal: auto-fill + auto-submit (kein manuelles Eintippen nötig)
    var isLocal = location.hostname === 'localhost' ||
                  location.hostname === '127.0.0.1' ||
                  location.protocol === 'file:';

    if (isLocal) {
      input.value = PASSWORD;
      // Kurze Verzögerung damit DOM vollständig gerendert ist
      setTimeout(function() { unlock(); }, 100);
      return;
    }

    // Remote: Gate anzeigen
    overlay.classList.remove('hidden');

    function checkPassword() {
      if (input.value === PASSWORD) {
        errMsg.classList.remove('visible');
        input.classList.remove('error');
        unlock();
      } else {
        errMsg.classList.add('visible');
        input.classList.add('error');
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', checkPassword);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') checkPassword();
    });
    input.focus();
  }

  // --- Nav IntersectionObserver ---
  // Markiert den Nav-Link als active wenn die zugehörige Section im Viewport ist.
  // rootMargin: -20% oben / -70% unten → Section muss im oberen Drittel sichtbar sein

  function initNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) { link.classList.remove('active'); });
          var activeLink = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(function(s) { observer.observe(s); });
  }

  // --- Phase-Farbe aus CSS lesen (für map.js + charts.js) ---
  // Einheitliche Farbquelle: CSS Custom Properties → kein Magic-Number-Chaos in JS

  window.getPhaseColor = function(phaseId) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--phase-' + phaseId)
      .trim();
  };

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function() {
    initGate();
    initNav();
    if (window.mapModule) {
      window.mapModule.init();
    }
  });

})();
