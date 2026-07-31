# STATE: Taiwan Reise-Dashboard

**Last updated:** 2026-07-31
**Milestone:** v1.0

---

## Project Reference

**Core Value:** Familie kann die gesamte Reise auf einem Blick planen, navigieren und teilen
**Tech Stack:** Pure HTML/CSS/JS, CDN only (Leaflet, Chart.js, MarkerCluster)
**Deployment Target:** markintosh.github.io/taiwan-dashboard

---

## Current Position

**Current Phase:** 1 — Projekt-Fundament
**Current Plan:** TBD (Phase not yet planned)
**Status:** Not started

**Progress:**
```
Phase 1 [          ] 0%
Phase 2 [          ] 0%
Phase 3 [          ] 0%
Phase 4 [          ] 0%
Phase 5 [          ] 0%
Phase 6 [          ] 0%
```

**Overall:** 0/6 phases complete

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Phases total | 6 |
| Requirements total | 41 |
| Requirements complete | 0 |
| Plans created | 0 |
| Plans complete | 0 |

---

## Accumulated Context

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| Static HTML ohne Build-Step | Maximale Portabilität, kein Dev-Overhead |
| data.js als einzige Datenquelle | Einfache Updates via Git, kein Backend |
| GitHub Pages | Stabiler Link, automatisch deployed bei Push |
| Dark Theme #0D0F12/#161A20/#3B82F6 | Konsistenz mit Master Dashboard |
| Leaflet + OSM | Kostenlos, keine API-Key-Pflicht |
| Passwort "sri30" | Lokal vorausgefüllt, GitHub Pages: localStorage-Session |

### Architecture

```
taiwan-dashboard/
  index.html          — Shell, sticky nav, alle Sektionen
  css/style.css       — Dark theme, responsive
  js/data.js          — Alle Reisedaten (10 Phasen, ~50 Sights, Videos, Restaurants, Booking, FAQ)
  js/map.js           — Leaflet-Logik
  js/charts.js        — Chart.js-Logik
  js/app.js           — Timeline-Render, Video-Tabs, Accordion
  .planning/          — GSD-Planung
  CHANGELOG.md        — Keep-a-Changelog-Format
  README.md           — Setup-Anleitung
```

### Reise-Überblick

- 59 Tage · 10 Phasen · 2 Erw. + Kind 2J · Veg/vegan
- 01.12.2026 – 29.01.2027
- Budget: €9.160–10.860 gesamt
- Tagesmuster: 07:00 auf | 12:00–14:30 Mittagsschlaf | 20:00 Bett

### Todos

- [ ] Phase 1 planen (`/gsd-plan-phase 1`)

### Blockers

(keine)

---

## Session Continuity

**Last session:** 2026-07-31 — Projektinitialisierung, Requirements definiert, Roadmap erstellt
**Resume with:** `/gsd-plan-phase 1`
