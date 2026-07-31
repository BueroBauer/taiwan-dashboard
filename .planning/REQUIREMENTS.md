# Requirements: Taiwan Reise-Dashboard

**Defined:** 2026-07-31
**Core Value:** Familie kann die gesamte Reise auf einem Blick planen, navigieren und teilen

## v1 Requirements

### Map (Karte)

- [ ] **MAP-01**: Leaflet-Karte mit OpenStreetMap-Tiles zentriert auf Taiwan
- [ ] **MAP-02**: Polyline-Route verbindet alle 10 Phasen farbcodiert
- [ ] **MAP-03**: ~50 Sight-Pins als Kreis-Marker mit Phasen-Farbe und Popup (Name, Preis, Buggy-Icon, Google-Maps-Button)
- [ ] **MAP-04**: Tagesausflüge als Rauten-Pin mit gestrichelter Linie zum Phasen-Base
- [ ] **MAP-05**: Mehrtagesausflüge als eigene Mini-Polyline
- [ ] **MAP-06**: Phasen-Filter-Buttons (1–10) togglen Pins ein/aus
- [ ] **MAP-07**: MarkerCluster bei Zoom-out

### Timeline

- [ ] **TML-01**: 10 Phasen-Cards vertikal, Flat List mit Nächte-Badge und Top-Highlights
- [ ] **TML-02**: Jede Card aufklappbar mit täglichen Slots (Vormittag / Mittagsschlaf-Block 12:00–14:30 / Nachmittag)
- [ ] **TML-03**: Jetlag-Anpassung in Phase 1 Taipei: Tag 1–3 mit verschobenen Slots
- [ ] **TML-04**: Sights pro Slot: Name, Preis, Buggy-Icon, Google-Maps-Link
- [ ] **TML-05**: Kind-Badges (⚠️ Heißquellen, 🐢 Schildkröten, GRATIS, SILVESTER etc.)
- [ ] **TML-06**: Offene-Fragen-Badge (⚠️) bei ungeklärten Punkten in der Card

### Infografiken

- [ ] **CHT-01**: Donut-Chart Kostenverteilung (Flug 44%, Unterkunft 42%, Essen 12%, Transport 3%, Eintritte 4%, Mietwagen 5%)
- [ ] **CHT-02**: Balkendiagramm Zeitverteilung (Nächte pro Phase, farbcodiert)
- [ ] **CHT-03**: Line-Chart Temperaturkurve (Min/Max pro Phase, Alishan-Kälteeinbruch sichtbar)
- [ ] **CHT-04**: Scatter-Chart Eintritte (Kosten pro Sight, Gratis-Anteil hervorheben ~65%)
- [ ] **CHT-05**: Budget-Counter (€130–150/Tag Komfort vs. €29 Backpacker-Realität)

### Videos

- [ ] **VID-01**: 20 YouTube-Videos in Kategorien-Tabs (Ostküste, Kenting, Tempel, Xiaoliuqiu, Familie, Deutsch, Transport, Alle)
- [ ] **VID-02**: Video-Cards: Thumbnail via YouTube-URL, Titel, klickbarer Link
- [ ] **VID-03**: Grid 3-spaltig Desktop, Stack Mobile
- [ ] **VID-04**: Tab-Strip Desktop horizontal, Mobile: ein Tab pro Zeile

### Restaurants

- [ ] **RST-01**: Restaurant-Cards mit Name, Typ, Preis, 🌱-Symbol, Google-Maps-Link
- [ ] **RST-02**: Filter nach Phase/Region

### Booking

- [ ] **BKG-01**: Pro Phase: Booking.com-Deeplink + Airbnb-Deeplink (Region + Daten + Familie vorgefüllt)
- [ ] **BKG-02**: Pro Phase: `hotels[]`-Array für 5 Beispiel-Hotels (von Mark befüllt) + `hotelCriteria{}`-Objekt
- [ ] **BKG-03**: "Research starten"-Button öffnet Booking.com mit abgeleitetem Kriterien-Filter
- [ ] **BKG-04**: ⚠️-Badge bei Xiaoliuqiu, Alishan, Kenting (Silvester = früh buchen)
- [ ] **BKG-05**: KKday-Links für Touren (Glasbodenboot, Alishan, etc.)

### Offene Fragen

- [ ] **FAQ-01**: 8 offene Fragen aus Masterplan als Checkliste mit Status (🔴 Offen / 🟢 Geklärt)
- [ ] **FAQ-02**: Status in data.js setzbar, Dashboard zeigt Änderung sofort beim Reload

### Auth / Sharing

- [ ] **SEC-01**: Passwortschutz "sri30" via JavaScript-Gate
- [ ] **SEC-02**: Lokal (file:// / localhost): Passwort automatisch vorausgefüllt + klickbar
- [ ] **SEC-03**: GitHub Pages: Passwort-Gate erscheint, localStorage speichert Session
- [ ] **SEC-04**: GitHub Pages Deployment (markintosh.github.io/taiwan-dashboard)
- [ ] **SEC-05**: Automatisches Deployment bei jedem Push zu main

### Infrastruktur

- [ ] **INF-01**: Git-Repo mit CHANGELOG.md (Keep-a-Changelog-Format) + v1.0.0 Tag
- [ ] **INF-02**: .gitignore (.DS_Store, *.sync-conflict-*, node_modules)
- [ ] **INF-03**: README.md mit Setup-Anleitung
- [ ] **INF-04**: Sticky Navigation (Karte | Timeline | Zahlen | Videos | Restaurants | Booking | Fragen)
- [ ] **INF-05**: Dark Theme identisch Master Dashboard (#0D0F12, #161A20, #3B82F6)
- [ ] **INF-06**: Responsive (Desktop + Mobile)

## v2 Requirements

### Erweitert

- **V2-01**: Wetter-Widget pro Phase via Open-Meteo API
- **V2-02**: Packliste interaktiv (checkbar, nach Phasen gefiltert)
- **V2-03**: Notiz-Feld pro Sight (Marks persönliche Kommentare)
- **V2-04**: Druckansicht / PDF-Export Timeline
- **V2-05**: Mehrsprachig (DE/EN)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend/Server | Static-HTML-Constraint, kein Dev-Overhead |
| npm/Build-Step | Maximale Portabilität, CDN ausreichend |
| Echtzeit-Buchung in App | Rechtlich/technisch komplex, externe Links genügen |
| Google Maps API | Kostenpflichtig, Leaflet/OSM ist ausreichend |
| Mobile App (iOS/Android) | Web-first, responsive Web ausreichend |
| User Accounts | Familie = eine Person, Passwort reicht |
| Kommentar-Funktion | data.js ist Datenquelle, kein Backend |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MAP-01 bis MAP-07 | Phase 1 | Pending |
| TML-01 bis TML-06 | Phase 2 | Pending |
| CHT-01 bis CHT-05 | Phase 3 | Pending |
| VID-01 bis VID-04 | Phase 4 | Pending |
| RST-01, RST-02 | Phase 4 | Pending |
| BKG-01 bis BKG-05 | Phase 5 | Pending |
| FAQ-01, FAQ-02 | Phase 5 | Pending |
| SEC-01 bis SEC-05 | Phase 6 | Pending |
| INF-01 bis INF-06 | Phase 1 + 6 | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-31*
*Last updated: 2026-07-31 after initial definition*
