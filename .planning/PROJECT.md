# Taiwan Reise-Dashboard

## What This Is

Interaktive HTML-Web-App für einen 59-Tage Taiwan-Winterurlaub (1. Dez 2026 – 29. Jan 2027) mit 2 Erwachsenen und einem 2-jährigen Kind (vegetarisch/vegan). Die App visualisiert den vollständigen Reiseplan als Leaflet-Karte, chronologische Timeline, Infografiken und YouTube-Ressourcen — lokal nutzbar und via GitHub Pages teilbar.

## Core Value

Familie kann die gesamte Reise auf einem Blick planen, navigieren und mit anderen teilen — ohne in Markdown-Dateien suchen zu müssen.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Leaflet-Karte mit Route + ~50 Sight-Pins (Tages- und Mehrtagesausflüge differenziert)
- [ ] Chronologische Timeline (10 Phasen, täglich mit Vormittag/Mittagsschlaf/Nachmittag)
- [ ] Infografiken: Kosten, Zeitverteilung, Temperaturkurve, Eintritte-Scatter
- [ ] YouTube-Videos nach Kategorien (Tabs, Mobile: Stack)
- [ ] Restaurant-Guide mit Phasen-Filter
- [ ] Booking-System: 5 Beispiel-Hotels → Kriterien → Research-Button → Booking.com/Airbnb
- [ ] Offene-Fragen-Sektion mit Status (Offen/Geklärt)
- [ ] Passwortschutz "sri30" (lokal vorausgefüllt, GitHub Pages: Gate)
- [ ] GitHub Pages Deployment (markintosh.github.io/taiwan-dashboard)
- [ ] Git-Repo mit Versioning + CHANGELOG

### Out of Scope

- Backend/Server — reines Static-HTML, kein Node/Python
- npm/Build-Step — ausschließlich CDN-Abhängigkeiten
- Echtzeit-Updates — Daten in data.js, manuell via Commit aktualisiert
- Mobile App — Web-only, responsive
- Buchung direkt in der App — nur externe Links

## Context

**Masterplan:** `/Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/TAIWAN-MASTERPLAN.md` (1104 Zeilen, vollständig ausgelesen)

**Reise-Details:**
- 59 Tage · 10 Phasen · 2 Erw. + Kind 2J · Vegetarisch/vegan
- Tagesmuster: 07:00 auf | 12:00–14:30 Mittagsschlaf | 20:00 Bett
- Jetlag: Phase 1 Taipei — 3-Tage-Anpassung in zwei Schritten
- Budget: €9.160–10.860 gesamt (inkl. Flüge)

**Phasen:**
1. Taipei (2N) · 2. Hualien (7N) · 3. East Rift Valley (5N) · 4. Taitung (3N)
5. Xiaoliuqiu 🐢 (5N) · 6. Kenting 🏖️ (10N) · 7. Tainan 🦩 (13N)
8. Alishan 🌄 (5N) · 9. Sun Moon Lake (4N) · 10. Taipei Rückreise (5N)

**Grill-Me-Ergebnisse (bereits integriert):**
- Timeline: Flat List regional + aufklappbare Tages-Slots (AM/Mittagsschlaf/PM)
- Karte: Tagesausflug (Rauten-Pin + gestrichelt) vs. Mehrtagesausflug (Mini-Polyline)
- Video-Tabs Mobile: Stack (ein Tab pro Zeile)
- Offene Fragen: 🔴 Offen / 🟢 Geklärt in data.js
- Booking: dreistufig (Beispiele → Kriterien → Research-Button)
- Ich committe alle Daten-Updates

## Constraints

- **Tech Stack**: HTML/CSS/JS only, CDN (Leaflet 1.9.4, Chart.js 4.4, MarkerCluster)
- **Deployment**: GitHub Pages (`markintosh.github.io/taiwan-dashboard`)
- **Datenquelle**: `js/data.js` ist einzige Quelle, kein Backend
- **Passwort**: "sri30" — lokal vorausgefüllt, remote: Gate mit localStorage-Session
- **Styling**: Master Dashboard Dark Theme (#0D0F12, #161A20, #3B82F6, #1F2937)
- **Commits**: Toshi (Claude) committe alle Datenänderungen

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML ohne Build-Step | Maximale Portabilität, kein Dev-Overhead | — Pending |
| data.js als einzige Datenquelle | Einfache Updates via Git, kein Backend | — Pending |
| GitHub Pages für Sharing | Stabiler Link, automatisch deployed bei Push | — Pending |
| Dark Theme (Master Dashboard) | Konsistenz mit bestehendem System | — Pending |
| Leaflet + OSM statt Google Maps | Kostenlos, keine API-Key-Pflicht | — Pending |
| Tages-Slots in Timeline | Kind-Rhythmus (Mittagsschlaf) ist Reiseplanung | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?

---
*Last updated: 2026-07-31 after initialization*
