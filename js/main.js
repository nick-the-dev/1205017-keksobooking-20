'use strict';

window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
  window.data.offers = data;
  window.map.activateMapFilters(window.map.mapFiltersList);
  window.card.buildCard(window.data.offers);
}, window.util.onError);

// Выполняет код после загрузки DOM
window.addEventListener('DOMContentLoaded', function () {
  window.pin.mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activateMap();
      window.form.insertPinLocation(window.pin.getPinActiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight, window.pin.mainPinPointerHeight));
    }
  });

  window.pin.mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activateMap();
      window.form.insertPinLocation(window.pin.getPinActiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight, window.pin.mainPinPointerHeight));
    }
  });
});
