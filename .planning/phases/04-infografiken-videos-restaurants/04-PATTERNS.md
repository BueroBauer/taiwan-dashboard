# Phase 4: Infografiken + Videos + Restaurants — Pattern Map

**Mapped:** 2026-08-03
**Files analyzed:** 5 (3 new, 2 modified)
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `js/charts.js` (fill stub) | module / renderer | request-response (DOM write) | `js/map.js` (IIFE public API) + stub | exact role, different lib |
| `js/videos.js` (new) | module / renderer | event-driven (click → iframe) | `js/app.js` renderTimeline + event delegation | role-match |
| `js/restaurants.js` (new) | module / renderer | CRUD-filter (JS array filter → DOM) | `js/app.js` renderTimeline + filter badge logic | role-match |
| `index.html` (modify) | config / structure | — | current `index.html` script block | exact |
| `js/app.js` (modify) | orchestrator | request-response | current DOMContentLoaded block | exact |
| `css/style.css` (modify) | config / theme | — | existing CSS custom properties | exact |

---

## Pattern Assignments

### `js/charts.js` (module, DOM-render)

**Analog:** `js/map.js` — IIFE returning public `{ init }` object

**Module wrapper pattern** (`js/map.js` lines 6–12 + tail):
```javascript
window.chartsModule = (function() {
  'use strict';

  // Private state
  var _charts = {};

  // Private helpers ...

  // Public API
  return {
    init: function() {
      if (!window.TAIWAN) return;
      // setup ...
      console.log('[charts.js] Charts initialisiert');
    }
  };

})();
```

**Guard + placeholder-replace pattern** (`js/map.js` public init, lines 200–211):
```javascript
init: function() {
  var el = document.getElementById('charts-content');
  if (!el) return;
  el.innerHTML = '';          // Placeholder-Text entfernen
  // render ...
}
```

**Chart.js global dark defaults** (RESEARCH.md Pattern 1):
```javascript
Chart.defaults.color       = '#9CA3AF';   // --muted
Chart.defaults.borderColor = '#1F2937';   // --border
```
Set once at top of `init()`, before any `new Chart()` call.

**Instance tracking + destroy** (Pitfall 3):
```javascript
// In private state:
var _charts = {};

// Before each new Chart():
if (_charts.costs) { _charts.costs.destroy(); }
_charts.costs = new Chart(document.getElementById('chart-costs'), { ... });
```

**Color tokens to use** (`css/style.css` lines 11–36):
```
--bg:      #0D0F12
--card:    #161A20
--border:  #1F2937
--accent:  #3B82F6
--text:    #E5E7EB
--muted:   #9CA3AF
```

**Donut Chart** (RESEARCH.md Pattern 2):
```javascript
_charts.costs = new Chart(document.getElementById('chart-costs'), {
  type: 'doughnut',
  data: {
    labels: window.TAIWAN.charts.costs.labels,
    datasets: [{
      data:            window.TAIWAN.charts.costs.values,
      backgroundColor: window.TAIWAN.charts.costs.colors,
      borderWidth: 2,
      borderColor: '#0D0F12',
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: { position: 'right', labels: { color: '#E5E7EB', padding: 16, font: { size: 13 } } },
      tooltip: { callbacks: { label: function(ctx) { return ctx.label + ': ' + ctx.raw + '%'; } } }
    }
  }
});
```

**Bar Chart** (RESEARCH.md Pattern 3):
```javascript
new Chart(document.getElementById('chart-nights'), {
  type: 'bar',
  data: {
    labels: window.TAIWAN.charts.nights.labels,
    datasets: [{ data: window.TAIWAN.charts.nights.values, backgroundColor: window.TAIWAN.charts.nights.colors, borderWidth: 0, borderRadius: 4 }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
      y: { ticks: { color: '#9CA3AF', stepSize: 1 }, grid: { color: '#1F2937' } }
    }
  }
});
```

**Line Chart** (RESEARCH.md Pattern 4 — fill between Min/Max):
```javascript
new Chart(document.getElementById('chart-temp'), {
  type: 'line',
  data: {
    labels: window.TAIWAN.charts.temperature.labels,
    datasets: [
      { label: 'Min °C', data: window.TAIWAN.charts.temperature.tempMin, borderColor: '#06B6D4', backgroundColor: 'rgba(6,182,212,0.15)', fill: '+1', tension: 0.3 },
      { label: 'Max °C', data: window.TAIWAN.charts.temperature.tempMax, borderColor: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.0)', fill: false, tension: 0.3 }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#E5E7EB' } } },
    scales: {
      x: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
      y: { ticks: { color: '#9CA3AF', callback: function(v) { return v + '°C'; } }, grid: { color: '#1F2937' } }
    }
  }
});
```

**Scatter Chart** (RESEARCH.md Pattern 5 — x=index, y=eur, x-axis hidden):
```javascript
var entries = window.TAIWAN.charts.entries.data;
var gratisData = entries.filter(function(d) { return d.gratis; }).map(function(d, i) { return { x: i, y: 0, label: d.label }; });
var paidData   = entries.filter(function(d) { return !d.gratis; }).map(function(d, i) { return { x: i, y: d.eur, label: d.label }; });

new Chart(document.getElementById('chart-entries'), {
  type: 'scatter',
  data: {
    datasets: [
      { label: 'Gratis (~65%)', data: gratisData, backgroundColor: '#10B981', pointRadius: 8, pointHoverRadius: 12 },
      { label: 'Eintritt (€)', data: paidData,  backgroundColor: '#3B82F6', pointRadius: 8, pointHoverRadius: 12 }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#E5E7EB' } },
      tooltip: { callbacks: { label: function(ctx) { return ctx.raw.label + (ctx.datasetIndex === 0 ? ' — Gratis' : ' — €' + ctx.raw.y); } } }
    },
    scales: {
      x: { display: false },
      y: { beginAtZero: true, ticks: { color: '#9CA3AF', callback: function(v) { return '€' + v; } }, grid: { color: '#1F2937' } }
    }
  }
});
```

**Budget Counter** (RESEARCH.md Pattern 9 — pure HTML, no canvas):
```javascript
function _renderBudgetCounter() {
  var container = document.getElementById('budget-counter-container');
  if (!container) return;
  var db = window.TAIWAN.meta.dailyBudget;
  var budget = window.TAIWAN.meta.budget;
  container.innerHTML = '<div class="budget-counter">' +
    '<div class="budget-item"><div class="budget-amount">€' + db.comfort + '</div><div class="budget-label">pro Tag · Komfort</div></div>' +
    '<div class="budget-vs">vs.</div>' +
    '<div class="budget-item"><div class="budget-amount">€' + db.backpacker + '</div><div class="budget-label">pro Tag · Backpacker</div></div>' +
    '<div class="budget-total">Gesamtbudget: €' + budget.low + '–€' + budget.high + '</div>' +
  '</div>';
}
```

---

### `js/videos.js` (module, event-driven)

**Analog:** `js/app.js` — renderTimeline (event delegation pattern, lines 240–260)

**Module wrapper** — same IIFE pattern as map.js:
```javascript
window.videosModule = (function() {
  'use strict';

  var _currentCat = 'alle';

  // Private helpers ...

  return {
    init: function() {
      var el = document.getElementById('videos-content');
      if (!el || !window.TAIWAN) return;
      el.innerHTML = '';
      _renderTabs(el);
      _renderGrid(el, 'alle');
      _bindEvents(el);
    }
  };
})();
```

**Tab render + event delegation** (RESEARCH.md Pattern 7, analog: app.js expand/collapse delegation):
```javascript
function _renderTabs(container) {
  var cats = ['alle'];
  window.TAIWAN.videos.forEach(function(v) {
    v.categories.forEach(function(c) { if (cats.indexOf(c) === -1) cats.push(c); });
  });
  var tabHtml = '<div class="vid-tabs">' +
    cats.map(function(cat) {
      return '<button class="vid-tab' + (cat === _currentCat ? ' vid-tab--active' : '') + '" data-cat="' + cat + '">' +
        cat.charAt(0).toUpperCase() + cat.slice(1) + '</button>';
    }).join('') + '</div>';
  container.insertAdjacentHTML('beforeend', tabHtml);
}

// Event delegation (same pattern as app.js container.addEventListener):
function _bindEvents(container) {
  container.addEventListener('click', function(e) {
    // Tab click
    var tab = e.target.closest('.vid-tab');
    if (tab) {
      _currentCat = tab.getAttribute('data-cat');
      container.querySelectorAll('.vid-tab').forEach(function(t) { t.classList.remove('vid-tab--active'); });
      tab.classList.add('vid-tab--active');
      var grid = container.querySelector('.vid-grid');
      if (grid) grid.remove();
      _renderGrid(container, _currentCat);
      return;
    }
    // Video card click — lazy iframe
    var card = e.target.closest('[data-youtube-id]');
    if (!card) return;
    var id = card.getAttribute('data-youtube-id');
    if (id.indexOf('PLACEHOLDER') !== -1) {
      window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(card.querySelector('.vid-title').textContent), '_blank');
      return;
    }
    var wrap = card.querySelector('.vid-thumb-wrap');
    wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  });
}
```

**Video card HTML** (RESEARCH.md Pattern 6):
```javascript
function _makeCard(video) {
  var thumbUrl = 'https://img.youtube.com/vi/' + video.youtubeId + '/hqdefault.jpg';
  var isPlaceholder = video.youtubeId.indexOf('PLACEHOLDER') !== -1;
  return '<div class="vid-card" data-youtube-id="' + video.youtubeId + '">' +
    '<div class="vid-thumb-wrap">' +
      (isPlaceholder
        ? '<div class="vid-thumb-placeholder"></div>'
        : '<img class="vid-thumb" src="' + thumbUrl + '" alt="' + video.title + '" loading="lazy" />') +
      '<div class="vid-play-btn" aria-label="Video abspielen">▶</div>' +
    '</div>' +
    '<div class="vid-title">' + video.title + '</div>' +
  '</div>';
}
```

---

### `js/restaurants.js` (module, CRUD-filter)

**Analog:** `js/app.js` renderTimeline + priceBadge logic (array → HTML string pattern)

**Module wrapper:**
```javascript
window.restaurantsModule = (function() {
  'use strict';

  var _currentPhase = 'all';

  return {
    init: function() {
      var el = document.getElementById('restaurants-content');
      if (!el || !window.TAIWAN) return;
      el.innerHTML = '';
      _renderFilterButtons(el);
      _renderCards(el, 'all');
      _bindEvents(el);
    }
  };
})();
```

**Filter logic** (RESEARCH.md Pattern 8 — phaseId is Number, not Array):
```javascript
function _filter(phaseId) {
  var data = window.TAIWAN.restaurants;
  if (phaseId === 'all') return data;
  return data.filter(function(r) { return r.phaseId === phaseId; }); // strict ===, not indexOf
}
```

**Filter buttons** (analog: app.js buildFilterButtons in map.js):
```javascript
function _renderFilterButtons(container) {
  var html = '<div class="rst-filters"><button class="rst-filter rst-filter--active" data-phase="all">Alle</button>';
  window.TAIWAN.phases.forEach(function(p) {
    html += '<button class="rst-filter" data-phase="' + p.id + '">Phase ' + p.id + ' ' + p.name + '</button>';
  });
  html += '</div>';
  container.insertAdjacentHTML('beforeend', html);
}
```

**Restaurant card HTML** (RESEARCH.md Pattern 8):
```javascript
function _makeCard(r) {
  var typeLabel = { 'vegan': '🌱 Vegan', 'vegetarisch': '🥗 Vegetarisch', 'veg-option': '✓ Veg-Option' };
  return '<div class="rst-card">' +
    '<div class="rst-name">' + r.name + '</div>' +
    '<div class="rst-meta">' +
      '<span class="rst-type">' + (typeLabel[r.type] || r.type) + '</span>' +
      '<span class="rst-price">€' + r.pricePerPerson.eur + '/P</span>' +
    '</div>' +
    '<div class="rst-note">' + r.note + '</div>' +
    '<a class="rst-link" href="' + r.googleMapsUrl + '" target="_blank" rel="noopener">Google Maps ↗</a>' +
  '</div>';
}
```

---

### `index.html` (modify — script tags + canvas HTML)

**Analog:** `index.html` lines 147–153 (current script block)

**Script order after Phase 4** — insert `videos.js` + `restaurants.js` before `app.js`:
```html
<script src="js/data.js"></script>
<script src="js/map.js"></script>
<script src="js/charts.js"></script>
<script src="js/videos.js"></script>       <!-- NEU -->
<script src="js/restaurants.js"></script>  <!-- NEU -->
<script src="js/app.js"></script>
```

**Canvas HTML for #zahlen section** (RESEARCH.md Code Examples, replaces placeholder div):
```html
<div id="charts-content">
  <div class="chart-grid">
    <div class="chart-card">
      <h3 class="chart-title">Kostenverteilung</h3>
      <div class="chart-container" style="position:relative;height:300px">
        <canvas id="chart-costs"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3 class="chart-title">Nächte pro Phase</h3>
      <div class="chart-container" style="position:relative;height:300px">
        <canvas id="chart-nights"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3 class="chart-title">Temperaturen (Min/Max)</h3>
      <div class="chart-container" style="position:relative;height:300px">
        <canvas id="chart-temp"></canvas>
      </div>
    </div>
    <div class="chart-card">
      <h3 class="chart-title">Eintritte — Gratis vs. Kosten</h3>
      <div class="chart-container" style="position:relative;height:300px">
        <canvas id="chart-entries"></canvas>
      </div>
    </div>
  </div>
  <div id="budget-counter-container"></div>
</div>
```

**Container IDs** (already present in index.html — DO NOT recreate sections):
- `#charts-content` — replace innerHTML
- `#videos-content` — replace innerHTML
- `#restaurants-content` — replace innerHTML

---

### `js/app.js` (modify — DOMContentLoaded block only)

**Analog:** `js/app.js` lines 260–266 (current DOMContentLoaded block)

**Add 3 lines after existing `window.mapModule.init()` call:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  initGate();
  initNav();
  if (window.mapModule)      window.mapModule.init();
  if (window.chartsModule)   window.chartsModule.init();    // NEU
  if (window.videosModule)   window.videosModule.init();    // NEU
  if (window.restaurantsModule) window.restaurantsModule.init(); // NEU
  renderTimeline();
});
```

---

### `css/style.css` (modify — append new section styles)

**Analog:** Existing `.tl-card`, `.tl-badge` patterns (same dark-theme token usage)

**Tokens to inherit** (`css/style.css` lines 11–36):
```css
/* Always use CSS vars, never hardcode colors */
var(--bg)      /* #0D0F12 */
var(--card)    /* #161A20 */
var(--border)  /* #1F2937 */
var(--accent)  /* #3B82F6 */
var(--text)    /* #E5E7EB */
var(--muted)   /* #9CA3AF */
var(--radius)  /* 14px    */
```

**New CSS class families to add:**
- `.chart-grid`, `.chart-card`, `.chart-title`, `.chart-container` — for #zahlen
- `.vid-tabs`, `.vid-tab`, `.vid-tab--active`, `.vid-grid`, `.vid-card`, `.vid-thumb`, `.vid-thumb-wrap`, `.vid-thumb-placeholder`, `.vid-play-btn`, `.vid-title` — for #videos
- `.rst-filters`, `.rst-filter`, `.rst-filter--active`, `.rst-grid`, `.rst-card`, `.rst-name`, `.rst-meta`, `.rst-type`, `.rst-price`, `.rst-note`, `.rst-link` — for #restaurants
- `.budget-counter`, `.budget-item`, `.budget-amount`, `.budget-label`, `.budget-vs`, `.budget-total` — for budget counter

**Pattern from existing `.tl-card`** — card styling to copy:
```css
.chart-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
}
```

**Responsive breakpoint** (existing project uses `>768px`):
```css
/* Mobile: stack, Desktop: grid */
.chart-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 768px) { .chart-grid { grid-template-columns: 1fr 1fr; } }

.vid-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 768px) { .vid-grid { grid-template-columns: repeat(3, 1fr); } }

/* Tab wrapping — mobile one per line */
.vid-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.vid-tab  { flex-shrink: 0; }
```

---

## Shared Patterns

### window.XModule Export
**Source:** `js/map.js` (IIFE return pattern), `js/charts.js` (object literal stub)
**Apply to:** All three JS files
```javascript
// IIFE (preferred — private scope)
window.chartsModule = (function() {
  // private vars
  return { init: function() { ... } };
})();

// Object literal (simpler, no private scope needed)
window.videosModule = { init: function() { ... } };
```

### Guard Pattern
**Source:** `js/app.js` + `js/map.js`
**Apply to:** Every `init()` function
```javascript
init: function() {
  if (!window.TAIWAN) return;
  var el = document.getElementById('target-id');
  if (!el) return;
  // ...
}
```

### Event Delegation
**Source:** `js/app.js` lines 240–260 (timeline expand/collapse)
**Apply to:** `videos.js` tab clicks + card clicks, `restaurants.js` filter clicks
```javascript
container.addEventListener('click', function(e) {
  var target = e.target.closest('.selector');
  if (!target) return;
  // handle
});
```

### External Link Safety
**Source:** `js/map.js` line 27, `js/app.js` renderSight
**Apply to:** All `<a>` tags with external href (Google Maps, YouTube)
```javascript
'<a href="' + url + '" target="_blank" rel="noopener">Label ↗</a>'
```

### HTML String Building (no innerHTML fragments)
**Source:** `js/app.js` renderPhaseCard — build full string, assign once
**Apply to:** All render functions in charts/videos/restaurants
```javascript
function renderThings(items) {
  var html = '';
  items.forEach(function(item) { html += makeCard(item); });
  container.innerHTML = html;  // single assignment at end
}
```

---

## No Analog Found

None. All files have clear analogs in the existing codebase.

---

## Critical Notes for Planner

1. **charts.js is IIFE, not object literal** — map.js returns `{ init }` from IIFE. Stub currently uses object literal. Either works; IIFE preferred for private `_charts` state (instance tracking).

2. **PLACEHOLDER YouTube-IDs** — All 20 `youtubeId` values are `PLACEHOLDER_VID_XXX`. Grid must detect and handle gracefully (fallback thumbnail div + click → YouTube search). Mark fills IDs manually in `data.js` later.

3. **phaseId is Number** in `restaurants[]`, not Array (unlike `videos[].phaseIds`). Filter uses `===`, not `indexOf`.

4. **Chart.js v4 API** — No `Chart.defaults.global.*`. Direct `Chart.defaults.color` etc. No `percentageInnerCutout` — use `cutout: '65%'`.

5. **Script order matters** — `data.js` → `map.js` → `charts.js` → `videos.js` → `restaurants.js` → `app.js`. All modules must exist on `window` before `app.js` DOMContentLoaded runs.

---

## Metadata

**Analog search scope:** `js/app.js`, `js/map.js`, `js/charts.js`, `css/style.css`, `index.html`
**Files scanned:** 5
**Pattern extraction date:** 2026-08-03
