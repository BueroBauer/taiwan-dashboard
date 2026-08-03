---
phase: 04-infografiken-videos-restaurants
plan: "04"
subsystem: integration
tags: [integration, index.html, app.js, css, wiring]
dependency_graph:
  requires: [js/charts.js (04-01), js/videos.js (04-02), js/restaurants.js (04-03)]
  provides: [lauffaehige Phase-4-App]
  affects: [index.html, js/app.js, css/style.css]
tech_stack:
  added: []
  patterns: [DOM wiring, CSS Grid responsive, CSS Custom Properties, guard-init pattern]
key_files:
  created: []
  modified: [index.html, js/app.js, css/style.css]
decisions:
  - "Canvas-Elemente direkt in index.html — kein JS-generiertes DOM fuer Chart.js (stabiler)"
  - "guard-init pattern: if (window.X) X.init() — verhindert Fehler bei fehlendem Modul"
  - "CSS nur angehaengt, nichts bestehend geaendert — chirurgisch"
metrics:
  duration: "~5 min"
  completed: "2026-08-03"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 3
requirements:
  - CHT-01
  - CHT-02
  - CHT-03
  - CHT-04
  - CHT-05
  - VID-01
  - VID-02
  - VID-03
  - VID-04
  - RST-01
  - RST-02
---

# Phase 04 Plan 04: Integration — index.html + app.js + css/style.css Summary

Verdrahtung der drei Wave-1-Module mit dem DOM: Canvas-Elemente, Script-Ladereihenfolge, Init-Aufrufe und komplettes Dark-Theme-CSS fuer Charts/Videos/Restaurants/Budget.

## Tasks

| # | Name | Status | Commit |
|---|------|--------|--------|
| 1 | index.html — Script-Tags + Canvas-HTML | done | 45d8767 |
| 2 | app.js + css/style.css — Init-Aufrufe + neue Styles | done | 45d8767 |

## What Was Built

**index.html:**
- `#charts-content`: 4 `.chart-card` mit `<canvas id="chart-costs/nights/temp/entries">` + `.chart-grid` Wrapper + `#budget-counter-container`
- Script-Reihenfolge: `data.js → map.js → charts.js → videos.js → restaurants.js → app.js`

**js/app.js:**
- 3 neue Init-Aufrufe in `DOMContentLoaded`: `chartsModule.init()`, `videosModule.init()`, `restaurantsModule.init()` — alle mit guard-Pattern

**css/style.css (258 Zeilen neu angehaengt):**
- `.chart-grid` — 1-col mobile, 2-col ab 768px
- `.chart-card`, `.chart-title`, `.chart-container`
- `.budget-counter`, `.budget-item`, `.budget-amount`, `.budget-label`, `.budget-vs`, `.budget-total`
- `.vid-tabs`, `.vid-tab`, `.vid-tab--active`
- `.vid-grid` — 1-col mobile, 3-col ab 768px
- `.vid-card`, `.vid-thumb-wrap`, `.vid-thumb`, `.vid-thumb-placeholder`, `.vid-play-btn`, `.vid-title`
- `.rst-filters`, `.rst-filter`, `.rst-filter--active`
- `.rst-grid` — 1-col mobile, 2-col ab 768px
- `.rst-card`, `.rst-name`, `.rst-meta`, `.rst-type`, `.rst-price`, `.rst-note`, `.rst-link`

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Alle Container sind leer bis Module init() aufrufen — das ist korrekt, kein Stub.

## Threat Flags

None. Keine neue Netzwerk-Oberflaeche eingefuehrt. CDN-Scripts unveraendert.

## Self-Check: PASSED

- index.html: chart-costs, chart-nights, chart-temp, chart-entries, budget-counter-container, chart-grid, js/videos.js, js/restaurants.js — alle FOUND
- js/app.js: chartsModule.init, videosModule.init, restaurantsModule.init — alle FOUND
- css/style.css: chart-grid, vid-tabs, vid-grid, rst-grid, budget-counter, vid-thumb-placeholder, rst-filter--active — alle FOUND
- Commit 45d8767: FOUND
