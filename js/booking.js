// js/booking.js
// Taiwan Reise-Dashboard — Booking-Cards mit Deeplinks, earlyBook-Badge, KKday-Touren
// Liest: window.TAIWAN.booking, window.TAIWAN.tours
// Schreibt: window.bookingModule

window.bookingModule = (function() {
  'use strict';

  // -------------------------------------------------------
  // Hilfsfunktionen
  // -------------------------------------------------------

  function _renderExampleHotels(hotels) {
    if (!hotels || hotels.length === 0) {
      return '<div class="bkg-hotels-empty">Hotels noch nicht eingetragen</div>';
    }
    var html = '<div class="bkg-hotels">';
    hotels.forEach(function(h) {
      html += '<div class="bkg-hotel">'
        + '<span class="bkg-hotel-name">' + h.name + '</span>'
        + (h.priceEur ? '<span class="bkg-hotel-price">ab &euro;' + h.priceEur + '</span>' : '')
        + (h.url ? ' <a class="bkg-hotel-link" href="' + h.url + '" target="_blank" rel="noopener">Ansehen &#x2197;</a>' : '')
        + '</div>';
    });
    html += '</div>';
    return html;
  }

  function _renderKKdayTours(phaseId) {
    if (!window.TAIWAN || !window.TAIWAN.tours) return '';
    var tours = window.TAIWAN.tours.filter(function(t) {
      return t.phaseId === phaseId;
    });
    if (!tours.length) return '';

    var html = '<div class="bkg-tours">';
    tours.forEach(function(t) {
      var isPlaceholder = !/\d/.test(t.url);
      var linkHtml = isPlaceholder
        ? '<span class="bkg-tour-placeholder">&#x26A0; URL Platzhalter &mdash; echte KKday-URL in data.js eintragen</span>'
        : '<a class="bkg-tour-link" href="' + t.url + '" target="_blank" rel="noopener">Buchen &#x2197;</a>';
      var buggyIcon = t.buggyFriendly
        ? '&#x1F6BC;'
        : '&#x1F6BC;&#x26A0;';

      html += '<div class="bkg-tour">'
        + '<div class="bkg-tour-name">' + t.name + '</div>'
        + '<div class="bkg-tour-meta">'
          + '<span>' + t.provider + '</span>'
          + '<span>ab &euro;' + t.priceEur + '</span>'
          + '<span>' + buggyIcon + '</span>'
          + linkHtml
        + '</div>'
        + (t.note ? '<div class="bkg-tour-note">' + t.note + '</div>' : '')
        + '</div>';
    });
    html += '</div>';
    return html;
  }

  function _makeBookingCard(b) {
    var earlyBadge = b.earlyBook === true
      ? '<span class="bkg-badge bkg-badge--warn">&#x26A0;&#xFE0F; Fr&#xFC;h buchen!</span>'
      : '';

    return '<div class="bkg-card">'
      + '<div class="bkg-phase-header">'
        + '<span class="bkg-phase-num">Phase ' + b.phaseId + '</span>'
        + '<span class="bkg-region">' + b.region + '</span>'
        + earlyBadge
      + '</div>'
      + '<div class="bkg-dates">' + b.checkIn + ' &ndash; ' + b.checkOut + ' (' + b.nights + ' N&#xE4;chte)</div>'
      + (b.criteria && b.criteria.notes ? '<div class="bkg-criteria">' + b.criteria.notes + '</div>' : '')
      + '<div class="bkg-links">'
        + '<a class="bkg-link bkg-link--primary" href="' + b.bookingUrl + '" target="_blank" rel="noopener">Research starten &#x2197;</a>'
        + '<a class="bkg-link bkg-link--secondary" href="' + b.airbnbUrl + '" target="_blank" rel="noopener">&#x1F3E0; Airbnb &#x2197;</a>'
      + '</div>'
      + _renderExampleHotels(b.exampleHotels)
      + _renderKKdayTours(b.phaseId)
      + '</div>';
  }

  function _render(container) {
    var html = '<div class="bkg-grid">';
    window.TAIWAN.booking.forEach(function(b) {
      html += _makeBookingCard(b);
    });
    html += '</div>';
    container.insertAdjacentHTML('beforeend', html);
  }

  // -------------------------------------------------------
  // Public API
  // -------------------------------------------------------

  return {
    init: function() {
      if (!window.TAIWAN || !window.TAIWAN.booking) return;

      var el = document.getElementById('booking-content');
      if (!el) return;

      el.innerHTML = '';
      _render(el);

      console.log('[booking.js] initialisiert (' + window.TAIWAN.booking.length + ' Phasen)');
    }
  };

})();
