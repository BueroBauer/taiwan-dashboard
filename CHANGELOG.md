# Changelog

Alle wichtigen Änderungen werden in dieser Datei dokumentiert.
Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Added
- Section "Sicherheit" (index.html #sicherheit) mit Nav-Eintrag
- js/sicherheit.js: Rendering Warndienst + Bebenskala, exportiert `window.seismikBadge()` und `window.seismikPhaseRow()`
- data.js `warndienst`: Ampelstufen, aktueller Stand, Referenzband PLA, offene Trigger, Kalender bis Reiseende, 7 Quellen, Grenzen des Dienstes
- data.js `seismik`: Kennzahlen, 4-stufige Regionalskala, Risiko für alle 10 Phasen, Verhalten mit Kleinkind, Warnkanäle
- Timeline-Phasen: Bebenbadge im Header, Bebenzeile mit Detail im aufgeklappten Body
- Hero-Statleiste: Ampelstatus des Warndienstes, verlinkt auf #sicherheit
- CSS-Block für Warndienst, Bebenskala und Timeline-Bebenzeile

## [0.1.0] - 2026-07-31

### Added
- Projekt-Fundament: Dateistruktur, Git-Infrastruktur
- Dark Theme (css/style.css) identisch Master Dashboard (#0D0F12, #161A20, #3B82F6)
- Sticky Navigation mit 7 Sections und IntersectionObserver Active-State
- Responsive Layout-System (Desktop + Mobile-first)
- CSS Custom Properties --phase-1 bis --phase-10 für Karten + Charts
- data.js Skelett: window.TAIWAN mit allen 10 Reisephasen, Sights, Restaurants, Videos, Booking, FAQ, Charts
- index.html App-Shell mit allen Section-Platzhaltern
- js/app.js: Passwort-Gate-Logik (auto-fill lokal), Nav IntersectionObserver
- js/map.js, js/charts.js: leere Stubs für Phase 2 + Phase 4

[Unreleased]: https://github.com/markintosh/taiwan-dashboard/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/markintosh/taiwan-dashboard/releases/tag/v0.1.0
