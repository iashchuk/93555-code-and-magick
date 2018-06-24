'use strict';

(function () {

  var page = document.querySelector('.setup');
  var similarListElement = page.querySelector('.setup-similar-list');
  var LOAD_WIZARDS = 4;

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < LOAD_WIZARDS; i++) {
      fragment.appendChild(window.wizard.renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    page.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  /**
   * Функция инициализации страницы
   */
  var initPage = function () {
    window.backend.load(successHandler, errorHandler);
    window.popup.init();
  };

  initPage();

  window.page = {
    errorHandler: errorHandler
  };

})();
