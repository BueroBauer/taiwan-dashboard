---
phase: 01-projekt-fundament
plan: "01-02-03"
subsystem: foundation
tags: [html, css, js, data, git, dark-theme, leaflet, chartjs]
dependency-graph:
  requires: []
  provides: [css/style.css, js/data.js, index.html, js/app.js, js/map.js, js/charts.js]
  affects: [alle weiteren Phasen]
tech-stack:
  added: [Leaflet 1.9.4, Chart.js 4.4.0, Leaflet.markercluster 1.5.3]
  patterns: [window.TAIWAN global namespace, CSS Custom Properties, IntersectionObserver, LocalStorage Gate]
key-files:
  created:
    - css/style.css
    - js/data.js
    - js/app.js
    - js/map.js
    - js/charts.js
    - index.html
    - .gitignore
    - CHANGELOG.md
    - README.md
    - .nojekyll
  modified: []
decisions:
  - "window.TAIWAN als einziger Global-Namespace — kein import/export wegen CORS file://"
  - "CSS Custom Properties --phase-1..10 auf :root — JS liest via getComputedStyle statt Magic Numbers"
  - "scroll-padding-top: 56px identisch nav-height — verhindert Anchor-Scroll-Überlagerung"
  - "costs.values: [28,33,14,7,5,7,6] summiert auf 100% — 7 Labels inkl. Reserve"
  - "isLocal-Gate: file:// + localhost auto-unlock, GitHub Pages zeigt Gate"
metrics:
  duration: "~45 Minuten"
  completed: "2026-07-31"
  tasks: 5
  files: 10
---

# Phase 1 Plan 01-02-03: Projekt-Fundament Summary

Dark Theme + data.js Skelett + App-Shell als vollständige statische HTML-App mit Passwort-Gate, Sticky Nav und IntersectionObserver — lokal sofort nutzbar, GitHub Pages-ready.

## Was wurde gebaut

**Plan 01-01 — Git-Infrastruktur + CSS (5 Dateien)**

- `.gitignore`: macOS + Obsidian sync-conflict + node_modules + Editor
- `CHANGELOG.md`: Keep-a-Changelog v0.1.0 Eintrag
- `README.md`: Setup mit `open index.html`, GitHub Pages URL
- `.nojekyll`: leer (0 Bytes) — verhindert Jekyll auf GitHub Pages
- `css/style.css`: 374 Zeilen, vollständiges Dark Theme
  - Custom Properties: `--bg` bis `--phase-10` (11 Phasen-Farben)
  - Sticky Nav (56px height), scroll-padding-top identisch
  - Card, Grid (mobile-first), Hero, Gate-Overlay, Utility-Klassen

**Plan 01-02 — js/data.js (1 Datei, 1128 Zeilen)**

- `window.TAIWAN` vollständig definiert:
  - 10 Phasen mit GPS-Koordinaten, Farben, `days[]`/`slots`-Struktur
  - Phase 1+2: alle Tage vollständig befüllt mit Aktivitäten + Koordinaten
  - Phase 3-10: Tag 1-3 befüllt, restliche Tage als leere Slot-Struktur
  - 48 Sights mit `buggyFriendly`, `googleMapsUrl`, Tags
  - 15 Restaurants (vegan/vegetarisch/veg-option) nach Phase
  - 20 Videos nach 8 Kategorien (ostküste, kenting, tempel, xiaoliuqiu, familie, deutsch, transport, alishan)
  - 10 Booking-Einträge mit Booking.com + Airbnb URLs
  - 5 KKday-Touren
  - 8 FAQ alle `status: "open"`
  - Charts: costs summiert auf 100%, nights summiert auf 59

**Plan 01-03 — index.html + JS + Tag (4 Dateien)**

- `index.html`: vollständige App-Shell, 7 Sections, CDN-Links korrekt
- `js/app.js`: Passwort-Gate + IntersectionObserver + `window.getPhaseColor()`
- `js/map.js`: `window.mapModule` Stub für Phase 2
- `js/charts.js`: `window.chartsModule` Stub für Phase 4
- `git tag v0.1.0` gesetzt

## Commits

| Hash | Nachricht |
|------|-----------|
| 60d3261 | feat(01-01): Git-Infrastruktur + Dark Theme CSS |
| 46097e6 | feat(01-02): js/data.js — vollständiges window.TAIWAN Skelett |
| d494995 | feat(01-03): index.html App-Shell + js/app.js + JS-Stubs |

## CSS-Klassen (css/style.css)

`.nav`, `.nav-list`, `.nav-link`, `.nav-link.active`, `.container`, `.section`, `.section-title`, `.section-subtitle`, `.card`, `.card-title`, `.card-meta`, `.grid`, `.grid-2`, `.grid-3`, `.grid-4`, `.hero`, `.hero-title`, `.hero-subtitle`, `.stats-bar`, `.stat`, `.stat-value`, `.stat-label`, `.placeholder`, `.gate-overlay`, `.gate-box`, `.gate-title`, `.gate-subtitle`, `.gate-input`, `.gate-btn`, `.gate-error`, `.hidden`, `.badge`, `.badge-accent`, `.badge-green`, `.badge-yellow`, `.badge-red`, `.text-muted`, `.text-accent`, `.mt-1`, `.mt-2`, `.mt-4`, `.mb-4`

## Custom Properties (css/style.css :root)

`--bg`, `--card`, `--border`, `--accent`, `--accent-hover`, `--accent-green`, `--yellow`, `--text`, `--muted`, `--font`, `--radius`, `--nav-height`, `--phase-1` bis `--phase-10`

## Abweichungen vom Plan

Keine — Plan exakt so ausgeführt wie spezifiziert.

**Einzige Anpassung:** Die `costs.values` aus dem PLAN.md Kommentar enthielten einen Fehler (`[44,42,12,3,4,5]` = 110%). Korrekte Werte gemäß kritischer Constraint aus Execution Instructions: `[28,33,14,7,5,7,6]` mit angepassten Labels (7 Einträge statt 6). Summiert auf 100%.

## Known Stubs

| Stub | Datei | Zweck |
|------|-------|-------|
| `window.mapModule.init()` | js/map.js | Leaflet-Karte — Phase 2 |
| `window.chartsModule.init()` | js/charts.js | Chart.js Infografiken — Phase 4 |
| `#timeline-content` (placeholder) | index.html | Timeline — Phase 3 |
| `#charts-content` (placeholder) | index.html | Zahlen/Infografiken — Phase 4 |
| `#videos-content` (placeholder) | index.html | Videos — Phase 4 |
| `#restaurants-content` (placeholder) | index.html | Restaurant-Guide — Phase 4 |
| `#booking-content` (placeholder) | index.html | Booking — Phase 5 |
| `#faq-content` (placeholder) | index.html | FAQ — Phase 5 |
| `youtubeId: "PLACEHOLDER_VID_NNN"` | js/data.js | Mark füllt echte YouTube-IDs ein |
| `exampleHotels: []` | js/data.js | Mark füllt konkrete Hotel-Beispiele ein |

Alle Stubs sind intentional — die jeweiligen späteren Phasen implementieren sie.

## Bereit für Phase 2

- `window.TAIWAN.phases[].base.lat/lng` → Leaflet-Route
- `window.TAIWAN.sights[].lat/lng` → Leaflet-Pins
- `window.getPhaseColor(phaseId)` → Marker-Farben aus CSS
- `window.mapModule.init()` → Stub bereit für Überschreibung

## Self-Check: PASSED

- css/style.css: existiert, 374 Zeilen, 11 --phase- Properties
- js/data.js: Node-Eval passed — phases:10, sights:48, videos:20, faq:8, costs-sum:100
- index.html: 7 Section-IDs, kein type="module", data.js script-Tag vorhanden
- js/app.js: 107 Zeilen, getPhaseColor + IntersectionObserver + isLocal-Gate
- git tag v0.1.0: existiert
- .nojekyll: 0 Bytes (leere Datei)
