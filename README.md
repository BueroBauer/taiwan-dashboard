# Taiwan Reise-Dashboard

Interaktives Dashboard für unseren 59-Tage Taiwan-Winterurlaub (Dez 2026 – Jan 2027).
2 Erwachsene + Kind 2J · Vegetarisch/vegan · 10 Phasen · €9.160–10.860

## Lokal öffnen

```bash
git clone https://github.com/markintosh/taiwan-dashboard.git
cd taiwan-dashboard
open index.html
```

Kein Build-Schritt. Direkt im Browser öffnen (Chrome/Safari).
Lokal: Passwort ist automatisch vorausgefüllt.

## Online

[markintosh.github.io/taiwan-dashboard](https://markintosh.github.io/taiwan-dashboard)

Passwort: sri30

## Daten aktualisieren

Alle Reisedaten liegen in `js/data.js`. Ändern + committen → automatisch live auf GitHub Pages.

## Sicherheit — Warndienst + Bebenskala

Die Section `#sicherheit` bündelt zwei Dinge:

- **Warndienst** — politische und militärische Lage. Ampel, Referenzband PLA-Flugzeuge, offene Auslöser, Kalender bis Reiseende, Quellenliste. Gepflegt über den Skill `/taiwan-watch`, Werte stehen in `data.js → warndienst`. Verlauf liegt in `../taiwan-watch-log.md`.
- **Bebenskala** — vierstufiges Regionalrisiko (niedrig / mittel / erhöht / hoch), Kennzahlen, Verhalten mit Kleinkind, Warnkanäle. Werte in `data.js → seismik`.

Jede Reisephase trägt ihre Bebenstufe zusätzlich als Badge in der Timeline, das Detail erscheint beim Aufklappen. Zuordnung über `seismik.phases[phaseId]`, Schlüssel entsprechen `phases[].id`.

## Tech Stack

- Leaflet 1.9.4 (Karte)
- Chart.js 4.4 (Infografiken)
- Leaflet.markercluster 1.5.3 (Pin-Cluster)
- Vanilla HTML/CSS/JS — kein Build-Schritt, kein npm

## Phasen

| # | Region | Nächte |
|---|--------|--------|
| 1 | Taipei (Ankunft) | 2 |
| 2 | Hualien | 7 |
| 3 | East Rift Valley | 5 |
| 4 | Taitung | 3 |
| 5 | Xiaoliuqiu 🐢 | 5 |
| 6 | Kenting 🏖️ | 10 |
| 7 | Tainan 🦩 | 13 |
| 8 | Alishan 🌄 | 5 |
| 9 | Sun Moon Lake | 4 |
| 10 | Taipei (Rückreise) | 5 |
