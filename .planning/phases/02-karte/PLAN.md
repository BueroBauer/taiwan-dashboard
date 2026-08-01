---
phase: "02"
plan: "01"
name: "Karte"
type: auto
autonomous: true
requirements: [MAP-01, MAP-02, MAP-03, MAP-04, MAP-05, MAP-06, MAP-07]
---

# Phase 2: Karte — Plan

## Objective

Leaflet-Karte mit OpenStreetMap-Tiles, Phasen-Route, Sight-Pins (Circle + Daytrip-Rauten), MarkerCluster und Phasen-Filter.

## Tasks

### Task 1: css/style.css — Karten-Styles anhängen
- type: auto
- #map height, filter buttons, popup dark theme, diamond marker, cluster icon

### Task 2: js/map.js — Vollimplementierung
- type: auto
- Leaflet map initialisieren
- Route-Polyline
- Phase-Basis-Marker
- Sight-CircleMarker in MarkerClusterGroup
- Daytrip-Rautenmarker + gestrichelte Linien
- Filter-Buttons bauen + toggle
- Popups: Name, Preis, Buggy-Icon, Google Maps Link

### Task 3: index.html — Filter-Container
- type: auto
- #map-filters div vor #map einfügen
- Placeholder-Paragraph entfernen

### Task 4: js/app.js — mapModule.init() aufrufen
- type: auto
- In DOMContentLoaded: window.mapModule.init()

## Success Criteria

- Karte rendert auf Taiwan zentriert
- Alle 40+ Sights als Pins sichtbar
- Daytrips als Rauten mit gestrichelten Linien
- Phasen-Filter togglen Pins
- MarkerCluster bei zoom-out
- Popups mit Name/Preis/Buggy/Google Maps
