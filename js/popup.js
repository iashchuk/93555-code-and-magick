'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  /**
   * @enum {number}
   */
  var KeyCodes = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  // Закрытие диалогового окна пользователя при клике на Х
  var onPopupCloseClick = function () {
    closePopup();
  };

  // Закрытие диалогового окна пользователя при нажатии ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KeyCodes.ESC_KEYCODE) {
      closePopup();
    }
  };

  // Закрытие диалогового окна пользователя при нажатии ENTER на Х
  var onPopupCloseEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER_KEYCODE) {
      closePopup();
    }
  };

    // Открытие диалогового окна пользователя при клике на аватар
  var onPopupOpenClick = function () {
    openPopup();
  };

    // Открытие диалогового окна пользователя при нажатии ENTER на аватаре
  var onPopupOpenEnterPress = function (evt) {
    if (evt.keyCode === KeyCodes.ENTER_KEYCODE) {
      openPopup();
    }
  };

  // Функция событий при закрытии диалогового окна
  var closePopup = function () {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onPopupCloseEnterPress);
    window.form.deactivate();
    // window.wizard.removeHandlers();

    setup.style = null;
  };

  // Функция событий при открытии диалогового окна
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('click', onPopupCloseClick);
    setupClose.addEventListener('keydown', onPopupCloseEnterPress);
    // window.wizard.setHandlers();

    window.form.init();
  };

  var initPopup = function () {
    setupOpen.addEventListener('click', onPopupOpenClick);
    setupOpen.addEventListener('keydown', onPopupOpenEnterPress);
  };


  window.popup = {
    init: initPopup
  };

})();
