---
phase: 05-booking-offene-fragen
plan: "01"
subsystem: booking
tags: [booking, kkday, deeplinks, css, es5]
dependency_graph:
  requires: [data.js booking[], data.js tours[]]
  provides: [window.bookingModule, .bkg-* CSS]
  affects: [index.html booking-content]
tech_stack:
  added: []
  patterns: [IIFE-module, ES5-only, insertAdjacentHTML, CSS custom properties]
key_files:
  created: [js/booking.js]
  modified: [css/style.css]
decisions:
  - "isPlaceholder via !/\\d/.test(url) — erkennt alle KKday-URLs ohne echte Tour-ID"
  - "earlyBadge als leerer String wenn false — kein Conditional-Rendering nötig"
  - "_renderExampleHotels gibt Fallback-String zurück, nicht leere Section"
metrics:
  duration: "8 min"
  completed: "2026-08-03"
  tasks_completed: 2
  files_created: 1
  files_modified: 1
---

# Phase 05 Plan 01: js/booking.js + CSS .bkg-* — Summary

IIFE-Modul `window.bookingModule` mit earlyBook-Badge, KKday-Platzhalter-Erkennung und Leer-Fallback für exampleHotels[].

## Tasks

| # | Name | Status | Commit |
|---|------|--------|--------|
| 1 | js/booking.js — IIFE-Modul | done | dfee123 |
| 2 | css/style.css — .bkg-* Klassen | done | dfee123 |

## Requirements

- BKG-01: Alle 10 Phasen haben Booking.com + Airbnb Deeplink-Buttons — erledigt
- BKG-02: Leere exampleHotels[] zeigen "Hotels noch nicht eingetragen" — erledigt
- BKG-03: "Research starten" öffnet bookingUrl direkt (href=b.bookingUrl) — erledigt
- BKG-04: earlyBook-Badge bei Phase 5/6/8 via `b.earlyBook === true` — erledigt
- BKG-05: KKday-Platzhalter-URLs zeigen gelben Warn-Hinweis statt Link — erledigt

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- `exampleHotels[]` bei allen 10 Phasen leer (data.js) — Fallback-Text "Hotels noch nicht eingetragen" greift korrekt. Keine funktionalen Stubs im JS-Code.

## Threat Flags

None. Beide Threats T-05-01 und T-05-02 aus dem Plan als `accept` klassifiziert, keine neue Surface.

## Self-Check: PASSED

- js/booking.js existiert: FOUND
- css/style.css enthält .bkg-card: FOUND (1 Match)
- css/style.css enthält .bkg-tour-placeholder: FOUND (1 Match)
- Commit dfee123: FOUND
- ES5-Prüfung (kein const/let/=>): PASSED
