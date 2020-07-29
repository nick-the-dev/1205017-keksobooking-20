'use strict';

(function () {
  var MIN_BUNGALO_PRICE = '0';
  var MIN_FLAT_PRICE = '1000';
  var MIN_HOUSE_PRICE = '5000';
  var MIN_PALACE_PRICE = '10000';
  var TIME_OPTION_1 = '12:00';
  var TIME_OPTION_2 = '13:00';
  var TIME_OPTION_3 = '14:00';

  // Форма обьявления
  var formElement = document.querySelector('.ad-form');

  // Поля для заполнения в форме обьявления
  var formInputs = formElement.querySelectorAll('input, select, textarea');

  var formType = formElement.querySelector('#type');
  var formPrice = formElement.querySelector('#price');
  var checkinTime = formElement.querySelector('#timein');
  var checkoutTime = formElement.querySelector('#timeout');
  var formAddress = formElement.querySelector('#address');
  var formTitle = formElement.querySelector('#title');
  var formFeatures = formElement.querySelector('.features');
  var formRoomNumber = formElement.querySelector('#room_number');
  var formRoomCapacity = formElement.querySelector('#capacity');
  var formDescription = formElement.querySelector('#description');
  var formAvatar = formElement.querySelector('#avatar');
  var formImage = formElement.querySelector('#images');
  var formResetBtn = formElement.querySelector('.ad-form__reset');

  var onSubmit = function (evt) {
    window.upload(new FormData(window.form.formElement), function () {
      window.map.deactivateMap();
      window.form.showSendSuccess();
    }, function () {
      window.form.showSendError();
    });
    evt.preventDefault();
  };

  var onFormReset = function (evt) {
    evt.preventDefault();
    clearForm();
  };

  // Убирает атрибут disabled у всех полей, переданых в функцию (кроме поля с адресом)
  var activateFields = function (fields) {
    for (var l = 0; l < fields.length; l++) {
      if (fields[l].getAttribute('id') !== 'address') {
        fields[l].removeAttribute('disabled');
      }
    }
  };

  var deactivateFields = function (fields) {
    for (var l = 0; l < fields.length; l++) {
      if (fields[l].getAttribute('id') !== 'address') {
        fields[l].setAttribute('disabled', '');
      }
    }
  };

  // Убирает у формы, переданной в функцию, класс с "выключенным" состоянием
  var activateForm = function (form) {
    form.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function (form) {
    form.classList.add('ad-form--disabled');
  };

  var resetFeatures = function () {
    var featuresCollection = formFeatures.querySelectorAll('.feature__checkbox');
    featuresCollection.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var selectDefaultValue = function (selectElement, defaultValue) {
    var collection = selectElement.querySelectorAll('option');
    collection.forEach(function (option) {
      option.selected = (option.value !== defaultValue) ? false : true;
    });
  };

  var resetType = function () {
    var typeDefault = 'flat';
    selectDefaultValue(formType, typeDefault);
  };

  var resetRooms = function () {
    var roomsDefault = '1';
    selectDefaultValue(formRoomNumber, roomsDefault);
  };

  var resetCapacity = function () {
    var capacityDefault = '3';
    selectDefaultValue(formRoomCapacity, capacityDefault);
  };

  var resetCheckin = function () {
    var checkinDefault = '12:00';
    selectDefaultValue(checkinTime, checkinDefault);
  };

  var resetCheckout = function () {
    var checkoutDefault = '12:00';
    selectDefaultValue(checkoutTime, checkoutDefault);
  };

  var clearForm = function () {
    formTitle.value = '';
    resetFeatures();
    formPrice.value = '';
    resetType();
    resetRooms();
    resetCapacity();
    resetCheckin();
    resetCheckout();
    formDescription.value = '';
    formAvatar.value = '';
    formImage.value = '';
  };

  // Выключает все поля, переданные в функцию
  var disableFields = function (elementsList) {
    for (var i = 0; i < elementsList.length; i++) {
      if (elementsList[i] !== formAddress) {
        elementsList[i].setAttribute('disabled', '');
      }
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
        window.form.formPrice.setAttribute('min', MIN_BUNGALO_PRICE);
        window.form.formPrice.placeholder = MIN_BUNGALO_PRICE;
        break;
      case 'flat':
        window.form.formPrice.setAttribute('min', MIN_FLAT_PRICE);
        window.form.formPrice.placeholder = MIN_FLAT_PRICE;
        break;
      case 'house':
        window.form.formPrice.setAttribute('min', MIN_HOUSE_PRICE);
        window.form.formPrice.placeholder = MIN_HOUSE_PRICE;
        break;
      case 'palace':
        window.form.formPrice.setAttribute('min', MIN_PALACE_PRICE);
        window.form.formPrice.placeholder = MIN_PALACE_PRICE;
        break;
    }
  };

  var validateTime = function (element, target) {
    switch (element.value) {
      case TIME_OPTION_1:
        target.value = TIME_OPTION_1;
        break;
      case TIME_OPTION_2:
        target.value = TIME_OPTION_2;
        break;
      case TIME_OPTION_3:
        target.value = TIME_OPTION_3;
        break;
    }
  };

  var successMessageTemplate = document
    .querySelector('#success')
    .content
    .querySelector('.success');

  var errorMessageTemplate = document
    .querySelector('#error')
    .content
    .querySelector('.error');

  var pageMain = document.querySelector('main');

  var insertSendStatus = function () {
    var promo = pageMain.querySelector('.promo');
    var successElement = successMessageTemplate.cloneNode(true);
    var errorElement = errorMessageTemplate.cloneNode(true);

    successElement.style.display = 'none';
    errorElement.style.display = 'none';
    pageMain.insertBefore(successElement, promo);
    pageMain.insertBefore(errorElement, promo);
  };

  var onSuccessClick = function () {
    var successMessage = pageMain.querySelector('.success');
    successMessage.style.display = 'none';
    successMessage.removeEventListener('click', onSuccessClick);
  };

  var onSuccessKeydown = function (evt) {
    var successMessage = pageMain.querySelector('.success');
    if (evt.key === 'Escape') {
      successMessage.style.display = 'none';
    }
    document.removeEventListener('keydown', onSuccessClick);
  };

  var onErrorClick = function () {
    var errorMessage = pageMain.querySelector('.error');
    errorMessage.style.display = 'none';
    errorMessage.removeEventListener('click', onErrorClick);
  };

  var onErrorBtnClick = function () {
    var errorMessage = pageMain.querySelector('.error');
    errorMessage.style.display = 'none';
    errorMessage.removeEventListener('click', onErrorBtnClick);
  };

  var onErrorKeydown = function (evt) {
    var errorMessage = pageMain.querySelector('.error');
    if (evt.key === 'Escape') {
      errorMessage.style.display = 'none';
    }
    document.removeEventListener('keydown', onErrorKeydown);
  };

  var showSendSuccess = function () {
    var successMessage = pageMain.querySelector('.success');
    successMessage.style.display = 'block';

    successMessage.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessKeydown);
  };

  var showSendError = function () {
    var errorMessage = pageMain.querySelector('.error');
    var errorMessageButton = errorMessage.querySelector('.error__button');
    errorMessage.style.display = 'block';

    errorMessage.addEventListener('click', onErrorClick);
    errorMessageButton.addEventListener('click', onErrorBtnClick);
    document.addEventListener('keydown', onErrorKeydown);
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
    validateTime: validateTime,
    formAddress: formAddress,
    deactivateFields: deactivateFields,
    deactivateForm: deactivateForm,
    clearForm: clearForm,
    onSubmit: onSubmit,
    formResetBtn: formResetBtn,
    onFormReset: onFormReset,
    insertSendStatus: insertSendStatus,
    showSendSuccess: showSendSuccess,
    showSendError: showSendError
  };

})();
