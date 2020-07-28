'use strict';

(function () {
  // Обьект с обьявлениями
  var offers;

  // Хранит допустимое кол-ва гостей в зависимости от кол-ва комнат
  var capacityOptions = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  /**
   * Валидирует поле выбора кол-ва гостей
   *
   * @param {Object} roomsNumber Поле выбора кол-ва комнат
   * @param {Object} capacity Поле выбора кол-ва гостей
   * @param {Object} options Возжодные варианты кол-ва гостей в комнатах
   */
  var validateAdCapacity = function (roomsNumber, capacity, options) {
    // Содержит true если указанное кол-во гостей допустимо при выбранном кол-ве комнат
    var isAllowedGuestsNumber = options[roomsNumber.value].includes(parseInt(capacity.value, 10));
    if (!isAllowedGuestsNumber) {
      capacity.setCustomValidity('Максимально допустимое кол-во гостей с учетом комнат: ' + window.util.getMaxNumber((options[roomsNumber.value])));
    } else {
      capacity.setCustomValidity('');
    }
  };

  window.data = {
    offers: offers,
    filteredOffers: offers,
    capacityOptions: capacityOptions,
    validateAdCapacity: validateAdCapacity
  };

})();
