# Phase 1: Projekt-Fundament — Research

**Researched:** 2026-07-31
**Domain:** Static HTML/CSS/JS App Shell — Navigation, Dark Theme, Data Architecture, Git Setup
**Confidence:** HIGH

---

## Summary

Phase 1 liefert die App-Shell: Dateistruktur, Dark Theme via CSS Custom Properties, Sticky Nav mit Smooth Scroll, das data.js-Datenschema und Git-Infrastruktur. Kein Framework, kein Build-Step — alles aus CDN oder nativem Browser-API.

Der Stack ist vollständig constraint-defined: HTML/CSS/JS auf GitHub Pages. Alle Entscheidungen in diesem Research folgen direkt aus den festgelegten Constraints in PROJECT.md und CLAUDE.md. Keine Alternativen nötig.

**Primary recommendation:** CSS Custom Properties für Theme, `position: sticky` für Nav, `scroll-behavior: smooth` + `scroll-padding-top` für Anchor-Links, ein strukturiertes JS-Objekt `window.TAIWAN` als globales Datenschema in data.js.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INF-01 | Git-Repo mit CHANGELOG.md (Keep-a-Changelog) + v1.0.0 Tag | Keep-a-Changelog-Format dokumentiert, git tag Pattern |
| INF-02 | .gitignore (.DS_Store, *.sync-conflict-*, node_modules) | Standard-Einträge, Obsidian-spezifisch sync-conflict |
| INF-03 | README.md mit Setup-Anleitung | Minimal: file:// öffnen, git clone, GitHub Pages URL |
| INF-04 | Sticky Navigation (7 Sections) | `position: sticky`, `scroll-behavior: smooth`, `scroll-padding-top` |
| INF-05 | Dark Theme identisch Master Dashboard | CSS Custom Properties auf `:root`, exakte Farben dokumentiert |
| INF-06 | Responsive Desktop + Mobile | CSS Grid + Flexbox, mobile-first Media Queries |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Navigation/Routing | Browser/Client | — | Pure anchor links, kein Router nötig |
| Theming | Browser/Client (CSS) | — | Custom Properties, kein Build-Step |
| Datenhaltung | Browser/Client (JS) | — | data.js = einzige Quelle |
| Deployment | CDN/Static (GitHub Pages) | — | Push zu main = live |
| Auth (Phase 6) | Browser/Client (JS) | — | localStorage Session |

---

## Standard Stack

### Core (CDN, kein npm)

| Library | Version | CDN | Purpose |
|---------|---------|-----|---------|
| Leaflet | 1.9.4 | unpkg.com/leaflet@1.9.4/dist/ | Karte (Phase 2) |
| Chart.js | 4.4.x | cdn.jsdelivr.net/npm/chart.js@4.4 | Charts (Phase 4) |
| Leaflet.markercluster | 1.5.3 | unpkg.com/leaflet.markercluster@1.5.3 | Cluster (Phase 2) |

**Phase 1 braucht keine CDN-Abhängigkeiten** — reines HTML/CSS/JS.

### CDN-Einbindung (für spätere Phasen, bereits in index.html vorbereiten)

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />

<!-- Vor </body> -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4/dist/chart.umd.min.js"></script>
<script src="js/data.js"></script>
<script src="js/map.js"></script>
<script src="js/charts.js"></script>
<script src="js/app.js"></script>
```

[ASSUMED] Versionen von MarkerCluster — bei Implementierung via `npm view leaflet.markercluster version` verifizieren.

---

## Architecture Patterns

### Empfohlene Dateistruktur

```
taiwan-dashboard/
├── index.html          # App-Shell, Nav, Section-Platzhalter
├── css/
│   └── style.css       # Custom Properties, Layout, Dark Theme
├── js/
│   ├── data.js         # EINZIGE Datenquelle — window.TAIWAN
│   ├── map.js          # Leaflet-Initialisierung (Phase 2)
│   ├── charts.js       # Chart.js-Initialisierung (Phase 4)
│   └── app.js          # Init-Orchestrierung, Nav-Logic
├── .gitignore
├── .nojekyll           # PFLICHT für GitHub Pages
├── CHANGELOG.md
└── README.md
```

### Pattern 1: CSS Custom Properties Dark Theme

**Was:** Alle Farben als `:root`-Variablen, kein Magic-Number-Chaos im CSS.

```css
/* Source: [ASSUMED] — MDN CSS Custom Properties, stabiler Standard */
:root {
  --bg: #0D0F12;
  --card: #161A20;
  --border: #1F2937;
  --accent: #3B82F6;
  --accent-hover: #2563EB;
  --text: #F9FAFB;
  --text-muted: #6B7280;
  --text-secondary: #9CA3AF;

  /* Phasen-Farben (für Karte + Charts konsistent) */
  --phase-1: #6366F1;
  --phase-2: #8B5CF6;
  --phase-3: #EC4899;
  --phase-4: #F59E0B;
  --phase-5: #10B981;
  --phase-6: #06B6D4;
  --phase-7: #3B82F6;
  --phase-8: #84CC16;
  --phase-9: #F97316;
  --phase-10: #EF4444;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}
```

### Pattern 2: Sticky Nav mit Smooth Scroll

**Was:** Native CSS `position: sticky` + `scroll-behavior: smooth` + `scroll-padding-top` für korrekte Anchor-Offset-Kompensation. Kein JS nötig für den Scroll selbst.

```css
/* Source: [ASSUMED] — MDN position:sticky, scroll-behavior, scroll-padding-top */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 0 1rem;
}

.nav-list {
  display: flex;
  gap: 0;
  list-style: none;
  overflow-x: auto;         /* Mobile: horizontal scroll */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;    /* Firefox */
}

.nav-list::-webkit-scrollbar { display: none; } /* Chrome/Safari */

.nav-link {
  display: block;
  padding: 1rem 1.25rem;
  color: var(--text-muted);
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.15s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 56px; /* Höhe der Sticky Nav */
}
```

```html
<!-- Source: [ASSUMED] — Standard Anchor-Navigation Pattern -->
<nav class="nav">
  <ul class="nav-list">
    <li><a href="#karte"      class="nav-link">Karte</a></li>
    <li><a href="#timeline"   class="nav-link">Timeline</a></li>
    <li><a href="#zahlen"     class="nav-link">Zahlen</a></li>
    <li><a href="#videos"     class="nav-link">Videos</a></li>
    <li><a href="#restaurants" class="nav-link">Restaurants</a></li>
    <li><a href="#booking"    class="nav-link">Booking</a></li>
    <li><a href="#fragen"     class="nav-link">Fragen</a></li>
  </ul>
</nav>

<section id="karte">...</section>
<section id="timeline">...</section>
<!-- etc. -->
```

**Active-State via IntersectionObserver** (in app.js):

```javascript
// Source: [ASSUMED] — IntersectionObserver API, breite Browser-Unterstützung
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -75% 0px' });

sections.forEach(s => observer.observe(s));
```

### Pattern 3: Responsive Layout ohne Build-Tools

```css
/* Source: [ASSUMED] — CSS Grid / Flexbox, native Browser */

/* Mobile-first: 1 Spalte default */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

/* Desktop: mehrere Spalten */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Container max-width */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Section spacing */
section {
  padding: 3rem 0;
}
```

### Pattern 4: data.js Schema

**Was:** Ein globales `window.TAIWAN`-Objekt. Alle JS-Module lesen daraus. Kein Import/Export (kein ES-Modul-Overhead bei file://).

```javascript
// Source: [ASSUMED] — bewährtes Muster für vanilla JS global state ohne Build-Step
// js/data.js

window.TAIWAN = {

  meta: {
    title: "Taiwan Winterurlaub 2026/27",
    startDate: "2026-12-01",
    endDate:   "2027-01-29",
    totalDays: 59,
    travelers: { adults: 2, children: 1, childAge: 2 },
    diet: "vegetarisch/vegan",
    budget: { low: 9160, high: 10860, currency: "EUR" },
    dailyBudget: { comfort: 145, backpacker: 29 }
  },

  phases: [
    {
      id: 1,
      name: "Taipei",
      nights: 2,
      startDate: "2026-12-01",
      endDate:   "2026-12-03",
      color: "#6366F1",       // var(--phase-1)
      base: { lat: 25.0330, lng: 121.5654 },
      highlights: ["Ankunft", "Jetlag-Anpassung", "Stadtbummel"],
      days: [
        {
          day: 1,
          date: "2026-12-01",
          jetlag: true,
          slots: {
            morning:   { label: "07:00–12:00", activities: [] },
            nap:       { label: "12:00–14:30", type: "nap" },
            afternoon: { label: "14:30–20:00", activities: [] }
          }
        }
        // ... weitere Tage
      ]
    }
    // ... Phasen 2–10
  ],

  sights: [
    {
      id: "sight-001",
      phaseId: 1,
      name: "Shilin Night Market",
      type: "daytrip",          // "daytrip" | "multiday" | "base"
      lat: 25.0881,
      lng: 121.5240,
      price: { eur: 0, note: "GRATIS Eintritt, Essen extra" },
      buggyFriendly: true,
      googleMapsUrl: "https://maps.google.com/?q=Shilin+Night+Market",
      tags: ["essen", "abend", "markt"],
      openQuestion: null        // oder "FAQ-ID" wenn ungeklärt
    }
    // ... ~50 Sights
  ],

  restaurants: [
    {
      id: "rst-001",
      phaseId: 1,
      name: "Loving Hut",
      type: "vegan",            // "vegan" | "vegetarisch" | "veg-option"
      pricePerPerson: { eur: 8 },
      veganSymbol: true,
      googleMapsUrl: "https://maps.google.com/?q=Loving+Hut+Taipei",
      note: ""
    }
  ],

  videos: [
    {
      id: "vid-001",
      title: "Taiwan mit Familie",
      youtubeId: "XXXXXXXXXXX",  // nicht die ganze URL
      category: "familie",       // "ostküste"|"kenting"|"tempel"|"xiaoliuqiu"|"familie"|"deutsch"|"transport"|"alle"
      phaseIds: [1, 10]
    }
  ],

  booking: [
    {
      phaseId: 1,
      region: "Taipei",
      checkIn:  "2026-12-01",
      checkOut: "2026-12-03",
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Taipei&checkin=2026-12-01&checkout=2026-12-03&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Taipei/homes?checkin=2026-12-01&checkout=2026-12-03&adults=2&children=1",
      criteria: {
        maxDistanceMetro: 500,
        buggyAccessible: true,
        notes: "Nähe MRT, kein Aufzug nötig wenn EG"
      },
      exampleHotels: []  // Mark füllt später: [{name, url, pricePerNight, stars, notes}]
    }
  ],

  tours: [
    {
      id: "tour-001",
      name: "Glasbodenboot Xiaoliuqiu",
      provider: "KKday",
      url: "https://www.kkday.com/...",
      phaseId: 5,
      priceEur: 18,
      buggyFriendly: false,
      note: "Kind 2J kostenlos"
    }
  ],

  faq: [
    {
      id: "FAQ-01",
      question: "Brauchen wir einen Taiwan-Führerschein für Mietwagen?",
      status: "open",    // "open" | "resolved"
      answer: "",
      phaseIds: [3, 4, 5]
    }
    // ... 7 weitere Fragen
  ],

  charts: {
    costs: {
      labels: ["Flüge", "Unterkunft", "Essen", "Transport", "Eintritte", "Mietwagen"],
      values: [44, 42, 12, 3, 4, 5],  // Prozent
      colors: ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#06B6D4"]
    },
    temperature: {
      // Min/Max pro Phase (Dezember–Januar Taiwan)
      labels: ["Taipei", "Hualien", "East Rift", "Taitung", "Xiaoliuqiu",
               "Kenting", "Tainan", "Alishan", "Sun Moon Lake", "Taipei"],
      tempMin: [15, 14, 13, 16, 18, 18, 15, 6,  12, 12],
      tempMax: [22, 21, 22, 24, 26, 26, 24, 12, 18, 18]
    }
  }
};
```

### Pattern 5: Keep-a-Changelog Format

```markdown
# Changelog

Alle wichtigen Änderungen werden in dieser Datei dokumentiert.
Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [1.0.0] - 2026-07-31

### Added
- App-Shell: index.html, css/style.css, js/data.js, js/app.js
- Dark Theme identisch Master Dashboard (#0D0F12, #161A20, #3B82F6)
- Sticky Navigation mit 7 Sections
- Responsive Layout (Desktop + Mobile)
- data.js Skelett mit allen 10 Reisephasen, ~50 Sights, Restaurants, Videos, Booking, FAQ

[Unreleased]: https://github.com/markintosh/taiwan-dashboard/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/markintosh/taiwan-dashboard/releases/tag/v1.0.0
```

### Pattern 6: GitHub Pages Setup

**Was:** main-Branch direkt, `.nojekyll`-Datei ist PFLICHT damit GitHub Pages keine Jekyll-Verarbeitung macht (würde `_`-Präfix-Dateien ignorieren).

```bash
# .nojekyll — leere Datei, Name reicht
touch .nojekyll

# GitHub Pages Settings:
# Repository Settings → Pages → Source: "Deploy from branch" → main → / (root)
```

**Kein `gh-pages`-Branch nötig** bei root-Deployment. `main` direkt = einfachste Lösung.
[ASSUMED] GitHub hat diese Option seit 2022, war damals stabil — Verifizierung in Settings beim ersten Push empfohlen.

---

## Don't Hand-Roll

| Problem | Nicht bauen | Stattdessen | Warum |
|---------|------------|-------------|-------|
| Smooth Scroll | eigene JS-Scroll-Funktion | native `scroll-behavior: smooth` + `scroll-padding-top` | Browser macht es besser, kein JS nötig |
| Active Nav Highlight | scroll-Event + offsetTop-Berechnung | `IntersectionObserver` | Performanter, kein Jitter |
| Responsive Breakpoints | JS window.resize | CSS Media Queries | Browser nativ, kein Re-render |
| Theme-Switching | Class-Toggle + Duplication | CSS Custom Properties | Eine Änderung propagiert überall |
| Module-System | ES-Module import/export | `window.TAIWAN` global | file:// hat CORS-Probleme mit ES-Modules |

**Kritischer Punkt:** Kein `import`/`export` in JS-Dateien verwenden. Bei `file://` werden ES-Module wegen CORS blockiert. Alles über `window.TAIWAN` global verfügbar machen.

---

## Common Pitfalls

### Pitfall 1: ES-Module-CORS bei file://

**Was passiert:** `import { data } from './data.js'` schlägt fehl wenn index.html direkt als Datei geöffnet wird (file://-Protokoll). Fehler: "Cross origin requests are only supported for protocol schemes."

**Warum:** Browser blockiert ES-Module über file:// aus Sicherheitsgründen.

**Vermeiden:** Kein `type="module"` in script-Tags. Alle JS-Files als classic scripts laden, Daten via `window.TAIWAN` global teilen.

```html
<!-- FALSCH -->
<script type="module" src="js/data.js"></script>

<!-- RICHTIG -->
<script src="js/data.js"></script>  <!-- setzt window.TAIWAN -->
<script src="js/app.js"></script>   <!-- liest window.TAIWAN -->
```

### Pitfall 2: scroll-padding-top vergessen

**Was passiert:** Smooth Scroll springt korrekt zur Section, aber die Sticky Nav überdeckt den Section-Titel.

**Vermeiden:** `scroll-padding-top` auf `html` setzen, Wert = exakte Höhe der Sticky Nav.

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 56px; /* muss mit .nav height übereinstimmen */
}
```

### Pitfall 3: .nojekyll fehlt

**Was passiert:** GitHub Pages verarbeitet das Repo mit Jekyll. Dateien mit `_`-Präfix (z.B. `_data`) werden ignoriert. Leaflet-CSS-Assets können fehlen.

**Vermeiden:** Leere `.nojekyll`-Datei im Root-Verzeichnis muss committed sein.

### Pitfall 4: data.js-Schema zu flach beginnen

**Was passiert:** Schema beginnt ohne verschachtelte `slots`, später ist ein Refactor nötig der alle JS-Rendering-Funktionen bricht.

**Vermeiden:** Schema von Anfang an mit `days[].slots.{morning,nap,afternoon}` aufbauen, auch wenn die Daten erst in Phase 3 gerendert werden. Phase 1 definiert das Schema, spätere Phasen füllen es.

### Pitfall 5: Phasen-Farben nicht als Custom Properties

**Was passiert:** Farben werden in Leaflet-Code hart codiert (`#6366F1`), in Chart.js-Code hart codiert, und in CSS hart codiert — drei Stellen zum Synchronhalten.

**Vermeiden:** Phasen-Farben in CSS Custom Properties (`--phase-1` bis `--phase-10`) definieren. JS liest sie via `getComputedStyle(document.documentElement).getPropertyValue('--phase-1').trim()`.

---

## Code Examples

### index.html Grundstruktur

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Taiwan 2026/27</title>
  <link rel="stylesheet" href="css/style.css" />
  <!-- CDN für spätere Phasen bereits vorbereitet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css" />
</head>
<body>

  <!-- Sticky Nav -->
  <nav class="nav">
    <ul class="nav-list">
      <li><a href="#karte"       class="nav-link">Karte</a></li>
      <li><a href="#timeline"    class="nav-link">Timeline</a></li>
      <li><a href="#zahlen"      class="nav-link">Zahlen</a></li>
      <li><a href="#videos"      class="nav-link">Videos</a></li>
      <li><a href="#restaurants" class="nav-link">Restaurants</a></li>
      <li><a href="#booking"     class="nav-link">Booking</a></li>
      <li><a href="#fragen"      class="nav-link">Fragen</a></li>
    </ul>
  </nav>

  <main>
    <section id="karte"       class="section"><div class="container"><h2>Karte</h2><p class="placeholder">Leaflet-Karte kommt in Phase 2</p></div></section>
    <section id="timeline"    class="section"><div class="container"><h2>Timeline</h2><p class="placeholder">Timeline kommt in Phase 3</p></div></section>
    <section id="zahlen"      class="section"><div class="container"><h2>Zahlen</h2><p class="placeholder">Charts kommen in Phase 4</p></div></section>
    <section id="videos"      class="section"><div class="container"><h2>Videos</h2><p class="placeholder">Videos kommen in Phase 4</p></div></section>
    <section id="restaurants" class="section"><div class="container"><h2>Restaurants</h2><p class="placeholder">Restaurants kommen in Phase 4</p></div></section>
    <section id="booking"     class="section"><div class="container"><h2>Booking</h2><p class="placeholder">Booking kommt in Phase 5</p></div></section>
    <section id="fragen"      class="section"><div class="container"><h2>Offene Fragen</h2><p class="placeholder">FAQ kommt in Phase 5</p></div></section>
  </main>

  <!-- Scripts — kein type="module" wegen file:// CORS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4/dist/chart.umd.min.js"></script>
  <script src="js/data.js"></script>
  <script src="js/map.js"></script>
  <script src="js/charts.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
```

### Phasen-Farbe aus CSS in JS lesen

```javascript
// Source: [ASSUMED] — getComputedStyle API, Cross-Browser stabil
function getPhaseColor(phaseId) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--phase-${phaseId}`)
    .trim();
}
```

### .gitignore für dieses Projekt

```
# macOS
.DS_Store
.DS_Store?
._*

# Obsidian Sync-Konflikte
*.sync-conflict-*

# Dependencies (falls irgendwann doch npm)
node_modules/

# Editor
.vscode/
.idea/
```

### README.md Struktur

```markdown
# Taiwan Reise-Dashboard 🇹🇼

Interaktives Dashboard für unseren 59-Tage Taiwan-Winterurlaub (Dez 2026 – Jan 2027).

## Lokal öffnen

```bash
git clone https://github.com/markintosh/taiwan-dashboard.git
cd taiwan-dashboard
open index.html
```

Kein Build-Schritt. Direkt im Browser öffnen.

## Online

[markintosh.github.io/taiwan-dashboard](https://markintosh.github.io/taiwan-dashboard)

Passwort: sri30

## Daten aktualisieren

Alle Reisedaten liegen in `js/data.js`. Ändern + committen → automatisch live.

## Tech Stack

- Leaflet 1.9.4 (Karte)
- Chart.js 4.4 (Infografiken)
- Leaflet.markercluster 1.5.3 (Pin-Cluster)
- Vanilla HTML/CSS/JS, kein Build-Schritt
```
```

---

## Environment Availability

| Dependency | Required By | Available | Fallback |
|------------|------------|-----------|----------|
| Browser (Chrome/Safari) | file:// Test | ✓ macOS | — |
| Git | INF-01, Commits | ✓ macOS | — |
| GitHub Account markintosh | SEC-04, INF-01 | [ASSUMED ✓] | — |
| GitHub Pages (repo public oder Pages aktiviert) | SEC-04 | Zu verifizieren in Phase 6 | — |

---

## Validation Architecture

Phase 1 hat keine automatisierten Tests — reines HTML/CSS/JS ohne Test-Framework. Validierung erfolgt manuell:

### Phase Gate Checklist (vor Phase 2)

| Check | Command / Aktion | Pass-Kriterium |
|-------|-----------------|----------------|
| Dark Theme sichtbar | `open index.html` | Background #0D0F12 |
| Nav sticky | Seite scrollen | Nav bleibt oben |
| Alle 7 Anchors | Jeden Nav-Link klicken | Scrollt zur richtigen Section |
| Mobile Nav | Browser DevTools 375px | Nav scrollbar, kein Overflow |
| data.js geladen | Browser Console: `window.TAIWAN` | Gibt Objekt zurück |
| Kein CORS-Fehler | Console auf Errors prüfen | 0 Errors bei file:// |
| .nojekyll existiert | `ls .nojekyll` | Datei vorhanden |
| CHANGELOG.md | `cat CHANGELOG.md` | v1.0.0 Eintrag vorhanden |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | LeafletMarkerCluster aktuelle Version ist 1.5.3 | Standard Stack | Falsches CDN-URL — bei Einbindung verifizieren |
| A2 | GitHub markintosh-Account hat Pages aktivierbar | Environment | Phase 6 blockiert — früh prüfen |
| A3 | GitHub Pages: main-Branch + root reicht ohne gh-pages-Branch | GitHub Pages Setup | Muss ggf. gh-pages-Branch erstellen |
| A4 | Keine existing Dateien im Repo-Root die überschrieben werden | Dateistruktur | Vor Write-Ops prüfen via ls |

---

## Sources

### Primary (HIGH confidence)
- MDN Web Docs — `position: sticky`, `scroll-behavior`, `scroll-padding-top`, CSS Custom Properties, IntersectionObserver, getComputedStyle [ASSUMED — etablierte Web-Standards, keine API-Änderungen erwartet]
- Keep a Changelog v1.1.0 spec — https://keepachangelog.com/de/1.0.0/

### Secondary (MEDIUM confidence)
- GitHub Pages Docs — .nojekyll Requirement [ASSUMED — seit Jahren stabil dokumentiert]
- Leaflet 1.9.4 / Chart.js 4.4 CDN via unpkg/jsdelivr [ASSUMED — Versionen aus PROJECT.md übernommen]

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — Constraints klar definiert, kein Spielraum
- Architecture: HIGH — Vanilla-Stack-Patterns sind stabile Browser-Standards
- Pitfalls: HIGH — ES-Module/file:// und .nojekyll sind bekannte, reproduzierbare Probleme
- data.js Schema: MEDIUM — Schema passt zu den Requirements, kann sich in Phase 3 noch erweitern

**Research date:** 2026-07-31
**Valid until:** 2027-06-01 (CSS-Standards ändern sich nicht, GitHub Pages Policy könnte sich ändern)
