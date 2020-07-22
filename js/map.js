'use strict';

(function () {
  // Максимальное кол-во меток, которое можно отобразить на карте
  var MAX_OFFERS_TO_SHOW = 5;

  //  Хранит в себе обьекты текущих обьявлений, отображенных на карте
  var currentOffersOnMap = [];

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

      currentOffersOnMap = [];

      for (var i = 0; i < quantityToShow; i++) {
        fragment.appendChild(renderPin(offers[i]));
        currentOffersOnMap.push(offers[i]);
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

    // Отрисовывает на карте только те метки, значение которых совпадает с выбранным в фильтре по типу жилья
    var filterOfferByType = function (extendedActions) {
      var currentValue = typeFilter.value;
      var defaultValue = 'any';
      var filteredOffers = [];
      var offers = window.data.offers;

      removeAllPins();
      window.card.removeCard();

      if (currentValue === defaultValue) {
        filteredOffers = offers;
      } else {
        filteredOffers = offers.
        filter(function (offer) {
          return currentValue === offer.offer.type;
        });
      }

      addPinsToMap(filteredOffers);

      // В случае если приняли параметр - выполнить как функцию
      if (extendedActions !== undefined) {
        extendedActions();
      }
    };

    // Функция-обработчик для события нажатия на метку карты
    var onPinClick = function (currentPinObject) {
      window.card.removeCard();
      window.card.buildCard(currentPinObject);
    };

    var onPinKeydown = function (evt, currentPinObject) {
      if (evt.key === 'Enter') {
        window.card.removeCard();
        window.card.buildCard(currentPinObject);
      }
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

      // Устанавливаем минимальное значение цены для текущего типа жилья
      window.form.setPriceForType();

      // Меняем минимальное значение цены для выбранного типа жилья при его изменении
      window.form.formType.addEventListener('change', window.form.setPriceForType);

      window.form.checkinTime.addEventListener('change', window.form.validateTime.bind('null', window.form.checkinTime, window.form.checkoutTime));
      window.form.checkoutTime.addEventListener('change', window.form.validateTime.bind('null', window.form.checkoutTime, window.form.checkinTime));

      var currentPins;

      // Собирает массив обьектов для текущих меток на карте, не считая главной метки
      var getCurrentPins = function () {
        currentPins = [];
        var pinsCollection = document.querySelectorAll('.map__pin');

        for (var i = 0; i < pinsCollection.length; i++) {
          if (!pinsCollection[i].classList.contains('map__pin--main')) {
            currentPins.push(pinsCollection[i]);
          }
        }
      };

      getCurrentPins();

      // Создает обработчик события клика на каждой метке на карте
      var generatePinEventListener = function () {
        for (var i = 0; i < currentPins.length; i++) {
          currentPins[i].addEventListener('click', onPinClick.bind(null, currentOffersOnMap[i]));
          currentPins[i].addEventListener('keydown', onPinKeydown.bind(null, currentOffersOnMap[i]));
        }
      };

      generatePinEventListener();

      // Собирает массив обьектов для текущих меток на карте, не считая главной метки + создает обработчик события клика на каждой метке
      var updatePins = function () {
        getCurrentPins();
        generatePinEventListener();
      };

      // Вызывает функцию фильтрации при смене значения фильтра по типу жилья
      typeFilter.addEventListener('change', filterOfferByType.bind(null, updatePins));

      window.pin.mainMapPin.removeEventListener('mousedown', window.pin.onMainPinMousedown);
      window.pin.mainMapPin.removeEventListener('keydown', window.pin.onMainPinKeydown);

      window.form.formElement.addEventListener('submit', window.form.onSubmit);
      window.form.formResetBtn.addEventListener('click', window.form.onFormReset);

      window.form.insertSendStatus();
    };

    var deactivateMap = function () {
      window.form.deactivateFields(window.form.formInputs);
      window.form.deactivateForm(window.form.formElement);
      document.querySelector('.map').classList.add('map--faded');
      window.form.insertPinLocation(window.pin.getPinUnactiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight));
      removeAllPins();
      window.pin.mainMapPin.addEventListener('mousedown', window.pin.onMainPinMousedown);
      window.pin.mainMapPin.addEventListener('keydown', window.pin.onMainPinKeydown);
      window.form.clearForm();
      window.card.removeCard();
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
      activateMapFilters: activateMapFilters,
      deactivateMap: deactivateMap
    };
  });

})();
