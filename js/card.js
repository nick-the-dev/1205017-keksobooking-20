'use strict';

(function () {
  window.addEventListener('DOMContentLoaded', function () {
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

    /**
     * Создает карточку обьявления на основе шаблона в HTML
     *
     * @param {Array} arr Массив со всеми обьявлениями
     */
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
    };

    window.card = {
      buildCard: buildCard
    };

  });
})();


