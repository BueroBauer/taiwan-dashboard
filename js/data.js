// js/data.js
// Taiwan Reise-Dashboard — Einzige Datenquelle
// Alle JS-Module lesen window.TAIWAN. Kein import/export (CORS bei file://)
// Updates: Direkt editieren + committen → automatisch live auf GitHub Pages

window.TAIWAN = {

  // ============================================================
  // meta — Reise-Rahmendaten
  // ============================================================
  meta: {
    title:        "Taiwan Winterurlaub 2026/27",
    startDate:    "2026-12-01",
    endDate:      "2027-01-29",
    totalDays:    59,
    totalNights:  59,
    travelers:    { adults: 2, children: 1, childAge: 2 },
    diet:         "vegetarisch/vegan",
    budget:       { low: 9160, high: 10860, currency: "EUR" },
    dailyBudget:  { comfort: 145, backpacker: 29 }
  },

  // ============================================================
  // phases — 10 Reisephasen
  // Farben identisch mit CSS --phase-1 bis --phase-10
  // ============================================================
  phases: [
    {
      id: 1,
      name: "Taipei (Ankunft)",
      region: "Taipei",
      emoji: "🏙️",
      nights: 2,
      startDate: "2026-12-01",
      endDate:   "2026-12-03",
      color: "#6366F1",  // --phase-1 in CSS
      base: { lat: 25.0330, lng: 121.5654 },
      highlights: ["Shilin Night Market", "Elephant Mountain Sonnenuntergang", "Longshan Temple", "Jetlag-Anpassung"],
      earlyBook: false,
      days: [
        {
          day: 1,
          date: "2026-12-01",
          jetlag: true,
          slots: {
            morning: [
              { name: "Ankunft Taoyuan Airport", coords: { lat: 25.0797, lng: 121.2342 }, price: { eur: 0, note: "Flug AUA" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0797,121.2342", tip: "MRT direkt in die Stadt, ca. 40 min", category: "transport" },
              { name: "Hotel Check-in + Ausruhen", coords: { lat: 25.0330, lng: 121.5654 }, price: { eur: 0, note: "Im Preis inkl." }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0330,121.5654", tip: "Jetlag: früh schlafen legen", category: "hotel" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Longshan Temple", coords: { lat: 25.0370, lng: 121.4997 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0370,121.4997", tip: "Ruhig, schöne Atmosphäre auch für Kleinkind", category: "tempel" }
            ]
          }
        },
        {
          day: 2,
          date: "2026-12-02",
          jetlag: true,
          slots: {
            morning: [
              { name: "Elephant Mountain (象山)", coords: { lat: 25.0264, lng: 121.5773 }, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=25.0264,121.5773", tip: "Treppen — Kind tragen oder Buggy am Eingang lassen", category: "natur" },
              { name: "National Palace Museum", coords: { lat: 25.1025, lng: 121.5484 }, price: { eur: 6, note: "ca. TWD 200" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.1025,121.5484", tip: "Buggy-freundlich, Highlights sind jade + bronzeware", category: "museum" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Shilin Night Market", coords: { lat: 25.0881, lng: 121.5240 }, price: { eur: 8, note: "Essen vor Ort" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0881,121.5240", tip: "Viele vegane Optionen: Stinky Tofu (vegan!), Scallion Pancake", category: "food" }
            ]
          }
        }
      ]
    },

    {
      id: 2,
      name: "Hualien",
      region: "Hualien",
      emoji: "🏔️",
      nights: 7,
      startDate: "2026-12-03",
      endDate:   "2026-12-10",
      color: "#8B5CF6",  // --phase-2 in CSS
      base: { lat: 23.9769, lng: 121.6044 },
      highlights: ["Taroko Nationalpark", "Shakadang Trail", "Qixingtan Beach", "Liyu Lake"],
      earlyBook: false,
      days: [
        {
          day: 1,
          date: "2026-12-03",
          jetlag: false,
          slots: {
            morning: [
              { name: "Zug Taipei → Hualien (Puyuma Express)", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 8, note: "ca. TWD 340 pro Person" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Tickets rechtzeitig buchen — ausgebucht möglich", category: "transport" },
              { name: "Hotel Check-in Hualien", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 0, note: "Im Preis inkl." }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Unterkunft nahe Bahnhof ideal", category: "hotel" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Qixingtan Beach", coords: { lat: 24.0372, lng: 121.6478 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=24.0372,121.6478", tip: "Kieselstrand, perfekt bei Sonnenuntergang. Kind kann Steine ins Wasser werfen", category: "strand" }
            ]
          }
        },
        {
          day: 2,
          date: "2026-12-04",
          jetlag: false,
          slots: {
            morning: [
              { name: "Taroko National Park — Swallow Grotto (燕子口)", coords: { lat: 24.1574, lng: 121.6216 }, price: { eur: 0, note: "gratis, Helm Pflicht" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1574,121.6216", tip: "Schutzhelm mitnehmen/leihen. Kind im Tragegestell besser als Buggy", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Shakadang Trail (神秘谷步道)", coords: { lat: 24.1452, lng: 121.6199 }, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1452,121.6199", tip: "Flacher Weg am Fluss — mit Kind gut machbar zu Fuß oder im Tragegestell", category: "wandern" }
            ]
          }
        },
        {
          day: 3, date: "2026-12-05", jetlag: false,
          slots: {
            morning: [
              { name: "Liyu Lake (鯉魚潭)", coords: { lat: 23.8979, lng: 121.5500 }, price: { eur: 3, note: "Boot mieten ca. TWD 150" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8979,121.5500", tip: "Schöner See südlich von Hualien, gut für Kleinkind", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Hualien Stadtbummel + Abendessen", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 5, note: "Abendessen" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Vege Creek Restaurant für vegane Taiwan-Küche", category: "food" }
            ]
          }
        },
        {
          day: 4, date: "2026-12-06", jetlag: false,
          slots: {
            morning: [
              { name: "Taroko — Tianxiang (天祥)", coords: { lat: 24.1879, lng: 121.5983 }, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1879,121.5983", tip: "Höhepunkt des Taroko-Tals, Tempel auf Fels", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Entspannung am Hotel", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Ruhetag nach aktivem Taroko-Tag", category: "ruhe" }
            ]
          }
        },
        {
          day: 5, date: "2026-12-07", jetlag: false,
          slots: {
            morning: [
              { name: "Tropic of Cancer Monument", coords: { lat: 23.5000, lng: 121.4200 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.5000,121.4200", tip: "Auf dem Weg nach Süden, foto-worthy", category: "sehens" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Carp Lake (Liyu Lake) Runde 2", coords: { lat: 23.8979, lng: 121.5500 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8979,121.5500", tip: "Fahrradtour um den See — Kinderfahrrad mieten möglich", category: "natur" }
            ]
          }
        },
        {
          day: 6, date: "2026-12-08", jetlag: false,
          slots: {
            morning: [
              { name: "Hualien Market + Frühstück", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 4, note: "Frühstück" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Lokale Jianbing und Sojamilch", category: "food" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Spontaner Erkundungstag", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Puffer-Tag für Wetterabweichungen", category: "flexibel" }
            ]
          }
        },
        {
          day: 7, date: "2026-12-09", jetlag: false,
          slots: {
            morning: [
              { name: "Abreise-Vorbereitung + Hualien Souvenir", coords: { lat: 23.9769, lng: 121.6044 }, price: { eur: 5, note: "Souvenirs" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", tip: "Jade-Produkte und Taroko-Steinschmuck sind typisch", category: "shopping" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Letzter Blick auf Qixingtan Beach", coords: { lat: 24.0372, lng: 121.6478 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=24.0372,121.6478", tip: "Abschied von Hualien", category: "strand" }
            ]
          }
        }
      ]
    },

    {
      id: 3,
      name: "East Rift Valley",
      region: "East Rift Valley",
      emoji: "🌾",
      nights: 5,
      startDate: "2026-12-10",
      endDate:   "2026-12-15",
      color: "#EC4899",  // --phase-3 in CSS
      base: { lat: 23.4700, lng: 121.3900 },
      highlights: ["Luye Highland Heißluftballon", "Chishang Bike Path", "Ruisui Hot Springs"],
      earlyBook: false,
      days: [
        {
          day: 1, date: "2026-12-10", jetlag: false,
          slots: {
            morning: [
              { name: "Zug Hualien → Guanshan/Chishang", coords: { lat: 23.2165, lng: 121.1818 }, price: { eur: 5, note: "Zug ca. TWD 200" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.2165,121.1818", tip: "Landschaftlich spektakulär — Fensterplatz sichern", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Chishang Bike Path (伯朗大道)", coords: { lat: 23.2165, lng: 121.1818 }, price: { eur: 3, note: "Fahrradmiete" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.2165,121.1818", tip: "Ikonische Reisfeld-Strasse, Kindersitz-Fahrrad verfügbar", category: "natur" }
            ]
          }
        },
        {
          day: 2, date: "2026-12-11", jetlag: false,
          slots: {
            morning: [
              { name: "Luye Highland Heißluftballon (鹿野高台)", coords: { lat: 23.0681, lng: 121.1437 }, price: { eur: 15, note: "Ballon ca. TWD 600" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.0681,121.1437", tip: "Morgens früh los — 6:00 Uhr Start, Kind darf mit wenn groß genug", category: "aktivität" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Entspannung Luye", coords: { lat: 23.0681, lng: 121.1437 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.0681,121.1437", tip: "", category: "ruhe" }
            ]
          }
        },
        {
          day: 3, date: "2026-12-12", jetlag: false,
          slots: {
            morning: [
              { name: "Ruisui Hot Springs (瑞穗溫泉)", coords: { lat: 23.4965, lng: 121.3870 }, price: { eur: 5, note: "Eintrittspreis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.4965,121.3870", tip: "Natrium-Bicarbonat-Quelle — Altersbeschränkung für Kinder klären!", category: "wellness" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Ruisui Umgebung erkunden", coords: { lat: 23.4965, lng: 121.3870 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.4965,121.3870", tip: "", category: "sehens" }
            ]
          }
        },
        {
          day: 4, date: "2026-12-13", jetlag: false,
          slots: {
            morning: [],
            nap: "12:00–14:30",
            afternoon: []
          }
        },
        {
          day: 5, date: "2026-12-14", jetlag: false,
          slots: {
            morning: [],
            nap: "12:00–14:30",
            afternoon: []
          }
        }
      ]
    },

    {
      id: 4,
      name: "Taitung",
      region: "Taitung",
      emoji: "🌊",
      nights: 3,
      startDate: "2026-12-15",
      endDate:   "2026-12-18",
      color: "#F59E0B",  // --phase-4 in CSS
      base: { lat: 22.7583, lng: 121.1444 },
      highlights: ["Xiaoyeliu Geopark", "Jhihben Hot Springs", "Green Island Tagesausflug"],
      earlyBook: false,
      days: [
        {
          day: 1, date: "2026-12-15", jetlag: false,
          slots: {
            morning: [
              { name: "Zug → Taitung Bahnhof", coords: { lat: 22.7583, lng: 121.1444 }, price: { eur: 4, note: "Zug" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.7583,121.1444", tip: "Hotel in der Nähe Bahnhof buchen", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Xiaoyeliu Geopark (小野柳)", coords: { lat: 22.8267, lng: 121.1417 }, price: { eur: 2, note: "ca. TWD 80" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.8267,121.1417", tip: "Bizarre Felsformationen am Meer — gut für Kleinkinder", category: "natur" }
            ]
          }
        },
        {
          day: 2, date: "2026-12-16", jetlag: false,
          slots: {
            morning: [
              { name: "Green Island Tagesausflug (綠島)", coords: { lat: 22.6715, lng: 121.4869 }, price: { eur: 25, note: "Fähre + Moped" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.6715,121.4869", tip: "Fähre 30min, Moped auf der Insel, Kinder-Sitz prüfen", category: "ausflug" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Green Island — Rückkehr", coords: { lat: 22.7583, lng: 121.1444 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.7583,121.1444", tip: "Abendliche Rückfähre", category: "transport" }
            ]
          }
        },
        {
          day: 3, date: "2026-12-17", jetlag: false,
          slots: {
            morning: [
              { name: "Jhihben Hot Springs (知本溫泉)", coords: { lat: 22.7158, lng: 120.9978 }, price: { eur: 8, note: "Hotel Therme" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.7158,120.9978", tip: "Indoorpool für Kinder, Schwefelquelle", category: "wellness" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Abreise-Vorbereitung Taitung", coords: { lat: 22.7583, lng: 121.1444 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.7583,121.1444", tip: "", category: "hotel" }
            ]
          }
        }
      ]
    },

    {
      id: 5,
      name: "Xiaoliuqiu",
      region: "Xiaoliuqiu",
      emoji: "🐢",
      nights: 5,
      startDate: "2026-12-18",
      endDate:   "2026-12-23",
      color: "#10B981",  // --phase-5 in CSS
      base: { lat: 22.3400, lng: 120.3700 },
      highlights: ["Glasbodenboot", "Meeresschildkröten snorkeln", "Vase Rock", "Sunset Beach"],
      earlyBook: true,
      days: [
        {
          day: 1, date: "2026-12-18", jetlag: false,
          slots: {
            morning: [
              { name: "Fähre Donggang → Xiaoliuqiu", coords: { lat: 22.3400, lng: 120.3700 }, price: { eur: 5, note: "Fähre TWD 220" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tip: "Buggy auf Fähre möglich, 30min Überfahrt", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Vase Rock (花瓶岩)", coords: { lat: 22.3457, lng: 120.3713 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.3457,120.3713", tip: "Wahrzeichen der Insel, kurzer Spaziergang", category: "natur" }
            ]
          }
        },
        {
          day: 2, date: "2026-12-19", jetlag: false,
          slots: {
            morning: [
              { name: "Glasbodenboot Tour (玻璃底船)", coords: { lat: 22.3400, lng: 120.3700 }, price: { eur: 18, note: "TWD 750" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tip: "Altersbeschränkung prüfen! Kind 2J — im Voraus anfragen", category: "aktivität" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Sunset Beach (落日亭)", coords: { lat: 22.3384, lng: 120.3684 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.3384,120.3684", tip: "Schönster Sonnenuntergang der ganzen Reise", category: "strand" }
            ]
          }
        },
        {
          day: 3, date: "2026-12-20", jetlag: false,
          slots: {
            morning: [
              { name: "Schildkröten-Schnorcheln", coords: { lat: 22.3400, lng: 120.3700 }, price: { eur: 15, note: "Schnorchel-Tour TWD 600" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tip: "Eine Person bleibt mit Kind am Strand, abwechseln", category: "aktivität" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Inselrunde per Elektroroller", coords: { lat: 22.3400, lng: 120.3700 }, price: { eur: 8, note: "Roller TWD 350" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tip: "Kinderfahrrad-Sitz nachfragen beim Verleih", category: "aktivität" }
            ]
          }
        },
        {
          day: 4, date: "2026-12-21", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 5, date: "2026-12-22", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        }
      ]
    },

    {
      id: 6,
      name: "Kenting",
      region: "Kenting",
      emoji: "🏖️",
      nights: 10,
      startDate: "2026-12-23",
      endDate:   "2027-01-02",
      color: "#06B6D4",  // --phase-6 in CSS
      base: { lat: 21.9400, lng: 120.8500 },
      highlights: ["Weißer Sandstrand", "Silvester am Strand", "Kenting National Park", "Little Bay"],
      earlyBook: true,
      days: [
        {
          day: 1, date: "2026-12-23", jetlag: false,
          slots: {
            morning: [
              { name: "Anreise nach Kenting (Bus/Mietwagen)", coords: { lat: 21.9400, lng: 120.8500 }, price: { eur: 10, note: "Bus oder Taxi" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9400,120.8500", tip: "Mietwagen sehr empfehlenswert für Kenting — mehr Flexibilität", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "White Sand Beach (白沙灣)", coords: { lat: 21.9467, lng: 120.7856 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9467,120.7856", tip: "Feiner weißer Sand, flaches Wasser — perfekt für Kleinkinder", category: "strand" }
            ]
          }
        },
        {
          day: 2, date: "2026-12-24", jetlag: false,
          slots: {
            morning: [
              { name: "Kenting National Park Visitor Center", coords: { lat: 21.9540, lng: 120.8015 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9540,120.8015", tip: "Infos über Nationalpark-Aktivitäten", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Heilige Nacht am Strand", coords: { lat: 21.9400, lng: 120.8500 }, price: { eur: 0, note: "" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9400,120.8500", tip: "Weihnachten unter Palmen", category: "strand" }
            ]
          }
        },
        {
          day: 3, date: "2026-12-25", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 4, date: "2026-12-26", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 5, date: "2026-12-27", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 6, date: "2026-12-28", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 7, date: "2026-12-29", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 8, date: "2026-12-30", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 9,
          date: "2026-12-31",
          jetlag: false,
          slots: {
            morning: [
              { name: "Maobitou Park (猫鼻頭公園)", coords: { lat: 21.9000, lng: 120.7300 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9000,120.7300", tip: "Südlichster Punkt Taiwans", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Silvester-Feier am Strand", coords: { lat: 21.9400, lng: 120.8500 }, price: { eur: 10, note: "Essen + Drinks" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9400,120.8500", tip: "Kind früh ins Bett, Erwachsene genießen Feuerwerk am Strand", category: "feier" }
            ]
          }
        },
        {
          day: 10, date: "2027-01-01", jetlag: false,
          slots: {
            morning: [
              { name: "Neujahr-Sonnenaufgang", coords: { lat: 21.9400, lng: 120.8500 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9400,120.8500", tip: "Früh aufstehen lohnt sich", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Little Bay (小灣)", coords: { lat: 21.9445, lng: 120.8089 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=21.9445,120.8089", tip: "Ruhige Bucht, flaches Wasser", category: "strand" }
            ]
          }
        }
      ]
    },

    {
      id: 7,
      name: "Tainan",
      region: "Tainan",
      emoji: "🦩",
      nights: 13,
      startDate: "2027-01-02",
      endDate:   "2027-01-15",
      color: "#3B82F6",  // --phase-7 in CSS
      base: { lat: 22.9998, lng: 120.2270 },
      highlights: ["Chihkan Tower", "Anping Fort", "Tempel-Hopping", "Tainan Nachtmarkt"],
      earlyBook: false,
      days: [
        {
          day: 1, date: "2027-01-02", jetlag: false,
          slots: {
            morning: [
              { name: "Anreise Kenting → Tainan", coords: { lat: 22.9998, lng: 120.2270 }, price: { eur: 10, note: "Bus/Zug" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.9998,120.2270", tip: "Ca. 2h mit Bus, Zug von Zuoying/Kaohsiung auch möglich", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Chihkan Tower (赤崁樓)", coords: { lat: 22.9969, lng: 120.2033 }, price: { eur: 3, note: "ca. TWD 100" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.9969,120.2033", tip: "Niederländisches Fort, gut restauriert, buggy-freundlich", category: "museum" }
            ]
          }
        },
        {
          day: 2, date: "2027-01-03", jetlag: false,
          slots: {
            morning: [
              { name: "Anping Old Fort (安平古堡)", coords: { lat: 23.0026, lng: 120.1576 }, price: { eur: 3, note: "ca. TWD 100" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.0026,120.1576", tip: "Ältestes Fort Taiwans, schöne Aussicht", category: "museum" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Tainan Night Market (花園夜市)", coords: { lat: 22.9874, lng: 120.1953 }, price: { eur: 8, note: "Essen" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.9874,120.1953", tip: "Nur Donnerstag/Samstag/Sonntag, riesig und günstig", category: "food" }
            ]
          }
        },
        {
          day: 3, date: "2027-01-04", jetlag: false,
          slots: {
            morning: [
              { name: "Confucius Temple Tainan (孔廟)", coords: { lat: 23.0016, lng: 120.2036 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.0016,120.2036", tip: "Ältester Konfuzius-Tempel Taiwans (1665)", category: "tempel" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Chimei Museum (奇美博物館)", coords: { lat: 22.9637, lng: 120.1943 }, price: { eur: 5, note: "ca. TWD 200" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=22.9637,120.1943", tip: "Fantastische Sammlung, riesige Hallen — Buggy ideal", category: "museum" }
            ]
          }
        },
        {
          day: 4, date: "2027-01-05", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 5, date: "2027-01-06", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 6, date: "2027-01-07", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 7, date: "2027-01-08", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 8, date: "2027-01-09", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 9, date: "2027-01-10", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 10, date: "2027-01-11", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 11, date: "2027-01-12", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 12, date: "2027-01-13", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 13, date: "2027-01-14", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        }
      ]
    },

    {
      id: 8,
      name: "Alishan",
      region: "Alishan",
      emoji: "🌄",
      nights: 5,
      startDate: "2027-01-15",
      endDate:   "2027-01-20",
      color: "#84CC16",  // --phase-8 in CSS
      base: { lat: 23.5118, lng: 120.8039 },
      highlights: ["Alishan Forest Railway", "Sacred Tree", "Sonnenaufgang Zhushan", "Fenqihu Tagesausflug"],
      earlyBook: true,
      days: [
        {
          day: 1, date: "2027-01-15", jetlag: false,
          slots: {
            morning: [
              { name: "Zug/Bus nach Alishan (2300m ü.M.)", coords: { lat: 23.5118, lng: 120.8039 }, price: { eur: 8, note: "Bus TWD 325 oder Zug" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", tip: "Warme Kleidung! Bergzug spektakulär aber langsam", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Alishan Forest Railway Kurzstrecke", coords: { lat: 23.5118, lng: 120.8039 }, price: { eur: 8, note: "TWD 300" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", tip: "Buggy im Zug — prüfen ob möglich, sonst Kind tragen", category: "aktivität" }
            ]
          }
        },
        {
          day: 2, date: "2027-01-16", jetlag: false,
          slots: {
            morning: [
              { name: "Sonnenaufgang Zhushan (祝山)", coords: { lat: 23.5050, lng: 120.8000 }, price: { eur: 3, note: "Bergbahn TWD 100" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5050,120.8000", tip: "03:30 Uhr aufstehen! Thermosklappe mitbringen. Kind im Tragetuch", category: "natur" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Sacred Tree Area (受鎮宮)", coords: { lat: 23.5107, lng: 120.8042 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.5107,120.8042", tip: "Uralte Zypressenallee, magische Atmosphäre", category: "natur" }
            ]
          }
        },
        {
          day: 3, date: "2027-01-17", jetlag: false,
          slots: {
            morning: [
              { name: "Fenqihu Old Street Tagesausflug (奮起湖)", coords: { lat: 23.5647, lng: 120.7034 }, price: { eur: 5, note: "Zug Fenqihu" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.5647,120.7034", tip: "Charmantes Bergstädtchen mit altem Bahnhof, vegane Bento-Boxen", category: "ausflug" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Alishan-Spaziergang Waldpfade", coords: { lat: 23.5118, lng: 120.8039 }, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", tip: "Kühlere Temperaturen — Fleecejacke für Kind", category: "wandern" }
            ]
          }
        },
        {
          day: 4, date: "2027-01-18", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 5, date: "2027-01-19", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        }
      ]
    },

    {
      id: 9,
      name: "Sun Moon Lake",
      region: "Sun Moon Lake",
      emoji: "🌊",
      nights: 4,
      startDate: "2027-01-20",
      endDate:   "2027-01-24",
      color: "#F97316",  // --phase-9 in CSS
      base: { lat: 23.8650, lng: 120.9092 },
      highlights: ["Sun Moon Lake Cableway", "Wenwu Temple", "Seefahrt", "Formosan Aboriginal Culture Village"],
      earlyBook: false,
      days: [
        {
          day: 1, date: "2027-01-20", jetlag: false,
          slots: {
            morning: [
              { name: "Bus Alishan → Sun Moon Lake", coords: { lat: 23.8650, lng: 120.9092 }, price: { eur: 8, note: "Bus TWD 350" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8650,120.9092", tip: "Ca. 2.5h Busfahrt durch Berglandschaft", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Sun Moon Lake Cableway (日月潭纜車)", coords: { lat: 23.8460, lng: 120.9198 }, price: { eur: 6, note: "TWD 250" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8460,120.9198", tip: "Gondel über den See — Kleinkinder lieben es", category: "aktivität" }
            ]
          }
        },
        {
          day: 2, date: "2027-01-21", jetlag: false,
          slots: {
            morning: [
              { name: "Wenwu Temple (文武廟)", coords: { lat: 23.8840, lng: 120.9169 }, price: { eur: 0, note: "gratis" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8840,120.9169", tip: "Imposanter Tempel über dem See, spektakuläre Aussicht", category: "tempel" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Seefahrt Sun Moon Lake", coords: { lat: 23.8650, lng: 120.9092 }, price: { eur: 5, note: "Boot TWD 200" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8650,120.9092", tip: "Schiff-Tour rund um den See, ca. 45min", category: "aktivität" }
            ]
          }
        },
        {
          day: 3, date: "2027-01-22", jetlag: false,
          slots: {
            morning: [
              { name: "Formosan Aboriginal Culture Village (九族文化村)", coords: { lat: 23.8467, lng: 120.9244 }, price: { eur: 15, note: "TWD 620" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8467,120.9244", tip: "Vergnügungspark + Kulturpark, Gondel inkl., Kind-freundlich", category: "ausflug" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Seerunde Fahrrad", coords: { lat: 23.8650, lng: 120.9092 }, price: { eur: 5, note: "Fahrrad TWD 200" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=23.8650,120.9092", tip: "Kindersitz mieten, 33km Rundweg", category: "aktivität" }
            ]
          }
        },
        {
          day: 4, date: "2027-01-23", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        }
      ]
    },

    {
      id: 10,
      name: "Taipei (Rückreise)",
      region: "Taipei",
      emoji: "✈️",
      nights: 5,
      startDate: "2027-01-24",
      endDate:   "2027-01-29",
      color: "#EF4444",  // --phase-10 in CSS
      base: { lat: 25.0330, lng: 121.5654 },
      highlights: ["Taipei 101", "Beitou Hot Springs", "Maokong Gondola", "Danshui Old Street", "Letzter Abend"],
      earlyBook: false,
      days: [
        {
          day: 1, date: "2027-01-24", jetlag: false,
          slots: {
            morning: [
              { name: "THSR Sun Moon Lake → Taipei", coords: { lat: 25.0330, lng: 121.5654 }, price: { eur: 25, note: "THSR ca. TWD 1080" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0330,121.5654", tip: "Hochgeschwindigkeitszug, 2h, Buggy platzsparend falten", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Taipei 101 Aussichtsplattform", coords: { lat: 25.0338, lng: 121.5645 }, price: { eur: 15, note: "ca. TWD 600" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0338,121.5645", tip: "Lift auf 89. Stock, spektakuläre Aussicht auf Taipei", category: "sehens" }
            ]
          }
        },
        {
          day: 2, date: "2027-01-25", jetlag: false,
          slots: {
            morning: [
              { name: "Beitou Hot Springs (北投溫泉)", coords: { lat: 25.1369, lng: 121.5071 }, price: { eur: 8, note: "Therme TWD 350" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.1369,121.5071", tip: "Natrium-Radioaktive Quelle — Altersbeschränkung Kinder klären!", category: "wellness" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Danshui Old Street (淡水老街)", coords: { lat: 25.1700, lng: 121.4400 }, price: { eur: 5, note: "Snacks" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.1700,121.4400", tip: "MRT direkte Verbindung, Fischkuchen + Donuts typisch", category: "ausflug" }
            ]
          }
        },
        {
          day: 3, date: "2027-01-26", jetlag: false,
          slots: {
            morning: [
              { name: "Maokong Gondola (貓空纜車)", coords: { lat: 24.9739, lng: 121.5834 }, price: { eur: 3, note: "TWD 120" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=24.9739,121.5834", tip: "Seilbahn übers Teeplantagen-Tal, Glasbodenkabin Option", category: "aktivität" }
            ],
            nap: "12:00–14:30",
            afternoon: [
              { name: "Letzte Shopping-Runde Ximending", coords: { lat: 25.0444, lng: 121.5082 }, price: { eur: 10, note: "Shopping" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0444,121.5082", tip: "Fußgängerzone, gut mit Buggy navigierbar", category: "shopping" }
            ]
          }
        },
        {
          day: 4, date: "2027-01-27", jetlag: false,
          slots: { morning: [], nap: "12:00–14:30", afternoon: [] }
        },
        {
          day: 5, date: "2027-01-28", jetlag: false,
          slots: {
            morning: [
              { name: "Abreise zum Flughafen Taoyuan", coords: { lat: 25.0797, lng: 121.2342 }, price: { eur: 4, note: "MRT" }, buggyFriendly: true, googleMapsUrl: "https://maps.google.com/?q=25.0797,121.2342", tip: "MRT Airport Express, 40min, Gepäck rechtzeitig organisieren", category: "transport" }
            ],
            nap: "12:00–14:30",
            afternoon: []
          }
        }
      ]
    }
  ],

  // ============================================================
  // sights — ~50 Sehenswürdigkeiten mit GPS-Koordinaten
  // Typen: "daytrip" (Tagesausflug), "multiday" (mehrere Tage), "base" (Basis-Sight)
  // ============================================================
  sights: [
    // Phase 1 — Taipei
    { id: "sight-001", phaseId: 1, name: "Shilin Night Market", type: "base", lat: 25.0881, lng: 121.5240, price: { eur: 8, note: "Essen vor Ort" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.0881,121.5240", tags: ["food","nacht"], openQuestion: null, tip: "Vegane Optionen gut verfügbar" },
    { id: "sight-002", phaseId: 1, name: "Elephant Mountain", type: "base", lat: 25.0264, lng: 121.5773, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=25.0264,121.5773", tags: ["natur","aussicht"], openQuestion: null, tip: "Treppen — Kind tragen" },
    { id: "sight-003", phaseId: 1, name: "National Palace Museum", type: "base", lat: 25.1025, lng: 121.5484, price: { eur: 6, note: "TWD 200" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.1025,121.5484", tags: ["museum","kultur"], openQuestion: null, tip: "Jade-Cabbage + Meat Stone sind Highlights" },
    { id: "sight-004", phaseId: 1, name: "Longshan Temple", type: "base", lat: 25.0370, lng: 121.4997, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.0370,121.4997", tags: ["tempel","kultur"], openQuestion: null, tip: "Buggy-freundlich, ruhige Atmosphäre" },
    { id: "sight-005", phaseId: 1, name: "Jiufen Old Street", type: "daytrip", lat: 25.1089, lng: 121.8444, price: { eur: 5, note: "Bus + Essen" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=25.1089,121.8444", tags: ["culture","ausflug"], openQuestion: null, tip: "Viele Stufen — mit Kleinkind anstrengend" },
    { id: "sight-006", phaseId: 1, name: "Taipei 101", type: "base", lat: 25.0338, lng: 121.5645, price: { eur: 15, note: "TWD 600" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.0338,121.5645", tags: ["aussicht","iconic"], openQuestion: null, tip: "Lift auf 89. Stock, Buggy im Lift möglich" },

    // Phase 2 — Hualien
    { id: "sight-011", phaseId: 2, name: "Taroko National Park — Swallow Grotto", type: "base", lat: 24.1574, lng: 121.6216, price: { eur: 0, note: "gratis, Helm Pflicht" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1574,121.6216", tags: ["natur","wandern"], openQuestion: null, tip: "Schutzhelm Pflicht — leihen am Eingang" },
    { id: "sight-012", phaseId: 2, name: "Shakadang Trail", type: "base", lat: 24.1452, lng: 121.6199, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1452,121.6199", tags: ["wandern","natur"], openQuestion: null, tip: "Flacher Weg am Fluss — mit Kind gut machbar" },
    { id: "sight-013", phaseId: 2, name: "Qixingtan Beach", type: "base", lat: 24.0372, lng: 121.6478, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=24.0372,121.6478", tags: ["strand","sonnenuntergang"], openQuestion: null, tip: "Kieselstrand, Buggy gut möglich" },
    { id: "sight-014", phaseId: 2, name: "Liyu Lake (鯉魚潭)", type: "base", lat: 23.8979, lng: 121.5500, price: { eur: 3, note: "Boot mieten" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.8979,121.5500", tags: ["natur","see"], openQuestion: null, tip: "Boot mieten, Fahrradweg um den See" },
    { id: "sight-015", phaseId: 2, name: "Taroko — Tianxiang", type: "base", lat: 24.1879, lng: 121.5983, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=24.1879,121.5983", tags: ["natur","tempel"], openQuestion: null, tip: "Höhepunkt des Taroko-Tals" },

    // Phase 3 — East Rift Valley
    { id: "sight-021", phaseId: 3, name: "Luye Highland Heißluftballon", type: "base", lat: 23.0681, lng: 121.1437, price: { eur: 15, note: "TWD 600" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.0681,121.1437", tags: ["aktivität","aussicht"], openQuestion: "Kind 2J erlaubt im Ballon?", tip: "Morgens früh los" },
    { id: "sight-022", phaseId: 3, name: "Chishang Bike Path (伯朗大道)", type: "base", lat: 23.2165, lng: 121.1818, price: { eur: 3, note: "Fahrradmiete" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.2165,121.1818", tags: ["natur","fahrrad"], openQuestion: null, tip: "Ikonische Reisfeld-Strasse" },
    { id: "sight-023", phaseId: 3, name: "Ruisui Hot Springs", type: "base", lat: 23.4965, lng: 121.3870, price: { eur: 5, note: "Eintritt" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.4965,121.3870", tags: ["wellness"], openQuestion: "Altersbeschränkung Kinder?", tip: "Natrium-Bicarbonat-Quelle" },
    { id: "sight-024", phaseId: 3, name: "Tropic of Cancer Monument", type: "base", lat: 23.5000, lng: 121.4200, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.5000,121.4200", tags: ["sehens"], openQuestion: null, tip: "Foto-Stop auf dem Weg" },

    // Phase 4 — Taitung
    { id: "sight-031", phaseId: 4, name: "Xiaoyeliu Geopark (小野柳)", type: "base", lat: 22.8267, lng: 121.1417, price: { eur: 2, note: "TWD 80" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.8267,121.1417", tags: ["natur","geologie"], openQuestion: null, tip: "Bizarre Felsformationen, gut für Kleinkinder" },
    { id: "sight-032", phaseId: 4, name: "Jhihben Hot Springs", type: "base", lat: 22.7158, lng: 120.9978, price: { eur: 8, note: "Hotel Therme" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.7158,120.9978", tags: ["wellness"], openQuestion: null, tip: "Schwefelquelle, Indoorpool" },
    { id: "sight-033", phaseId: 4, name: "Green Island Tagesausflug", type: "daytrip", lat: 22.6715, lng: 121.4869, price: { eur: 25, note: "Fähre + Moped" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.6715,121.4869", tags: ["ausflug","insel"], openQuestion: null, tip: "30min Fähre, Moped auf der Insel" },
    { id: "sight-034", phaseId: 4, name: "Taitung Seashore Park", type: "base", lat: 22.7500, lng: 121.1600, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.7500,121.1600", tags: ["strand","natur"], openQuestion: null, tip: "Schöne Strandpromenade" },

    // Phase 5 — Xiaoliuqiu
    { id: "sight-041", phaseId: 5, name: "Vase Rock (花瓶岩)", type: "base", lat: 22.3457, lng: 120.3713, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.3457,120.3713", tags: ["natur","iconic"], openQuestion: null, tip: "Wahrzeichen der Insel" },
    { id: "sight-042", phaseId: 5, name: "Sunset Beach (落日亭)", type: "base", lat: 22.3384, lng: 120.3684, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.3384,120.3684", tags: ["strand","sonnenuntergang"], openQuestion: null, tip: "Schönster Sonnenuntergang der Reise" },
    { id: "sight-043", phaseId: 5, name: "Glasbodenboot Tour", type: "base", lat: 22.3400, lng: 120.3700, price: { eur: 18, note: "TWD 750" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tags: ["aktivität","meer"], openQuestion: "Altersbeschränkung Kind 2J?", tip: "Im Voraus buchen" },
    { id: "sight-044", phaseId: 5, name: "Schildkröten-Schnorcheln", type: "base", lat: 22.3400, lng: 120.3700, price: { eur: 15, note: "TWD 600" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", tags: ["aktivität","meer"], openQuestion: null, tip: "Abwechseln: einer schnorchelt, anderer mit Kind" },
    { id: "sight-045", phaseId: 5, name: "Meerschildkröten-Spot", type: "base", lat: 22.3420, lng: 120.3720, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=22.3420,120.3720", tags: ["natur","meer"], openQuestion: null, tip: "Schildkröten kommen ans Ufer — kein Berühren!" },

    // Phase 6 — Kenting
    { id: "sight-051", phaseId: 6, name: "Kenting National Park Visitor Center", type: "base", lat: 21.9540, lng: 120.8015, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=21.9540,120.8015", tags: ["natur","info"], openQuestion: null, tip: "Gute Infos + Karte des Parks" },
    { id: "sight-052", phaseId: 6, name: "White Sand Beach (白沙灣)", type: "base", lat: 21.9467, lng: 120.7856, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=21.9467,120.7856", tags: ["strand"], openQuestion: null, tip: "Feiner weißer Sand, flaches Wasser für Kinder" },
    { id: "sight-053", phaseId: 6, name: "Little Bay (小灣)", type: "base", lat: 21.9445, lng: 120.8089, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=21.9445,120.8089", tags: ["strand"], openQuestion: null, tip: "Ruhiger, gut geschützter Strand" },
    { id: "sight-054", phaseId: 6, name: "Maobitou Park (猫鼻頭)", type: "base", lat: 21.9000, lng: 120.7300, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=21.9000,120.7300", tags: ["natur","südlichsterpunkt"], openQuestion: null, tip: "Südlichster Punkt Taiwans" },
    { id: "sight-055", phaseId: 6, name: "Eluanbi Lighthouse (鵝鑾鼻)", type: "base", lat: 21.9000, lng: 120.8500, price: { eur: 1, note: "TWD 40" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=21.9000,120.8500", tags: ["sehens","leuchtturm"], openQuestion: null, tip: "Hellster Leuchtturm Asiens, buggy-freundlich" },

    // Phase 7 — Tainan
    { id: "sight-061", phaseId: 7, name: "Chihkan Tower (赤崁樓)", type: "base", lat: 22.9969, lng: 120.2033, price: { eur: 3, note: "TWD 100" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.9969,120.2033", tags: ["museum","geschichte"], openQuestion: null, tip: "Niederländisches Fort, gut restauriert" },
    { id: "sight-062", phaseId: 7, name: "Confucius Temple Tainan", type: "base", lat: 23.0016, lng: 120.2036, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.0016,120.2036", tags: ["tempel","geschichte"], openQuestion: null, tip: "Ältester Konfuzius-Tempel Taiwans" },
    { id: "sight-063", phaseId: 7, name: "Anping Old Fort (安平古堡)", type: "base", lat: 23.0026, lng: 120.1576, price: { eur: 3, note: "TWD 100" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.0026,120.1576", tags: ["museum","geschichte"], openQuestion: null, tip: "Ältestes Fort Taiwans, schöne Aussicht" },
    { id: "sight-064", phaseId: 7, name: "Tainan Night Market (花園夜市)", type: "base", lat: 22.9874, lng: 120.1953, price: { eur: 8, note: "Essen" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.9874,120.1953", tags: ["food","nacht"], openQuestion: null, tip: "Nur Do/Sa/So, riesig und günstig" },
    { id: "sight-065", phaseId: 7, name: "Chimei Museum (奇美博物館)", type: "base", lat: 22.9637, lng: 120.1943, price: { eur: 5, note: "TWD 200" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=22.9637,120.1943", tags: ["museum","kunst"], openQuestion: null, tip: "Fantastische Sammlung, Buggy ideal" },

    // Phase 8 — Alishan
    { id: "sight-071", phaseId: 8, name: "Alishan Forest Railway", type: "base", lat: 23.5118, lng: 120.8039, price: { eur: 8, note: "TWD 300" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", tags: ["aktivität","historic"], openQuestion: "Buggy im Zug erlaubt?", tip: "Historische Bergbahn" },
    { id: "sight-072", phaseId: 8, name: "Sacred Tree Area", type: "base", lat: 23.5107, lng: 120.8042, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.5107,120.8042", tags: ["natur","wald"], openQuestion: null, tip: "Uralte Zypressenallee" },
    { id: "sight-073", phaseId: 8, name: "Sunrise Viewing Zhushan", type: "base", lat: 23.5050, lng: 120.8000, price: { eur: 3, note: "Bergbahn TWD 100" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5050,120.8000", tags: ["natur","sonnenaufgang"], openQuestion: null, tip: "03:30 Uhr aufstehen! Kind im Tragetuch" },
    { id: "sight-074", phaseId: 8, name: "Fenqihu Old Street", type: "daytrip", lat: 23.5647, lng: 120.7034, price: { eur: 5, note: "Zug + Essen" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.5647,120.7034", tags: ["ausflug","historic"], openQuestion: null, tip: "Charmantes Bergstädtchen, vegane Bento-Boxen" },
    { id: "sight-075", phaseId: 8, name: "Alishan Waldpfade", type: "base", lat: 23.5118, lng: 120.8039, price: { eur: 0, note: "gratis" }, buggyFriendly: false, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", tags: ["wandern","natur"], openQuestion: null, tip: "Fleecejacke für Kind — kalt auf 2300m" },

    // Phase 9 — Sun Moon Lake
    { id: "sight-081", phaseId: 9, name: "Sun Moon Lake Cableway", type: "base", lat: 23.8460, lng: 120.9198, price: { eur: 6, note: "TWD 250" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.8460,120.9198", tags: ["aktivität","aussicht"], openQuestion: null, tip: "Gondel über den See, Kleinkinder lieben es" },
    { id: "sight-082", phaseId: 9, name: "Wenwu Temple", type: "base", lat: 23.8840, lng: 120.9169, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.8840,120.9169", tags: ["tempel","aussicht"], openQuestion: null, tip: "Imposanter Tempel, spektakuläre Aussicht" },
    { id: "sight-083", phaseId: 9, name: "Formosan Aboriginal Culture Village", type: "daytrip", lat: 23.8467, lng: 120.9244, price: { eur: 15, note: "TWD 620" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.8467,120.9244", tags: ["ausflug","kultur","freizeitpark"], openQuestion: null, tip: "Vergnügungspark + Kulturpark, Kind-freundlich" },
    { id: "sight-084", phaseId: 9, name: "Seerunde Sun Moon Lake (Boot)", type: "base", lat: 23.8650, lng: 120.9092, price: { eur: 5, note: "TWD 200" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=23.8650,120.9092", tags: ["aktivität","see"], openQuestion: null, tip: "Schiff-Tour ca. 45min" },

    // Phase 10 — Taipei Rückreise
    { id: "sight-091", phaseId: 10, name: "Taipei 101 (Rückreise)", type: "base", lat: 25.0338, lng: 121.5645, price: { eur: 15, note: "TWD 600" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.0338,121.5645", tags: ["aussicht","iconic"], openQuestion: null, tip: "Lift 89. Stock, Buggy möglich" },
    { id: "sight-092", phaseId: 10, name: "Beitou Hot Springs", type: "base", lat: 25.1369, lng: 121.5071, price: { eur: 8, note: "TWD 350" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.1369,121.5071", tags: ["wellness"], openQuestion: "Altersbeschränkung Kinder prüfen", tip: "Radio-aktive Natrium-Quelle — einzigartig" },
    { id: "sight-093", phaseId: 10, name: "Maokong Gondola (貓空)", type: "base", lat: 24.9739, lng: 121.5834, price: { eur: 3, note: "TWD 120" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=24.9739,121.5834", tags: ["aktivität","aussicht"], openQuestion: null, tip: "Glasbodenkabin, Teeplantagen-Aussicht" },
    { id: "sight-094", phaseId: 10, name: "Danshui Old Street", type: "daytrip", lat: 25.1700, lng: 121.4400, price: { eur: 5, note: "Snacks" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.1700,121.4400", tags: ["ausflug","historic"], openQuestion: null, tip: "MRT direkte Verbindung, fußgängerfreundlich" },
    { id: "sight-095", phaseId: 10, name: "Ximending Fußgängerzone", type: "base", lat: 25.0444, lng: 121.5082, price: { eur: 0, note: "gratis" }, buggyFriendly: true,  googleMapsUrl: "https://maps.google.com/?q=25.0444,121.5082", tags: ["shopping","food"], openQuestion: null, tip: "Jugendkultur, vegane Restaurants vorhanden" }
  ],

  // ============================================================
  // restaurants — vegetarisch/vegan nach Phase
  // ============================================================
  restaurants: [
    { id: "rest-001", phaseId: 1,  name: "Loving Hut Taipei (Da'an)",         type: "vegan",         pricePerPerson: { eur: 6 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=25.0390,121.5500", note: "International vegane Kette, sehr gute Qualität" },
    { id: "rest-002", phaseId: 1,  name: "HERBIVORE Taipei",                   type: "vegan",         pricePerPerson: { eur: 8 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=25.0440,121.5270", note: "Hipster veganes Café, englische Karte" },
    { id: "rest-003", phaseId: 2,  name: "Vege Creek Hualien",                 type: "vegan",         pricePerPerson: { eur: 5 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", note: "Lokale vegane Bowls, günstig und frisch" },
    { id: "rest-004", phaseId: 2,  name: "Hualien Buddhist Vegetarian",        type: "vegetarisch",   pricePerPerson: { eur: 4 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=23.9769,121.6044", note: "Klassische taiwanesische Tempel-Küche" },
    { id: "rest-005", phaseId: 3,  name: "East Rift Valley Organic Farm Stay", type: "veg-option",    pricePerPerson: { eur: 7 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=23.4700,121.3900", note: "Bio-Farmküche, viele vegetarische Optionen" },
    { id: "rest-006", phaseId: 4,  name: "Taitung Vegetarische Buffet",        type: "vegetarisch",   pricePerPerson: { eur: 4 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=22.7583,121.1444", note: "All-You-Can-Eat vegetarisch, Tempelküche-Stil" },
    { id: "rest-007", phaseId: 5,  name: "Xiaoliuqiu Beach Café (vegan menu)", type: "veg-option",    pricePerPerson: { eur: 6 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=22.3400,120.3700", note: "Hafennähe, frische Smoothie Bowls" },
    { id: "rest-008", phaseId: 6,  name: "Vegan Heaven Kenting",               type: "vegan",         pricePerPerson: { eur: 7 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=21.9400,120.8500", note: "Speziell vegane Küche in Kenting, beliebt" },
    { id: "rest-009", phaseId: 6,  name: "Kenting Night Market (vegan stalls)", type: "veg-option",   pricePerPerson: { eur: 5 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=21.9600,120.8350", note: "Viele vegane Stände erkennbar am 素 Symbol" },
    { id: "rest-010", phaseId: 7,  name: "Grandma Nitti's Kitchen Tainan",    type: "veg-option",    pricePerPerson: { eur: 8 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=22.9998,120.2270", note: "International, vegane Optionen vorhanden" },
    { id: "rest-011", phaseId: 7,  name: "Shang Yan Buddhist Vegetarian",     type: "vegetarisch",   pricePerPerson: { eur: 4 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=22.9969,120.2033", note: "Günstig, authentisch, Tempel-Atmosphäre" },
    { id: "rest-012", phaseId: 8,  name: "Alishan Organic Teahouse",          type: "veg-option",    pricePerPerson: { eur: 6 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=23.5118,120.8039", note: "Tee + leichte vegane Bento-Snacks" },
    { id: "rest-013", phaseId: 9,  name: "Sun Moon Lake Veggie Restaurant",   type: "vegetarisch",   pricePerPerson: { eur: 7 },  veganSymbol: false, googleMapsUrl: "https://maps.google.com/?q=23.8650,120.9092", note: "Seeblick, lokale Spezialitäten vegetarisch" },
    { id: "rest-014", phaseId: 10, name: "Loving Hut Taipei (Shida)",         type: "vegan",         pricePerPerson: { eur: 6 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=25.0220,121.5310", note: "Nähe Universität, günstiger als City-Center" },
    { id: "rest-015", phaseId: 10, name: "Mianto Vegan Taipei",               type: "vegan",         pricePerPerson: { eur: 9 },  veganSymbol: true,  googleMapsUrl: "https://maps.google.com/?q=25.0440,121.5200", note: "Fine Dining vegan, besonderer Abschiedsabend" }
  ],

  // ============================================================
  // videos — 20 kuratierte YouTube-Videos
  // youtubeId: Platzhalter bis Mark echte IDs einträgt
  // ============================================================
  videos: [
    { id: "vid-001", title: "Taiwan Ostküste mit Kind — Hualien & Taroko", youtubeId: "PLACEHOLDER_VID_001", category: "ostküste",   phaseIds: [2,3] },
    { id: "vid-002", title: "Taroko National Park kompletter Guide",        youtubeId: "PLACEHOLDER_VID_002", category: "ostküste",   phaseIds: [2] },
    { id: "vid-003", title: "Kenting Beaches — Familienguide",              youtubeId: "PLACEHOLDER_VID_003", category: "kenting",    phaseIds: [6] },
    { id: "vid-004", title: "Kenting Silvester am Strand — Was erwartet",  youtubeId: "PLACEHOLDER_VID_004", category: "kenting",    phaseIds: [6] },
    { id: "vid-005", title: "Tempel-Tour Tainan — alle Highlights",         youtubeId: "PLACEHOLDER_VID_005", category: "tempel",     phaseIds: [7] },
    { id: "vid-006", title: "Taiwan Tempel-Etikette für Touristen",         youtubeId: "PLACEHOLDER_VID_006", category: "tempel",     phaseIds: [1,7] },
    { id: "vid-007", title: "Xiaoliuqiu Schildkröten-Erlebnis",            youtubeId: "PLACEHOLDER_VID_007", category: "xiaoliuqiu", phaseIds: [5] },
    { id: "vid-008", title: "Xiaoliuqiu Insel komplett in 1 Tag",           youtubeId: "PLACEHOLDER_VID_008", category: "xiaoliuqiu", phaseIds: [5] },
    { id: "vid-009", title: "Taiwan mit Baby und Kleinkind — Tipps",        youtubeId: "PLACEHOLDER_VID_009", category: "familie",    phaseIds: [1,2,3,4,5,6,7,8,9,10] },
    { id: "vid-010", title: "Taiwan Reise mit 2-Jährigem — Erfahrungsbericht", youtubeId: "PLACEHOLDER_VID_010", category: "familie", phaseIds: [1,2,3,4,5,6,7,8,9,10] },
    { id: "vid-011", title: "Taiwan Reiseguide auf Deutsch — Überblick",    youtubeId: "PLACEHOLDER_VID_011", category: "deutsch",    phaseIds: [1,2,3,4,5,6,7,8,9,10] },
    { id: "vid-012", title: "Taiwan Winterurlaub Deutsch — 59 Tage",        youtubeId: "PLACEHOLDER_VID_012", category: "deutsch",    phaseIds: [1,2,3,4,5,6,7,8,9,10] },
    { id: "vid-013", title: "Taiwan THSR + Bus System erklärt",             youtubeId: "PLACEHOLDER_VID_013", category: "transport",  phaseIds: [1,7,10] },
    { id: "vid-014", title: "Taiwan Zug buchen — Schritt für Schritt",      youtubeId: "PLACEHOLDER_VID_014", category: "transport",  phaseIds: [1,2,3,4,7,10] },
    { id: "vid-015", title: "Alishan Sonnenaufgang — wie planen",           youtubeId: "PLACEHOLDER_VID_015", category: "alishan",    phaseIds: [8] },
    { id: "vid-016", title: "Alishan Forest Railway — Bergbahn Erlebnis",   youtubeId: "PLACEHOLDER_VID_016", category: "alishan",    phaseIds: [8] },
    { id: "vid-017", title: "Taiwan Veganes Essen — wo und wie bestellen",  youtubeId: "PLACEHOLDER_VID_017", category: "familie",    phaseIds: [1,2,3,4,5,6,7,8,9,10] },
    { id: "vid-018", title: "Sun Moon Lake Guide — alle Aktivitäten",       youtubeId: "PLACEHOLDER_VID_018", category: "ostküste",   phaseIds: [9] },
    { id: "vid-019", title: "Taipei mit Kind — Top 10 Sehenswürdigkeiten",  youtubeId: "PLACEHOLDER_VID_019", category: "familie",    phaseIds: [1,10] },
    { id: "vid-020", title: "Taiwan Packliste Winter + Kleinkind",          youtubeId: "PLACEHOLDER_VID_020", category: "deutsch",    phaseIds: [1,2,3,4,5,6,7,8,9,10] }
  ],

  // ============================================================
  // booking — Unterkunfts-Links pro Phase
  // ============================================================
  booking: [
    {
      phaseId: 1,
      region: "Taipei",
      checkIn:  "2026-12-01",
      checkOut: "2026-12-03",
      nights: 2,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Taipei&checkin=2026-12-01&checkout=2026-12-03&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Taipei/homes?checkin=2026-12-01&checkout=2026-12-03&adults=2&children=1",
      criteria: { maxDistanceMetro: 500, buggyAccessible: true, notes: "Nähe MRT Station, keine Treppen zum Zimmer" },
      exampleHotels: [],
      kkdayToursPhase: []
    },
    {
      phaseId: 2,
      region: "Hualien",
      checkIn:  "2026-12-03",
      checkOut: "2026-12-10",
      nights: 7,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Hualien&checkin=2026-12-03&checkout=2026-12-10&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Hualien/homes?checkin=2026-12-03&checkout=2026-12-10&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Nähe Bahnhof, Auto-freundlich für Taroko-Ausflüge" },
      exampleHotels: [],
      kkdayToursPhase: ["Taroko Gorge Full Day Tour"]
    },
    {
      phaseId: 3,
      region: "Chishang",
      checkIn:  "2026-12-10",
      checkOut: "2026-12-15",
      nights: 5,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Chishang+Taiwan&checkin=2026-12-10&checkout=2026-12-15&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Chishang/homes?checkin=2026-12-10&checkout=2026-12-15&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Fahrradverleih vor Ort ideal, ruhige Lage" },
      exampleHotels: [],
      kkdayToursPhase: ["Luye Highland Balloon"]
    },
    {
      phaseId: 4,
      region: "Taitung",
      checkIn:  "2026-12-15",
      checkOut: "2026-12-18",
      nights: 3,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Taitung&checkin=2026-12-15&checkout=2026-12-18&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Taitung/homes?checkin=2026-12-15&checkout=2026-12-18&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Nähe Bahnhof oder mit Taxi erreichbar" },
      exampleHotels: [],
      kkdayToursPhase: ["Green Island Snorkeling"]
    },
    {
      phaseId: 5,
      region: "Liuqiu Island",
      checkIn:  "2026-12-18",
      checkOut: "2026-12-23",
      nights: 5,
      earlyBook: true,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Xiaoliuqiu+Taiwan&checkin=2026-12-18&checkout=2026-12-23&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Liuqiu-Island/homes?checkin=2026-12-18&checkout=2026-12-23&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Früh buchen! Begrenzte Unterkünfte auf der Insel" },
      exampleHotels: [],
      kkdayToursPhase: ["Glasbodenboot Xiaoliuqiu"]
    },
    {
      phaseId: 6,
      region: "Kenting",
      checkIn:  "2026-12-23",
      checkOut: "2027-01-02",
      nights: 10,
      earlyBook: true,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Kenting&checkin=2026-12-23&checkout=2027-01-02&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Kenting/homes?checkin=2026-12-23&checkout=2027-01-02&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "SILVESTER! Sehr früh buchen (6+ Monate). Strandnah" },
      exampleHotels: [],
      kkdayToursPhase: []
    },
    {
      phaseId: 7,
      region: "Tainan",
      checkIn:  "2027-01-02",
      checkOut: "2027-01-15",
      nights: 13,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Tainan&checkin=2027-01-02&checkout=2027-01-15&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Tainan/homes?checkin=2027-01-02&checkout=2027-01-15&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Airbnb empfehlenswert für 13N, Altstadt-Nähe" },
      exampleHotels: [],
      kkdayToursPhase: ["Tainan Temple Tour"]
    },
    {
      phaseId: 8,
      region: "Alishan",
      checkIn:  "2027-01-15",
      checkOut: "2027-01-20",
      nights: 5,
      earlyBook: true,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Alishan&checkin=2027-01-15&checkout=2027-01-20&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Alishan/homes?checkin=2027-01-15&checkout=2027-01-20&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Früh buchen! Begrenzt auf 2300m. Heizung Pflicht" },
      exampleHotels: [],
      kkdayToursPhase: ["Alishan Sonnenaufgang-Tour"]
    },
    {
      phaseId: 9,
      region: "Sun Moon Lake",
      checkIn:  "2027-01-20",
      checkOut: "2027-01-24",
      nights: 4,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Sun+Moon+Lake&checkin=2027-01-20&checkout=2027-01-24&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Sun-Moon-Lake/homes?checkin=2027-01-20&checkout=2027-01-24&adults=2&children=1",
      criteria: { maxDistanceMetro: 0, buggyAccessible: true, notes: "Seeblick wenn möglich, Fahrradverleih vor Ort" },
      exampleHotels: [],
      kkdayToursPhase: []
    },
    {
      phaseId: 10,
      region: "Taipei",
      checkIn:  "2027-01-24",
      checkOut: "2027-01-29",
      nights: 5,
      earlyBook: false,
      bookingUrl: "https://www.booking.com/searchresults.de.html?ss=Taipei&checkin=2027-01-24&checkout=2027-01-29&group_adults=2&group_children=1&age=2",
      airbnbUrl:  "https://www.airbnb.com/s/Taipei/homes?checkin=2027-01-24&checkout=2027-01-29&adults=2&children=1",
      criteria: { maxDistanceMetro: 500, buggyAccessible: true, notes: "Flughafennähe oder MRT-Airport-Express nötig" },
      exampleHotels: [],
      kkdayToursPhase: []
    }
  ],

  // ============================================================
  // tours — KKday / Klook Touren
  // ============================================================
  tours: [
    { id: "tour-001", name: "Glasbodenboot Xiaoliuqiu",     provider: "KKday", url: "https://www.kkday.com/de/product/glasbodenboot-xiaoliuqiu", phaseId: 5, priceEur: 18, buggyFriendly: true,  note: "Altersbeschränkung für 2J klären!" },
    { id: "tour-002", name: "Alishan Sonnenaufgang-Tour",   provider: "KKday", url: "https://www.kkday.com/de/product/alishan-sunrise",         phaseId: 8, priceEur: 25, buggyFriendly: false, note: "Sehr früh (03:00 Uhr). Kind im Tragetuch" },
    { id: "tour-003", name: "Taroko Gorge Full Day Tour",   provider: "KKday", url: "https://www.kkday.com/de/product/taroko-gorge-tour",        phaseId: 2, priceEur: 35, buggyFriendly: false, note: "Guter Guide erklärt Geologie. Kind = Tragegestell" },
    { id: "tour-004", name: "Tainan Temple Walking Tour",   provider: "KKday", url: "https://www.kkday.com/de/product/tainan-temple-tour",       phaseId: 7, priceEur: 15, buggyFriendly: true,  note: "Englischsprachige Führung, buggy-freundliche Routen" },
    { id: "tour-005", name: "Green Island Snorkeling Day",  provider: "KKday", url: "https://www.kkday.com/de/product/green-island-snorkeling",  phaseId: 4, priceEur: 30, buggyFriendly: false, note: "Fähre + Schnorchel inkl. Abwechseln mit Kind" }
  ],

  // ============================================================
  // faq — 8 offene Fragen
  // status: "open" = ungeklärt, "resolved" = geklärt
  // ============================================================
  faq: [
    {
      id: "faq-001",
      question: "Brauchen wir einen Taiwan-Führerschein oder internationalen Führerschein für Mietwagen?",
      answer: null,
      status: "open",
      phaseIds: [3,4,5,6,7,8,9],
      priority: "high",
      tip: "Internationaler Führerschein (aus AT/EU) + Lichtbildausweis sollte reichen — offiziell bestätigen"
    },
    {
      id: "faq-002",
      question: "Kinderwagenverleih auf Xiaoliuqiu verfügbar?",
      answer: null,
      status: "open",
      phaseIds: [5],
      priority: "high",
      tip: "Insel ist klein — eigener Buggy besser. Elektroroller-Sitz für Kind prüfen"
    },
    {
      id: "faq-003",
      question: "Glasbodenboot Xiaoliuqiu — gibt es Altersbeschränkung für 2-Jährige?",
      answer: null,
      status: "open",
      phaseIds: [5],
      priority: "high",
      tip: "Direkt beim Anbieter anfragen: KKday Produktseite oder Email"
    },
    {
      id: "faq-004",
      question: "Alishan Bergbahn (Forest Railway) — Buggy erlaubt im Waggon?",
      answer: null,
      status: "open",
      phaseIds: [8],
      priority: "medium",
      tip: "Waggons sind eng — Buggy falten und als Gepäck vermutlich machbar"
    },
    {
      id: "faq-005",
      question: "Silvester Kenting — müssen Hotels 6+ Monate im Voraus gebucht werden?",
      answer: null,
      status: "open",
      phaseIds: [6],
      priority: "critical",
      tip: "JA — Kenting zu Silvester extrem beliebt. Ab sofort buchen sobald Reise feststeht"
    },
    {
      id: "faq-006",
      question: "Jetlag-Plan für Kind 2J — schläft es im Langstreckenflug?",
      answer: null,
      status: "open",
      phaseIds: [1],
      priority: "medium",
      tip: "AUA nach Taiwan ca. 12-14h. Liegesitz für Kind prüfen, Bassinet beantragen"
    },
    {
      id: "faq-007",
      question: "Heißquellen (Beitou, Ruisui, Jhihben) — ab welchem Alter für Kinder erlaubt?",
      answer: null,
      status: "open",
      phaseIds: [2,8,10],
      priority: "medium",
      tip: "Manche Thermen: ab 6 Jahre. Bitte bei jeweiligem Betreiber anfragen"
    },
    {
      id: "faq-008",
      question: "THSR (Hochgeschwindigkeitszug) — Kindersitz oder Buggy-Regeln?",
      answer: null,
      status: "open",
      phaseIds: [1,2,7,10],
      priority: "low",
      tip: "Buggy muss gefaltet werden, Family Car-Abteile vorhanden — bei THSR.com.tw anfragen"
    }
  ],

  // ============================================================
  // charts — Daten für Chart.js Infografiken
  // ============================================================
  charts: {

    // Donut: Kostenverteilung (summiert auf 100%)
    // Berechnung: Flüge €3036 (28%), Unterkunft €3600 (33%), Essen €1500 (14%),
    // Transport €800 (7%), Eintritte €500 (5%), Mietwagen €800 (7%), Reserve €600 (6%) = 100%
    costs: {
      labels: ["Flüge", "Unterkunft", "Essen", "Transport", "Eintritte", "Mietwagen", "Reserve"],
      values: [28, 33, 14, 7, 5, 7, 6],
      colors: ["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#06B6D4","#3B82F6"]
    },

    // Balken: Nächte pro Phase
    nights: {
      labels: ["Taipei","Hualien","East Rift","Taitung","Xiaoliuqiu","Kenting","Tainan","Alishan","Sun Moon Lake","Taipei 2"],
      values: [2, 7, 5, 3, 5, 10, 13, 5, 4, 5],
      colors: ["#6366F1","#8B5CF6","#EC4899","#F59E0B","#10B981","#06B6D4","#3B82F6","#84CC16","#F97316","#EF4444"]
    },

    // Temperaturkurve: Min/Max pro Phase (Dezember–Januar)
    temperature: {
      labels: ["Taipei","Hualien","East Rift","Taitung","Xiaoliuqiu","Kenting","Tainan","Alishan","Sun Moon Lake","Taipei 2"],
      tempMin: [15, 14, 13, 16, 18, 18, 15,  6, 12, 12],
      tempMax: [22, 21, 22, 24, 26, 26, 24, 12, 18, 18]
    },

    // Scatter: Eintrittspreise (€) pro Sehenswürdigkeit
    entries: {
      data: [
        { label: "Taroko National Park",      eur: 0,  gratis: true,  phaseId: 2 },
        { label: "National Palace Museum",    eur: 6,  gratis: false, phaseId: 1 },
        { label: "Alishan Forest Railway",    eur: 8,  gratis: false, phaseId: 8 },
        { label: "Xiaoliuqiu Glasbodenboot",  eur: 18, gratis: false, phaseId: 5 },
        { label: "Kenting Nationalpark",      eur: 0,  gratis: true,  phaseId: 6 },
        { label: "Luye Highland Ballon",      eur: 15, gratis: false, phaseId: 3 },
        { label: "Longshan Temple",           eur: 0,  gratis: true,  phaseId: 1 },
        { label: "Chihkan Tower",             eur: 3,  gratis: false, phaseId: 7 },
        { label: "Chimei Museum",             eur: 5,  gratis: false, phaseId: 7 },
        { label: "Sun Moon Lake Cable",       eur: 6,  gratis: false, phaseId: 9 },
        { label: "Elephant Mountain",         eur: 0,  gratis: true,  phaseId: 1 },
        { label: "Qixingtan Beach",           eur: 0,  gratis: true,  phaseId: 2 },
        { label: "Chishang Bike Path",        eur: 3,  gratis: false, phaseId: 3 },
        { label: "Green Island Tagesausflug", eur: 25, gratis: false, phaseId: 4 },
        { label: "Taipei 101",                eur: 15, gratis: false, phaseId: 1 },
        { label: "Wenwu Temple",              eur: 0,  gratis: true,  phaseId: 9 },
        { label: "Formosan Culture Village",  eur: 15, gratis: false, phaseId: 9 },
        { label: "Alishan Sonnenaufgang",     eur: 3,  gratis: false, phaseId: 8 },
        { label: "Maokong Gondola",           eur: 3,  gratis: false, phaseId: 10 },
        { label: "Confucius Temple Tainan",   eur: 0,  gratis: true,  phaseId: 7 }
      ]
    }
  }

};
// EOF — window.TAIWAN vollständig definiert
