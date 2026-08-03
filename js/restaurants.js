// js/restaurants.js
// Taiwan Reise-Dashboard — Restaurant-Cards mit Phasen-Filter
// Liest: window.TAIWAN.restaurants, window.TAIWAN.phases
// Schreibt: window.restaurantsModule

window.restaurantsModule = (function() {
  'use strict';

  var _currentPhase = 'all';

  var TYPE_LABEL = {
    'vegan':        '\uD83C\uDF31 Vegan',
    'vegetarisch':  '\uD83E\uDD57 Vegetarisch',
    'veg-option':   '\u2713 Veg-Option'
  };

  // -------------------------------------------------------
  // Hilfsfunktionen
  // -------------------------------------------------------

  function _filter(phaseId) {
    if (phaseId === 'all') return window.TAIWAN.restaurants;
    return window.TAIWAN.restaurants.filter(function(r) {
      return r.phaseId === phaseId;
    });
  }

  function _makeCard(r) {
    var namePrefix = r.veganSymbol ? '\uD83C\uDF31 ' : '';
    var typeLabel  = TYPE_LABEL[r.type] || r.type;

    return '<div class="rst-card">'
      + '<div class="rst-name">' + namePrefix + r.name + '</div>'
      + '<div class="rst-meta">'
        + '<span class="rst-type">' + typeLabel + '</span>'
        + '<span class="rst-price">\u20AC' + r.pricePerPerson.eur + '/P</span>'
      + '</div>'
      + '<div class="rst-note">' + r.note + '</div>'
      + '<a class="rst-link" href="' + r.googleMapsUrl + '" target="_blank" rel="noopener">Google Maps \u2197</a>'
      + '</div>';
  }

  function _renderCards(container, phase) {
    var old = container.querySelector('.rst-grid');
    if (old) old.parentNode.removeChild(old);

    var items = _filter(phase === 'all' ? 'all' : parseInt(phase, 10));
    var html = '<div class="rst-grid">';
    items.forEach(function(r) {
      html += _makeCard(r);
    });
    html += '</div>';
    container.insertAdjacentHTML('beforeend', html);
  }

  function _renderFilterButtons(container) {
    var html = '<div class="rst-filters">';
    html += '<button class="rst-filter rst-filter--active" data-phase="all">Alle</button>';
    window.TAIWAN.phases.forEach(function(p) {
      html += '<button class="rst-filter" data-phase="' + p.id + '">'
            + 'Phase ' + p.id + ' ' + p.name
            + '</button>';
    });
    html += '</div>';
    container.insertAdjacentHTML('beforeend', html);
  }

  function _bindEvents(container) {
    container.addEventListener('click', function(e) {
      var btn = e.target;
      // Walk up to find .rst-filter (in case of child elements)
      while (btn && btn !== container) {
        if (btn.classList && btn.classList.contains('rst-filter')) break;
        btn = btn.parentNode;
      }
      if (!btn || !btn.classList || !btn.classList.contains('rst-filter')) return;

      var phase = btn.getAttribute('data-phase');
      _currentPhase = phase;

      var allBtns = container.querySelectorAll('.rst-filter');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove('rst-filter--active');
      }
      btn.classList.add('rst-filter--active');

      _renderCards(container, phase);
    });
  }

  // -------------------------------------------------------
  // Public API
  // -------------------------------------------------------

  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.restaurants) return;

      var el = document.getElementById('restaurants-content');
      if (!el) return;

      el.innerHTML = '';
      _renderFilterButtons(el);
      _renderCards(el, 'all');
      _bindEvents(el);

      console.log('[restaurants.js] initialisiert (' + window.TAIWAN.restaurants.length + ' Restaurants)');
    }
  };

})();
