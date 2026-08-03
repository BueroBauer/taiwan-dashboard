# Phase 4: Infografiken + Videos + Restaurants — Research

**Researched:** 2026-08-03
**Domain:** Chart.js 4.4, YouTube Lazy Load, Filter-UI, Pure HTML/CSS/JS
**Confidence:** HIGH

## Summary

Phase 4 fügt drei neue Sections zur bestehenden Taiwan-Dashboard-App hinzu: Infografiken (4 Chart-Typen + Budget-Counter via Chart.js 4.4), ein YouTube-Video-Grid mit Kategorie-Tabs und lazy-loaded Thumbnails, sowie Restaurant-Cards mit Phasen-Filter.

Alle Daten sind bereits vollständig in `js/data.js` definiert (`window.TAIWAN.charts`, `.videos`, `.restaurants`). Die `js/charts.js`-Datei ist ein leerer Stub mit dem erwarteten `window.chartsModule`-Pattern. HTML-Sections (`#zahlen`, `#videos`, `#restaurants`) existieren als Platzhalter. Es gibt null echte YouTube-IDs — alle 20 Videos haben `PLACEHOLDER_VID_XXX`. Das muss Mark vor dem Launch manuell befüllen.

Das Modul-Pattern ist klar: `window.chartsModule.init()` wird in `app.js` DOMContentLoaded aufgerufen (analog zu `window.mapModule.init()`). Videos und Restaurants brauchen eigene Module (`window.videosModule`, `window.restaurantsModule`) oder werden direkt in `charts.js` / einem neuen `videos.js` + `restaurants.js` implementiert.

**Primary recommendation:** Drei JS-Dateien: `charts.js` (4 Charts + Counter), `videos.js` (Tab-Grid + Lazy Load), `restaurants.js` (Filter-Cards). Alle als `window.XModule` exportieren, in `app.js` DOMContentLoaded aufrufen. Chart.js globale Defaults einmalig am Anfang von `charts.js` setzen.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Chart-Rendering | Browser/Client | — | Chart.js rendert direkt in Canvas-Elemente im DOM |
| Chart-Daten | data.js (Static) | — | `window.TAIWAN.charts` bereits vollständig befüllt |
| YouTube Thumbnails | Browser/Client | YouTube CDN | Thumbnail-URL aus youtubeId ableiten, keine API nötig |
| Video-Play | YouTube CDN | — | iframe erst bei Click erstellen (lazy) |
| Restaurant-Filter | Browser/Client | — | JS-Array-Filter über `window.TAIWAN.restaurants` |
| Budget-Counter | Browser/Client | — | Statische Werte aus `window.TAIWAN.meta.dailyBudget` |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Chart.js | 4.4.0 | Alle 4 Chart-Typen | Bereits in index.html CDN eingebunden |
| Vanilla JS | ES5 | Tabs, Filter, DOM | Constraint: kein npm, kein bundler |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| — | — | Keine zusätzlichen CDN-Deps nötig | — |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Chart.js Canvas | D3.js SVG | D3 zu komplex für Static-Deploy ohne Build |
| onclick-Lazy-Load | YouTube embed API | API braucht JS-SDK-Load → langsamer |
| CSS-only Tabs | JS-Tabs | CSS :target funktioniert, aber aktiver Tab in Nav schwer steuerbar |

**Installation:** Bereits in index.html CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js`

**Version verification:** Chart.js 4.4.0 — UMD build bereits eingebunden. [VERIFIED: index.html Zeile 149]

## Architecture Patterns

### System Architecture Diagram

```
window.TAIWAN (data.js)
  ├── .charts.costs / .nights / .temperature / .entries
  ├── .videos[]        (20 items, youtubeId = PLACEHOLDER)
  └── .restaurants[]   (15 items, phaseId 1–10)
         │
         ▼
DOMContentLoaded (app.js)
  ├── chartsModule.init()    → js/charts.js  → <canvas> in #zahlen
  ├── videosModule.init()    → js/videos.js  → Tab-Grid in #videos
  └── restaurantsModule.init() → js/restaurants.js → Cards in #restaurants
```

### Recommended Project Structure
```
js/
├── data.js          # Einzige Datenquelle (bereits vollständig)
├── map.js           # Phase 2 (fertig)
├── charts.js        # Phase 4 — Chart.js Implementation (Stub vorhanden)
├── videos.js        # Phase 4 — NEU: YouTube Tab-Grid
├── restaurants.js   # Phase 4 — NEU: Restaurant-Cards + Filter
└── app.js           # Init-Orchestrator (erweitern: 2 neue module.init())
```

index.html: 2 neue `<script>`-Tags vor `app.js` ergänzen.

### Pattern 1: Chart.js Globale Dark-Theme Defaults

Einmalig am Anfang von `charts.js` setzen — gilt für alle Charts in dieser Datei.

```javascript
// Source: https://www.chartjs.org/docs/latest/general/colors.html
// [VERIFIED: Context7 /chartjs/chart.js]
Chart.defaults.color = '#9CA3AF';          // --muted
Chart.defaults.borderColor = '#1F2937';    // --border
Chart.defaults.backgroundColor = '#161A20'; // --card
```

### Pattern 2: Donut-Chart (CHT-01 Kostenverteilung)

```javascript
// Source: https://www.chartjs.org/docs/latest/charts/doughnut.html
// [VERIFIED: Context7 /chartjs/chart.js]
new Chart(document.getElementById('chart-costs'), {
  type: 'doughnut',
  data: {
    labels: window.TAIWAN.charts.costs.labels,
    datasets: [{
      data: window.TAIWAN.charts.costs.values,
      backgroundColor: window.TAIWAN.charts.costs.colors,
      borderWidth: 2,
      borderColor: '#0D0F12',  // --bg: Trennung zwischen Segmenten
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#E5E7EB', padding: 16, font: { size: 13 } }
      },
      tooltip: {
        callbacks: {
          label: function(ctx) {
            return ctx.label + ': ' + ctx.raw + '%';
          }
        }
      }
    }
  }
});
```

### Pattern 3: Balkendiagramm (CHT-02 Nächte)

```javascript
// [VERIFIED: Context7 /chartjs/chart.js]
new Chart(document.getElementById('chart-nights'), {
  type: 'bar',
  data: {
    labels: window.TAIWAN.charts.nights.labels,
    datasets: [{
      data: window.TAIWAN.charts.nights.values,
      backgroundColor: window.TAIWAN.charts.nights.colors,
      borderWidth: 0,
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
      y: {
        ticks: { color: '#9CA3AF', stepSize: 1 },
        grid: { color: '#1F2937' }
      }
    }
  }
});
```

### Pattern 4: Line-Chart (CHT-03 Temperatur)

Zwei Datasets (Min + Max) mit `fill: '+1'` für Fläche zwischen den Linien.

```javascript
// [VERIFIED: Context7 /chartjs/chart.js]
new Chart(document.getElementById('chart-temp'), {
  type: 'line',
  data: {
    labels: window.TAIWAN.charts.temperature.labels,
    datasets: [
      {
        label: 'Min °C',
        data: window.TAIWAN.charts.temperature.tempMin,
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6,182,212,0.15)',
        fill: '+1',  // Fläche bis zum Max-Dataset füllen
        tension: 0.3
      },
      {
        label: 'Max °C',
        data: window.TAIWAN.charts.temperature.tempMax,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245,158,11,0.0)',
        fill: false,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#E5E7EB' } },
      tooltip: {
        callbacks: {
          afterBody: function(ctx) {
            // Alishan-Kälteeinbruch hervorheben (Phase 8 = Index 7)
            if (ctx[0].dataIndex === 7) return '⚠️ Alishan 2300m — sehr kalt!';
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: '#9CA3AF' }, grid: { color: '#1F2937' } },
      y: {
        ticks: { color: '#9CA3AF', callback: v => v + '°C' },
        grid: { color: '#1F2937' }
      }
    }
  }
});
```

### Pattern 5: Scatter-Chart (CHT-04 Eintritte)

Zwei Datasets: gratis (grün) + bezahlt (blau).

```javascript
// [VERIFIED: Context7 /chartjs/chart.js]
var entries = window.TAIWAN.charts.entries.data;
var gratisData = entries.filter(d => d.gratis).map((d, i) => ({ x: i, y: 0, label: d.label }));
var paidData  = entries.filter(d => !d.gratis).map((d, i) => ({ x: i, y: d.eur, label: d.label }));

new Chart(document.getElementById('chart-entries'), {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Gratis (~65%)',
        data: gratisData,
        backgroundColor: '#10B981',
        pointRadius: 8,
        pointHoverRadius: 12
      },
      {
        label: 'Eintritt (€)',
        data: paidData,
        backgroundColor: '#3B82F6',
        pointRadius: 8,
        pointHoverRadius: 12
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(ctx) {
            return ctx.raw.label + (ctx.datasetIndex === 0 ? ' — Gratis' : ' — €' + ctx.raw.y);
          }
        }
      },
      legend: { labels: { color: '#E5E7EB' } }
    },
    scales: {
      x: { display: false },
      y: { ticks: { color: '#9CA3AF', callback: v => '€' + v }, grid: { color: '#1F2937' }, beginAtZero: true }
    }
  }
});
```

### Pattern 6: YouTube Lazy Load (VID-01–VID-04)

Standard-Pattern: `img`-Thumbnail + Play-Button als `div`. Erst beim Click wird das `iframe` erstellt und den Container ersetzt. Kein SDK-Load bei Seitenaufruf.

```javascript
// [ASSUMED] Standard-Pattern — vielfach dokumentiert (gomakethings.com, nigelbunner.co.uk)
function createVideoCard(video) {
  var thumbUrl = 'https://img.youtube.com/vi/' + video.youtubeId + '/hqdefault.jpg';
  var watchUrl = 'https://www.youtube.com/watch?v=' + video.youtubeId;

  return '<div class="vid-card" data-youtube-id="' + video.youtubeId + '">' +
    '<div class="vid-thumb-wrap">' +
      '<img class="vid-thumb" src="' + thumbUrl + '" alt="' + video.title + '" loading="lazy" />' +
      '<div class="vid-play-btn" aria-label="Video abspielen">▶</div>' +
    '</div>' +
    '<div class="vid-title">' + video.title + '</div>' +
  '</div>';
}

// Click-Handler: img → iframe
container.addEventListener('click', function(e) {
  var card = e.target.closest('[data-youtube-id]');
  if (!card) return;
  var id = card.getAttribute('data-youtube-id');
  if (id.indexOf('PLACEHOLDER') !== -1) {
    // Noch keine echte ID — Link zu YouTube-Suche öffnen
    window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(card.querySelector('.vid-title').textContent), '_blank');
    return;
  }
  var wrap = card.querySelector('.vid-thumb-wrap');
  wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
});
```

**Wichtig:** YouTube-Thumbnail-URL `hqdefault.jpg` liefert 480×360px. Fallback: `mqdefault.jpg` (320×180). `maxresdefault.jpg` nur bei Videos mit HD-Upload — kann 404 liefern.

### Pattern 7: Tab-System (VID-01, VID-04)

Kategorien aus data.js ableiten: `['alle', 'ostküste', 'kenting', 'tempel', 'xiaoliuqiu', 'familie', 'deutsch', 'transport']` + `alishan`.

```javascript
// [ASSUMED] Standard-Tab-Pattern, kein Framework nötig
function renderTabs(categories, activeCategory) {
  return categories.map(function(cat) {
    var isActive = cat === activeCategory;
    return '<button class="vid-tab' + (isActive ? ' vid-tab--active' : '') + '" data-cat="' + cat + '">' +
      cat.charAt(0).toUpperCase() + cat.slice(1) +
    '</button>';
  }).join('');
}

// Event Delegation für Tab-Klicks
tabStrip.addEventListener('click', function(e) {
  var btn = e.target.closest('.vid-tab');
  if (!btn) return;
  var cat = btn.getAttribute('data-cat');
  renderVideoGrid(cat);  // Grid neu rendern
  // Active-State tauschen
  tabStrip.querySelectorAll('.vid-tab').forEach(function(t) { t.classList.remove('vid-tab--active'); });
  btn.classList.add('vid-tab--active');
});
```

### Pattern 8: Restaurant-Filter (RST-01, RST-02)

```javascript
// [VERIFIED: data.js Struktur]
// restaurants[].phaseId ist eine einzelne Zahl (1–10), kein Array
// Filter-Buttons: "Alle" + Phase 1–10 (Name aus window.TAIWAN.phases[i].name)

function filterRestaurants(phaseId) {
  var data = window.TAIWAN.restaurants;
  return phaseId === 'all' ? data : data.filter(function(r) { return r.phaseId === phaseId; });
}

function renderRestaurantCard(r) {
  var typeLabel = { 'vegan': '🌱 Vegan', 'vegetarisch': '🥗 Vegetarisch', 'veg-option': '✓ Veg-Option' };
  return '<div class="rst-card">' +
    '<div class="rst-name">' + (r.veganSymbol ? '🌱 ' : '') + r.name + '</div>' +
    '<div class="rst-meta">' +
      '<span class="rst-type">' + (typeLabel[r.type] || r.type) + '</span>' +
      '<span class="rst-price">€' + r.pricePerPerson.eur + '/P</span>' +
    '</div>' +
    '<div class="rst-note">' + r.note + '</div>' +
    '<a class="rst-link" href="' + r.googleMapsUrl + '" target="_blank" rel="noopener">Google Maps ↗</a>' +
  '</div>';
}
```

### Pattern 9: Budget-Counter (CHT-05)

Kein Chart — statisches HTML mit CSS-Counter-Styling. Werte aus `window.TAIWAN.meta.dailyBudget`.

```javascript
// [VERIFIED: data.js meta.dailyBudget = { comfort: 145, backpacker: 29 }]
function renderBudgetCounter() {
  var db = window.TAIWAN.meta.dailyBudget;
  var budget = window.TAIWAN.meta.budget;
  return '<div class="budget-counter">' +
    '<div class="budget-item budget-item--comfort">' +
      '<div class="budget-amount">€' + db.comfort + '</div>' +
      '<div class="budget-label">pro Tag · Komfort</div>' +
    '</div>' +
    '<div class="budget-vs">vs.</div>' +
    '<div class="budget-item budget-item--backpacker">' +
      '<div class="budget-amount">€' + db.backpacker + '</div>' +
      '<div class="budget-label">pro Tag · Backpacker-Realität</div>' +
    '</div>' +
    '<div class="budget-total">Gesamtbudget: €' + budget.low + '–€' + budget.high + '</div>' +
  '</div>';
}
```

### Anti-Patterns to Avoid

- **Alle iframes auf Seitenload:** Lädt 20 YouTube-Player gleichzeitig. Seite wird blockiert. Stattdessen: Lazy-Load per Click.
- **Chart auf verstecktem Container:** `new Chart()` auf einem `display:none` Element ergibt Größe 0. Canvas erst rendern wenn Section sichtbar. Lösung: Charts in `init()` erstellen — die Section ist beim Seitenload zwar scrollbar aber nicht `display:none`.
- **`module.exports` verwenden:** Kein Node.js, kein bundler. Nur `window.XModule = {}` Pattern.
- **YouTube `maxresdefault.jpg`:** Liefert 404 für Videos ohne HD-Upload. `hqdefault.jpg` ist sicher.
- **Chart-Instanzen nicht tracken:** Wenn Charts neu-gerendert werden (z.B. bei Resize), alte Instanz via `chart.destroy()` vorher entfernen — sonst Memory Leak und Canvas-Konflikt.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Chart-Rendering | Eigene SVG/Canvas-Logik | Chart.js 4.4 (bereits CDN) | Responsive, accessible, tooltip, dark-mode in 20 Zeilen |
| YouTube Player | Eigener Video-Player | YouTube embed iframe (lazy) | Recht, Codec-Support, Mobile |
| Filter-State | URL-Router, Framework | JS-Variable `currentFilter` + Re-Render | Overkill für 15 Restaurants |

## Runtime State Inventory

Phase 4 ist Greenfield-Feature-Addition — kein Rename, kein Refactor. Keine Runtime-State-Inventory nötig.

## Common Pitfalls

### Pitfall 1: PLACEHOLDER YouTube-IDs
**What goes wrong:** Thumbnail-URL `img.youtube.com/vi/PLACEHOLDER_VID_001/hqdefault.jpg` gibt 404 oder falsches Bild.
**Why it happens:** Alle 20 `youtubeId`-Werte in data.js sind `PLACEHOLDER_VID_XXX`.
**How to avoid:** Vor `img`-Render prüfen ob ID mit `PLACEHOLDER` beginnt. Falls ja: Fallback-Thumbnail (z.B. grauer Placeholder `#1F2937`), oder Text "Video-ID fehlt". Oder: Click öffnet YouTube-Suche.
**Warning signs:** Broken image icons im Video-Grid.

### Pitfall 2: Chart.js auf 0-Größe Canvas
**What goes wrong:** Chart rendert mit Breite/Höhe 0, ist unsichtbar.
**Why it happens:** Parent-Container hat `display:none` oder noch keine Breite.
**How to avoid:** Container muss sichtbar sein beim `new Chart()`-Aufruf. Da `#zahlen` Section kein `display:none` hat (nur Placeholder-Text), ist das kein Problem — aber bei späteren dynamischen Änderungen `chart.resize()` aufrufen.

### Pitfall 3: Mehrfache Chart-Instanzen
**What goes wrong:** `Chart.js Uncaught Error: Canvas is already in use.`
**Why it happens:** `new Chart(canvas)` bei bereits belegtem Canvas. Passiert wenn `init()` zweimal aufgerufen wird.
**How to avoid:** Chart-Instanzen in `window.chartsModule._charts = {}` speichern. Vor `new Chart()` prüfen: `if (_charts.costs) _charts.costs.destroy();`

### Pitfall 4: Scatter-Chart X-Achse mit Index
**What goes wrong:** Scatter braucht `{x, y}`-Objekte. Labels werden nicht automatisch aus `x`-Wert abgeleitet.
**Why it happens:** Scatter-Chart in Chart.js ist ein reines XY-Plot, keine kategorische Achse.
**How to avoid:** X-Achse ausblenden (`display: false`), Tooltip `label`-Callback für Sight-Namen verwenden. Oder: Bubble-Chart als Alternative (hat `r` für Größe).

### Pitfall 5: Tab-Mobile Layout
**What goes wrong:** 9 Tabs passen nicht in eine Zeile auf Mobile.
**How to avoid:** `flex-wrap: wrap` auf dem Tab-Container oder horizontales Scroll wie `.nav-list`. Requirement VID-04 sagt "Mobile: ein Tab pro Zeile" — `flex-wrap: wrap; width: 100%` auf Tab-Buttons.

### Pitfall 6: Restaurant phaseId vs. phaseIds
**What goes wrong:** Videos haben `phaseIds` (Array), Restaurants haben `phaseId` (Zahl). Filter-Code verwechselt die Schemas.
**Why it happens:** Unterschiedliche Datenstrukturen in data.js.
**How to avoid:** `restaurants[].phaseId === phaseId` (strikt, kein indexOf). [VERIFIED: data.js Zeilen 801–817]

## Code Examples

### Chart.js Canvas-HTML in index.html
```html
<!-- Zahlen-Section — Phase 4 ersetzt #charts-content -->
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
  <!-- Budget-Counter: kein Canvas, HTML -->
  <div id="budget-counter-container"></div>
</div>
```

### module.init()-Pattern (wie map.js)
```javascript
// js/charts.js — vollständiges Muster
window.chartsModule = {
  _charts: {},

  init: function() {
    if (!window.TAIWAN) return;
    this._setGlobalDefaults();
    this._renderBudgetCounter();
    this._initCosts();
    this._initNights();
    this._initTemp();
    this._initEntries();
  },

  _setGlobalDefaults: function() {
    Chart.defaults.color = '#9CA3AF';
    Chart.defaults.borderColor = '#1F2937';
  },

  _initCosts: function() {
    var canvas = document.getElementById('chart-costs');
    if (!canvas) return;
    if (this._charts.costs) this._charts.costs.destroy();
    this._charts.costs = new Chart(canvas, { /* ... */ });
  }
  // usw.
};
```

### index.html Script-Reihenfolge (nach Phase 4)
```html
<script src="js/data.js"></script>
<script src="js/map.js"></script>
<script src="js/charts.js"></script>
<script src="js/videos.js"></script>      <!-- NEU Phase 4 -->
<script src="js/restaurants.js"></script> <!-- NEU Phase 4 -->
<script src="js/app.js"></script>
```

### app.js DOMContentLoaded — Erweiterung
```javascript
// In app.js DOMContentLoaded-Block ergänzen:
if (window.chartsModule)      window.chartsModule.init();
if (window.videosModule)      window.videosModule.init();
if (window.restaurantsModule) window.restaurantsModule.init();
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Chart.js v2 global options | Chart.js v4 `defaults` object | v3+ | Kein `Chart.defaults.global` mehr — direkt `Chart.defaults.color` |
| `segmentShowStroke` | `borderWidth` + `borderColor` | v3 | Alte Doku irreführend — v4 API nutzen |
| YouTube iframe embed direkt | Lazy-Load thumbnail + click | — | Standard seit Core Web Vitals |

**Deprecated/outdated:**
- `Chart.defaults.global.*`: In Chart.js v4 nicht mehr nötig — direkt `Chart.defaults.*` verwenden. [VERIFIED: Context7]
- `percentageInnerCutout`: Heißt jetzt `cutout` (String mit `%` oder Pixel-Zahl). [VERIFIED: Context7]

## Data Completeness Assessment

| Datensatz | Status | Aktion nötig |
|-----------|--------|--------------|
| `charts.costs` | Vollständig (7 Kategorien, Farben, Werte) | Keine |
| `charts.nights` | Vollständig (10 Phasen) | Keine |
| `charts.temperature` | Vollständig (Min/Max pro Phase) | Keine |
| `charts.entries` | Vollständig (20 Sights) | Keine |
| `meta.dailyBudget` | Vollständig (€145/€29) | Keine |
| `restaurants` | 15 Einträge, Phasen 1–10 abgedeckt | Keine |
| `videos[].youtubeId` | Alle 20 = PLACEHOLDER | Mark muss echte YouTube-IDs eintragen |
| `videos[].title` | Alle 20 vorhanden | Keine |

**Kritischer Gap:** Alle 20 YouTube-IDs sind Platzhalter. Das Video-Grid kann trotzdem implementiert werden (Fallback bei PLACEHOLDER), aber echte Videos brauchen Mark's manuelle Dateneingabe in data.js.

## Environment Availability

Step 2.6: SKIPPED — Phase 4 ist reine client-side JS-Implementierung, keine externen CLI-Tools oder Server nötig. Deployment via GitHub Pages bereits in Phase 1 etabliert.

## Validation Architecture

Workflow: Kein Test-Framework definiert. Pure HTML/CSS/JS-Projekt ohne Node.js — kein Jest/Vitest möglich ohne Build-Step. Validation erfolgt manuell via Browser.

### Manuelle Testcheckliste
| REQ-ID | Test | Methode |
|--------|------|---------|
| CHT-01 | Donut-Chart sichtbar, 7 Segmente, Labels korrekt | Browser: file:// öffnen, #zahlen scrollen |
| CHT-02 | Balken 10 Phasen, farbcodiert | Browser visual check |
| CHT-03 | Line-Chart Min/Max, Alishan-Dip sichtbar | Browser: Tooltip auf Phase 8 |
| CHT-04 | Scatter: Grün=Gratis, Blau=Bezahlt, Tooltip mit Name | Browser: Hover über Punkte |
| CHT-05 | Budget-Counter €145 vs. €29 | Browser: DOM inspect |
| VID-01 | 20 Videos in 9 Tabs (alle + 8 Kategorien) | Browser: alle Tabs klicken |
| VID-02 | Thumbnail sichtbar (oder Fallback), Titel | Browser visual check |
| VID-03 | 3-spaltig Desktop (>768px), 1-spaltig Mobile | DevTools Responsive-Mode |
| VID-04 | Tabs horizontal Desktop, wrapped Mobile | DevTools Responsive-Mode |
| RST-01 | 15 Restaurant-Cards mit allen Feldern | Browser: #restaurants scrollen |
| RST-02 | Filter "Phase 1" zeigt nur 2 Restaurants (rest-001, rest-002) | Browser: Filter klicken + count |

## Security Domain

Keine neuen Sicherheitsrisiken in Phase 4. Alle externen Links haben bereits `target="_blank" rel="noopener"` in der bestehenden App-Konvention. YouTube-Embeds via iframe sind Standard-Web-Sicherheitsmodell. Keine User-Inputs in dieser Phase.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | YouTube Thumbnail-URL `img.youtube.com/vi/{ID}/hqdefault.jpg` funktioniert ohne API-Key | Pattern 6 | Thumbnails 404 → Fallback-Placeholder nötig |
| A2 | Tab-System ohne Framework ist ausreichend (kein ARIA-Tabpanel nötig für dieses Familien-Dashboard) | Pattern 7 | Niedrig — Accessibility kein harter Requirement hier |
| A3 | `chartsModule`, `videosModule`, `restaurantsModule` als separate window-Globals ist beste Struktur | Architecture | Alternativ: alles in charts.js — aber Separation of Concerns besser |

## Open Questions

1. **YouTube-IDs fehlen**
   - Was wir wissen: Alle 20 youtubeId-Werte sind PLACEHOLDER
   - Was unklar: Wann trägt Mark die echten IDs ein?
   - Recommendation: Grid mit Fallback implementieren (Click → YouTube-Suche). Mark befüllt data.js nach und nach. Dashboard funktioniert ohne echte IDs.

2. **Scatter-Chart X-Achse: Index oder Phase-Gruppierung?**
   - Was wir wissen: 20 Eintritte, manche gratis, manche kostenpflichtig
   - Was unklar: Soll X-Achse die Phase zeigen oder nur ein visueller Spread sein?
   - Recommendation: X = reiner Index (0–19), ausgeblendet. Y = Preis. Tooltip = Name. Zwei Farben (gratis/bezahlt) sind ausreichend lesbar.

3. **Anzahl Restaurant-Filter-Buttons**
   - Was wir wissen: Phasen 1–10, nicht alle haben Restaurants (Phase 4 und 5 je 1 Eintrag)
   - Was unklar: Filter als "Alle + Phase 1–10" oder als "Alle + Region-Namen"?
   - Recommendation: Phase-Nummern + Region-Name aus `window.TAIWAN.phases[i].name` ableiten. Sieht informativer aus als reine Zahlen.

## Sources

### Primary (HIGH confidence)
- Context7 `/chartjs/chart.js` — Donut/Pie API, global defaults, responsive container, scatter multi-axis
- `/Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/js/data.js` — Vollständige Datenstruktur verifiziert
- `/Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/js/app.js` — module.init()-Pattern verifiziert
- `/Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/index.html` — CDN-Versionen, Section-IDs, Script-Reihenfolge

### Secondary (MEDIUM confidence)
- WebSearch: YouTube lazy-load thumbnail pattern (gomakethings.com, nigelbunner.co.uk) — Standardmuster, vielfach dokumentiert

### Tertiary (LOW confidence)
- `[ASSUMED]` Tab-System ohne ARIA-Tabpanel — Accessibility-Entscheidung, kein Blocker für dieses Projekt

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — Chart.js 4.4 bereits eingebunden, API via Context7 verifiziert
- Architecture: HIGH — Existierende Patterns direkt aus Codebase gelesen
- Pitfalls: HIGH — PLACEHOLDER-IDs und Chart-Instance-Konflikt direkt aus Datei-Analyse
- Datenvollständigkeit: HIGH — data.js komplett gelesen

**Research date:** 2026-08-03
**Valid until:** 2026-09-03 (Chart.js 4.x stabil)
