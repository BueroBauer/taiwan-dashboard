# Phase 5: Booking + Offene Fragen — Pattern Map

**Mapped:** 2026-08-03
**Files analyzed:** 4 (2 new, 2 modified)
**Analogs found:** 4 / 4

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `js/booking.js` | module/renderer | request-response (data.js → DOM) | `js/restaurants.js` | exact |
| `js/faq.js` | module/renderer | request-response (data.js → DOM) | `js/restaurants.js` | exact |
| `js/app.js` | init orchestrator | — | `js/app.js` (self) | self |
| `index.html` | host document | — | `index.html` (self) | self |
| `css/style.css` | design system | — | `.rst-card`, `.vid-tab` patterns | role-match |

---

## Pattern Assignments

### `js/booking.js` (new module, request-response)

**Analog:** `js/restaurants.js` (lines 1–111)

**Module skeleton** (restaurants.js lines 6–10):
```javascript
window.bookingModule = (function() {
  'use strict';

  // internal state if needed
```

**Init pattern** (restaurants.js lines 96–109):
```javascript
  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.booking) return;

      var el = document.getElementById('booking-content');
      if (!el) return;

      el.innerHTML = '';
      _render(el);

      console.log('[booking.js] initialisiert (' + window.TAIWAN.booking.length + ' Phasen)');
    }
  };

})();
```

**Card builder pattern** (restaurants.js lines 28–41):
```javascript
function _makeCard(r) {
  return '<div class="rst-card">'
    + '<div class="rst-name">' + r.name + '</div>'
    + '<div class="rst-meta">...</div>'
    + '<div class="rst-note">' + r.note + '</div>'
    + '<a class="rst-link" href="' + r.url + '" target="_blank" rel="noopener">Text &#x2197;</a>'
    + '</div>';
}
```

**Grid render + innerHTML swap** (restaurants.js lines 43–54):
```javascript
function _renderCards(container, phase) {
  var old = container.querySelector('.rst-grid');
  if (old) old.parentNode.removeChild(old);

  var html = '<div class="rst-grid">';
  items.forEach(function(r) { html += _makeCard(r); });
  html += '</div>';
  container.insertAdjacentHTML('beforeend', html);
}
```

**Data schema to use** (`js/data.js` lines 849–987, booking[]):
```javascript
// booking[i] shape:
{
  phaseId: 1,
  region: "Taipei",
  checkIn: "2026-12-01",
  checkOut: "2026-12-03",
  nights: 2,
  earlyBook: false,           // true = ⚠️ badge; true bei Phase 5, 6, 8
  bookingUrl: "https://...",  // direkt verwenden, nicht neu konstruieren
  airbnbUrl: "https://...",
  criteria: { notes: "Nähe MRT..." },
  exampleHotels: []           // leer bei allen 10 — graceful fallback nötig
}

// tours[i] shape (für KKday-Cards innerhalb Booking-Card):
{
  phaseId: 5,
  name: "Glasbodenboot Xiaoliuqiu",
  provider: "KKday",
  url: "https://...",         // PLATZHALTER — zeige Hinweis-Text
  priceEur: 18,
  buggyFriendly: true,
  note: "Altersbeschränkung klären!"
}
```

**KKday-Touren filtern** (Pattern aus restaurants.js _filter, line 21–25):
```javascript
function _renderKKdayTours(phaseId) {
  var tours = window.TAIWAN.tours.filter(function(t) {
    return t.phaseId === phaseId;
  });
  if (!tours.length) return '';
  // render tours...
}
```

**earlyBook-Badge** (analog zu tl-badge--warn in app.js line 219):
```javascript
var earlyBadge = b.earlyBook
  ? '<span class="bkg-badge bkg-badge--warn">&#x26A0;&#xFE0F; Fr&#xFC;h buchen!</span>'
  : '';
```

**KKday-Platzhalter-Warnung** (data.js Pitfall — URLs enden ohne Zahl = Platzhalter):
```javascript
// Erkennen: URL enthält keine Zahl → Platzhalter
var isPlaceholder = !/\d/.test(t.url);
var linkHtml = isPlaceholder
  ? '<span class="bkg-tour-placeholder">&#x26A0; URL Platzhalter — Mark tr&#xE4;gt echte URL ein</span>'
  : '<a href="' + t.url + '" target="_blank" rel="noopener">Buchen &#x2197;</a>';
```

---

### `js/faq.js` (new module, request-response)

**Analog:** `js/restaurants.js` (same IIFE structure)

**Module skeleton + init** (restaurants.js lines 6–10, 96–109 — same pattern):
```javascript
window.faqModule = (function() {
  'use strict';

  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.faq) return;
      var el = document.getElementById('faq-content');
      if (!el) return;
      el.innerHTML = '';
      _render(el);
      console.log('[faq.js] initialisiert (' + window.TAIWAN.faq.length + ' Fragen)');
    }
  };
})();
```

**Data schema** (`js/data.js` lines 997–1072, faq[]):
```javascript
// faq[i] shape:
{
  id: "faq-001",
  question: "Brauchen wir einen Taiwan-Führerschein...",
  answer: null,           // null = noch nicht geklärt
  status: "open",         // "open" | "resolved"
  phaseIds: [3,4,5,6,7,8,9],
  priority: "high",       // "critical" | "high" | "medium" | "low"
  tip: "Internationaler Führerschein..."
}
```

**Item builder** (analog zu restaurants.js _makeCard):
```javascript
function _makeFaqItem(q) {
  var statusIcon  = q.status === 'resolved' ? '&#x1F7E2;' : '&#x1F534;';
  var statusLabel = q.status === 'resolved' ? 'Gekl&#xE4;rt' : 'Offen';

  return '<div class="faq-item faq-item--' + q.status + '">'
    + '<div class="faq-header">'
      + '<span class="faq-status">' + statusIcon + ' ' + statusLabel + '</span>'
      + '<span class="faq-priority faq-priority--' + q.priority + '">' + q.priority + '</span>'
    + '</div>'
    + '<div class="faq-question">' + q.question + '</div>'
    + (q.tip    ? '<div class="faq-tip">'    + q.tip    + '</div>' : '')
    + (q.answer ? '<div class="faq-answer">' + q.answer + '</div>' : '')
    + '</div>';
}
```

**KEIN Runtime-Toggle:** FAQ-Status wird nur aus data.js gelesen (FAQ-02 = manuelles Edit). Kein Click-Handler für Status-Änderung nötig.

---

### `js/app.js` (modify — 2 new init calls)

**Pattern:** Existing DOMContentLoaded block (app.js lines 290–300):
```javascript
document.addEventListener('DOMContentLoaded', function() {
  initGate();
  initNav();
  if (window.mapModule)         { window.mapModule.init(); }
  if (window.chartsModule)      { window.chartsModule.init(); }
  if (window.videosModule)      { window.videosModule.init(); }
  if (window.restaurantsModule) { window.restaurantsModule.init(); }
  // ADD HERE:
  if (window.bookingModule)     { window.bookingModule.init(); }
  if (window.faqModule)         { window.faqModule.init(); }
  renderTimeline();
});
```

**Guard pattern** (same `if (window.XModule)` — never call without guard).

---

### `index.html` (modify — script tags + section containers)

**Existing script order** (index.html lines 178–183):
```html
<script src="js/data.js"></script>
<script src="js/map.js"></script>
<script src="js/charts.js"></script>
<script src="js/videos.js"></script>
<script src="js/restaurants.js"></script>
<!-- ADD: -->
<script src="js/booking.js"></script>
<script src="js/faq.js"></script>
<script src="js/app.js"></script>  <!-- MUST stay last -->
```

**Existing section containers** (index.html lines 155–168):
```html
<section id="booking" class="section">
  <div class="section-header">
    <h2 class="section-title">Booking</h2>
  </div>
  <div id="booking-content" class="placeholder">...</div>
</section>

<section id="fragen" class="section">
  <div class="section-header">
    <h2 class="section-title">Offene Fragen</h2>
  </div>
  <div id="faq-content" class="placeholder">...</div>
</section>
```

Beide Container existieren bereits. `init()` ersetzt `.placeholder`-Inhalt via `el.innerHTML = ''`.

---

### `css/style.css` (modify — new class blocks)

**Analog für Card-Klassen** (style.css lines 1011–1060, `.rst-card` block):
```css
.rst-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rst-name {
  color: var(--text);
  font-weight: 600;
  font-size: 0.95rem;
}
.rst-note {
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.4;
}
.rst-link {
  color: var(--accent);
  font-size: 0.78rem;
  text-decoration: none;
}
```

**Copy + rename to `.bkg-card`, `.bkg-*` and `.faq-item`, `.faq-*`.**

**Analog für Badge** (app.js inline + tl-badge pattern):
```css
/* Vorhanden als .tl-badge--warn — gleiche Farbe #EF4444 für earlyBook */
.bkg-badge--warn {
  background: #EF4444;
  color: #fff;
  border-radius: 4px;
  font-size: 0.7rem;
  padding: 0.1rem 0.4rem;
}
```

**FAQ-Status-Farben:**
```css
.faq-item--open    { border-left: 3px solid #EF4444; }  /* rot = open */
.faq-item--resolved { border-left: 3px solid #22C55E; } /* grün = resolved */
.faq-priority--critical { color: #EF4444; }
.faq-priority--high     { color: #F59E0B; }
.faq-priority--medium   { color: var(--muted); }
.faq-priority--low      { color: var(--muted); opacity: 0.6; }
```

**Grid-Layout** (analog `.rst-grid`, style.css line 1003–1010):
```css
.bkg-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
@media (min-width: 768px) {
  .bkg-grid { grid-template-columns: 1fr 1fr; }
}
```

---

## Shared Patterns

### IIFE-Modul-Struktur
**Source:** `js/restaurants.js` lines 6, 95–111
**Apply to:** `booking.js`, `faq.js`
```javascript
window.XModule = (function() {
  'use strict';
  // private functions
  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.X) return;
      var el = document.getElementById('X-content');
      if (!el) return;
      el.innerHTML = '';
      // render
    }
  };
})();
```

### ES5-Konvention (Projektpflicht)
**Source:** `js/restaurants.js`, `js/videos.js` — durchgehend
- Kein `const`/`let` — nur `var`
- Keine Arrow Functions — nur `function() {}`
- Keine Template Literals — nur String-Konkatenation mit `+`
- `forEach` via `.forEach(function(x) {...})` OK (ES5.1)
- `Array.prototype.filter` OK (ES5.1)

### insertAdjacentHTML statt innerHTML +=
**Source:** `js/restaurants.js` lines 53, 65
```javascript
container.insertAdjacentHTML('beforeend', html);
// NICHT: container.innerHTML += html  (re-parses entire DOM)
```

### CSS Custom Properties (Design-System-Variablen)
**Source:** `css/style.css` — Dark Theme
```css
--bg:     #0D0F12
--card:   #161A20
--border: #1F2937
--accent: #3B82F6
--text:   #E5E7EB
--muted:  #6B7280
--radius: 8px
```
Alle neuen Klassen nutzen nur diese Variablen. Keine Hardcoded Hex-Farben außer Status-Farben (#EF4444, #22C55E, #F59E0B).

### Guard-Pattern vor Modul-Calls
**Source:** `js/app.js` lines 293–298
```javascript
if (window.bookingModule) { window.bookingModule.init(); }
```
Verhindert Fehler wenn Script-Tag fehlt oder Datei 404.

---

## No Analog Found

Keine Dateien ohne Analog. Alle Patterns direkt aus Codebase ableitbar.

---

## Critical Constraints (aus RESEARCH.md)

| Constraint | Detail |
|------------|--------|
| KKday-URLs sind Platzhalter | `tours[].url` = HTTP 403 — Warnung im UI zeigen, kein echter Link |
| `exampleHotels[]` leer | Graceful fallback: Section nicht rendern wenn leer |
| Kein Status-Toggle | FAQ-Status nur lesen, nie per Click schreiben |
| Script-Reihenfolge | `booking.js` + `faq.js` NACH `data.js`, VOR `app.js` |
| earlyBook: true | Nur Phase 5 (Xiaoliuqiu), 6 (Kenting), 8 (Alishan) |

---

## Metadata

**Analog search scope:** `js/`, `css/`, `index.html`
**Files scanned:** 5 (restaurants.js, videos.js, app.js, data.js, style.css)
**Pattern extraction date:** 2026-08-03
