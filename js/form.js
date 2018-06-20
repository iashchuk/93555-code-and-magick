'use strict';

(function () {
  var setupForm = document.querySelector('.setup-wizard-form');
  var userNameInput = setupForm.querySelector('.setup-user-name');

  /**
   * Функция валидации поля ввода имени пользователя
   * @param {Node} input
   */
  var validUserInput = function (input) {
    if (input.validity.tooShort) {
      input.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (input.validity.tooLong) {
      input.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле');
    } else {
      input.setCustomValidity('');
    }
  };

  // Задание правильного имени пользователя
  var setupValidUserName = function () {
    validUserInput(userNameInput);
  };

  // Сброс невалидного состояния
  var resetInvalidInput = function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  };


  window.form = {
    init: function () {
      userNameInput.addEventListener('click', setupValidUserName);
      userNameInput.addEventListener('input', resetInvalidInput);
    },

    deactivate: function () {
      userNameInput.removeEventListener('click', setupValidUserName);
      userNameInput.removeEventListener('input', resetInvalidInput);
    }
  };

})();
