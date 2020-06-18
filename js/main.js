'use strict';

// Аватары пользователей
var authorAvatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

// Заголовки обьявлений
var offerTitles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6', 'Title 7', 'Title 8'];

// Адреса обьявлений
var offerAddresses = ['800, 100', '700, 200', '600, 300', '500, 400', '400, 500', '300, 600', '200, 700', '100, 800'];

// Цены обьявлений
var offerPrices = [100, 200, 300, 400, 500, 600, 700, 800];

// Типы обьявлений
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];

// Количества комнат
var offerRooms = [1, 2, 3, 4];

// Колличества гостей
var offerGuests = [1, 2, 3, 4, 5, 6];

// Даты заезда
var offerCheckins = ['12:00', '13:00', '14:00'];

// Даты выезда
var offerCheckouts = ['12:00', '13:00', '14:00'];

// Список особенностей
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Описания обьявлений
var offerDescriptions = ['desc1', 'desc2', 'desc3', 'desc4', 'desc5', 'desc6', 'desc7', 'desc8'];

// Фото обьявлений
var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Колличество обьявлений для вывода в массив
var offersToShow = 8;

// Крайняя левая координата на карте
var minLeftPosition = 100;

// Крайняя правая координата на карте
var minRightPosition = 1100;

// Крайняя верхняя координата на карте
var minTopPosition = 130;

// Крайняя нижняя координата на карте
var minBottomPosition = 630;

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

/**
 * Возвращает случайный элемент из массива
 *
 * @param {Array} arr Массив в которм ищем элемент
 * @return {*} Случайный элемент массива
 */
var getRandomData = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Возвращает случайное число в заданном диапазоне
 *
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Случайное число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Проверяет находится ли элемент в этом массиве
 *
 * @param {*} value Элемент, который нужно найти в массиве
 * @param {Array} arr Массив, в котором проверяем
 * @return {boolean} true - элемент находится в массиве, false - элемента в массиве нет
 */
var isExistInArray = function (value, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
};

/**
 * Создает рандомно отсортированный массив случайной длинны из другого массива
 *
 * @param {Array} arr Оригинальный массив
 * @return {[]} Новый массив
 */
var getRandomArrFromArr = function (arr) {
  var newArr = [];

  // Минимальная длинна нового массива
  var minArrLength = 1;
  var newArrLength = getRandomNumber(minArrLength, arr.length);

  for (var i = 0; i < newArrLength; i++) {
    var currentValue = getRandomData(arr);

    if (!isExistInArray(currentValue, newArr)) {
      newArr.push(currentValue);
    }
  }

  return newArr;
};

/**
 * Возвращает первый элемент из массива, а затем удаляет его, сокращая массив
 *
 * @param {Array} arr Массив
 * @return {*} Первый элемент массива
 */
var getUniqueValue = function (arr) {
  // Временная переменная которая хранит первый элемент массива
  var temp = arr[0];
  arr.splice(0, 1);
  return temp;
};

/**
 * Создает массив с обьявлениями в виде обьектов
 *
 * @param {number} numOfOffers Колличество обьявлений, которое нужно добавить в массив
 * @return {[]}
 */
var createArrFromOffers = function (numOfOffers) {
  var arr = [];
  for (var i = 0; i < numOfOffers; i++) {
    arr.push(createNewOffer(authorAvatars, offerTitles, offerAddresses, offerPrices, offerTypes, offerRooms, offerGuests, offerCheckins, offerCheckouts, offerFeatures, offerDescriptions, offerPhotos, minLeftPosition, minRightPosition, minTopPosition, minBottomPosition));
  }
  return arr;
};

/**
 * Собирает обьявление по шаблону
 *
 * @param {Array} avatars Аватарки авторов обьявлений
 * @param {Array} titles Заголовки обьявлений
 * @param {Array} addresses Адреса обьявлений
 * @param {Array} prices Цены обьявлений
 * @param {Array} types Типы жилья
 * @param {Array} rooms Кол-во комнат
 * @param {Array} guests Кол-во возможных постояльцев
 * @param {Array} checkins Времена заезда
 * @param {Array} checkouts Времена отьезда
 * @param {Array} features Особенности обьявления
 * @param {Array} descriptions Описание обьявления
 * @param {Array} photos Фото обьявления
 * @param {number} minLeftPos Минимальная позиция слева на карте
 * @param {number} minRightPos Минимальная позиция справа на карте
 * @param {number} minTopPos Минимальная позиция сверху на карте
 * @param {number} minBottomPos Минимальная позиция снизу на карте
 * @return {Object}
 */
var createNewOffer = function (
    avatars,
    titles,
    addresses,
    prices,
    types,
    rooms,
    guests,
    checkins,
    checkouts,
    features,
    descriptions,
    photos,
    minLeftPos,
    minRightPos,
    minTopPos,
    minBottomPos
) {
  return {
    'author': {
      'avatar': getUniqueValue(avatars)
    },

    'offer': {
      'title': getRandomData(titles),
      'address': getRandomData(addresses),
      'price': getRandomData(prices),
      'type': getRandomData(types),
      'rooms': getRandomData(rooms),
      'guests': getRandomData(guests),
      'checkin': getRandomData(checkins),
      'checkout': getRandomData(checkouts),
      'features': getRandomArrFromArr(features),
      'description': getRandomData(descriptions),
      'photos': getRandomArrFromArr(photos)
    },

    'location': {
      'x': getRandomNumber(minLeftPos, minRightPos),
      'y': getRandomNumber(minTopPos, minBottomPos)
    }
  };
};

var getMaxNumber = function (arr) {
  var currentMaxNumber = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > currentMaxNumber) {
      currentMaxNumber = arr[i];
    }
  }
  return currentMaxNumber;
};

// Массив с обьявлениями
var offers = createArrFromOffers(offersToShow);

// Выполняет код после загрузки DOM
window.addEventListener('DOMContentLoaded', function () {
  // Шаблон метки
  var mapPinTemplate = document
    .querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // Шаблон карточки обьявления
  /* var cardTemplate = document
    .querySelector('#card')
    .content
    .querySelector('.map__card'); */

  // Элемент списка меток на карте
  var mapPinsElement = document.querySelector('.map__pins');

  // Центральная метка (триггер активации карты);
  var mainMapPin = mapPinsElement.querySelector('.map__pin--main');

  // Форма обьявления
  var form = document.querySelector('.ad-form');

  // Поля для заполнения в форме обьявления
  var formInputs = form.querySelectorAll('input, select, textarea');

  // Форма, содержащая фильтры обьявлений
  var mapFilters = document.querySelector('.map__filters');

  // Поля фильтра обьявлений
  var mapFiltersList = mapFilters.querySelectorAll('input, select');

  // Выключает все поля, переданные в функцию как коллекция
  var disableFields = function (elementsList) {
    for (var i = 0; i < elementsList.length; i++) {
      elementsList[i].setAttribute('disabled', '');
    }
  };

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

  /**
   * Вставляет координаты метки в поле адреса
   *
   * @param {string} location Строка с координатами метки
   */
  var insertPinLocation = function (location) {
    var addressInput = document.querySelector('#address');

    addressInput.value = location;
  };

  // Вставляем координаты метки в неактивном состоянии карты
  insertPinLocation(getPinUnactiveLocation(mainMapPin, MAIN_PIN_UNACTIVE_WIDTH, MAIN_PIN_UNACTIVE_HEIGHT));

  // Функция активации карты
  var activateMap = function () {
    // Убираем атрибут disabled у всех полей ввода в форме заполнения обьявления
    for (var l = 0; l < formInputs.length; l++) {
      formInputs[l].removeAttribute('disabled');
    }

    // Убираем атрибут disabled у всех полей ввода в фильтре обьявлений
    for (var j = 0; j < mapFiltersList.length; j++) {
      mapFiltersList[j].removeAttribute('disabled');
    }

    // Удаляем класс .map--faded у элемента с классом .map
    document.querySelector('.map').classList.remove('map--faded');

    /**
     * Отображает метку на карте на основе обьекта обьявления
     *
     * @param {Object} pin Обьект обьявления
     * @return {Node} Возвращает разметку метки
     */
    var renderPin = function (pin) {
      // Содержит разметку метки
      var pinElement = mapPinTemplate.cloneNode(true);

      pinElement.style = 'left: ' + (offers[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;

      return pinElement;
    };

    // Фрагмент, в который добавляем все метки перед отприсовкой на странице
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPin(offers[i]));
    }

    mapPinsElement.appendChild(fragment);

    var adRoomsNumber = form.querySelector('#room_number');
    var adCapacity = form.querySelector('#capacity');

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
        capacity.setCustomValidity('Максимально допустимое кол-во гостей с учетом комнат: ' + getMaxNumber((options[roomsNumber.value])));
      } else {
        capacity.setCustomValidity('');
      }
    };

    // Валидируем кол-во гостей еще до взаимодействия с формой
    validateAdCapacity(adRoomsNumber, adCapacity, capacityOptions);

    adCapacity.addEventListener('change', function () {
      validateAdCapacity(adRoomsNumber, adCapacity, capacityOptions);
    });

    adRoomsNumber.addEventListener('change', function () {
      validateAdCapacity(adRoomsNumber, adCapacity, capacityOptions);
    });
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activateMap();
      insertPinLocation(getPinActiveLocation(mainMapPin, MAIN_PIN_UNACTIVE_WIDTH, MAIN_PIN_UNACTIVE_HEIGHT, MAIN_PIN_POINTER_HEIGHT));
    }
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
      insertPinLocation(getPinActiveLocation(mainMapPin, MAIN_PIN_UNACTIVE_WIDTH, MAIN_PIN_UNACTIVE_HEIGHT, MAIN_PIN_POINTER_HEIGHT));
    }
  });

  /*
  /!**
   * Переводит тип жилья с английского на русский
   *
   * @param {string} type Тип жилья на английском
   * @return {string} Тип жилья на русском
   *!/
  var translateOfferType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
    }
    return 'Дворец';
  };

  /!**
   * Добавляет особенности жилья на карточку обьявления
   *
   * @param {Array} features Список особенностей жилья
   * @param {Object} card Карточка обьявления
   *!/
  var addFeaturesToCard = function (features, card) {
    var featuresList = card.querySelector('.popup__features');
    var wifi = '<li class="popup__feature popup__feature--wifi"></li>';
    var dishwasher = '<li class="popup__feature popup__feature--dishwasher"></li>';
    var parking = '<li class="popup__feature popup__feature--parking"></li>';
    var washer = '<li class="popup__feature popup__feature--washer"></li>';
    var elevator = '<li class="popup__feature popup__feature--elevator"></li>';
    var conditioner = '<li class="popup__feature popup__feature--conditioner"></li>';

    // Удаляем все дочерние элементы списка особенностей перед добавлением лишь необходимых
    while (featuresList.children[0]) {
      featuresList.children[0].remove();
    }

    for (var k = 0; k < features.length; k++) {
      switch (features[k]) {
        case 'wifi':
          featuresList.insertAdjacentHTML('beforeend', wifi);
          break;
        case 'dishwasher':
          featuresList.insertAdjacentHTML('beforeend', dishwasher);
          break;
        case 'parking':
          featuresList.insertAdjacentHTML('beforeend', parking);
          break;
        case 'washer':
          featuresList.insertAdjacentHTML('beforeend', washer);
          break;
        case 'elevator':
          featuresList.insertAdjacentHTML('beforeend', elevator);
          break;
        case 'conditioner':
          featuresList.insertAdjacentHTML('beforeend', conditioner);
          break;
      }
    }
  };

  /!**
   * Вставляет фотографии обьявления из массива в карточку обьявления
   *
   * @param {Array} photos Массив с фотографиями обьявления
   * @param {Object} card Карточка обьявления
   *!/
  var addPhotosToCard = function (photos, card) {
    // Содержит родительский элемент фотографий в карточке
    var photosList = card.querySelector('.popup__photos');

    // Первая фотография из списка в карточке
    var firstPhoto = photosList.children[0];

    for (var j = 0; j < photos.length; j++) {
      // Шаблон фотографии для вставки в карточку обьявления
      var photoTemplate = '<img src="' + photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

      // Если в первом элементе списка фоток нету адреса изображения - вставляем первый адрес из массива фоток
      if (firstPhoto.getAttribute('src') === '') {
        photosList.children[0].src = photos[j];
      } else {
        // Если в перфом элементе списка фоток уже есть адрес изображения - вставлям шаблон с дополнительной фоткой
        photosList.insertAdjacentHTML('beforeend', photoTemplate);
      }
    }
  };

  /!**
   * Создает карточку обьявления на основе шаблона в HTML
   *
   * @param {Array} arr Массив со всеми обьявлениями
   *!/
  var buildCard = function (arr) {
    // Содержит первый элемент массива с обьявлениями
    var firstCard = arr[0];

    // Содержит разметку карточки обьявления
    var cardElement = cardTemplate.cloneNode(true);

    // Записвыем пути к элементам в переменные для удобства
    var map = document.querySelector('.map');
    var filtersContainer = document.querySelector('.map__filters-container');

    cardElement.querySelector('.popup__title').textContent = firstCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = firstCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateOfferType(firstCard.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты для ' + firstCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + firstCard.offer.checkin + ', выезд до ' + firstCard.offer.checkout;
    addFeaturesToCard(firstCard.offer.features, cardElement);
    cardElement.querySelector('.popup__description').textContent = firstCard.offer.description;
    addPhotosToCard(firstCard.offer.photos, cardElement);
    cardElement.querySelector('.popup__avatar').src = firstCard.author.avatar;

    map.insertBefore(cardElement, filtersContainer);
  };*/

  // Выключаем поля в фильтре обьявлений при загрузке страницы
  disableFields(mapFiltersList);

  // Выключаем поля формы при загрузке страницы
  disableFields(formInputs);

  // buildCard(offers);
});
