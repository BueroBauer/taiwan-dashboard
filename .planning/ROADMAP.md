# Roadmap: Taiwan Reise-Dashboard

**Project:** Taiwan Reise-Dashboard
**Milestone:** v1.0
**Granularity:** Standard (5–8 Phasen)
**Coverage:** 41/41 Requirements

---

## Phases

- [x] **Phase 1: Projekt-Fundament** — Git-Repo, Dateistruktur, data.js-Skelett, Dark Theme, Sticky Nav ✓ v0.1.0
- [ ] **Phase 2: Karte** — Leaflet-Karte mit ~50 Pins, Route, Tagesausflug-Differenzierung, Filter, Cluster
- [ ] **Phase 3: Timeline** — 10 Phasen-Cards mit aufklappbaren Tages-Slots, Jetlag-Anpassung, Badges
- [ ] **Phase 4: Infografiken + Videos + Restaurants** — 5 Chart.js-Charts, YouTube-Grid, Restaurant-Guide
- [ ] **Phase 5: Booking + Offene Fragen** — Hotel-Links, KKday-Touren, FAQ-Checkliste mit Status
- [ ] **Phase 6: Auth + Deployment** — Passwort-Gate, GitHub Pages, automatisches Deployment

---

## Phase Details

### Phase 1: Projekt-Fundament
**Goal**: Die App-Shell steht — alle Dateien vorhanden, Dark Theme aktiv, Navigation scrollt zu allen Sektionen, data.js enthält alle Reisedaten strukturiert
**Depends on**: Nichts (erste Phase)
**Requirements**: INF-01, INF-02, INF-03, INF-04, INF-05, INF-06
**Success Criteria** (what must be TRUE):
  1. `index.html` öffnet sich lokal im Browser mit Dark Theme (#0D0F12 Background)
  2. Sticky Nav zeigt alle 7 Sections (Karte, Timeline, Zahlen, Videos, Restaurants, Booking, Fragen) und scrollt korrekt
  3. `js/data.js` enthält alle 10 Reisephasen, ~50 Sights, Restaurants, Videos, Booking-Daten, FAQ — strukturiert und kommentiert
  4. CHANGELOG.md vorhanden, .gitignore korrekt, README.md mit Setup-Anleitung
  5. App ist responsive (Desktop + Mobile) ohne Content
**Plans**: TBD
**UI hint**: yes

### Phase 2: Karte
**Goal**: Benutzer sieht alle 10 Reisephasen auf einer interaktiven Leaflet-Karte mit gefilterbaren Pins und kann jeden Sight direkt in Google Maps öffnen
**Depends on**: Phase 1
**Requirements**: MAP-01, MAP-02, MAP-03, MAP-04, MAP-05, MAP-06, MAP-07
**Success Criteria** (what must be TRUE):
  1. Leaflet-Karte lädt zentriert auf Taiwan, alle 10 Phasen als farbcodierte Route verbunden
  2. ~50 Sight-Pins erscheinen mit Phasen-Farbe, Popup zeigt Name, Preis, Buggy-Icon, Google-Maps-Button
  3. Tagesausflüge erscheinen als Rauten-Pin mit gestrichelter Linie zum Phasen-Base; Mehrtagesausflüge als Mini-Polyline
  4. Phasen-Filter-Buttons 1–10 togglen Pins korrekt ein/aus
  5. Bei Zoom-out clustert MarkerCluster automatisch
**Plans**: TBD
**UI hint**: yes

### Phase 3: Timeline
**Goal**: Benutzer kann die gesamte 59-Tage-Reise chronologisch durchblättern — pro Phase als Card, pro Tag mit AM/Mittagsschlaf/PM-Slots, mit Kind-spezifischen Badges
**Depends on**: Phase 1
**Requirements**: TML-01, TML-02, TML-03, TML-04, TML-05, TML-06
**Success Criteria** (what must be TRUE):
  1. 10 Phasen-Cards erscheinen vertikal mit Nächte-Badge und Top-Highlights sichtbar ohne Klick
  2. Aufklappen einer Card zeigt tägliche Slots: Vormittag / Mittagsschlaf 12:00–14:30 / Nachmittag
  3. Phase 1 Taipei zeigt Jetlag-Anpassung (Tag 1–3 mit verschobenen Slots)
  4. Sights pro Slot zeigen Name, Preis, Buggy-Icon, klickbaren Google-Maps-Link
  5. Kind-Badges (Heißquellen-Warnung, Schildkröten, GRATIS, SILVESTER) und Offene-Fragen-Badge erscheinen korrekt
**Plans**: TBD
**UI hint**: yes

### Phase 4: Infografiken + Videos + Restaurants
**Goal**: Benutzer kann Reisebudget, Zeitverteilung und Temperaturen auf einen Blick erfassen, relevante YouTube-Videos gefiltert nach Kategorie abrufen und vegetarische Restaurants pro Phase finden
**Depends on**: Phase 1
**Requirements**: CHT-01, CHT-02, CHT-03, CHT-04, CHT-05, VID-01, VID-02, VID-03, VID-04, RST-01, RST-02
**Success Criteria** (what must be TRUE):
  1. Donut-Chart zeigt Kostenverteilung (6 Kategorien), Balkendiagramm zeigt Nächte pro Phase farbcodiert
  2. Line-Chart zeigt Min/Max-Temperatur pro Phase mit Alishan-Kälteeinbruch sichtbar; Scatter-Chart zeigt Eintritte mit Gratis-Anteil (~65%) hervorgehoben
  3. Budget-Counter zeigt €130–150/Tag Komfort vs. €29 Backpacker-Realität
  4. 20 YouTube-Videos erscheinen in Kategorien-Tabs (8 Kategorien), als 3-spaltiges Grid Desktop / Stack Mobile
  5. Restaurant-Cards zeigen Name, Typ, Preis, Vegan-Symbol, Google-Maps-Link; Filter nach Phase funktioniert
**Plans**: 4 Plans
- [ ] 04-01-PLAN.md — charts.js: 4 Chart.js-Visualisierungen + Budget-Counter
- [ ] 04-02-PLAN.md — videos.js: YouTube-Tab-Grid mit Lazy-Load
- [ ] 04-03-PLAN.md — restaurants.js: Restaurant-Cards + Phasen-Filter
- [ ] 04-04-PLAN.md — Integration: index.html + app.js + css
**UI hint**: yes

### Phase 5: Booking + Offene Fragen
**Goal**: Benutzer kann pro Reisephase direkt nach Hotels suchen (Booking.com / Airbnb mit vorausgefüllten Daten), Touren buchen (KKday), und sieht alle offenen Fragen mit Status auf einen Blick
**Depends on**: Phase 1
**Requirements**: BKG-01, BKG-02, BKG-03, BKG-04, BKG-05, FAQ-01, FAQ-02
**Success Criteria** (what must be TRUE):
  1. Pro Phase öffnet Booking.com-Deeplink + Airbnb-Deeplink mit Region, Daten und Familie vorausgefüllt
  2. 5 Beispiel-Hotels pro Phase sichtbar, Kriterien-Objekt vorhanden, "Research starten"-Button öffnet Booking.com mit Kriterien-Filter
  3. Xiaoliuqiu, Alishan, Kenting zeigen Warn-Badge (Silvester = früh buchen)
  4. KKday-Links für Glasbodenboot, Alishan, etc. öffnen korrekt
  5. 8 offene Fragen erscheinen als Checkliste mit 🔴/🟢 Status; Status-Änderung in data.js spiegelt sich beim Reload
**Plans**: TBD

### Phase 6: Auth + Deployment
**Goal**: Die App ist passwortgeschützt auf GitHub Pages erreichbar, lokal ohne Passwort-Eingabe nutzbar, und deployed automatisch bei jedem Push
**Depends on**: Phase 1, Phase 2, Phase 3, Phase 4, Phase 5
**Requirements**: SEC-01, SEC-02, SEC-03, SEC-04, SEC-05
**Success Criteria** (what must be TRUE):
  1. Lokal (file:// oder localhost): Passwort "sri30" ist automatisch vorausgefüllt, einmal klicken genügt
  2. GitHub Pages (markintosh.github.io/taiwan-dashboard): Passwort-Gate erscheint, korrekte Eingabe öffnet App und speichert Session in localStorage
  3. Falsches Passwort zeigt Fehlermeldung, App bleibt gesperrt
  4. `git push main` triggert automatisches GitHub Pages Deployment — Änderungen live nach < 2 Minuten
**Plans**: TBD

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Projekt-Fundament | 0/? | Not started | - |
| 2. Karte | 0/? | Not started | - |
| 3. Timeline | 0/? | Not started | - |
| 4. Infografiken + Videos + Restaurants | 0/? | Not started | - |
| 5. Booking + Offene Fragen | 0/? | Not started | - |
| 6. Auth + Deployment | 0/? | Not started | - |

---

## Coverage Map

| Requirement | Phase |
|-------------|-------|
| INF-01 | 1 |
| INF-02 | 1 |
| INF-03 | 1 |
| INF-04 | 1 |
| INF-05 | 1 |
| INF-06 | 1 |
| MAP-01 | 2 |
| MAP-02 | 2 |
| MAP-03 | 2 |
| MAP-04 | 2 |
| MAP-05 | 2 |
| MAP-06 | 2 |
| MAP-07 | 2 |
| TML-01 | 3 |
| TML-02 | 3 |
| TML-03 | 3 |
| TML-04 | 3 |
| TML-05 | 3 |
| TML-06 | 3 |
| CHT-01 | 4 |
| CHT-02 | 4 |
| CHT-03 | 4 |
| CHT-04 | 4 |
| CHT-05 | 4 |
| VID-01 | 4 |
| VID-02 | 4 |
| VID-03 | 4 |
| VID-04 | 4 |
| RST-01 | 4 |
| RST-02 | 4 |
| BKG-01 | 5 |
| BKG-02 | 5 |
| BKG-03 | 5 |
| BKG-04 | 5 |
| BKG-05 | 5 |
| FAQ-01 | 5 |
| FAQ-02 | 5 |
| SEC-01 | 6 |
| SEC-02 | 6 |
| SEC-03 | 6 |
| SEC-04 | 6 |
| SEC-05 | 6 |

**Total mapped: 41/41**

---

*Created: 2026-07-31*
