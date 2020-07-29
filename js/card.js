'use strict';

(function () {
  // Шаблон карточки обьявления
  var cardTemplate = document
    .querySelector('#card')
    .content
    .querySelector('.map__card');

  /**
   * Переводит тип жилья с английского на русский
   *
   * @param {string} type Тип жилья на английском
   * @return {string} Тип жилья на русском
   */
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

  /**
   * Добавляет особенности жилья на карточку обьявления
   *
   * @param {Array} features Список особенностей жилья
   * @param {Object} card Карточка обьявления
   */
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

  /**
   * Вставляет фотографии обьявления из массива в карточку обьявления
   *
   * @param {Array} photos Массив с фотографиями обьявления
   * @param {Object} card Карточка обьявления
   */
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

  var map = document.querySelector('.map');

  var onCardCloseMousedown = function (evt) {
    if (evt.button === 0) {
      removeCard();
    }
  };

  var onCardCloseKeydown = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
    }
  };

  var importData = function (element, data) {
    if (data === 'undefined') {
      element.parentNode.removeChild(element);
    } else {
      element.textContent = data;
    }
  };

  /**
   * Создает карточку обьявления на основе обьекта
   *
   * @param {objectect} object Обьект обьявления
   */
  var buildCard = function (object) {
    // Содержит разметку карточки обьявления
    var cardElement = cardTemplate.cloneNode(true);
    var titleElement = cardElement.querySelector('.popup__title');
    var addressElement = cardElement.querySelector('.popup__text--address');
    var priceElement = cardElement.querySelector('.popup__text--price');
    var typeElement = cardElement.querySelector('.popup__type');
    var capacityElement = cardElement.querySelector('.popup__text--capacity');
    var timeElement = cardElement.querySelector('.popup__text--time');
    var featuresElement = cardElement.querySelector('.popup__features');
    var descriptionElement = cardElement.querySelector('.popup__description');
    var photosElement = cardElement.querySelector('.popup__photos');
    var avatarElement = cardElement.querySelector('.popup__avatar');

    var filtersContainer = document.querySelector('.map__filters-container');

    importData(titleElement, object.offer.title);
    importData(addressElement, object.offer.address);
    importData(priceElement, object.offer.price + '₽/ночь');
    importData(typeElement, translateOfferType(object.offer.type));
    importData(capacityElement, object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей');
    importData(timeElement, 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout);

    if (object.offer.features[0] !== undefined) {
      addFeaturesToCard(object.offer.features, cardElement);
    } else {
      featuresElement.parentNode.removeChild(featuresElement);
    }

    importData(descriptionElement, object.offer.description);

    if (object.offer.photos[0] !== undefined) {
      addPhotosToCard(object.offer.photos, cardElement);
    } else {
      photosElement.parentNode.removeChild(photosElement);
    }

    avatarElement.src = object.author.avatar;

    map.insertBefore(cardElement, filtersContainer);
    var card = map.querySelector('.map__card');
    var cardCloseBtn = card.querySelector('.popup__close');
    cardCloseBtn.addEventListener('mousedown', onCardCloseMousedown);
    document.addEventListener('keydown', onCardCloseKeydown);
  };

  // Удаляет карточку обьявления с карты
  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card !== null) {
      card.removeEventListener('mousedown', onCardCloseMousedown);
      document.removeEventListener('keydown', onCardCloseKeydown);
      card.parentNode.removeChild(card);
    }
  };

  window.card = {
    buildCard: buildCard,
    removeCard: removeCard
  };

})();


