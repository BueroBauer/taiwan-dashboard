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

  // --- Timeline ---
  // TML-01 bis TML-06: Phasen-Cards mit Tages-Slots, Badges, Aufklapp-Funktion

  var WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    return WEEKDAYS[d.getDay()] + ', ' + d.getDate() + '.' + (d.getMonth() + 1) + '.';
  }

  function priceBadge(price) {
    if (!price) return '';
    if (price.eur === 0 || (price.note && price.note.toLowerCase().indexOf('gratis') !== -1)) {
      return '<span class="tl-badge tl-badge--gratis">GRATIS</span>';
    }
    if (price.eur > 0) {
      return '<span class="tl-badge tl-badge--price">€' + price.eur + '</span>';
    }
    return '';
  }

  function renderSight(sight) {
    var html = '<li class="tl-sight">';
    html += '<a class="tl-sight-name" href="' + sight.googleMapsUrl + '" target="_blank" rel="noopener">' + sight.name + '</a>';
    if (!sight.buggyFriendly) {
      html += '<span class="tl-badge tl-badge--buggy" title="Buggy schwierig">🚼⚠️</span>';
    } else {
      html += '<span class="tl-badge tl-badge--buggy-ok" title="Buggy-freundlich">🚼</span>';
    }
    html += priceBadge(sight.price);
    // Schildkröten-Badge
    if (sight.name && sight.name.toLowerCase().indexOf('schildkröt') !== -1) {
      html += '<span class="tl-badge tl-badge--special">🐢</span>';
    }
    // Heißquellen-Warnung
    if (sight.category === 'wellness' || (sight.tip && sight.tip.toLowerCase().indexOf('altersbeschränkung') !== -1)) {
      html += '<span class="tl-badge tl-badge--warn">⚠️ Altersbeschr.</span>';
    }
    // Silvester
    if (sight.category === 'feier' || (sight.name && sight.name.toLowerCase().indexOf('silvester') !== -1)) {
      html += '<span class="tl-badge tl-badge--special">🎆 SILVESTER</span>';
    }
    if (sight.tip) {
      html += '<span class="tl-sight-tip">' + sight.tip + '</span>';
    }
    html += '</li>';
    return html;
  }

  function renderDay(dayObj, phaseId) {
    var slots = dayObj.slots;
    var html = '<div class="tl-day">';
    html += '<div class="tl-day-header">';
    html += formatDate(dayObj.date);
    if (dayObj.jetlag) {
      html += ' <span class="tl-badge tl-badge--jetlag">🌐 Jetlag</span>';
    }
    html += '</div>';

    // Vormittag
    html += '<div class="tl-slot">';
    html += '<div class="tl-slot-label">🌅 Vormittag</div>';
    if (slots.morning && slots.morning.length > 0) {
      html += '<ul class="tl-sight-list">';
      slots.morning.forEach(function(s) { html += renderSight(s); });
      html += '</ul>';
    } else {
      html += '<div class="tl-slot-empty">Noch nicht geplant</div>';
    }
    html += '</div>';

    // Mittagsschlaf
    html += '<div class="tl-slot tl-slot--nap">';
    html += '<div class="tl-slot-label">😴 Mittagsschlaf</div>';
    html += '<div class="tl-nap-block">12:00 – 14:30</div>';
    html += '</div>';

    // Nachmittag
    html += '<div class="tl-slot">';
    html += '<div class="tl-slot-label">🌇 Nachmittag</div>';
    if (slots.afternoon && slots.afternoon.length > 0) {
      html += '<ul class="tl-sight-list">';
      slots.afternoon.forEach(function(s) { html += renderSight(s); });
      html += '</ul>';
    } else {
      html += '<div class="tl-slot-empty">Noch nicht geplant</div>';
    }
    html += '</div>';

    html += '</div>'; // .tl-day
    return html;
  }

  function renderPhaseCard(phase, index) {
    // Offene Fragen zählen (aus window.TAIWAN.faq)
    var openCount = 0;
    if (window.TAIWAN.faq) {
      window.TAIWAN.faq.forEach(function(q) {
        if (q.status === 'open' && q.phaseIds && q.phaseIds.indexOf(phase.id) !== -1) {
          openCount++;
        }
      });
    }

    var cardId = 'tl-card-' + phase.id;
    var bodyId = 'tl-body-' + phase.id;

    var html = '<div class="tl-card" id="' + cardId + '" style="--phase-color:' + phase.color + '">';

    // Header (immer sichtbar)
    html += '<div class="tl-card-header" role="button" tabindex="0" aria-expanded="false" aria-controls="' + bodyId + '">';
    html += '<div class="tl-phase-bar"></div>';
    html += '<div class="tl-header-content">';
    html += '<div class="tl-header-top">';
    html += '<span class="tl-phase-emoji">' + phase.emoji + '</span>';
    html += '<span class="tl-phase-name">Phase ' + phase.id + ': ' + phase.name + '</span>';
    html += '<span class="tl-badge tl-badge--nights">' + phase.nights + ' Nächte</span>';
    if (phase.earlyBook) {
      html += '<span class="tl-badge tl-badge--warn">⚠️ Früh buchen!</span>';
    }
    if (openCount > 0) {
      html += '<span class="tl-badge tl-badge--open-q">⚠️ ' + openCount + ' offen</span>';
    }
    html += '<span class="tl-chevron">▼</span>';
    html += '</div>'; // .tl-header-top

    // Daten
    html += '<div class="tl-dates">' + phase.startDate + ' – ' + phase.endDate + '</div>';

    // Top-Highlights
    if (phase.highlights && phase.highlights.length > 0) {
      html += '<div class="tl-highlights">';
      phase.highlights.slice(0, 3).forEach(function(h) {
        html += '<span class="tl-highlight-tag">' + h + '</span>';
      });
      html += '</div>';
    }

    html += '</div>'; // .tl-header-content
    html += '</div>'; // .tl-card-header

    // Body (aufklappbar)
    html += '<div class="tl-card-body" id="' + bodyId + '" hidden>';
    if (phase.days && phase.days.length > 0) {
      phase.days.forEach(function(dayObj) {
        html += renderDay(dayObj, phase.id);
      });
    } else {
      html += '<div class="tl-slot-empty" style="padding:1rem">Keine Tages-Daten vorhanden</div>';
    }
    html += '</div>'; // .tl-card-body

    html += '</div>'; // .tl-card
    return html;
  }

  function renderTimeline() {
    var container = document.getElementById('timeline-container');
    if (!container) return;
    if (!window.TAIWAN || !window.TAIWAN.phases) return;

    var html = '';
    window.TAIWAN.phases.forEach(function(phase, index) {
      html += renderPhaseCard(phase, index);
    });
    container.innerHTML = html;

    // Expand/Collapse — Event Delegation
    container.addEventListener('click', function(e) {
      var header = e.target.closest('.tl-card-header');
      if (!header) return;
      var card = header.closest('.tl-card');
      var body = card.querySelector('.tl-card-body');
      var isOpen = !body.hidden;
      body.hidden = isOpen;
      header.setAttribute('aria-expanded', String(!isOpen));
      card.classList.toggle('tl-card--open', !isOpen);
    });

    // Keyboard support
    container.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var header = e.target.closest('.tl-card-header');
        if (header) { e.preventDefault(); header.click(); }
      }
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function() {
    initGate();
    initNav();
    if (window.mapModule) {
      window.mapModule.init();
    }
    renderTimeline();
  });

})();
