'use strict';

(function () {

  window.addEventListener('DOMContentLoaded', function () {
    // Форма, содержащая фильтры обьявлений
    var mapFilters = document.querySelector('.map__filters');

    // Поля фильтра обьявлений
    var mapFiltersList = mapFilters.querySelectorAll('input, select');

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

      for (var i = 0; i < offers.length; i++) {
        fragment.appendChild(renderPin(offers[i]));
      }

      window.pin.mapPinsElement.appendChild(fragment);
    };

    // Функция активации карты
    var activateMap = function () {
      // Активируем поля формы создания обьявления
      window.form.activateFields(window.form.formInputs);

      // Активируем саму форму создания обьявления
      window.form.activateForm(window.form.formElement);

      // Активируем фильтры обьявлений на крате
      activateMapFilters(window.map.mapFiltersList);

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
    };

    // Вставляем координаты метки в неактивном состоянии карты
    window.form.insertPinLocation(window.pin.getPinUnactiveLocation(window.pin.mainMapPin, window.pin.mainPinUnactiveWidth, window.pin.mainPinUnactiveHeight));

    // Выключаем поля в фильтре обьявлений при загрузке страницы
    window.form.disableFields(mapFiltersList);

    // Выключаем поля формы при загрузке страницы
    window.form.disableFields(window.form.formInputs);

    window.map = {
      mapFiltersList: mapFiltersList,
      activateMap: activateMap
    };
  });

})();
