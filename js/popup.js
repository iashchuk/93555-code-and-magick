'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');


  // Закрытие диалогового окна пользователя при клике на Х
  var onPopupCloseClick = function () {
    closePopup();
  };

  // Закрытие диалогового окна пользователя при нажатии ESC
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // Закрытие диалогового окна пользователя при нажатии ENTER на Х
  var onPopupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };


  // Функция событий при закрытии диалогового окна
  var closePopup = function () {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('keydown', onPopupCloseEnterPress);
    window.form.deactivate();
    window.colorize.deactivate();
    setup.style = null;
  };

  // Функция событий при открытии диалогового окна
  var openPopup = function () {
    setup.classList.remove('hidden');
    setupClose.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
    setupClose.addEventListener('keydown', onPopupCloseEnterPress);
    window.colorize.init();
    window.form.init();
  };

  window.popup = {

    initClick: function () {
      setupOpen.addEventListener('click', function () {
        openPopup();
      });
    },

    initKey: function () {

      setupOpen.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, openPopup);
      });
    }
  };

})();
