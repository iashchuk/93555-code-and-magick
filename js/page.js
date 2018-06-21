'use strict';

(function () {

  /**
   * Функция инициализации страницы
   * @param {Node} fragment
   */
  var initPage = function (fragment) {
    var page = document.querySelector('.setup');
    page.querySelector('.setup-similar').classList.remove('hidden');
    page.querySelector('.setup-similar-list').appendChild(fragment);
    window.popup.init();
  };

  // Создаем волшебников и инициализируем страницу
  initPage(window.wizard.create);

})();
