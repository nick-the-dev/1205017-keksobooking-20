'use strict';

(function () {

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
  var offerTitles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
    'Title 5',
    'Title 6',
    'Title 7',
    'Title 8'
  ];

  // Адреса обьявлений
  var offerAddresses = [
    '800, 100',
    '700, 200',
    '600, 300',
    '500, 400',
    '400, 500',
    '300, 600',
    '200, 700',
    '100, 800'
  ];

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
  var offerDescriptions = [
    'desc1',
    'desc2',
    'desc3',
    'desc4',
    'desc5',
    'desc6',
    'desc7',
    'desc8'
  ];

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

  /**
   * Создает массив с обьявлениями в виде обьектов
   *
   * @param {number} numOfOffers Колличество обьявлений, которое нужно добавить в массив
   * @return {[]}
   */
  var createArrFromOffers = function (numOfOffers) {
    var arr = [];
    for (var i = 0; i < numOfOffers; i++) {
      arr.push(createNewOffer(
          authorAvatars,
          offerTitles,
          offerAddresses,
          offerPrices,
          offerTypes,
          offerRooms,
          offerGuests,
          offerCheckins,
          offerCheckouts,
          offerFeatures,
          offerDescriptions,
          offerPhotos,
          minLeftPosition,
          minRightPosition,
          minTopPosition,
          minBottomPosition
      ));
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
        'avatar': window.util.getUniqueValue(avatars)
      },

      'offer': {
        'title': window.util.getRandomData(titles),
        'address': window.util.getRandomData(addresses),
        'price': window.util.getRandomData(prices),
        'type': window.util.getRandomData(types),
        'rooms': window.util.getRandomData(rooms),
        'guests': window.util.getRandomData(guests),
        'checkin': window.util.getRandomData(checkins),
        'checkout': window.util.getRandomData(checkouts),
        'features': window.util.getRandomArrFromArr(features),
        'description': window.util.getRandomData(descriptions),
        'photos': window.util.getRandomArrFromArr(photos)
      },

      'location': {
        'x': window.util.getRandomNumber(minLeftPos, minRightPos),
        'y': window.util.getRandomNumber(minTopPos, minBottomPos)
      }
    };
  };

  // Массив с обьявлениями
  var offers = createArrFromOffers(offersToShow);

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
    capacityOptions: capacityOptions,
    validateAdCapacity: validateAdCapacity
  };

})();
