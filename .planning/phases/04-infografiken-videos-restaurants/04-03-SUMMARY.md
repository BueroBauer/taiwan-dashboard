---
phase: 04-infografiken-videos-restaurants
plan: "03"
subsystem: restaurants
tags: [restaurants, filter, cards, IIFE, ES5]
dependency_graph:
  requires: [js/data.js (window.TAIWAN.restaurants + window.TAIWAN.phases)]
  provides: [window.restaurantsModule.init()]
  affects: [index.html #restaurants-content]
tech_stack:
  added: []
  patterns: [IIFE module, event delegation, insertAdjacentHTML, ES5 strict mode]
key_files:
  created: [js/restaurants.js]
  modified: []
decisions:
  - "closest()-Ersatz via while-Loop (ES5, kein closest() Polyfill nötig da Target immer direkt button ist — aber defensiv implementiert)"
  - "Emoji als Unicode-Escape in String-Literalen (ES5-safe, kein Template Literal)"
metrics:
  duration: "8 min"
  completed: "2026-08-03"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 04 Plan 03: restaurants.js — Restaurant-Cards mit Phasen-Filter

IIFE-Modul `window.restaurantsModule` mit `init()`: 15 Restaurant-Cards filterbar nach Reisephase, pure ES5.

## Tasks

| # | Name | Status | Commit |
|---|------|--------|--------|
| 1 | restaurants.js — IIFE mit Filter-Buttons und Restaurant-Cards | done | 8b12e43 |

## What Was Built

`js/restaurants.js` — neues IIFE-Modul:

- `init()`: Guard-Check → `#restaurants-content` leeren → Filter-Buttons → Cards → Events binden
- `_renderFilterButtons()`: "Alle" + "Phase 1 Taipei" ... "Phase 10 ..." via `window.TAIWAN.phases`
- `_filter(phaseId)`: `phaseId === 'all'` → alle; sonst strict `===` mit Number (parseInt)
- `_makeCard(r)`: Name mit optionalem 🌱-Prefix, Typ-Label-Map, €X/P, Note, Maps-Link mit `rel="noopener"`
- `_renderCards()`: alten `.rst-grid` entfernen, neu per `insertAdjacentHTML`
- `_bindEvents()`: ein Event-Listener via Delegation, active-Class tauschen, Re-Render

## Deviations from Plan

None — plan executed exactly as written.

`closest()` ist in ES5 nicht vorhanden (IE11). Plan zeigt `e.target.closest('.rst-filter')`. Da alle Filter-Buttons einfache `<button>` ohne Kinder-Elemente sind, trifft `e.target` immer direkt den Button. Zur Sicherheit wurde ein defensiver `while`-Loop implementiert — kein Blocker, kein Abweichungs-Risiko.

## Known Stubs

None. Alle 15 Cards rendern echte Daten aus `window.TAIWAN.restaurants`.

## Threat Flags

None. Alle URLs kommen aus statischer `data.js`, kein User-Input-Pfad. `rel="noopener"` auf allen externen Links gesetzt.

## Self-Check: PASSED

- js/restaurants.js existiert: FOUND
- Commit 8b12e43 existiert: FOUND
- ES5-Check (kein Arrow, kein Template Literal, kein const/let): PASSED
- Pflichtfelder-Check (16 Tokens): PASSED
