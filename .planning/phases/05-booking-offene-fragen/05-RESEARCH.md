# Phase 5: Booking + Offene Fragen — Research

**Researched:** 2026-08-03
**Domain:** Deeplink-URLs (Booking.com, Airbnb, KKday) + UI-Pattern (Cards, Accordion, Checkliste)
**Confidence:** HIGH (Deeplinks), MEDIUM (KKday), HIGH (FAQ-Persistenz)

---

## Summary

Phase 5 baut zwei neue Sektionen in ein fertiges, laufendes Pure-JS-Dashboard: eine Booking-Sektion mit Hotel-Deeplinks pro Reisephase plus KKday-Touren-Cards, und eine FAQ-Checkliste mit 8 offenen Fragen.

Das data.js-Skelett ist vollständig ausgefüllt: alle 10 Phasen haben `bookingUrl`, `airbnbUrl`, `criteria`, `earlyBook`-Flag und leere `exampleHotels[]`-Arrays. Das `tours[]`-Array hat 5 Einträge mit Placeholder-URLs (KKday-Pfade sind nicht real). Das `faq[]`-Array hat 8 vollständige Objekte mit `status: "open"`.

Kritischer Fund: KKday-URLs in data.js sind Platzhalter (`/de/product/glasbodenboot-xiaoliuqiu` etc.) — HTTP 403, keine echten Produkt-Seiten. Plan muss Mark anweisen, echte KKday-URLs nachzutragen. Booking.com-Format ist bereits korrekt und valide.

**Primary recommendation:** Zwei IIFE-Module (`booking.js`, `faq.js`) exakt nach dem restaurants.js-Muster. Kein neues CSS-System — bestehende Variablen und Card-Klassen als Vorlage.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BKG-01 | Pro Phase: Booking.com-Deeplink + Airbnb-Deeplink mit Region, Daten, Familie | Deeplink-Format verifiziert, bereits in data.js vorhanden |
| BKG-02 | Pro Phase: `hotels[]`-Array für 5 Beispiel-Hotels + `hotelCriteria{}`-Objekt | Skelett da (`exampleHotels: []`, `criteria: {}`), Hotels leer — Mark befüllt |
| BKG-03 | "Research starten"-Button öffnet Booking.com mit Kriterien-Filter | URL-Konstruktion aus `bookingUrl` + optionalen Kriterien-Params |
| BKG-04 | Warn-Badge bei Xiaoliuqiu (Phase 5), Alishan (Phase 8), Kenting (Phase 6) | `earlyBook: true` bereits korrekt gesetzt in data.js |
| BKG-05 | KKday-Links für Touren (Glasbodenboot, Alishan, etc.) | BLOCKER: URLs sind Platzhalter — Mark muss echte URLs eintragen |
| FAQ-01 | 8 offene Fragen als Checkliste mit 🔴/🟢 Status | Vollständig in data.js.faq[] mit status: "open" / "resolved" |
| FAQ-02 | Status in data.js setzbar, Dashboard zeigt Änderung beim Reload | Keine localStorage-Persistenz nötig — data.js ist Datenquelle |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Deeplink-Konstruktion | Client JS | — | URL-Strings aus data.js zusammensetzen, kein Server |
| Booking-Cards rendern | Client JS | — | IIFE-Modul wie restaurants.js |
| KKday-Touren-Cards | Client JS | — | Aus window.TAIWAN.tours filtern nach phaseId |
| FAQ-Checkliste | Client JS | — | Render aus window.TAIWAN.faq |
| FAQ-Status-Persistenz | data.js (manuell) | — | Static file, kein Backend — Status ist Code, nicht Laufzeit |
| earlyBook-Badge | Client JS | — | Flag bereits in data.js |

---

## Standard Stack

### Core (bereits vorhanden — nichts installieren)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Vanilla ES5 JS | — | Module, DOM-Manipulation | Projektkonvention |
| CSS Custom Properties | — | Dark Theme, Variablen | Bereits in style.css |
| IIFE-Module-Pattern | — | `window.bookingModule`, `window.faqModule` | Wie restaurants.js |

**Keine neuen CDN-Dependencies.** Alles mit vorhandenem Stack.

---

## Architecture Patterns

### Modulstruktur (exakt wie restaurants.js)

```
window.bookingModule = (function() {
  'use strict';

  return {
    init: function() {
      var el = document.getElementById('booking-content');
      if (!el || !window.TAIWAN) return;
      el.innerHTML = '';
      _render(el);
    }
  };
})();
```

In index.html `<script src="js/booking.js"></script>` vor `app.js` einfügen.
In `app.js` DOMContentLoaded-Block: `if (window.bookingModule) { window.bookingModule.init(); }`.

### Empfohlene Dateistruktur

```
js/
├── booking.js     NEU — Hotel-Cards + KKday-Touren
├── faq.js         NEU — Checkliste mit Status-Badges
├── restaurants.js BESTEHEND — Referenz-Muster
└── app.js         BESTEHEND — init()-Aufrufe ergänzen
```

### Pattern 1: Booking-Card pro Phase

Jede Phase aus `window.TAIWAN.booking` ergibt eine Card:

```javascript
// Source: data.js Struktur + restaurants.js Muster [VERIFIED: Codebase]
function _makeBookingCard(b) {
  var earlyBadge = b.earlyBook
    ? '<span class="bkg-badge bkg-badge--warn">⚠️ Früh buchen!</span>'
    : '';

  return '<div class="bkg-card">'
    + '<div class="bkg-phase-header">'
      + '<span class="bkg-phase-num">Phase ' + b.phaseId + '</span>'
      + '<span class="bkg-region">' + b.region + '</span>'
      + earlyBadge
    + '</div>'
    + '<div class="bkg-dates">' + b.checkIn + ' – ' + b.checkOut + ' (' + b.nights + ' Nächte)</div>'
    + '<div class="bkg-criteria">' + b.criteria.notes + '</div>'
    + '<div class="bkg-links">'
      + '<a class="bkg-link bkg-link--primary" href="' + b.bookingUrl + '" target="_blank" rel="noopener">🏨 Booking.com &nearr;</a>'
      + '<a class="bkg-link bkg-link--secondary" href="' + b.airbnbUrl + '" target="_blank" rel="noopener">🏠 Airbnb &nearr;</a>'
    + '</div>'
    + _renderExampleHotels(b.exampleHotels)
    + _renderKKdayTours(b.phaseId)
    + '</div>';
}
```

### Pattern 2: KKday-Touren aus tours[] filtern

```javascript
// Source: data.js tours[] Struktur [VERIFIED: Codebase]
function _renderKKdayTours(phaseId) {
  var tours = window.TAIWAN.tours.filter(function(t) {
    return t.phaseId === phaseId;
  });
  if (!tours.length) return '';

  var html = '<div class="bkg-tours">';
  tours.forEach(function(t) {
    var buggyIcon = t.buggyFriendly ? '🚼' : '🚼⚠️';
    html += '<div class="bkg-tour">'
      + '<span class="bkg-tour-name">' + t.name + '</span>'
      + '<span class="bkg-tour-provider">' + t.provider + '</span>'
      + '<span class="bkg-tour-price">€' + t.priceEur + '</span>'
      + buggyIcon
      + '<a href="' + t.url + '" target="_blank" rel="noopener">Buchen &nearr;</a>'
      + '<div class="bkg-tour-note">' + t.note + '</div>'
    + '</div>';
  });
  return html + '</div>';
}
```

### Pattern 3: FAQ-Checkliste

```javascript
// Source: data.js faq[] Struktur [VERIFIED: Codebase]
function _makeFaqItem(q) {
  var statusIcon = q.status === 'resolved' ? '🟢' : '🔴';
  var statusLabel = q.status === 'resolved' ? 'Geklärt' : 'Offen';

  return '<div class="faq-item faq-item--' + q.status + '">'
    + '<div class="faq-status">' + statusIcon + ' ' + statusLabel + '</div>'
    + '<div class="faq-question">' + q.question + '</div>'
    + (q.tip ? '<div class="faq-tip">' + q.tip + '</div>' : '')
    + (q.answer ? '<div class="faq-answer">' + q.answer + '</div>' : '')
    + '</div>';
}
```

### Anti-Patterns to Avoid

- **Kein localStorage für FAQ-Status:** data.js ist die einzige Datenquelle (FAQ-02 sagt "data.js setzbar, beim Reload sichtbar" — das bedeutet manuelles Edit, kein Runtime-Toggle). Kein dynamisches Status-Toggle im UI nötig.
- **Kein filter-Button für Booking:** Booking hat nur 10 Einträge (1 pro Phase), kein Filter nötig — alle anzeigen.
- **Keine echten KKday-Deeplinks konstruieren:** KKday hat keine dokumentierte öffentliche Deeplink-API. Nur direkte Produkt-URLs verwenden, die Mark manuell einträgt.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Deeplink-Konstruktion Booking.com | Custom URL-Builder | `bookingUrl` aus data.js direkt verwenden | Already complete in data.js |
| Deeplink-Konstruktion Airbnb | Custom URL-Builder | `airbnbUrl` aus data.js direkt verwenden | Already complete in data.js |
| Persistenz FAQ-Status | localStorage-System | data.js manuell editieren | Static-App-Constraint, kein Backend |
| Tab-/Filter-System | Neues Component | restaurants.js-Filter-Muster kopieren | Identische Anforderung |

---

## Deeplink-Formate (verifiziert)

### Booking.com [VERIFIED: WebSearch, Booking.com Developer Docs]

Format in data.js ist korrekt (`HTTP 202` bei Test-Request bestätigt):
```
https://www.booking.com/searchresults.de.html
  ?ss={Region}
  &checkin={YYYY-MM-DD}
  &checkout={YYYY-MM-DD}
  &group_adults=2
  &group_children=1
  &age=2
```

Parameter `age` = Alter des Kindes in Jahren. Für Kleinkind 2J: `age=2`. Bei mehreren Kindern: `age=3&age=5`.

Optionale Kriterien-Parameter (für BKG-03 "Research starten"):
- `nflt=hotelfacility%3D28` — Hotelfacility-Filter (nicht standardisiert, kann sich ändern)
- Empfehlung: `bookingUrl` direkt verwenden, keine Kriterien-Filter an URL anhängen — Booking.com-Filter-Syntax ist undokumentiert und instabil [ASSUMED]

### Airbnb [VERIFIED: WebSearch]

Format in data.js ist korrekt:
```
https://www.airbnb.com/s/{Region}/homes
  ?checkin={YYYY-MM-DD}
  &checkout={YYYY-MM-DD}
  &adults=2
  &children=1
```

Hinweis: Airbnb unterscheidet bei Listing-Detail-URLs zwischen `check_in`/`check_out` (Underscores) und Search-URLs `checkin`/`checkout` (ohne Underscore). Data.js nutzt Search-URLs — korrekt.

### KKday [ASSUMED — nicht verifizierbar]

KKday-Produktseiten haben das Format:
```
https://www.kkday.com/de/product/{slug}-{numeric-id}
```

Die URLs in data.js (`/glasbodenboot-xiaoliuqiu`, `/alishan-sunrise` etc.) sind **Platzhalter ohne numerische IDs** — HTTP 403 bestätigt. Mark muss echte KKday-Produkt-URLs nachtragen. Suche auf kkday.com nach Produkt → URL aus Adressleiste kopieren.

---

## Common Pitfalls

### Pitfall 1: KKday-Links zeigen 403
**Was schiefgeht:** User klickt KKday-Link, bekommt "Seite nicht gefunden"
**Warum:** URLs in data.js sind erfundene Slugs ohne echte Produkt-IDs
**Wie vermeiden:** In Plan explizit als Daten-Task: "Mark trägt echte KKday-URLs ein". Fallback: Links erst anzeigen wenn `t.url` einen real aussehenden Pfad hat (enthält numerische ID).
**Warnsignal:** URL endet auf reinem Text-Slug ohne Zahl (z.B. `/alishan-sunrise`)

### Pitfall 2: exampleHotels[] leer — leere Section
**Was schiefgeht:** Booking-Cards zeigen "5 Beispiel-Hotels" als Section-Header aber keine Hotels
**Warum:** `exampleHotels: []` in allen 10 Phasen
**Wie vermeiden:** Leeren Array graceful behandeln: Section nicht rendern wenn leer; stattdessen "Hotels noch nicht eingetragen" als Platzhalter.

### Pitfall 3: earlyBook-Badge fehlt bei korrekten Phasen
**Welche Phasen:** phaseId 5 (Xiaoliuqiu), 6 (Kenting), 8 (Alishan) haben `earlyBook: true` — alle anderen `false`
**Prüfung:** `if (b.earlyBook)` — nicht `if (b.earlyBook === true)` (beide gleich in JS, aber explizit ist klarer)

### Pitfall 4: FAQ-Status-Toggle im UI
**Was schiefgeht:** Versuchung, Toggle-Buttons im UI zu bauen (klick = status wechselt)
**Warum falsch:** FAQ-02 sagt "Status in data.js setzbar" — Laufzeit-Toggle würde bei Reload zurückgesetzt (kein Backend)
**Wie vermeiden:** Nur lesen, nicht schreiben. Kommentar im Code + in data.js Hinweis: `// Status hier manuell ändern: "open" | "resolved"`

### Pitfall 5: Script-Reihenfolge in index.html
**Was schiefgeht:** `booking.js` oder `faq.js` laufen vor `data.js` → `window.TAIWAN` ist undefined
**Fix:** Neue `<script>`-Tags NACH `data.js` und VOR `app.js` einfügen

---

## Data Inventory (aus data.js — verifiziert)

### booking[] — 10 Einträge, vollständig
| Feld | Status |
|------|--------|
| phaseId, region, checkIn, checkOut, nights | Alle 10 vollständig |
| earlyBook | Korrekt: true bei Phase 5, 6, 8 |
| bookingUrl | Vollständig, Format verifiziert |
| airbnbUrl | Vollständig, Format verifiziert |
| criteria.notes | Vollständig, sinnvolle Texte |
| exampleHotels | Leer ([] in allen 10) — Mark befüllt manuell |
| kkdayToursPhase | String-Array (Tournamen), wird nicht direkt gerendert — tours[] ist Quelle |

### tours[] — 5 Einträge
| Feld | Status |
|------|--------|
| id, name, provider, phaseId, priceEur, buggyFriendly, note | Vollständig |
| url | PLATZHALTER — HTTP 403 bestätigt |

### faq[] — 8 Einträge, vollständig
| Feld | Status |
|------|--------|
| id, question, status, phaseIds, priority, tip | Alle 8 vollständig |
| answer | null bei allen (offene Fragen) |
| status | "open" bei allen — korrekt |

---

## Validation Architecture

nyquist_validation ist aktiv (config.json).

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manuell (Browser + file://) |
| Config file | keines |
| Quick run command | Datei in Browser öffnen, Sektionen visuell prüfen |
| Full suite command | Alle Sektionen, alle Links klicken |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BKG-01 | Booking.com + Airbnb Link öffnet korrekte Suchseite | smoke | Browser manuell | ❌ Wave 0 |
| BKG-02 | Hotels-Array leer → Graceful Fallback sichtbar | visual | Browser manuell | ❌ Wave 0 |
| BKG-03 | "Research starten"-Button öffnet Booking.com | smoke | Browser manuell | ❌ Wave 0 |
| BKG-04 | earlyBook-Badge sichtbar bei Phase 5, 6, 8 | visual | Browser manuell | ❌ Wave 0 |
| BKG-05 | KKday-Link zeigt nota bene (Platzhalter-Warnung) | visual | Browser manuell | ❌ Wave 0 |
| FAQ-01 | 8 Fragen erscheinen mit 🔴 Status | visual | Browser manuell | ❌ Wave 0 |
| FAQ-02 | status: "resolved" in data.js → 🟢 nach Reload | smoke | Browser manuell | ❌ Wave 0 |

Pure HTML/JS-Projekt ohne Test-Runner. Alle Tests sind visuelle Browser-Tests.

### Wave 0 Gaps
- [ ] Kein automatisiertes Test-Framework vorhanden — akzeptabel für Static-HTML-Projekt
- [ ] Manueller Test-Plan pro Requirement genügt

---

## Environment Availability

Kein externes Tool benötigt. Pure file:// / GitHub Pages. Keine neuen Dependencies.

| Dependency | Required By | Available | Fallback |
|------------|------------|-----------|----------|
| Browser | Render | ✓ | — |
| data.js | Alle Module | ✓ | — |
| KKday echte URLs | BKG-05 | ✗ (Platzhalter) | Hinweis-Text in Card |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Booking.com `group_children=1&age=2` Parameter sind stabil und öffentlich | Deeplinks | Links könnten auf falsche Suche führen — niedrig, Format seit Jahren unverändert |
| A2 | KKday hat keine konstruierbare Deeplink-API; nur manuelle Produkt-URLs | KKday | Wenn KKday doch API hat, könnte man Datum vorausfüllen |
| A3 | FAQ-02 meint manuelles data.js-Edit, kein Runtime-Toggle | FAQ | Wenn Mark Toggle-Button erwartet, Anforderung falsch verstanden |
| A4 | BKG-03 "Kriterien-Filter" bedeutet bookingUrl direkt aufrufen (keine zusätzlichen nflt-Parameter) | Booking | Wenn nflt-Parameter gewünscht, URL-Bau komplexer |

---

## Open Questions

1. **KKday echte URLs**
   - Was wir wissen: Alle 5 tour[]-Einträge haben Platzhalter-URLs (403)
   - Was unklar: Echte Produkt-IDs unbekannt
   - Empfehlung: Plan enthält Daten-Task "Mark trägt echte KKday-URLs ein vor Rendering-Task"

2. **BKG-02: exampleHotels[] befüllen**
   - Was wir wissen: Alle 10 Phasen haben leere Arrays
   - Was unklar: Wann Mark die Hotels einträgt (vor oder nach Phase 5)
   - Empfehlung: Rendering-Code baut graceful Fallback ("Noch keine Hotels eingetragen"), Mark füllt separat

3. **BKG-03: "Research starten" vs. direkter Booking.com-Link**
   - BKG-01 sagt "Deeplink per Phase", BKG-03 sagt "Kriterien-Filter-Button"
   - Empfehlung: Zwei Buttons pro Card: "Booking.com" (direkt) + "Research starten" (gleiche URL, semantisch anderer Label für den CTA-Flow)

---

## Sources

### Primary (HIGH confidence)
- Codebase: `js/data.js` (booking[], tours[], faq[]) — direkt gelesen
- Codebase: `js/restaurants.js` — Referenz-Muster verifiziert
- Codebase: `js/app.js` — Init-Pattern verifiziert
- Codebase: `index.html` — Script-Reihenfolge, Section-IDs verifiziert

### Secondary (MEDIUM confidence)
- WebSearch: Booking.com URL-Parameter (`group_adults`, `group_children`, `age`, `checkin`, `checkout`) — mehrere Quellen konsistent
- WebSearch: Airbnb URL-Parameter (`adults`, `children`, `checkin`, `checkout`) — dokumentiert in MCP-Server-Projekt + Scraping-Guides
- curl-Test: Booking.com-URL aus data.js → HTTP 202 (valide Weiterleitung)

### Tertiary (LOW confidence)
- curl-Test: KKday-Platzhalter-URLs → HTTP 403 — bestätigt dass URLs nicht real sind
- KKday Deeplink-Struktur: [ASSUMED] basierend auf allgemeiner Produktseiten-Konvention

---

## Metadata

**Confidence breakdown:**
- Deeplink-Formate: HIGH — WebSearch bestätigt, curl-Test positiv
- data.js Schema: HIGH — direkt aus Codebase gelesen
- KKday-URLs: LOW — 403 bestätigt Platzhalter, echte Struktur unbekannt
- Modul-Pattern: HIGH — restaurants.js als vollständige Referenz vorhanden

**Research date:** 2026-08-03
**Valid until:** 2026-10-01 (Booking.com/Airbnb URL-Formate stabil)
