'use strict';

// Выполняет код после загрузки DOM
window.addEventListener('DOMContentLoaded', function () {
  window.pin.mainMapPin.addEventListener('mousedown', window.pin.onMainPinMousedown);

  window.pin.mainMapPin.addEventListener('keydown', window.pin.onMainPinKeydown);
});
