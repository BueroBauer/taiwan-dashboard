# Phase 1: Projekt-Fundament — Plan Set

**Phase:** 01-projekt-fundament
**Requirements:** INF-01, INF-02, INF-03, INF-04, INF-05, INF-06
**Plans:** 3 Pläne in 2 Waves

---

## Wave-Struktur

| Wave | Plan | Objective | Autonomous |
|------|------|-----------|------------|
| 1 | 01-01 | Git-Infrastruktur + CSS Dark Theme | ja |
| 1 | 01-02 | js/data.js — vollständiges window.TAIWAN Skelett | ja |
| 2 | 01-03 | index.html Shell + app.js + JS-Stubs + git tag | ja |

---

---
phase: 01-projekt-fundament
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .gitignore
  - CHANGELOG.md
  - README.md
  - .nojekyll
  - css/style.css
autonomous: true
requirements: [INF-01, INF-02, INF-03, INF-05, INF-06]

must_haves:
  truths:
    - "Browser öffnet index.html mit Background #0D0F12 — kein weißer Flash"
    - "Sticky Nav bleibt beim Scrollen oben, überlagert Content nicht (scroll-padding-top: 56px)"
    - "Responsive: Mobile 375px — Nav scrollbar horizontal, kein overflow-x auf body"
    - "CSS Custom Properties --phase-1 bis --phase-10 definiert (abrufbar via getComputedStyle)"
    - "CHANGELOG.md enthält v0.1.0-Eintrag, .nojekyll existiert, .gitignore enthält *.sync-conflict-*"
  artifacts:
    - path: "css/style.css"
      provides: "Dark Theme, Nav-Styles, Responsive Grid, Section-Styles, Card-Styles"
      min_lines: 150
    - path: ".gitignore"
      provides: "macOS + Obsidian + Editor Ignores"
      contains: "sync-conflict"
    - path: "CHANGELOG.md"
      provides: "Keep-a-Changelog v0.1.0 Eintrag"
      contains: "[0.1.0]"
    - path: "README.md"
      provides: "Setup-Anleitung: lokal öffnen + GitHub Pages URL"
      contains: "open index.html"
    - path: ".nojekyll"
      provides: "Leere Datei — verhindert Jekyll-Verarbeitung auf GitHub Pages"
  key_links:
    - from: "css/style.css :root"
      to: "js/app.js getPhaseColor()"
      via: "CSS Custom Properties --phase-1..10"
      pattern: "--phase-[0-9]+"
    - from: "html scroll-padding-top"
      to: ".nav height"
      via: "56px müssen übereinstimmen"
      pattern: "scroll-padding-top"
---

<objective>
Git-Infrastruktur anlegen und das vollständige CSS Dark Theme erstellen. Danach steht das visuelle Fundament: alle Farben, Typografie, Layout-Helpers, Nav-Styles und Responsive-Breakpoints sind definiert. Spätere Phasen fügen nur noch Inhalte in bestehende Klassen ein.

Purpose: Git-Infrastruktur ist Voraussetzung für alle Commits. CSS muss vor index.html existieren damit kein weißer Flash beim ersten Laden entsteht.
Output: .gitignore, CHANGELOG.md, README.md, .nojekyll, css/style.css
</objective>

<execution_context>
Arbeitsverzeichnis: /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/
Kein Build-Step. Keine npm. Alles direkt schreiben.
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-projekt-fundament/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Git-Infrastruktur — .gitignore, CHANGELOG.md, README.md, .nojekyll</name>
  <files>.gitignore, CHANGELOG.md, README.md, .nojekyll</files>
  <action>
Vier Dateien im Projekt-Root erstellen:

**.gitignore** — exakt diese Einträge:
```
# macOS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes

# Obsidian Sync-Konflikte (WICHTIG — Obsidian Vault)
*.sync-conflict-*

# Dependencies (falls irgendwann doch npm)
node_modules/
package-lock.json

# Editor
.vscode/
.idea/
*.swp
*.swo
```

**CHANGELOG.md** — Keep-a-Changelog Format, Version v0.1.0 (nicht v1.0.0 — das ist für die fertige App nach allen 6 Phasen):
```markdown
# Changelog

Alle wichtigen Änderungen werden in dieser Datei dokumentiert.
Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).
Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

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
```

**README.md**:
```markdown
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
```

**.nojekyll** — leere Datei (kein Inhalt). Verhindert Jekyll-Verarbeitung auf GitHub Pages. Pflicht damit CDN-Assets korrekt geladen werden.
  </action>
  <verify>
    <automated>ls -la /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/.gitignore /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/CHANGELOG.md /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/README.md /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/.nojekyll && grep -c "sync-conflict" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/.gitignore && grep -c "0.1.0" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/CHANGELOG.md</automated>
  </verify>
  <done>Alle 4 Dateien existieren. .gitignore enthält sync-conflict-*. CHANGELOG.md enthält [0.1.0]. README.md enthält "open index.html". .nojekyll ist leer (0 Bytes).</done>
</task>

<task type="auto">
  <name>Task 2: css/style.css — vollständiges Dark Theme</name>
  <files>css/style.css</files>
  <action>
Verzeichnis `css/` anlegen, dann `css/style.css` erstellen. Vollständiges CSS in dieser Reihenfolge:

**1. CSS Reset + Custom Properties auf :root**

Alle Farben als Custom Properties. Phasen-Farben 1–10 müssen auf :root stehen damit JS sie via getComputedStyle lesen kann (für Leaflet-Marker und Chart.js — die lesen die gleiche Quelle).

```css
:root {
  /* Dark Theme — identisch Master Dashboard */
  --bg:           #0D0F12;
  --card:         #161A20;
  --border:       #1F2937;
  --accent:       #3B82F6;
  --accent-hover: #2563EB;
  --accent-green: #4a9e4a;
  --yellow:       #e8c547;
  --text:         #E5E7EB;
  --muted:        #9CA3AF;
  --font:         -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
  --radius:       14px;

  /* Sticky Nav Höhe — scroll-padding-top muss gleicher Wert sein */
  --nav-height:   56px;

  /* Phasen-Farben — JS liest via getComputedStyle(root).getPropertyValue('--phase-N') */
  --phase-1:  #6366F1;  /* Taipei */
  --phase-2:  #8B5CF6;  /* Hualien */
  --phase-3:  #EC4899;  /* East Rift Valley */
  --phase-4:  #F59E0B;  /* Taitung */
  --phase-5:  #10B981;  /* Xiaoliuqiu */
  --phase-6:  #06B6D4;  /* Kenting */
  --phase-7:  #3B82F6;  /* Tainan */
  --phase-8:  #84CC16;  /* Alishan */
  --phase-9:  #F97316;  /* Sun Moon Lake */
  --phase-10: #EF4444;  /* Taipei Rückreise */
}
```

**2. Reset**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

**3. html + body — scroll-behavior + scroll-padding-top ist PFLICHT**

scroll-padding-top verhindert dass Sticky Nav den Section-Titel überlagert beim Anchor-Scroll.

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height); /* 56px — muss mit .nav height übereinstimmen */
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}
```

**4. Sticky Nav**

Nav-Höhe: 56px. Mobile: overflow-x auto + scrollbar-width none.

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  width: 100%;
  padding: 0 0.5rem;
}

.nav-list::-webkit-scrollbar {
  display: none;
}

.nav-link {
  display: block;
  padding: 1rem 1.1rem;
  color: var(--muted);
  text-decoration: none;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: color 0.15s;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--text);
}

.nav-link.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
```

**5. Layout-Helpers**

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

section.section {
  padding: 3rem 0;
  border-bottom: 1px solid var(--border);
}

section.section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--muted);
  margin-bottom: 2rem;
}
```

**6. Card-System**

```css
.card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-meta {
  font-size: 0.8125rem;
  color: var(--muted);
}
```

**7. Grid-System (mobile-first)**

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

**8. Hero / Stats-Bar**

```css
.hero {
  padding: 2.5rem 0 2rem;
  border-bottom: 1px solid var(--border);
}

.hero-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  color: var(--muted);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.stats-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**9. Placeholder-Styles (werden in späteren Phasen ersetzt)**

```css
.placeholder {
  color: var(--muted);
  font-style: italic;
  padding: 3rem 0;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}
```

**10. Passwort-Gate (für Phase 6 vorbereitet, Styles jetzt definieren)**

```css
.gate-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.gate-box {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2.5rem;
  width: min(400px, 90vw);
  text-align: center;
}

.gate-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.gate-subtitle {
  color: var(--muted);
  font-size: 0.875rem;
  margin-bottom: 2rem;
}

.gate-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 1rem;
  font-family: var(--font);
  text-align: center;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.15s;
}

.gate-input:focus {
  border-color: var(--accent);
}

.gate-input.error {
  border-color: #EF4444;
}

.gate-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: var(--font);
  cursor: pointer;
  transition: background-color 0.15s;
}

.gate-btn:hover {
  background-color: var(--accent-hover);
}

.gate-error {
  color: #EF4444;
  font-size: 0.8125rem;
  margin-top: 0.75rem;
  display: none;
}

.gate-error.visible {
  display: block;
}
```

**11. Utility-Klassen**

```css
.hidden { display: none !important; }
.emoji { font-style: normal; }
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--border);
  color: var(--text);
}
.badge-accent { background-color: var(--accent); color: #fff; }
.badge-green  { background-color: var(--accent-green); color: #fff; }
.badge-yellow { background-color: var(--yellow); color: #0D0F12; }
.badge-red    { background-color: #EF4444; color: #fff; }
.text-muted   { color: var(--muted); }
.text-accent  { color: var(--accent); }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
```

Keine fenced code blocks (```) im finalen File — das hier ist die Beschreibung. Die Datei enthält reines CSS.
  </action>
  <verify>
    <automated>wc -l /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/css/style.css && grep -c -- "--phase-" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/css/style.css && grep -c "scroll-padding-top" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/css/style.css</automated>
  </verify>
  <done>css/style.css existiert mit mind. 150 Zeilen. Enthält mind. 10 --phase- Definitionen. Enthält scroll-padding-top. Enthält .gate-overlay, .nav, .card, .grid, .hero, .placeholder als Klassen.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Kein Netzwerk | Phase 1 ist rein lokal — kein Server, keine API-Calls |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-01-01 | Information Disclosure | CHANGELOG.md + README.md | accept | Beide Dateien sind public auf GitHub — enthalten keine Secrets, nur Reisepläne die mit Familie geteilt werden sollen |
| T-01-02 | Tampering | data.js als einzige Datenquelle | accept | Static File, kein Backend — Tampering nur durch direkten Commit-Zugang möglich (Auth via GitHub) |
</threat_model>

<verification>
Nach Plan 01:
- `ls css/style.css .gitignore CHANGELOG.md README.md .nojekyll` — alle 5 Files vorhanden
- `grep -c "sync-conflict" .gitignore` — Output: 1
- `grep "0.1.0" CHANGELOG.md` — Eintrag vorhanden
- `grep -c "\-\-phase-" css/style.css` — mindestens 10
- `grep "scroll-padding-top" css/style.css` — vorhanden
- `wc -c .nojekyll` — 0 Bytes (leere Datei)
</verification>

<success_criteria>
- .gitignore, CHANGELOG.md, README.md, .nojekyll existieren im Projekt-Root
- css/style.css: --bg bis --phase-10 als Custom Properties, sticky nav styles, responsive grid, card, hero, gate-overlay, utility-classes
- Kein Magic-Number-Chaos: alle Farben kommen aus :root Custom Properties
</success_criteria>

<output>
Nach Abschluss: `.planning/phases/01-projekt-fundament/01-01-SUMMARY.md` erstellen mit: erstellte Dateien, CSS-Klassen-Liste, Custom Property Namen, Zeilenzahl.
</output>

---

---
phase: 01-projekt-fundament
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - js/data.js
autonomous: true
requirements: [INF-01]

must_haves:
  truths:
    - "window.TAIWAN ist nach data.js-Load im Browser-Kontext verfügbar (kein Fehler in Console)"
    - "window.TAIWAN.phases hat 10 Einträge, jede Phase hat id, name, nights, startDate, endDate, color, base.lat, base.lng, days[]"
    - "Jeder Tag hat slots.morning (Array), slots.nap (String), slots.afternoon (Array)"
    - "window.TAIWAN.sights enthält mind. 40 Einträge mit coords, buggyFriendly, googleMapsUrl, type (daytrip|multiday|base)"
    - "window.TAIWAN.videos enthält 20 Einträge mit youtubeId + category"
    - "window.TAIWAN.faq enthält 8 Einträge mit status (open|resolved)"
    - "window.TAIWAN.charts.costs.values summiert auf 100 (Prozent)"
    - "Kein import/export — classic script, kein type=module"
  artifacts:
    - path: "js/data.js"
      provides: "window.TAIWAN global state — einzige Datenquelle"
      min_lines: 500
      contains: "window.TAIWAN"
  key_links:
    - from: "js/data.js"
      to: "js/map.js"
      via: "window.TAIWAN.phases[].color + window.TAIWAN.sights[].lat/lng"
      pattern: "window\\.TAIWAN\\.phases"
    - from: "js/data.js"
      to: "js/charts.js"
      via: "window.TAIWAN.charts.costs + window.TAIWAN.charts.temperature"
      pattern: "window\\.TAIWAN\\.charts"
---

<objective>
js/data.js erstellen — das vollständige window.TAIWAN Datenskelett mit allen 10 Reisephasen, ~50 Sights, 20 Videos, Restaurants, Booking-Links, FAQ und Chart-Daten. Das Schema wird von Anfang an tief genug definiert damit Phase 2 (Karte), Phase 3 (Timeline) und Phase 4 (Charts) direkt darauf aufbauen können ohne Schema-Refactor.

Purpose: data.js ist die einzige Datenquelle — alle JS-Module lesen window.TAIWAN. Kein Backend, kein Import/Export (CORS bei file://).
Output: js/data.js mit vollständigem window.TAIWAN Objekt
</objective>

<execution_context>
Kritisch: KEIN type="module", KEIN import/export. Alles via window.TAIWAN global.
Alle Koordinaten sind reale Taiwan-GPS-Koordinaten.
Alle youtubeIds sind Platzhalter-Strings (Mark füllt echte IDs ein) — aber Schema-konform.
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/phases/01-projekt-fundament/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: js/data.js — window.TAIWAN vollständiges Skelett</name>
  <files>js/data.js</files>
  <action>
Verzeichnis `js/` anlegen, dann `js/data.js` mit dem vollständigen window.TAIWAN Objekt erstellen.

**Struktur-Übersicht (alle Keys müssen vorhanden sein):**

```
window.TAIWAN = {
  meta: { title, startDate, endDate, totalDays, travelers, diet, budget, dailyBudget },
  phases: [ 10 Phasen-Objekte ],
  sights: [ ~50 Sight-Objekte ],
  restaurants: [ ~15 Restaurant-Objekte ],
  videos: [ 20 Video-Objekte ],
  booking: [ 10 Booking-Objekte ],
  tours: [ ~5 Tour-Objekte ],
  faq: [ 8 FAQ-Objekte ],
  charts: { costs, nights, temperature, entries }
}
```

**meta-Objekt:**
```javascript
meta: {
  title:      "Taiwan Winterurlaub 2026/27",
  startDate:  "2026-12-01",
  endDate:    "2027-01-29",
  totalDays:  59,
  totalNights: 59,
  travelers:  { adults: 2, children: 1, childAge: 2 },
  diet:       "vegetarisch/vegan",
  budget:     { low: 9160, high: 10860, currency: "EUR" },
  dailyBudget: { comfort: 145, backpacker: 29 }
},
```

**phases-Array — alle 10 Phasen, jede Phase exakt so strukturiert:**

Jede Phase braucht: id (1–10), name, region (für Booking-Filter), emoji, nights, startDate, endDate, color (identisch mit CSS --phase-N), base { lat, lng }, highlights (Array, 3–5 Strings), earlyBook (bool — Silvester-Warning für Xiaoliuqiu/Alishan/Kenting), days-Array.

Jeder Tag im days-Array: { day (Nummer), date (ISO), jetlag (bool, nur Phase 1), slots: { morning: [] (Array von Activity-Objekten), nap: "12:00–14:30", afternoon: [] } }

Activity-Objekt: { name, coords: { lat, lng }, price: { eur, note }, buggyFriendly: bool, googleMapsUrl, tip, category }

Phase-Daten (exakte Nächte und Daten aus PROJECT.md):
- Phase 1: Taipei, 2N, 2026-12-01 – 2026-12-03, #6366F1, base: 25.0330/121.5654
- Phase 2: Hualien, 7N, 2026-12-03 – 2026-12-10, #8B5CF6, base: 23.9769/121.6044
- Phase 3: East Rift Valley, 5N, 2026-12-10 – 2026-12-15, #EC4899, base: 23.4700/121.3900
- Phase 4: Taitung, 3N, 2026-12-15 – 2026-12-18, #F59E0B, base: 22.7583/121.1444
- Phase 5: Xiaoliuqiu, 5N, 2026-12-18 – 2026-12-23, #10B981, base: 22.3400/120.3700, earlyBook: true
- Phase 6: Kenting, 10N, 2026-12-23 – 2027-01-02, #06B6D4, base: 21.9400/120.8500, earlyBook: true (Silvester!)
- Phase 7: Tainan, 13N, 2027-01-02 – 2027-01-15, #3B82F6, base: 22.9998/120.2270
- Phase 8: Alishan, 5N, 2027-01-15 – 2027-01-20, #84CC16, base: 23.5118/120.8039, earlyBook: true
- Phase 9: Sun Moon Lake, 4N, 2027-01-20 – 2027-01-24, #F97316, base: 23.8650/120.9092
- Phase 10: Taipei Rückreise, 5N, 2027-01-24 – 2027-01-29, #EF4444, base: 25.0330/121.5654

Für Phase 1 (2 Tage) und Phase 2 (7 Tage) alle Tage mit konkreten Slot-Aktivitäten befüllen (echte Sehenswürdigkeiten Taiwans). Für Phasen 3–10: mindestens Tag 1 jeder Phase voll befüllt, restliche Tage als leere Slots-Struktur (damit das Schema valide ist).

**sights-Array — mind. 40 Einträge:**

Jedes Sight: { id (sight-NNN), phaseId, name, type ("daytrip"|"multiday"|"base"), lat, lng, price: { eur, note }, buggyFriendly: bool, googleMapsUrl, tags: [], openQuestion: null, tip }

Mindestens 4 Sights pro Phase. Reale Koordinaten von bekannten Taiwan-Sehenswürdigkeiten verwenden:
- Taipei: Shilin Night Market (25.0881/121.5240), Elephant Mountain (25.0264/121.5773), National Palace Museum (25.1025/121.5484), Longshan Temple (25.0370/121.4997), Jiufen Old Street (25.1089/121.8444, daytrip)
- Hualien: Taroko National Park (24.1574/121.6216), Shakadang Trail (24.1452/121.6199), Qixingtan Beach (24.0372/121.6478), Liyu Lake (23.8979/121.5500)
- East Rift Valley: Luye Highland Balloon (23.0681/121.1437), Chishang Bike Path (23.2165/121.1818), Ruisui Hot Springs (23.4965/121.3870)
- Taitung: Xiaoyeliu Geopark (22.8267/121.1417), Jhihben Hot Springs (22.7158/120.9978), Green Island Daytrip (23.2715/121.4869, daytrip)
- Xiaoliuqiu: Vase Rock (22.3457/120.3713), Sunset Beach (22.3384/120.3684), Glass Bottom Boat Tour (22.3400/120.3700)
- Kenting: Kenting National Park Visitor Center (21.9540/120.8015), White Sand Beach (21.9467/120.7856), Little Bay (21.9445/120.8089), Maobitou Park (21.9000/120.7300)
- Tainan: Chihkan Tower (22.9969/120.2033), Confucius Temple (23.0016/120.2036), Anping Old Fort (23.0026/120.1576), Tainan Night Market (22.9874/120.1953), Chimei Museum (22.9637/120.1943)
- Alishan: Alishan Forest Railway (23.5118/120.8039), Sacred Tree (23.5107/120.8042), Sunrise Viewing (23.5050/120.8000), Fenqihu Old Street (23.5647/120.7034, daytrip)
- Sun Moon Lake: Sun Moon Lake Cableway (23.8460/120.9198), Wenwu Temple (23.8840/120.9169), Formosan Aboriginal Culture Village (23.8467/120.9244, daytrip)
- Taipei 2: Taipei 101 (25.0338/121.5645), Beitou Hot Springs (25.1369/121.5071), Maokong Gondola (24.9739/121.5834), Danshui Old Street (25.1700/121.4400, daytrip)

**restaurants-Array — mind. 12 Einträge:**

{ id, phaseId, name, type ("vegan"|"vegetarisch"|"veg-option"), pricePerPerson: { eur }, veganSymbol: bool, googleMapsUrl, note }

Mindestens 1 vegan/vegetarisch Restaurant pro Phase. Reale Restaurantnamen Taiwan (vegane Szene ist stark):
- Loving Hut Taipei (Phase 1+10), HERBIVORE Taipei (Phase 1+10), Vege Creek Hualien (Phase 2), Grandma Nitti's Kitchen Tainan (Phase 7), Shang Yan Buddhist Vegetarian Tainan (Phase 7), Vegan Heaven Kenting (Phase 6)

**videos-Array — exakt 20 Einträge:**

{ id, title, youtubeId (Platzhalter "PLACEHOLDER_VID_NNN"), category, phaseIds }

Kategorien (aus Requirements VID-01): "ostküste", "kenting", "tempel", "xiaoliuqiu", "familie", "deutsch", "transport", "alishan"

Mind. 2 Videos pro Kategorie, sinnvolle Titel ("Taiwan Ostküste mit Kind", "Kenting Beaches Guide", "Tempel-Tour Tainan", "Xiaoliuqiu Schildkröten", "Taiwan mit Baby/Kleinkind", "Taiwan auf Deutsch Reiseführer", "THSR + Bus Taiwan Transport", "Alishan Sonnenaufgang")

**booking-Array — 10 Einträge (eine pro Phase):**

{ phaseId, region, checkIn, checkOut, nights, earlyBook: bool, bookingUrl, airbnbUrl, criteria: { maxDistanceMetro, buggyAccessible, notes }, exampleHotels: [] (leer — Mark füllt), kkdayToursPhase: [] }

Booking.com URLs mit korrekten Parametern: `https://www.booking.com/searchresults.de.html?ss=REGION&checkin=DATUM&checkout=DATUM&group_adults=2&group_children=1&age=2`

Airbnb URLs: `https://www.airbnb.com/s/REGION/homes?checkin=DATUM&checkout=DATUM&adults=2&children=1`

Für Xiaoliuqiu: region = "Liuqiu Island", für Kenting: checkin 2026-12-23 (Silvester!), earlyBook: true

**tours-Array — mind. 5 Einträge:**

KKday-Touren: Glasbodenboot Xiaoliuqiu (phaseId 5), Alishan Sonnenaufgang-Tour (phaseId 8), Taroko Gorge Tour (phaseId 2), Tainan Temple Tour (phaseId 7), Green Island Snorkeling (phaseId 4)

{ id, name, provider, url, phaseId, priceEur, buggyFriendly, note }

**faq-Array — exakt 8 Einträge:**

Aus PROJECT.md / MASTERPLAN-Hinweisen bekannte offene Fragen:
1. Brauchen wir einen Taiwan-Führerschein für Mietwagen? (phaseIds: [3,4,5,6,7,8,9])
2. Kinderwagenverleih auf Xiaoliuqiu verfügbar? (phaseIds: [5])
3. Glasbodenboot Xiaoliuqiu — Altersbeschränkung 2J? (phaseIds: [5])
4. Alishan Bergbahn — Buggy erlaubt? (phaseIds: [8])
5. Silvester Kenting — Hotels 6+ Monate voraus buchen? (phaseIds: [6])
6. Jetlag-Plan für Kind 2J — Schlafen im Flugzeug? (phaseIds: [1])
7. Heißquellen-Regeln: ab welchem Alter für Kinder? (phaseIds: [2,8])
8. THSR Kindersitz/Buggy-Richtlinien? (phaseIds: [1,2,7,10])

Alle status: "open" (Mark ändert wenn geklärt).

**charts-Objekt:**

```javascript
charts: {
  costs: {
    labels: ["Flüge", "Unterkunft", "Essen", "Transport", "Eintritte", "Mietwagen"],
    values: [44, 42, 12, 3, 4, 5],   // Prozent, Summe = 110 NEIN — korrekt: [35, 35, 12, 5, 4, 9]
    colors: ["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#06B6D4"]
  },
  nights: {
    labels: ["Taipei","Hualien","East Rift","Taitung","Xiaoliuqiu","Kenting","Tainan","Alishan","Sun Moon Lake","Taipei 2"],
    values: [2, 7, 5, 3, 5, 10, 13, 5, 4, 5],
    colors: ["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#06B6D4","#3B82F6","#84CC16","#F97316","#EF4444"]
  },
  temperature: {
    labels: ["Taipei","Hualien","East Rift","Taitung","Xiaoliuqiu","Kenting","Tainan","Alishan","Sun Moon Lake","Taipei 2"],
    tempMin: [15, 14, 13, 16, 18, 18, 15, 6,  12, 12],
    tempMax: [22, 21, 22, 24, 26, 26, 24, 12, 18, 18]
  },
  entries: {
    // Scatter-Daten: { label, eur, gratis: bool, phaseId }
    data: [
      { label: "Taroko National Park", eur: 0,  gratis: true,  phaseId: 2 },
      { label: "National Palace Museum", eur: 6, gratis: false, phaseId: 1 },
      { label: "Alishan Forest Railway", eur: 8, gratis: false, phaseId: 8 },
      { label: "Xiaoliuqiu Glasbodenboot", eur: 18, gratis: false, phaseId: 5 },
      { label: "Kenting Nationalpark", eur: 0, gratis: true, phaseId: 6 },
      { label: "Luye Highland", eur: 0, gratis: true, phaseId: 3 },
      { label: "Longshan Temple", eur: 0, gratis: true, phaseId: 1 },
      { label: "Chihkan Tower", eur: 3, gratis: false, phaseId: 7 },
      { label: "Chimei Museum", eur: 5, gratis: false, phaseId: 7 },
      { label: "Sun Moon Lake Cable", eur: 6, gratis: false, phaseId: 9 },
      { label: "Elephant Mountain", eur: 0, gratis: true, phaseId: 1 },
      { label: "Qixingtan Beach", eur: 0, gratis: true, phaseId: 2 }
    ]
  }
}
```

WICHTIG für costs.values: Die Zahlen müssen sich auf 100 summieren. Korrekte Verteilung berechnen: Flüge €3036 (~28%), Unterkunft €3600 (~33%), Essen €1500 (~14%), Transport €800 (~7%), Eintritte €500 (~5%), Mietwagen €800 (~7%), Reserve/Sonstiges €600 (~6%) → [28, 33, 14, 7, 5, 7, 6] mit angepassten Labels.

**Kommentare:** data.js muss kommentiert sein. Jede Top-Level-Key bekommt einen Kommentar. Phasen-Farben mit CSS-Variable-Referenz kommentieren: `// --phase-1 in CSS`.

**Dateianfang (Pflicht):**
```javascript
// js/data.js
// Taiwan Reise-Dashboard — Einzige Datenquelle
// Alle JS-Module lesen window.TAIWAN. Kein import/export (CORS bei file://)
// Updates: Direkt editieren + committen → automatisch live auf GitHub Pages

window.TAIWAN = {
  // ...
};
```
  </action>
  <verify>
    <automated>node -e "const fs=require('fs'); eval(fs.readFileSync('/Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/js/data.js','utf8')); console.log('phases:', global.TAIWAN.phases.length, 'sights:', global.TAIWAN.sights.length, 'videos:', global.TAIWAN.videos.length, 'faq:', global.TAIWAN.faq.length, 'costs-sum:', global.TAIWAN.charts.costs.values.reduce((a,b)=>a+b,0))"</automated>
  </verify>
  <done>node-Eval liefert: phases: 10, sights: mind. 40, videos: 20, faq: 8, costs-sum: 100. Kein Syntax-Fehler. Alle Phasen haben days[]-Arrays. Alle Tage haben slots.morning, slots.nap, slots.afternoon.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Kein Netzwerk | data.js lädt lokal via script-Tag — kein AJAX, kein Fetch |
| window.TAIWAN global | Alle anderen JS-Module lesen daraus — Reihenfolge in index.html muss data.js zuerst laden |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-02-01 | Tampering | window.TAIWAN global | accept | Browser-Kontext — nur Nutzer mit Zugriff auf das Gerät kann es modifizieren; kein Backend-Schutz nötig |
| T-02-02 | Information Disclosure | googleMapsUrl + booking URLs | accept | Links sind öffentliche Google Maps / Booking.com URLs, kein API-Key embedded |
</threat_model>

<verification>
Nach Plan 02:
- `node -e "..." js/data.js` gibt phases: 10, sights: ≥40, videos: 20, faq: 8 aus
- costs.values summiert auf 100
- Jede Phase hat days[] mit slots-Struktur
- Keine ES-Modul-Syntax (kein import/export)
</verification>

<success_criteria>
window.TAIWAN vollständig geladen, alle Keys vorhanden, Schema tief genug für Phase 2–5 ohne Refactor, Node-Eval ohne Fehler.
</success_criteria>

<output>
Nach Abschluss: `.planning/phases/01-projekt-fundament/01-02-SUMMARY.md` erstellen mit: Phasen-Übersicht, Sight-Count pro Phase, Video-Kategorien-Verteilung, FAQ-Fragen.
</output>

---

---
phase: 01-projekt-fundament
plan: 03
type: execute
wave: 2
depends_on: [01-01, 01-02]
files_modified:
  - index.html
  - js/app.js
  - js/map.js
  - js/charts.js
autonomous: true
requirements: [INF-01, INF-04, INF-05, INF-06]

must_haves:
  truths:
    - "index.html öffnet in Chrome/Safari lokal (file://) ohne Console-Errors"
    - "Background ist #0D0F12 — kein weißer Flash, kein default-white"
    - "Sticky Nav zeigt alle 7 Links: Karte | Timeline | Zahlen | Videos | Restaurants | Booking | Fragen"
    - "Klick auf Nav-Link scrollt smooth zur richtigen Section, Nav überlagert Section-Titel nicht"
    - "Console: window.TAIWAN gibt Objekt zurück — kein ReferenceError"
    - "DevTools 375px: Nav scrollbar horizontal, kein overflow-x auf body"
    - "Passwort-Gate: lokal auto-fill + auto-submit (gate verschwindet ohne Eingabe)"
    - "git tag v0.1.0 existiert"
  artifacts:
    - path: "index.html"
      provides: "App-Shell: head mit CDN, gate-overlay, nav, hero, 7 sections mit korrekten IDs"
      min_lines: 80
    - path: "js/app.js"
      provides: "Passwort-Gate-Logik, IntersectionObserver Nav Active State"
      min_lines: 40
    - path: "js/map.js"
      provides: "Leerer Stub — window.mapModule Namespace reserviert"
    - path: "js/charts.js"
      provides: "Leerer Stub — window.chartsModule Namespace reserviert"
  key_links:
    - from: "index.html section#karte"
      to: ".nav-link[href='#karte']"
      via: "IntersectionObserver in app.js"
      pattern: "IntersectionObserver"
    - from: "index.html"
      to: "js/data.js"
      via: "script-Tag-Reihenfolge: data.js vor map.js/charts.js/app.js"
      pattern: "src=\"js/data.js\""
    - from: "js/app.js gate-check"
      to: "location.hostname"
      via: "isLocal: file:// → auto-fill + auto-submit"
      pattern: "location.protocol"
---

<objective>
index.html App-Shell + js/app.js Passwort-Gate + JS-Stubs + git tag v0.1.0. Nach diesem Plan ist Phase 1 komplett auslieferbar: Dark Theme sichtbar, Nav funktioniert, alle Sections scrollbar, Gate-Logik aktiv, Code committet und getaggt.

Purpose: index.html verbindet alle Teile. app.js fügt Interaktivität hinzu. Stubs reservieren Namespaces für Phase 2+4. Tag markiert fertigen Zustand.
Output: index.html, js/app.js, js/map.js, js/charts.js — dann git commit + git tag v0.1.0
</objective>

<execution_context>
Abhängigkeiten aus Plan 01 + Plan 02 müssen existieren: css/style.css, js/data.js.
Kein type="module" in script-Tags. Script-Ladereihenfolge: data.js → map.js → charts.js → app.js.
</execution_context>

<context>
@.planning/phases/01-projekt-fundament/01-01-SUMMARY.md
@.planning/phases/01-projekt-fundament/01-02-SUMMARY.md
@.planning/phases/01-projekt-fundament/01-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: index.html — vollständige App-Shell</name>
  <files>index.html</files>
  <action>
index.html mit dieser exakten Struktur erstellen:

**head:**
- charset UTF-8, viewport, title "Taiwan 2026/27 🇹🇼"
- link: css/style.css (eigenes Stylesheet zuerst)
- links: Leaflet CSS, MarkerCluster CSS (beide Varianten: MarkerCluster.css + MarkerCluster.Default.css) — alle von unpkg
- Kein Chart.js-CSS nötig

**body — Reihenfolge:**

1. `<div id="gate-overlay" class="gate-overlay">` — Passwort-Gate (wird von app.js gesteuert)
   Inhalt:
   ```html
   <div class="gate-box">
     <div class="gate-title">🇹🇼 Taiwan 2026/27</div>
     <div class="gate-subtitle">Reise-Dashboard · Familie</div>
     <input type="password" id="gate-input" class="gate-input" placeholder="Passwort" autocomplete="off" />
     <button id="gate-btn" class="gate-btn">Entsperren</button>
     <div id="gate-error" class="gate-error">Falsches Passwort</div>
   </div>
   ```

2. `<div id="app" class="hidden">` — Wrapper für die gesamte App (hidden bis Gate gelöst)

   Darin:
   
   a) `<nav class="nav">` mit `<ul class="nav-list">` und diesen 7 Links exakt in dieser Reihenfolge:
   ```html
   <li><a href="#karte"        class="nav-link">🗺 Karte</a></li>
   <li><a href="#timeline"     class="nav-link">📅 Timeline</a></li>
   <li><a href="#zahlen"       class="nav-link">📊 Zahlen</a></li>
   <li><a href="#videos"       class="nav-link">🎬 Videos</a></li>
   <li><a href="#restaurants"  class="nav-link">🌱 Restaurants</a></li>
   <li><a href="#booking"      class="nav-link">🏨 Booking</a></li>
   <li><a href="#fragen"       class="nav-link">❓ Fragen</a></li>
   ```

   b) `<main>` mit Hero + 7 Sections:

   Hero: `<div class="hero"><div class="container">` mit:
   - h1 class="hero-title": "Taiwan 2026/27"
   - p class="hero-subtitle": "59 Tage · 10 Phasen · 2 Erw. + Kind 2J · Vegetarisch/vegan"
   - div class="stats-bar" mit 6 Stats:
     - "59 Tage" / "1. Dez – 29. Jan"
     - "10 Phasen" / "Taipei bis Alishan"
     - "€9.160–10.860" / "Gesamtbudget"
     - "~50 Sehenswürdigkeiten" / "Karte + Timeline"
     - "20 Videos" / "Curated YouTube"
     - "8 offene Fragen" / "FAQ Checkliste"

   7 Sections (IDs müssen exakt so sein — Nav-Anchors hängen davon ab):
   ```html
   <section id="karte"       class="section">
     <div class="container">
       <h2 class="section-title">Karte</h2>
       <div id="map" style="height: 500px; border-radius: var(--radius);">
         <p class="placeholder">Leaflet-Karte · kommt in Phase 2</p>
       </div>
     </div>
   </section>

   <section id="timeline" class="section">
     <div class="container">
       <h2 class="section-title">Timeline</h2>
       <p class="section-subtitle">10 Phasen · 59 Tage · täglich mit Vormittag / Mittagsschlaf / Nachmittag</p>
       <div id="timeline-content" class="placeholder">Timeline · kommt in Phase 3</div>
     </div>
   </section>

   <section id="zahlen" class="section">
     <div class="container">
       <h2 class="section-title">Zahlen</h2>
       <div id="charts-content" class="placeholder">Infografiken · kommt in Phase 4</div>
     </div>
   </section>

   <section id="videos" class="section">
     <div class="container">
       <h2 class="section-title">Videos</h2>
       <div id="videos-content" class="placeholder">YouTube-Guide · kommt in Phase 4</div>
     </div>
   </section>

   <section id="restaurants" class="section">
     <div class="container">
       <h2 class="section-title">Restaurants</h2>
       <p class="section-subtitle">Vegetarisch + vegan in Taiwan · nach Phase gefiltert</p>
       <div id="restaurants-content" class="placeholder">Restaurant-Guide · kommt in Phase 4</div>
     </div>
   </section>

   <section id="booking" class="section">
     <div class="container">
       <h2 class="section-title">Booking</h2>
       <div id="booking-content" class="placeholder">Hotel-Research + KKday-Touren · kommt in Phase 5</div>
     </div>
   </section>

   <section id="fragen" class="section">
     <div class="container">
       <h2 class="section-title">Offene Fragen</h2>
       <div id="faq-content" class="placeholder">8 offene Fragen · kommt in Phase 5</div>
     </div>
   </section>
   ```

**Scripts vor </body> — exakte Reihenfolge (KEIN type="module"):**
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4/dist/chart.umd.min.js"></script>
<script src="js/data.js"></script>
<script src="js/map.js"></script>
<script src="js/charts.js"></script>
<script src="js/app.js"></script>
```
  </action>
  <verify>
    <automated>grep -c "id=\"karte\"\|id=\"timeline\"\|id=\"zahlen\"\|id=\"videos\"\|id=\"restaurants\"\|id=\"booking\"\|id=\"fragen\"" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/index.html && grep -c "js/data.js" /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/index.html</automated>
  </verify>
  <done>index.html enthält alle 7 Section-IDs. Script-Reihenfolge: data.js vor map.js vor charts.js vor app.js. gate-overlay und #app vorhanden. Kein type="module".</done>
</task>

<task type="auto">
  <name>Task 2: js/app.js + JS-Stubs + git tag v0.1.0</name>
  <files>js/app.js, js/map.js, js/charts.js</files>
  <action>
Drei Dateien erstellen, dann git commit + git tag.

**js/app.js:**

Drei Verantwortlichkeiten: (1) Passwort-Gate, (2) Nav IntersectionObserver, (3) getPhaseColor Helper.

```javascript
// js/app.js
// Taiwan Dashboard — App-Initialisierung
// Läuft nach allen anderen Scripts (letzte script-Tag in index.html)

(function() {
  'use strict';

  const PASSWORD = 'sri30';
  const SESSION_KEY = 'taiwan_unlocked';

  // --- Passwort-Gate ---
  // Lokal (file:// oder localhost): auto-fill + auto-submit → kein Passwort-Eingabe nötig
  // Remote (GitHub Pages): Gate erscheint, localStorage Session

  function initGate() {
    const overlay = document.getElementById('gate-overlay');
    const app     = document.getElementById('app');
    const input   = document.getElementById('gate-input');
    const btn     = document.getElementById('gate-btn');
    const errMsg  = document.getElementById('gate-error');

    function unlock() {
      overlay.classList.add('hidden');
      app.classList.remove('hidden');
      localStorage.setItem(SESSION_KEY, '1');
    }

    // Bereits entsperrt in dieser Session?
    if (localStorage.getItem(SESSION_KEY) === '1') {
      unlock();
      return;
    }

    // Lokal: auto-fill + auto-submit (kein manuelles Eintippen nötig)
    const isLocal = location.hostname === 'localhost' ||
                    location.hostname === '127.0.0.1' ||
                    location.protocol === 'file:';

    if (isLocal) {
      input.value = PASSWORD;
      // Kurze Verzögerung damit DOM vollständig gerendert ist
      setTimeout(function() { unlock(); }, 100);
      return;
    }

    // Remote: Gate zeigen
    overlay.classList.remove('hidden');

    function checkPassword() {
      if (input.value === PASSWORD) {
        errMsg.classList.remove('visible');
        input.classList.remove('error');
        unlock();
      } else {
        errMsg.classList.add('visible');
        input.classList.add('error');
        input.value = '';
        input.focus();
      }
    }

    btn.addEventListener('click', checkPassword);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') checkPassword();
    });
    input.focus();
  }

  // --- Nav IntersectionObserver ---
  // Markiert den Nav-Link als active wenn die zugehörige Section im Viewport ist.
  // rootMargin: -20% oben / -70% unten → Section muss im oberen Drittel sein

  function initNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function(link) { link.classList.remove('active'); });
          var activeLink = document.querySelector('.nav-link[href="#' + entry.target.id + '"]');
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(function(s) { observer.observe(s); });
  }

  // --- Phase-Farbe aus CSS lesen (für map.js + charts.js) ---
  // Einheitliche Farbquelle: CSS Custom Properties → kein Magic-Number-Chaos in JS

  window.getPhaseColor = function(phaseId) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--phase-' + phaseId)
      .trim();
  };

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function() {
    initGate();
    initNav();
  });

})();
```

**js/map.js — leerer Stub:**

```javascript
// js/map.js
// Leaflet-Karte — wird in Phase 2 implementiert
// Liest: window.TAIWAN.phases, window.TAIWAN.sights
// Schreibt: window.mapModule (für app.js Zugriff wenn nötig)

window.mapModule = {
  init: function() {
    // Phase 2: Leaflet L.map('map') initialisieren
    // Pins aus window.TAIWAN.sights rendern
    // Route aus window.TAIWAN.phases[].base zeichnen
    console.log('[map.js] Stub — Phase 2 implementiert Karte');
  }
};
```

**js/charts.js — leerer Stub:**

```javascript
// js/charts.js
// Chart.js Infografiken — wird in Phase 4 implementiert
// Liest: window.TAIWAN.charts.*
// Schreibt: window.chartsModule

window.chartsModule = {
  init: function() {
    // Phase 4: Chart.js Donut, Balken, Line, Scatter
    console.log('[charts.js] Stub — Phase 4 implementiert Charts');
  }
};
```

**Git commit + tag:**

Nach Erstellen aller 3 Files: git add + git commit + git tag v0.1.0

```bash
cd /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard
git add index.html css/style.css js/data.js js/app.js js/map.js js/charts.js .gitignore CHANGELOG.md README.md .nojekyll
git commit -m "feat: Phase 1 Projekt-Fundament — App-Shell, Dark Theme, data.js Skelett"
git tag -a v0.1.0 -m "Phase 1 komplett: App-Shell, Dark Theme, data.js"
```

Falls kein git repo existiert: erst `git init && git add ... && git commit ... && git tag ...`
  </action>
  <verify>
    <automated>cd /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard && git tag | grep v0.1.0 && wc -l js/app.js && grep -c "getPhaseColor\|IntersectionObserver\|gate-overlay" js/app.js</automated>
  </verify>
  <done>git tag v0.1.0 existiert. js/app.js hat mind. 40 Zeilen. Enthält getPhaseColor, IntersectionObserver, gate-overlay Logik. js/map.js und js/charts.js existieren als Stubs mit window.mapModule resp. window.chartsModule.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
Vollständige Phase 1 App-Shell. Alle Dateien erstellt, committet, getaggt (v0.1.0).
  </what-built>
  <how-to-verify>
1. index.html im Browser öffnen: `open /Users/mark/Documents/Obsidian/MeinVault/01_Projekte/Winterurlaub-2026/taiwan-dashboard/index.html`
2. Background muss sofort #0D0F12 (fast schwarz) sein — kein weißer Flash
3. Passwort-Gate sollte NICHT erscheinen (file:// → auto-unlock)
4. Sticky Nav oben mit allen 7 Links: 🗺 Karte | 📅 Timeline | 📊 Zahlen | 🎬 Videos | 🌱 Restaurants | 🏨 Booking | ❓ Fragen
5. Klick auf "Timeline" → smooth scroll zur Timeline-Section, Nav überlagert Titel nicht
6. Browser Konsole öffnen (Cmd+Option+J): `window.TAIWAN.phases.length` → muss 10 ausgeben
7. Browser Konsole: `window.getPhaseColor(1)` → muss "#6366F1" ausgeben
8. DevTools → Responsive (Cmd+Shift+M) → 375px Breite → Nav muss horizontal scrollbar sein
9. `git tag` im Terminal → v0.1.0 muss erscheinen
  </how-to-verify>
  <resume-signal>Alle 9 Checks bestanden: "approved". Sonst: Issues beschreiben → Fix-Plan.</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| file:// → window.TAIWAN | Kein Netzwerk-Hop — data.js wird direkt geladen |
| localStorage | Passwort-Session — nur im Browser des Nutzers |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-01 | Authentication Bypass | localStorage SESSION_KEY | accept | localStorage kann im Browser manipuliert werden — ist kein echtes Security-Gate, nur Convenience-Schutz für GitHub Pages Sharing. Kein sensitiver Inhalt (Reisepläne). |
| T-03-02 | Information Disclosure | Password "sri30" in js/app.js | accept | Passwort ist im Klartext im public Repo — bewusste Entscheidung (kein sensitiver Inhalt, Familie = Sharing-Ziel). Bei Bedarf in Phase 6 auf Hash upgraden. |
| T-03-03 | Spoofing | isLocal-Check per hostname | accept | Trivial zu umgehen via localhost-Proxy — aber Ziel ist Convenience, nicht Security. Remote-Gate ist Barriere, kein Schloss. |
</threat_model>

<verification>
Finale Phase-1-Checkliste (entspricht Roadmap Success Criteria):
1. `open index.html` → Background #0D0F12, kein weißer Flash
2. Sticky Nav → alle 7 Sections scrollbar mit korrektem Anchor-Offset
3. `window.TAIWAN.phases.length` in Console → 10
4. `window.TAIWAN.sights.length` → mind. 40
5. DevTools 375px → keine horizontale Body-Scrollbar
6. `git log --oneline` → Commit mit "Phase 1" sichtbar
7. `git tag` → v0.1.0
8. `ls .nojekyll .gitignore CHANGELOG.md README.md` → alle vorhanden
</verification>

<success_criteria>
- index.html öffnet lokal ohne Console-Errors
- Dark Theme (#0D0F12) sofort sichtbar
- Sticky Nav mit 7 Links, smooth scroll + active state via IntersectionObserver
- window.TAIWAN mit 10 Phasen, mind. 40 Sights, 20 Videos, 8 FAQ
- Git: commit + tag v0.1.0
- Bereit für Phase 2 (Karte) ohne Schema-Refactor
</success_criteria>

<output>
Nach Abschluss: `.planning/phases/01-projekt-fundament/01-03-SUMMARY.md` erstellen mit: erstellte Files, git tag, Checkpoint-Ergebnis, bekannte Abweichungen.
</output>

---

## Source Audit

| Source | Item | Plan |
|--------|------|------|
| GOAL | App-Shell + Dark Theme + Sticky Nav + data.js + Git-Infra | 01-01, 01-02, 01-03 |
| INF-01 | CHANGELOG.md + v0.1.0 Tag | 01-01 (CHANGELOG) + 01-03 (git tag) |
| INF-02 | .gitignore (.DS_Store, sync-conflict, node_modules) | 01-01 |
| INF-03 | README.md Setup-Anleitung | 01-01 |
| INF-04 | Sticky Nav 7 Sections | 01-01 (CSS) + 01-03 (HTML + JS) |
| INF-05 | Dark Theme #0D0F12/#161A20/#3B82F6 | 01-01 |
| INF-06 | Responsive Desktop + Mobile | 01-01 |
| RESEARCH | Kein type=module (CORS file://) | 01-02 + 01-03 |
| RESEARCH | scroll-padding-top: 56px | 01-01 |
| RESEARCH | .nojekyll Pflicht | 01-01 |
| RESEARCH | data.js Schema tief (days[].slots.{morning,nap,afternoon}) | 01-02 |
| RESEARCH | Phasen-Farben als CSS Custom Properties | 01-01 |
| RESEARCH | Password Gate: isLocal → auto-fill + auto-submit | 01-03 |

Alle 6 Requirements und alle Research-Constraints gedeckt. Keine Gaps.
