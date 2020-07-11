'use strict';

(function () {
  window.addEventListener('DOMContentLoaded', function () {

    // Форма обьявления
    var formElement = document.querySelector('.ad-form');

    // Поля для заполнения в форме обьявления
    var formInputs = formElement.querySelectorAll('input, select, textarea');

    var formType = formElement.querySelector('#type');
    var formPrice = formElement.querySelector('#price');
    var checkinTime = formElement.querySelector('#timein');
    var checkoutTime = formElement.querySelector('#timeout');

    // Убирает атрибут disabled у всех полей, переданых в функцию (кроме поля с адресом)
    var activateFields = function (fields) {
      for (var l = 0; l < fields.length; l++) {
        if (fields[l].getAttribute('id') !== 'address') {
          fields[l].removeAttribute('disabled');
        }
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

    var setPriceForType = function () {
      switch (window.form.formType.value) {
        case 'bungalo':
          window.form.formPrice.setAttribute('min', '0');
          break;
        case 'flat':
          window.form.formPrice.setAttribute('min', '1000');
          break;
        case 'house':
          window.form.formPrice.setAttribute('min', '5000');
          break;
        case 'palace':
          window.form.formPrice.setAttribute('min', '10000');
          break;
      }
    };

    var validateTime = function (element, target) {
      switch (element.value) {
        case '12:00':
          target.value = '12:00';
          break;
        case '13:00':
          target.value = '13:00';
          break;
        case '14:00':
          target.value = '14:00';
          break;
      }
    };

    window.form = {
      formElement: formElement,
      formInputs: formInputs,
      activateFields: activateFields,
      activateForm: activateForm,
      disableFields: disableFields,
      insertPinLocation: insertPinLocation,
      adRoomsNumber: adRoomsNumber,
      adCapacity: adCapacity,
      formPrice: formPrice,
      formType: formType,
      setPriceForType: setPriceForType,
      checkinTime: checkinTime,
      checkoutTime: checkoutTime,
      validateTime: validateTime
    };
  });

})();
