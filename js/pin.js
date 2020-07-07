'use strict';

(function () {

  // Ширина метки обьявления
  var PIN_WIDTH = 50;

  // Высота метки обьявления
  var PIN_HEIGHT = 70;

  // Ширина центральной метки в неактивном состоянии
  var MAIN_PIN_UNACTIVE_WIDTH = 62;

  // Высота центральной метки в неактивном состоянии
  var MAIN_PIN_UNACTIVE_HEIGHT = 62;

  // Высота указателя центральной метки
  var MAIN_PIN_POINTER_HEIGHT = 22;

  window.addEventListener('DOMContentLoaded', function () {
    // Шаблон метки
    var mapPinTemplate = document
      .querySelector('#pin')
      .content
      .querySelector('.map__pin');

    // Элемент списка меток на карте
    var mapPinsElement = document.querySelector('.map__pins');

    // Центральная метка (триггер активации карты);
    var mainMapPin = mapPinsElement.querySelector('.map__pin--main');

    /**
     * Выдает координаты центральной метки на карте в неактивном состоянии
     *
     * @param {Object} pin Метка
     * @param {number} width Ширина метки
     * @param {number} height Высота метки
     * @return {string} Координаты метки на карте
     */
    var getPinUnactiveLocation = function (pin, width, height) {
      var locationX = parseInt(pin.style.left, 10) + Math.round(width / 2);
      var locationY = parseInt(pin.style.top, 10) + Math.round(height / 2);

      return locationX + ', ' + locationY;
    };

    /**
     * Выдает координаты центральной метки на карте в активном состоянии
     *
     * @param {Object} pin Метка
     * @param {number} width Ширина метки
     * @param {number} height Высота метки
     * @param {number} pointerHeight Высота указателя метки
     * @return {string} Координаты метки на карте
     */
    var getPinActiveLocation = function (pin, width, height, pointerHeight) {
      var locationX = parseInt(pin.style.left, 10) + Math.round(width / 2);
      var locationY = parseInt(pin.style.top, 10) + height + pointerHeight;

      return locationX + ', ' + locationY;
    };

    var onMainPinMousedown = function (evt) {
      if (evt.button === 0) {
        window.map.activateMap();
        window.form.insertPinLocation(window.pin.getPinActiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight, window.pin.mainPinPointerHeight));
      }
    };

    var onMainPinKeydown = function (evt) {
      if (evt.key === 'Enter') {
        window.map.activateMap();
        window.form.insertPinLocation(window.pin.getPinActiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight, window.pin.mainPinPointerHeight));
      }
    };

    window.pin = {
      pinWidth: PIN_WIDTH,
      pinHeight: PIN_HEIGHT,
      mainPinUnactiveWidth: MAIN_PIN_UNACTIVE_WIDTH,
      mainPinUnactiveHeight: MAIN_PIN_UNACTIVE_HEIGHT,
      mainPinPointerHeight: MAIN_PIN_POINTER_HEIGHT,
      mapPinTemplate: mapPinTemplate,
      mapPinsElement: mapPinsElement,
      mainMapPin: mainMapPin,
      getPinUnactiveLocation: getPinUnactiveLocation,
      getPinActiveLocation: getPinActiveLocation,
      onMainPinMousedown: onMainPinMousedown,
      onMainPinKeydown: onMainPinKeydown
    };
  });
})();
