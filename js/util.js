'use strict';

(function () {
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
    var newArrLength = window.util.getRandomNumber(minArrLength, arr.length);

    for (var i = 0; i < newArrLength; i++) {
      var currentValue = window.util.getRandomData(arr);

      if (!window.util.isExistInArray(currentValue, newArr)) {
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
   * Возвращает наибольшее число из массива
   *
   * @param {Array} arr Массив с числами
   * @return {number} Наибольшее число
   */
  var getMaxNumber = function (arr) {
    var currentMaxNumber = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > currentMaxNumber) {
        currentMaxNumber = arr[i];
      }
    }
    return currentMaxNumber;
  };

  window.util = {
    getRandomData: getRandomData,
    getRandomNumber: getRandomNumber,
    isExistInArray: isExistInArray,
    getRandomArrFromArr: getRandomArrFromArr,
    getUniqueValue: getUniqueValue,
    getMaxNumber: getMaxNumber
  };

})();
