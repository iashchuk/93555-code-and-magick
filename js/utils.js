'use strict';

(function () {

  /**
   * @enum {number}
   */
  var KeyCodes = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCodes.ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCodes.ENTER_KEYCODE) {
      action();
    }
  };

  /**
   * Функция получения случайного элемента массива
   * @param {Array} arrayElements
   * @return {*}
   */
  var getRandomElement = function (arrayElements) {
    var index = Math.floor(Math.random() * arrayElements.length);
    return arrayElements[index];
  };

  /**
   * Функция тасования массива по алгоритму Фишера-Йетса
   * @param {Array} arrayElements
   * @return {Array}
   */
  var shuffleElements = function (arrayElements) {
    for (var i = arrayElements.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arrayElements[j];
      arrayElements[j] = arrayElements[i];
      arrayElements[i] = temp;
    }
    return arrayElements;
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    shuffleElements: shuffleElements
  };

})();
