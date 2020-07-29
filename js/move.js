'use strict';
(function () {
  var MAX_TOP_LOCATION = 130;
  var MAX_BOTTOM_LOCATION = 630;
  var MAX_LEFT_LOCATION = -30;
  var MAX_RIGHT_LOCATION = 1170;

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

      var positionY = mainPin.offsetTop;
      var positionX = mainPin.offsetLeft;


      if (positionY < MAX_TOP_LOCATION) {
        positionY = MAX_TOP_LOCATION;
      } else if (positionY > MAX_BOTTOM_LOCATION) {
        positionY = MAX_BOTTOM_LOCATION;
      }

      if (positionX < MAX_LEFT_LOCATION) {
        positionX = MAX_LEFT_LOCATION;
      } else if (positionX > MAX_RIGHT_LOCATION) {
        positionX = MAX_RIGHT_LOCATION;
      }

      mainPin.style.top = (positionY - shift.y) + 'px';
      mainPin.style.left = (positionX - shift.x) + 'px';

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

})();
