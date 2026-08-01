// js/map.js
// Taiwan Reise-Dashboard — Leaflet-Karte Phase 2
// Liest: window.TAIWAN.phases, window.TAIWAN.sights
// Schreibt: window.mapModule

window.mapModule = (function() {

  var map;
  var clusterGroup;
  var layerGroups = {};   // phaseId → { cluster: L.layerGroup, daytrips: L.layerGroup }
  var routeLayer;
  var activeFilters = {}; // phaseId → true/false

  // -------------------------------------------------------
  // Hilfsfunktionen
  // -------------------------------------------------------

  function formatPrice(price) {
    if (!price) return '';
    if (price.eur === 0) return '<span class="popup-price free">gratis</span>';
    return '<span class="popup-price">€' + price.eur + (price.note ? ' <small>(' + price.note + ')</small>' : '') + '</span>';
  }

  function makePopup(sight) {
    var buggy = sight.buggyFriendly ? ' 🚼' : '';
    var price = formatPrice(sight.price);
    var gmaps = '<a href="' + sight.googleMapsUrl + '" target="_blank" rel="noopener" class="popup-gmaps-btn">Google Maps ↗</a>';
    var tip = sight.tip ? '<div class="popup-tip">💡 ' + sight.tip + '</div>' : '';
    var q = sight.openQuestion ? '<div class="popup-question">❓ ' + sight.openQuestion + '</div>' : '';
    return '<div class="map-popup">'
      + '<div class="popup-name">' + sight.name + buggy + '</div>'
      + price
      + tip
      + q
      + gmaps
      + '</div>';
  }

  function getPhaseColor(phaseId) {
    // Aus CSS Custom Properties lesen (wie app.js es tut)
    if (typeof window.getPhaseColor === 'function') {
      return window.getPhaseColor(phaseId);
    }
    // Fallback: direkt aus phases-Array
    var phase = window.TAIWAN.phases.find(function(p) { return p.id === phaseId; });
    return phase ? phase.color : '#6366F1';
  }

  // Diamond-Icon für Daytrips via DivIcon
  function makeDiamondIcon(color) {
    return L.divIcon({
      className: 'map-diamond-icon',
      html: '<div class="diamond" style="background:' + color + ';border-color:' + color + '"></div>',
      iconSize:   [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });
  }

  // -------------------------------------------------------
  // Karte initialisieren
  // -------------------------------------------------------

  function initMap() {
    map = L.map('map', {
      center: [23.5, 121.0],
      zoom: 8,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);
  }

  // -------------------------------------------------------
  // Route-Polyline durch alle 10 Phasen-Bases
  // -------------------------------------------------------

  function drawRoute() {
    var coords = window.TAIWAN.phases.map(function(p) {
      return [p.base.lat, p.base.lng];
    });

    routeLayer = L.polyline(coords, {
      color: '#4B5563',
      weight: 2,
      opacity: 0.6,
      dashArray: null
    }).addTo(map);
  }

  // -------------------------------------------------------
  // Phase-Base-Marker (nummerierte Kreise)
  // -------------------------------------------------------

  function drawPhaseMarkers() {
    window.TAIWAN.phases.forEach(function(phase) {
      var color = getPhaseColor(phase.id);
      var icon = L.divIcon({
        className: 'map-phase-icon',
        html: '<div class="phase-base-marker" style="background:' + color + '">'
            + phase.id
            + '</div>',
        iconSize:    [28, 28],
        iconAnchor:  [14, 14],
        popupAnchor: [0, -16]
      });
      var marker = L.marker([phase.base.lat, phase.base.lng], { icon: icon });
      marker.bindPopup(
        '<div class="map-popup">'
        + '<div class="popup-name">' + phase.emoji + ' Phase ' + phase.id + ': ' + phase.name + '</div>'
        + '<div class="popup-tip">' + phase.nights + ' Nächte · ' + phase.startDate + '</div>'
        + '</div>'
      );
      marker.addTo(map);
    });
  }

  // -------------------------------------------------------
  // Sight-Pins pro Phase
  // -------------------------------------------------------

  function drawSights() {
    // Alle MarkerCluster-Gruppen sammeln für togglen
    clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      showCoverageOnHover: false,
      iconCreateFunction: function(cluster) {
        return L.divIcon({
          html: '<div class="cluster-icon">' + cluster.getChildCount() + '</div>',
          className: 'cluster-icon-wrapper',
          iconSize: [36, 36]
        });
      }
    });

    window.TAIWAN.phases.forEach(function(phase) {
      var color = getPhaseColor(phase.id);
      var sights = window.TAIWAN.sights.filter(function(s) {
        return s.phaseId === phase.id;
      });

      // LayerGroup für diese Phase
      var phaseClusterLayer = L.layerGroup();
      var phaseDaytripLayer = L.layerGroup();

      sights.forEach(function(sight) {
        if (!sight.lat || !sight.lng) return;

        var popup = makePopup(sight);

        if (sight.type === 'daytrip') {
          // Rauten-Marker + gestrichelte Linie zur Basis
          var diamond = L.marker([sight.lat, sight.lng], {
            icon: makeDiamondIcon(color)
          });
          diamond.bindPopup(popup);
          phaseDaytripLayer.addLayer(diamond);

          // Gestrichelte Verbindung zur Phase-Basis
          var dashedLine = L.polyline(
            [[phase.base.lat, phase.base.lng], [sight.lat, sight.lng]],
            {
              color: color,
              weight: 1.5,
              opacity: 0.6,
              dashArray: '5, 8'
            }
          );
          phaseDaytripLayer.addLayer(dashedLine);

        } else {
          // Normale Sehenswürdigkeit: CircleMarker in Cluster
          var circle = L.circleMarker([sight.lat, sight.lng], {
            radius: 7,
            fillColor: color,
            fillOpacity: 0.85,
            color: '#ffffff',
            weight: 1.5,
            opacity: 1
          });
          circle.bindPopup(popup);
          phaseClusterLayer.addLayer(circle);
        }
      });

      layerGroups[phase.id] = {
        cluster: phaseClusterLayer,
        daytrips: phaseDaytripLayer
      };
      activeFilters[phase.id] = true;

      // Cluster-Marker in Master-ClusterGroup
      phaseClusterLayer.eachLayer(function(layer) {
        clusterGroup.addLayer(layer);
      });

      // Daytrips direkt auf Map
      phaseDaytripLayer.addTo(map);
    });

    clusterGroup.addTo(map);
  }

  // -------------------------------------------------------
  // Filter-Buttons
  // -------------------------------------------------------

  function buildFilterButtons() {
    var container = document.getElementById('map-filters');
    if (!container) return;

    // "Alle" Button
    var allBtn = document.createElement('button');
    allBtn.className = 'map-filter-btn map-filter-all active';
    allBtn.textContent = 'Alle';
    allBtn.addEventListener('click', function() {
      var anyOff = Object.values(activeFilters).some(function(v) { return !v; });
      if (anyOff) {
        // Alle einschalten
        window.TAIWAN.phases.forEach(function(p) { showPhase(p.id); });
        container.querySelectorAll('.map-filter-phase').forEach(function(b) {
          b.classList.add('active');
        });
        allBtn.classList.add('active');
      } else {
        // Alle ausschalten außer...nichts — toggle: bei alle-an → alle-aus
        window.TAIWAN.phases.forEach(function(p) { hidePhase(p.id); });
        container.querySelectorAll('.map-filter-phase').forEach(function(b) {
          b.classList.remove('active');
        });
        allBtn.classList.remove('active');
      }
    });
    container.appendChild(allBtn);

    // Phasen-Buttons 1–10
    window.TAIWAN.phases.forEach(function(phase) {
      var color = getPhaseColor(phase.id);
      var btn = document.createElement('button');
      btn.className = 'map-filter-btn map-filter-phase active';
      btn.dataset.phaseId = phase.id;
      btn.title = phase.name;
      btn.innerHTML = '<span class="filter-dot" style="background:' + color + '"></span>'
                    + phase.id;
      btn.style.setProperty('--phase-color', color);

      btn.addEventListener('click', function() {
        if (activeFilters[phase.id]) {
          hidePhase(phase.id);
          btn.classList.remove('active');
        } else {
          showPhase(phase.id);
          btn.classList.add('active');
        }
        // Alle-Button Status aktualisieren
        var allActive = Object.values(activeFilters).every(function(v) { return v; });
        allBtn.classList.toggle('active', allActive);
      });

      container.appendChild(btn);
    });
  }

  function showPhase(phaseId) {
    if (!layerGroups[phaseId]) return;
    activeFilters[phaseId] = true;
    // Cluster-Layer Marker zurück zum Master
    layerGroups[phaseId].cluster.eachLayer(function(layer) {
      if (!clusterGroup.hasLayer(layer)) {
        clusterGroup.addLayer(layer);
      }
    });
    if (!map.hasLayer(layerGroups[phaseId].daytrips)) {
      layerGroups[phaseId].daytrips.addTo(map);
    }
  }

  function hidePhase(phaseId) {
    if (!layerGroups[phaseId]) return;
    activeFilters[phaseId] = false;
    // Cluster-Layer Marker aus Master entfernen
    layerGroups[phaseId].cluster.eachLayer(function(layer) {
      clusterGroup.removeLayer(layer);
    });
    if (map.hasLayer(layerGroups[phaseId].daytrips)) {
      map.removeLayer(layerGroups[phaseId].daytrips);
    }
  }

  // -------------------------------------------------------
  // Public API
  // -------------------------------------------------------

  return {
    init: function() {
      var mapEl = document.getElementById('map');
      if (!mapEl) return;

      // Placeholder entfernen
      mapEl.innerHTML = '';

      initMap();
      drawRoute();
      drawPhaseMarkers();
      drawSights();
      buildFilterButtons();

      console.log('[map.js] Leaflet-Karte initialisiert (' + window.TAIWAN.sights.length + ' Sights)');
    }
  };

})();
