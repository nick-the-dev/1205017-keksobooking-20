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

// Ширина метки
var pinWidth = 50;

// Высота метки
var pinHeight = 70;

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
 * @return {{number}} Случаное число
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
    return false;
  }
};

/**
 * Создает рандомно отсортированный массив случайной длинны из другого массива
 *
 * @param {Array} arr Оригинальный массив
 * @return {[]} Новый массив
 */
var getRandomArrFromArr = function (arr) {
  var newArr = [];
  var firstIndex = 0;
  var newArrLength = getRandomNumber(firstIndex, arr.length);

  for (var i = 0; i < newArrLength; i++) {
    var currentValue = getRandomData(arr);

    if (!isExistInArray(currentValue, newArr)) {
      newArr.push(currentValue);
    }
  }

  return newArr;
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
    // Шаблон обьявления
    var offer = {
      'author': {
        'avatar': getRandomData(authorAvatars)
      },

      'offer': {
        'title': getRandomData(offerTitles),
        'address': getRandomData(offerAddresses),
        'price': getRandomData(offerPrices),
        'type': getRandomData(offerTypes),
        'rooms': getRandomData(offerRooms),
        'guests': getRandomData(offerGuests),
        'checkin': getRandomData(offerCheckins),
        'checkout': getRandomData(offerCheckouts),
        'features': getRandomArrFromArr(offerFeatures),
        'description': getRandomData(offerDescriptions),
        'photos': getRandomArrFromArr(offerPhotos)
      },

      'location': {
        'x': getRandomNumber(minLeftPosition, minRightPosition),
        'y': getRandomNumber(minTopPosition, minBottomPosition)
      }
    };

    arr.push(offer);
  }
  return arr;
};

// Массив с обьявлениями
var offers = createArrFromOffers(offersToShow);

// Выполняет код после загрузки DOM
window.addEventListener('DOMContentLoaded', function () {
  // Удаляем класс .map--faded у элемента с классом .map
  document.querySelector('.map').classList.remove('map--faded');

  // Элемент списка меток на карте
  var mapPinsElement = document.querySelector('.map__pins');

  // Шаблон метки
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  /**
   * Отображает метку на карте на основе обьекта обьявления
   *
   * @param {Object} pin Обьект обьявления
   * @return {Node} Возвращает разметку метки
   */
  var renderPin = function (pin) {
    // Содержит разметку метки
    var pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (offers[i].location.x - pinWidth / 2) + 'px; top: ' + (pin.location.y - pinHeight) + 'px;';
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
});
