'use strict';
(function () {
  window.addEventListener('DOMContentLoaded', function () {

    var mainPin = document.querySelector('.map__pin--main');

    mainPin.addEventListener('mousedown', function (evt) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var MAX_TOP_LOCATION = 130;
        var MAX_BOTTOM_LOCATION = 630;
        var MAX_LEFT_LOCATION = -30;
        var MAX_RIGHT_LOCATION = 1170;
        var posY = mainPin.offsetTop;
        var posX = mainPin.offsetLeft;


        if (posY < MAX_TOP_LOCATION) {
          posY = MAX_TOP_LOCATION;
        } else if (posY > MAX_BOTTOM_LOCATION) {
          posY = MAX_BOTTOM_LOCATION;
        }

        if (posX < MAX_LEFT_LOCATION) {
          posX = MAX_LEFT_LOCATION;
        } else if (posX > MAX_RIGHT_LOCATION) {
          posX = MAX_RIGHT_LOCATION;
        }

        mainPin.style.top = (posY - shift.y) + 'px';
        mainPin.style.left = (posX - shift.x) + 'px';

      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          window.pin.getMainPinCurrentLocation();
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  });
})();
