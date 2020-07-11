'use strict';

window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
  window.data.offers = data;
  window.map.activateMapFilters(window.map.mapFiltersList);
}, window.util.onError);

// Выполняет код после загрузки DOM
window.addEventListener('DOMContentLoaded', function () {
  window.pin.mainMapPin.addEventListener('mousedown', window.pin.onMainPinMousedown);

  window.pin.mainMapPin.addEventListener('keydown', window.pin.onMainPinKeydown);
});
