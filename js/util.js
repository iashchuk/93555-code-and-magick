'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    /**
     * Функция получения случайного элемента массива
     * @param {Array} arrayElements
     * @return {*}
     */
    getRandomElement: function (arrayElements) {
      var index = Math.floor(Math.random() * arrayElements.length);
      return arrayElements[index];
    },

    /**
     * Функция тасования массива по алгоритму Фишера-Йетса
     * @param {Array} arrayElements
     * @return {Array}
     */
    shuffleElements: function (arrayElements) {
      for (var i = arrayElements.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arrayElements[j];
        arrayElements[j] = arrayElements[i];
        arrayElements[i] = temp;
      }
      return arrayElements;
    }
  };
})();
