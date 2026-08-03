---
phase: 05-booking-offene-fragen
plan: "03"
subsystem: integration
tags: [integration, index.html, app.js, css, script-order]
dependency_graph:
  requires: [js/booking.js window.bookingModule, js/faq.js window.faqModule]
  provides: [vollstaendig integriertes Dashboard, .faq-* CSS]
  affects: [index.html, js/app.js, css/style.css]
tech_stack:
  added: []
  patterns: [Guard-Pattern if(window.X), Script-Ladereihenfolge, CSS custom properties]
key_files:
  created: []
  modified: [index.html, js/app.js, css/style.css]
decisions:
  - "booking.js + faq.js nach restaurants.js eingefuegt — haengen nicht von restaurants.js ab aber folgen bestehendem Reihenfolge-Pattern"
  - "Guard-Pattern identisch zu allen anderen Modul-Aufrufen in app.js"
metrics:
  duration: "5 min"
  completed: "2026-08-03"
  tasks_completed: 2
  files_created: 0
  files_modified: 3
---

# Phase 05 Plan 03: Integration — index.html + app.js + css/style.css Summary

Drei chirurgische Edits verdrahten booking.js + faq.js mit dem Dashboard: Script-Tags in korrekter Ladereihenfolge, Guard-Pattern init()-Aufrufe in DOMContentLoaded, .faq-* CSS-Klassen am Ende von style.css.

## Tasks

| # | Name | Status | Commit |
|---|------|--------|--------|
| 1 | index.html — Script-Tags + Section-Container | done | 1c76af6 |
| 2 | app.js + css/style.css — Module aktivieren + FAQ-CSS | done | 1c76af6 |

## Requirements

- BKG-01..05: booking.js aktiv, init() wird aufgerufen — erledigt
- FAQ-01..02: faq.js aktiv, init() wird aufgerufen — erledigt

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. Container-IDs `booking-content` und `faq-content` waren bereits in index.html vorhanden (Placeholder-Text). Script-Tags und init()-Aufrufe ergaenzt.

## Threat Flags

None. T-05-05 (Script-Ladereihenfolge) mitigiert: booking.js + faq.js kommen nach data.js, Guard-Pattern verhindert undefined-Fehler.

## Checkpoint: human-verify

Visuelle Browser-Verifikation steht aus (checkpoint:human-verify aus Plan). Manuell pruefen:
1. index.html im Browser oeffnen
2. Booking-Sektion: 10 Cards mit earlyBook-Badge bei Phase 5/6/8
3. FAQ-Sektion: 8 Eintraege mit roten Icons
4. Console: keine Fehler

## Self-Check: PASSED

- booking.js Script-Tag in index.html: FOUND (1)
- faq.js Script-Tag in index.html: FOUND (1)
- booking-content Container: FOUND (1)
- faq-content Container: FOUND (1)
- bookingModule.init() in app.js: FOUND (1)
- faqModule.init() in app.js: FOUND (1)
- .faq-item--open in css/style.css: FOUND (1)
- Commit 1c76af6: FOUND
