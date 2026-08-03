---
phase: 07-datenkorrekturen
plan: 01
subsystem: data
tags: [data, maps, avgTemp, cleanup]
dependency_graph:
  requires: []
  provides: [js/data.js avgTemp, js/data.js googleMapsUrl name-basiert, js/data.js bereinigte Zeiten]
  affects: [js/app.js renderPhaseCard, js/restaurants.js, Leaflet Marker]
tech_stack:
  added: []
  patterns: [name-basierte Maps-URLs, avgTemp Feld in Phase-Objekten]
key_files:
  modified:
    - js/data.js
decisions:
  - avgTemp direkt nach earlyBook-Feld platziert
  - Transport-Slots: Destination als Suchbegriff, nicht Verkehrsmittel
  - Zeitbereinigung via Tip-Anpassung, Slots bleiben im morning-Bereich
metrics:
  duration: 35min
  completed: 2026-08-03
---

# Phase 07 Plan 01: data.js Datenkorrekturen Summary

Drei Datenkorrekturen in js/data.js: avgTemp-Felder, Zeitbereinigung, Maps-URL-Format-Umstellung von Koordinaten auf Name-basiertes Google Maps Search-Format.

## Tasks

### Task 1: avgTemp — DONE
10 avgTemp-Felder eingefügt, direkt nach earlyBook in jedem Phase-Objekt:

| Phase | Name | avgTemp |
|-------|------|---------|
| 1 | Taipei Ankunft | 22 |
| 2 | Hualien | 21 |
| 3 | East Rift Valley | 19 |
| 4 | Taitung | 24 |
| 5 | Xiaoliuqiu | 25 |
| 6 | Kenting | 24 |
| 7 | Tainan | 20 |
| 8 | Alishan | 8 |
| 9 | Sun Moon Lake | 15 |
| 10 | Taipei Rückreise | 18 |

### Task 2: Zeitbereinigung — DONE
3 Stellen bereinigt:
- Phase 3 Day 2 morning-Slot "Luye Highland Heißluftballon": Tip "6:00 Uhr Start" → "07:30 Startzeit anfragen"
- Phase 8 Day 2 morning-Slot "Sonnenaufgang Zhushan": Tip "03:30 Uhr aufstehen" → "Bergbahn ab ca. 08:00"
- sight-073 "Sunrise Viewing Zhushan": Tip "03:30 Uhr aufstehen" → "Bergbahn ab ~08:00"

### Task 3: Maps-URLs — DONE
135 URLs von `https://maps.google.com/?q=LAT,LNG` auf `https://www.google.com/maps/search/?api=1&query=NAME+REGION` umgestellt.

Bereiche:
- phases[].days[].slots (morning + afternoon): ~50 URLs
- sights[]: 35 URLs (sight-001 bis sight-095)
- restaurants[]: 15 URLs (rest-001 bis rest-015)

Sonderfall Transport-Slots: Destination als Suchbegriff verwendet (z.B. "Zug Taipei → Hualien" → query=Hualien+Bahnhof+Hualien).

## Commits

| Hash | Beschreibung |
|------|-------------|
| 0228823 | fix(07-01): data.js — avgTemp, realistische Zeiten, Maps-URLs name-basiert |

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- js/data.js vorhanden: ja
- `avgTemp` count: 10 (korrekt)
- `maps.google.com/?q=` count: 0 (korrekt)
- `maps/search` count: 135 (>50, korrekt)
- `03:30|6:00 Uhr Start` count: 0 (korrekt)
- Commit 0228823 vorhanden: ja
