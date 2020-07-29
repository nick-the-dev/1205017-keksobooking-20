'use strict';

(function () {
  // Максимальное кол-во меток, которое можно отобразить на карте
  var MAX_OFFERS_TO_SHOW = 5;

  //  Хранит в себе обьекты текущих обьявлений, отображенных на карте
  var currentOffersOnMap = [];

  // Форма, содержащая фильтры обьявлений
  var mapFilters = document.querySelector('.map__filters');

  // Поля фильтра обьявлений
  var mapFiltersList = mapFilters.querySelectorAll('input, select');

  var mapFiltersCollection = mapFilters.querySelectorAll('.map__filter, .map__checkbox');
  var featuresCollection = mapFilters.querySelectorAll('.map__checkbox');

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
      if (offers[i].offer !== undefined) {
        fragment.appendChild(renderPin(offers[i]));
        currentOffersOnMap.push(offers[i]);
      }
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

  var filterOffersType = function (mapFilter, offers) {
    offers = offers
      .filter(function (offer) {
        return mapFilter.value === offer.offer.type;
      });

    return offers;
  };

  var filterOffersPrice = function (mapFilter, offers) {
    offers = offers
      .filter(function (offer) {
        switch (mapFilter.value) {
          case 'low':
            return offer.offer.price < 10000;
          case 'middle':
            return (offer.offer.price >= 10000) && (offer.offer.price <= 50000);
        }
        return offer.offer.price > 50000;
      });

    return offers;
  };

  var filterOffersRooms = function (mapFilter, offers) {
    offers = offers
      .filter(function (offer) {
        return parseInt(mapFilter.value, 10) === offer.offer.rooms;
      });

    return offers;
  };

  var filterOffersGuests = function (mapFilter, offers) {
    offers = offers
      .filter(function (offer) {
        return parseInt(mapFilter.value, 10) === offer.offer.guests;
      });

    return offers;
  };

  var onFilterChange = window.debounce(function () {
    var defaultValue = 'any';

    var offers = window.data.offers;
    var checkedFeatures = [];

    mapFiltersCollection.forEach(function (mapFilter) {
      if (mapFilter.value !== defaultValue) {
        switch (mapFilter.id) {
          case 'housing-type':
            offers = filterOffersType(mapFilter, offers);
            break;
          case 'housing-price':
            offers = filterOffersPrice(mapFilter, offers);
            break;
          case 'housing-rooms':
            offers = filterOffersRooms(mapFilter, offers);
            break;
          case 'housing-guests':
            offers = filterOffersGuests(mapFilter, offers);
            break;
        }
      }
    });

    featuresCollection.forEach(function (feature) {
      if (feature.checked) {
        checkedFeatures.push(feature.value);
      }
    });

    checkedFeatures.forEach(function (feature) {
      offers = offers
        .filter(function (offer) {
          return offer.offer.features.includes(feature);
        });
    });

    removeAllPins();
    window.card.removeCard();
    addPinsToMap(offers);

    window.updatePins();
  });

  var removePinsActiveClass = function () {
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  // Функция-обработчик для события нажатия на метку карты
  var onPinClick = function (currentPinObject, currentPinElement) {
    window.card.removeCard();
    window.card.buildCard(currentPinObject);
    removePinsActiveClass();
    currentPinElement.classList.add('map__pin--active');
  };

  var onPinKeydown = function (evt, currentPinObject, currentPinElement) {
    if (evt.key === 'Enter') {
      window.card.removeCard();
      window.card.buildCard(currentPinObject);
      removePinsActiveClass();
      currentPinElement.classList.add('map__pin--active');
    }
  };

  // Функция активации карты
  var activateMap = function () {
    window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
      window.data.offers = data;
      window.map.activateMapFilters(window.map.mapFiltersList);
      addPinsToMap(window.data.offers);
      getCurrentPins();
      generatePinEventListener();
    }, window.util.onError);

    // Активируем поля формы создания обьявления
    window.form.activateFields(window.form.formInputs);

    // Активируем саму форму создания обьявления
    window.form.activateForm(window.form.formElement);

    // Удаляем класс .map--faded у элемента с классом .map
    document.querySelector('.map').classList.remove('map--faded');

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

    // Создает обработчик события клика на каждой метке на карте
    var generatePinEventListener = function () {
      for (var i = 0; i < currentPins.length; i++) {
        currentPins[i].addEventListener('click', onPinClick.bind(null, currentOffersOnMap[i], currentPins[i]));
        currentPins[i].addEventListener('keydown', onPinKeydown.bind(null, currentOffersOnMap[i], currentPins[i]));
      }
    };

    // Собирает массив обьектов для текущих меток на карте, не считая главной метки + создает обработчик события клика на каждой метке
    window.updatePins = function () {
      getCurrentPins();
      generatePinEventListener();
    };

    mapFiltersCollection.forEach(function (filter) {
      filter.addEventListener('change', onFilterChange);
    });

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

})();
