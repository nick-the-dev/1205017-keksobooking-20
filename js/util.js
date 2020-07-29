'use strict';

(function () {
  /**
   * Возвращает случайный элемент из массива
   *
   * @param {Array} data Массив в которм ищем элемент
   * @return {*} Случайный элемент массива
   */
  var getRandomData = function (data) {
    return data[Math.floor(Math.random() * data.length)];
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
   * @param {Array} data Массив, в котором проверяем
   * @return {boolean} true - элемент находится в массиве, false - элемента в массиве нет
   */
  var isExistInArray = function (value, data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i] === value) {
        return true;
      }
    }
    return false;
  };

  /**
   * Создает рандомно отсортированный массив случайной длинны из другого массива
   *
   * @param {Array} data Оригинальный массив
   * @return {Array} Новый массив
   */
  var getRandomArrFromArr = function (data) {
    var newData = [];

    // Минимальная длинна нового массива
    var minArrayLength = 1;
    var newArrayLength = window.util.getRandomNumber(minArrayLength, data.length);

    for (var i = 0; i < newArrayLength; i++) {
      var currentValue = window.util.getRandomData(data);

      if (!window.util.isExistInArray(currentValue, newData)) {
        newData.push(currentValue);
      }
    }

    return newData;
  };

  /**
   * Возвращает первый элемент из массива, а затем удаляет его, сокращая массив
   *
   * @param {Array} data Массив
   * @return {*} Первый элемент массива
   */
  var getUniqueValue = function (data) {
    // Временная переменная которая хранит первый элемент массива
    var temp = data[0];
    data.splice(0, 1);
    return temp;
  };

  /**
   * Возвращает наибольшее число из массива
   *
   * @param {Array} data Массив с числами
   * @return {number} Наибольшее число
   */
  var getMaxNumber = function (data) {
    var currentMaxNumber = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i] > currentMaxNumber) {
        currentMaxNumber = data[i];
      }
    }
    return currentMaxNumber;
  };

  var onError = function (message) {
    window.util.error = message;
  };

  window.util = {
    getRandomData: getRandomData,
    getRandomNumber: getRandomNumber,
    isExistInArray: isExistInArray,
    getRandomArrFromArr: getRandomArrFromArr,
    getUniqueValue: getUniqueValue,
    getMaxNumber: getMaxNumber,
    onError: onError
  };

})();
