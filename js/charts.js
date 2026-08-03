// js/charts.js
// Chart.js 4.4 Infografiken — Taiwan Reise-Dashboard
// Liest: window.TAIWAN.charts.* + window.TAIWAN.meta.*
// Schreibt: window.chartsModule

window.chartsModule = (function () {
  'use strict';

  var _charts = {};

  // ---------------------------------------------------------------
  // CHT-05 Budget-Counter (HTML, kein Canvas)
  // ---------------------------------------------------------------
  function _renderBudgetCounter() {
    var c = document.getElementById('budget-counter-container');
    if (!c) return;

    var daily = window.TAIWAN.meta.dailyBudget;
    var budget = window.TAIWAN.meta.budget;

    var html = '<div class="budget-counter">'
      + '<div class="budget-item budget-item--comfort">'
      +   '<span class="budget-amount">\u20AC' + daily.comfort + '</span>'
      +   '<span class="budget-label">pro Tag \u00B7 Komfort</span>'
      + '</div>'
      + '<div class="budget-vs">vs.</div>'
      + '<div class="budget-item budget-item--backpacker">'
      +   '<span class="budget-amount">\u20AC' + daily.backpacker + '</span>'
      +   '<span class="budget-label">pro Tag \u00B7 Backpacker-Realit\u00E4t</span>'
      + '</div>'
      + '<div class="budget-total">'
      +   'Gesamtbudget: \u20AC' + budget.low + '\u2013\u20AC' + budget.high
      + '</div>'
      + '</div>';

    c.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // CHT-01 Donut — Kostenverteilung
  // ---------------------------------------------------------------
  function _initCosts() {
    var canvas = document.getElementById('chart-costs');
    if (!canvas) return;

    if (_charts.costs) { _charts.costs.destroy(); }

    var d = window.TAIWAN.charts.costs;

    _charts.costs = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: d.labels,
        datasets: [{
          data: d.values,
          backgroundColor: d.colors,
          borderColor: '#0D0F12',
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#E5E7EB',
              padding: 16,
              font: { size: 13 }
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.label + ': ' + ctx.raw + '%';
              }
            }
          }
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // CHT-02 Bar — Nächte pro Phase
  // ---------------------------------------------------------------
  function _initNights() {
    var canvas = document.getElementById('chart-nights');
    if (!canvas) return;

    if (_charts.nights) { _charts.nights.destroy(); }

    var d = window.TAIWAN.charts.nights;

    _charts.nights = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: d.labels,
        datasets: [{
          data: d.values,
          backgroundColor: d.colors,
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#9CA3AF' },
            grid: { color: '#1F2937' }
          },
          y: {
            ticks: {
              color: '#9CA3AF',
              stepSize: 1
            },
            grid: { color: '#1F2937' }
          }
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // CHT-03 Line — Temperaturkurve Min/Max
  // ---------------------------------------------------------------
  function _initTemp() {
    var canvas = document.getElementById('chart-temp');
    if (!canvas) return;

    if (_charts.temp) { _charts.temp.destroy(); }

    var d = window.TAIWAN.charts.temperature;

    _charts.temp = new Chart(canvas, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          {
            label: 'Min',
            data: d.tempMin,
            borderColor: '#06B6D4',
            backgroundColor: 'rgba(6,182,212,0.15)',
            fill: '+1',
            tension: 0.3,
            pointRadius: 3
          },
          {
            label: 'Max',
            data: d.tempMax,
            borderColor: '#F59E0B',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.3,
            pointRadius: 3
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: { color: '#E5E7EB' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#9CA3AF' },
            grid: { color: '#1F2937' }
          },
          y: {
            ticks: {
              color: '#9CA3AF',
              callback: function (v) { return v + '\u00B0C'; }
            },
            grid: { color: '#1F2937' }
          }
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // CHT-04 Scatter — Eintritte gratis vs. kostenpflichtig
  // ---------------------------------------------------------------
  function _initEntries() {
    var canvas = document.getElementById('chart-entries');
    if (!canvas) return;

    if (_charts.entries) { _charts.entries.destroy(); }

    var entries = window.TAIWAN.charts.entries.data;
    var gratisData = [];
    var paidData = [];

    entries.forEach(function (d, i) {
      if (d.gratis) {
        gratisData.push({ x: i, y: 0, label: d.label });
      } else {
        paidData.push({ x: i, y: d.eur, label: d.label });
      }
    });

    _charts.entries = new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Gratis',
            data: gratisData,
            backgroundColor: '#10B981',
            pointRadius: 8
          },
          {
            label: 'Eintritt',
            data: paidData,
            backgroundColor: '#3B82F6',
            pointRadius: 8
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: { color: '#E5E7EB' }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var raw = ctx.raw;
                var suffix = ctx.datasetIndex === 0
                  ? ' \u2014 Gratis'
                  : ' \u2014 \u20AC' + raw.y;
                return raw.label + suffix;
              }
            }
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#9CA3AF',
              callback: function (v) { return '\u20AC' + v; }
            },
            grid: { color: '#1F2937' }
          }
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------
  return {
    init: function () {
      if (!window.TAIWAN) return;

      Chart.defaults.color = '#9CA3AF';
      Chart.defaults.borderColor = '#1F2937';

      _renderBudgetCounter();
      _initCosts();
      _initNights();
      _initTemp();
      _initEntries();

      console.log('[charts.js] initialisiert');
    }
  };

})();
