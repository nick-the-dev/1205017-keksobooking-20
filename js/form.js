'use strict';

(function () {
  window.addEventListener('DOMContentLoaded', function () {

    // Форма обьявления
    var formElement = document.querySelector('.ad-form');

    // Поля для заполнения в форме обьявления
    var formInputs = formElement.querySelectorAll('input, select, textarea');

    // Убирает атрибут disabled у всех полей, переданых в функцию
    var activateFields = function (fields) {
      for (var l = 0; l < fields.length; l++) {
        fields[l].removeAttribute('disabled');
      }
    };

    // Убирает у формы, переданной в функцию, класс с "выключенным" состоянием
    var activateForm = function (form) {
      form.classList.remove('ad-form--disabled');
    };

    // Выключает все поля, переданные в функцию
    var disableFields = function (elementsList) {
      for (var i = 0; i < elementsList.length; i++) {
        elementsList[i].setAttribute('disabled', '');
      }
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

    var adRoomsNumber = formElement.querySelector('#room_number');
    var adCapacity = formElement.querySelector('#capacity');

    window.form = {
      formElement: formElement,
      formInputs: formInputs,
      activateFields: activateFields,
      activateForm: activateForm,
      disableFields: disableFields,
      insertPinLocation: insertPinLocation,
      adRoomsNumber: adRoomsNumber,
      adCapacity: adCapacity
    };
  });

})();
