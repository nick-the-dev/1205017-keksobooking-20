'use strict';

(function () {
  // Максимальное кол-во меток, которое можно отобразить на карте
  var MAX_OFFERS_TO_SHOW = 5;

  window.addEventListener('DOMContentLoaded', function () {
    // Форма, содержащая фильтры обьявлений
    var mapFilters = document.querySelector('.map__filters');

    // Поля фильтра обьявлений
    var mapFiltersList = mapFilters.querySelectorAll('input, select');

    // Фильтр по типу жилья
    var typeFilter = mapFilters.querySelector('#housing-type');

    /**
     * Убирает атрибут disabled у всех полей ввода в фильтре обьявлений
     *
     * @param {HTMLCollection} filtersList Коллекция элементов, у которых нужно выставить атрибут disabled
     */
    var activateMapFilters = function (filtersList) {
      for (var j = 0; j < filtersList.length; j++) {
        filtersList[j].removeAttribute('disabled');
      }
    };

    /**
     * Отображает метку на карте на основе обьекта обьявления
     *
     * @param {Object} pin Обьект обьявления
     * @return {Node} Возвращает разметку метки
     */
    var renderPin = function (pin) {
      // Содержит разметку метки
      var pinElement = window.pin.mapPinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + (pin.location.x - window.pin.pinWidth / 2) + 'px; top: ' + (pin.location.y - window.pin.pinHeight) + 'px;';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;

      return pinElement;
    };

    /**
     * Собирает метки из массива во фрагменте и отрисовывает их на карте
     *
     * @param {Array} offers Массив с обьявлениями
     */
    var addPinsToMap = function (offers) {
      var fragment = document.createDocumentFragment();
      var quantityToShow = MAX_OFFERS_TO_SHOW;
      if (offers.length < MAX_OFFERS_TO_SHOW) {
        quantityToShow = offers.length;
      }

      for (var i = 0; i < quantityToShow; i++) {
        fragment.appendChild(renderPin(offers[i]));
      }

      window.pin.mapPinsElement.appendChild(fragment);
    };

    // Удаляет все метки кроме главной
    var removeAllPins = function () {
      var pins = window.pin.mapPinsElement.querySelectorAll('.map__pin');
      var mainPinClass = 'map__pin--main';

      pins.forEach(function (pin) {
        if (!pin.classList.contains(mainPinClass)) {
          pin.parentNode.removeChild(pin);
        }
      });
    };

    // Удаляет открытую карточку с карты
    var removeOpenedCard = function () {
      var card = document.querySelector('.map__card');
      if (card !== null) {
        card.parentNode.removeChild(card);
      }
    };

    // Отрисовывает на карте только те метки, значение которых совпадает с выбранным в фильтре по типу жилья
    var filterOfferByType = function () {
      var currentValue = typeFilter.value;
      var defaultValue = 'any';
      var filteredOffers = [];
      var offers = window.data.offers;

      removeAllPins();
      removeOpenedCard();

      if (currentValue === defaultValue) {
        filteredOffers = offers;
      } else {
        filteredOffers = offers.
        filter(function (offer) {
          return currentValue === offer.offer.type;
        });
      }

      addPinsToMap(filteredOffers);
    };

    // Функция активации карты
    var activateMap = function () {
      // Активируем поля формы создания обьявления
      window.form.activateFields(window.form.formInputs);

      // Активируем саму форму создания обьявления
      window.form.activateForm(window.form.formElement);

      // Удаляем класс .map--faded у элемента с классом .map
      document.querySelector('.map').classList.remove('map--faded');

      addPinsToMap(window.data.offers);

      // Валидируем кол-во гостей еще до взаимодействия с формой
      window.data.validateAdCapacity(window.form.adRoomsNumber, window.form.adCapacity, window.data.capacityOptions);

      // Валидируем кол-во гостей при изменении поля "Количество комнат"
      window.form.adRoomsNumber.addEventListener('change', function () {
        window.data.validateAdCapacity(window.form.adRoomsNumber, window.form.adCapacity, window.data.capacityOptions);
      });

      // Валидируем кол-во гостей при изменении поля "Количество мест"
      window.form.adCapacity.addEventListener('change', function () {
        window.data.validateAdCapacity(window.form.adRoomsNumber, window.form.adCapacity, window.data.capacityOptions);
      });

      // Вызывает функцию фильтрации при смене значени фильтра по типу жилья
      typeFilter.addEventListener('change', filterOfferByType);
    };

    // Вставляем координаты метки в неактивном состоянии карты
    window.form.insertPinLocation(window.pin.getPinUnactiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight));

    // Выключаем поля в фильтре обьявлений при загрузке страницы
    window.form.disableFields(mapFiltersList);

    // Выключаем поля формы при загрузке страницы
    window.form.disableFields(window.form.formInputs);

    window.map = {
      mapFiltersList: mapFiltersList,
      activateMap: activateMap,
      activateMapFilters: activateMapFilters
    };
  });

})();
