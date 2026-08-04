// js/sicherheit.js
// Taiwan Reise-Dashboard — Warndienst + Bebenskala (read-only)
// Liest:    window.TAIWAN.warndienst, window.TAIWAN.seismik
// Schreibt: window.sicherheitModule, window.seismikBadge(phaseId)
// Update: Werte ausschliesslich in data.js aendern (warndienst.level / .current / .lastCheck)

window.sicherheitModule = (function() {
  'use strict';

  // -------------------------------------------------------
  // Hilfsfunktionen
  // -------------------------------------------------------

  function _levelDef(key) {
    var levels = window.TAIWAN.warndienst.levels;
    for (var i = 0; i < levels.length; i++) {
      if (levels[i].key === key) return levels[i];
    }
    return levels[0];
  }

  function _scaleDef(key) {
    var scale = window.TAIWAN.seismik.scale;
    for (var i = 0; i < scale.length; i++) {
      if (scale[i].key === key) return scale[i];
    }
    return scale[0];
  }

  function _fmtDate(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    if (p.length === 3) return p[2] + '.' + p[1] + '.' + p[0];
    if (p.length === 2) return p[1] + '/' + p[0];
    return iso;
  }

  // -------------------------------------------------------
  // Block 1 — Warndienst
  // -------------------------------------------------------

  function _renderWarndienst() {
    var w   = window.TAIWAN.warndienst;
    var lvl = _levelDef(w.level);

    var html = '<div class="sec-block">';
    html += '<h3 class="sec-block-title">🛡️ Warndienst — politische Lage</h3>';
    html += '<p class="sec-block-intro">Frühwarndienst für das Reisefenster. Abruf über den Skill <code>/taiwan-watch</code>, Verlauf in <code>taiwan-watch-log.md</code>.</p>';

    // Status-Karte
    html += '<div class="wd-status" style="--lvl:' + lvl.color + '">';
    html += '<div class="wd-status-main">';
    html += '<span class="wd-status-icon">' + lvl.icon + '</span>';
    html += '<div>';
    html += '<div class="wd-status-label">Ampel: ' + lvl.label + '</div>';
    html += '<div class="wd-status-date">Letzter Abruf ' + _fmtDate(w.lastCheck) + '</div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="wd-metrics">';
    html += '<div class="wd-metric"><span class="wd-metric-value">' + w.current.plaAir + '</span><span class="wd-metric-label">PLA Flugzeuge</span></div>';
    html += '<div class="wd-metric"><span class="wd-metric-value">' + w.current.plaSea + '</span><span class="wd-metric-label">Marineschiffe</span></div>';
    html += '<div class="wd-metric"><span class="wd-metric-value">' + w.current.zone + '</span><span class="wd-metric-label">Sperrzone</span></div>';
    html += '<div class="wd-metric"><span class="wd-metric-value">' + w.current.trigger + '</span><span class="wd-metric-label">Pol. Trigger</span></div>';
    html += '</div>';

    html += '<div class="wd-note">' + w.current.note + '</div>';
    html += '<div class="wd-note wd-note--muted">Vortage: ' + w.current.previous + '</div>';
    html += '<div class="wd-note wd-note--muted">Reisewarnung: ' + w.current.advisory + '</div>';
    html += '</div>'; // .wd-status

    // Baseline-Band
    html += '<h4 class="sec-sub">Referenzband — PLA-Flugzeuge pro Tag</h4>';
    html += '<div class="wd-band">';
    w.baseline.forEach(function(b) {
      html += '<div class="wd-band-item" style="--lvl:' + b.color + '">';
      html += '<span class="wd-band-range">' + b.range + '</span>';
      html += '<span class="wd-band-label">' + b.label + '</span>';
      html += '</div>';
    });
    html += '</div>';

    // Ampelstufen + Handlung
    html += '<h4 class="sec-sub">Stufen und was sie auslösen</h4>';
    html += '<div class="wd-levels">';
    w.levels.forEach(function(l) {
      var isActive = (l.key === w.level);
      html += '<div class="wd-level' + (isActive ? ' wd-level--active' : '') + '" style="--lvl:' + l.color + '">';
      html += '<div class="wd-level-head">' + l.icon + ' <strong>' + l.label + '</strong>';
      if (isActive) html += '<span class="wd-level-now">aktuell</span>';
      html += '</div>';
      html += '<div class="wd-level-trigger">' + l.trigger + '</div>';
      html += '<div class="wd-level-action">→ ' + l.action + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Offene Trigger
    html += '<h4 class="sec-sub">Offene Auslöser vor der Reise</h4>';
    html += '<div class="wd-triggers">';
    w.triggers.forEach(function(t) {
      html += '<div class="wd-trigger">';
      html += '<div class="wd-trigger-head"><strong>' + t.title + '</strong><span class="wd-chip">' + t.status + '</span></div>';
      html += '<div class="wd-trigger-detail">' + t.detail + '</div>';
      html += '<div class="wd-trigger-window">🕒 ' + t.window + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Kalender
    html += '<h4 class="sec-sub">Kalender bis Reiseende</h4>';
    html += '<div class="wd-cal">';
    w.calendar.forEach(function(c) {
      html += '<div class="wd-cal-row wd-cal-row--' + c.risk.replace('—', 'none') + '">';
      html += '<span class="wd-cal-date">' + _fmtDate(c.date) + '</span>';
      html += '<span class="wd-cal-event"><strong>' + c.event + '</strong><em>' + c.detail + '</em></span>';
      html += '<span class="wd-cal-risk">' + (c.risk === '—' ? '' : 'Risiko ' + c.risk) + '</span>';
      html += '</div>';
    });
    html += '</div>';

    // Quellen
    html += '<h4 class="sec-sub">Quellen die jeder Abruf abklopft</h4>';
    html += '<div class="wd-sources">';
    w.sources.forEach(function(s) {
      html += '<a class="wd-source" href="' + s.url + '" target="_blank" rel="noopener">';
      html += '<span class="wd-source-name">' + s.name + '</span>';
      html += '<span class="wd-source-what">' + s.what + '</span>';
      html += '<span class="wd-source-cadence">' + s.cadence + '</span>';
      html += '</a>';
    });
    html += '</div>';

    // Grenzen + Referenzfall
    html += '<div class="sec-limit"><strong>Was der Dienst nicht kann.</strong> ' + w.limits + '</div>';
    html += '<div class="sec-limit sec-limit--ref"><strong>Referenzfall.</strong> ' + w.reference + '</div>';

    html += '</div>'; // .sec-block
    return html;
  }

  // -------------------------------------------------------
  // Block 2 — Bebenskala
  // -------------------------------------------------------

  function _renderSeismik() {
    var s = window.TAIWAN.seismik;

    var html = '<div class="sec-block">';
    html += '<h3 class="sec-block-title">🌋 Bebenskala</h3>';
    html += '<p class="sec-block-intro">' + s.intro + '</p>';

    // Zahlen
    html += '<div class="sk-facts">';
    s.facts.forEach(function(f) {
      html += '<div class="sk-fact"><span class="sk-fact-value">' + f.value + '</span><span class="sk-fact-label">' + f.label + '</span></div>';
    });
    html += '</div>';

    html += '<div class="sec-context">' + s.context + '</div>';

    // Skala-Legende
    html += '<h4 class="sec-sub">Skala — Regionalrisiko</h4>';
    html += '<div class="sk-scale">';
    s.scale.forEach(function(x) {
      html += '<div class="sk-scale-item" style="--lvl:' + x.color + '">';
      html += '<div class="sk-scale-head"><span class="sk-bar">' + x.icon + '</span><strong>' + x.label + '</strong></div>';
      html += '<div class="sk-scale-meaning">' + x.meaning + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Pro Phase
    html += '<h4 class="sec-sub">Pro Reisephase</h4>';
    html += '<div class="sk-phases">';
    window.TAIWAN.phases.forEach(function(p) {
      var e = s.phases[p.id];
      if (!e) return;
      var d = _scaleDef(e.level);
      html += '<div class="sk-phase" style="--lvl:' + d.color + '; --phase-color:' + p.color + '">';
      html += '<div class="sk-phase-head">';
      html += '<span class="sk-phase-name">' + p.emoji + ' Phase ' + p.id + ': ' + p.name + '</span>';
      html += '<span class="sk-badge" style="--lvl:' + d.color + '">' + d.icon + ' ' + d.label + '</span>';
      html += '</div>';
      html += '<div class="sk-phase-headline">' + e.headline + '</div>';
      html += '<div class="sk-phase-note">' + e.note + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Verhalten
    html += '<h4 class="sec-sub">Verhalten mit Kleinkind</h4>';
    html += '<ul class="sk-list">';
    s.behaviour.forEach(function(b) { html += '<li>' + b + '</li>'; });
    html += '</ul>';

    // Apps
    html += '<h4 class="sec-sub">Warnkanäle</h4>';
    html += '<div class="sk-apps">';
    s.apps.forEach(function(a) {
      html += '<div class="sk-app">';
      html += '<div class="sk-app-head"><strong>' + a.name + '</strong><span class="wd-chip">' + a.note + '</span></div>';
      html += '<div class="sk-app-what">' + a.what + '</div>';
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="sec-limit"><strong>Einordnung.</strong> ' + s.limits + '</div>';

    html += '</div>'; // .sec-block
    return html;
  }

  // -------------------------------------------------------
  // Badge für Timeline (app.js ruft das auf)
  // -------------------------------------------------------

  window.seismikBadge = function(phaseId) {
    if (!window.TAIWAN || !window.TAIWAN.seismik) return '';
    var e = window.TAIWAN.seismik.phases[phaseId];
    if (!e) return '';
    var d = _scaleDef(e.level);
    return '<span class="tl-badge tl-badge--seismik" style="--lvl:' + d.color + '" '
      + 'title="Bebenrisiko ' + d.label + ' — ' + e.headline + '">'
      + d.icon + ' Beben ' + d.label + '</span>';
  };

  window.seismikPhaseRow = function(phaseId) {
    if (!window.TAIWAN || !window.TAIWAN.seismik) return '';
    var e = window.TAIWAN.seismik.phases[phaseId];
    if (!e) return '';
    var d = _scaleDef(e.level);
    var html = '<div class="tl-seismik" style="--lvl:' + d.color + '">';
    html += '<div class="tl-seismik-head"><span class="sk-bar">' + d.icon + '</span>';
    html += '<strong>Bebenrisiko ' + d.label + '</strong> · ' + e.headline + '</div>';
    html += '<div class="tl-seismik-note">' + e.note + '</div>';
    html += '<a class="tl-seismik-link" href="#sicherheit">Ganze Skala ansehen →</a>';
    html += '</div>';
    return html;
  };

  // -------------------------------------------------------
  // Public API
  // -------------------------------------------------------

  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.warndienst || !window.TAIWAN.seismik) return;

      var el = document.getElementById('sicherheit-content');
      if (!el) return;

      el.classList.remove('placeholder');
      el.innerHTML = _renderWarndienst() + _renderSeismik();

      // Ampel zusaetzlich in die Hero-Statleiste haengen
      var bar = document.querySelector('.stats-bar');
      if (bar && !document.getElementById('hero-ampel')) {
        var lvl = _levelDef(window.TAIWAN.warndienst.level);
        var stat = document.createElement('a');
        stat.id = 'hero-ampel';
        stat.className = 'stat';
        stat.href = '#sicherheit';
        stat.style.textDecoration = 'none';
        stat.innerHTML = '<span class="stat-value">' + lvl.icon + ' ' + lvl.label + '</span>'
          + '<span class="stat-label">Warndienst ' + _fmtDate(window.TAIWAN.warndienst.lastCheck) + '</span>';
        bar.appendChild(stat);
      }

      console.log('[sicherheit.js] initialisiert (Ampel: ' + window.TAIWAN.warndienst.level + ')');
    }
  };

})();
