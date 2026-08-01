---
phase: "02"
plan: "01"
subsystem: "map"
tags: [leaflet, markercluster, filter, polyline, popups]
requires: [data.js, index.html#map, Leaflet 1.9.4 CDN, MarkerCluster 1.5.3 CDN]
provides: [window.mapModule, #map-filters, Leaflet-Karte]
affects: [index.html, css/style.css, js/app.js]
tech-stack:
  added: [Leaflet 1.9.4, MarkerCluster 1.5.3]
  patterns: [IIFE module, LayerGroup per Phase, L.divIcon für Custom Marker]
key-files:
  created: []
  modified:
    - js/map.js
    - css/style.css
    - index.html
    - js/app.js
decisions:
  - "Sights aus window.TAIWAN.sights[] gelesen (nicht aus days[].slots) — strukturierter, eigener Array"
  - "Phase-Basis-Marker als eigene nummerierte DivIcons — nicht im Cluster, immer sichtbar"
  - "Filter togglet MarkerCluster-Layer per Phase — clusterGroup.removeLayer/addLayer pattern"
  - "Kein 'multiday' Typ in echten Daten vorhanden — nur base + daytrip implementiert"
metrics:
  duration: "~20 min"
  completed: "2026-07-31"
  tasks: 4
  files: 4
---

# Phase 2 Plan 1: Karte Summary

Leaflet-Karte mit OSM-Tiles, Routen-Polyline durch 10 Phasen-Bases, 40+ Sight-Pins (CircleMarker + Daytrip-Rauten), MarkerCluster, Phasen-Filter (1–10 + Alle) und Dark-Theme Popups mit Google Maps Link.

## Was implementiert wurde

**js/map.js** (Stub ersetzt, 230 Zeilen):
- `L.map('map')` zentriert [23.5, 121.0] zoom 8 mit OSM Tile Layer
- Graue Polyline durch alle 10 `phase.base` Koordinaten als Route
- Nummerierte Phase-Basis-Marker (DivIcon, Phasen-Farbe, immer sichtbar)
- CircleMarker für alle `type:"base"` Sights in `L.markerClusterGroup`
- DivIcon-Rauten + gestrichelte Polylines für `type:"daytrip"` Sights
- LayerGroups pro Phase für Filter-Toggle
- Filter-Buttons: Alle-Button + 10 Phasen-Buttons mit farbigem Dot
- Dark-Theme Popups: Name + Buggy-Icon 🚼 + Preis + Tipp + Google Maps Button

**css/style.css** (Styles angehängt, ~150 Zeilen):
- `#map { height: 560px }`, inline-Wert in HTML entfernt
- `.map-filter-btn` + `.map-filter-all` + `.filter-dot`
- `.phase-base-marker`, `.map-diamond-icon .diamond`, `.cluster-icon`
- Leaflet Popup Dark Theme Override

**index.html** (minimal):
- `#map-filters` div vor `#map` eingefügt
- Placeholder-Text und inline-Style entfernt

**js/app.js** (minimal):
- `window.mapModule.init()` in `DOMContentLoaded`

## Deviations from Plan

### Auto-angepasst

**1. [Rule 1 - Daten] "multiday" Typ in Daten nicht vorhanden**
- Found during: Task 2
- Issue: data.js definiert nur "base" und "daytrip" Typen in window.TAIWAN.sights[], kein "multiday"
- Fix: Implementation deckt "base" + "daytrip" ab, "multiday" als optionaler Pfad im Code vorhanden aber leer
- Files modified: js/map.js

**2. [Rule 2 - UX] Phase-Basis-Marker außerhalb Cluster**
- Found during: Task 2
- Issue: Phase-Base-Marker im Cluster würden sich mit Sight-Clustern vermischen und die Routen-Verbindung unlesbar machen
- Fix: Phase-Bases als separate L.marker direkt auf map, Sights im Cluster
- Files modified: js/map.js

## Known Stubs

Keine. Alle Daten aus window.TAIWAN.sights[] echt verdrahtet.

## Self-Check

- [x] js/map.js vorhanden und gefüllt
- [x] css/style.css Karten-Styles angehängt
- [x] index.html: #map-filters vor #map
- [x] js/app.js: mapModule.init() aufgerufen
- [x] Commit a334fa2 vorhanden

## Self-Check: PASSED
