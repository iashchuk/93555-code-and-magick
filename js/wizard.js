'use strict';

(function () {

  var names = {
    NAMES: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    SURNAMES: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвин'
    ]
  };

  var NUMBER_WIZARDS = 4;
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /**
   * Функция создания волшебника
   * @param {string} name
   * @param {string} surname
   * @param {string} coatColor
   * @param {string} eyesColor
   * @return {Object}
   */
  var getWizard = function (name, surname, coatColor, eyesColor) {
    var wizard = {
      name: name + ' ' + surname,
      coatColor: coatColor,
      eyesColor: eyesColor
    };
    return wizard;
  };

  /**
   * Функция создания волшебников
   * @param {Object} nameWizards
   * @param {Object} colorWizards
   * @param {number} quantityWizards - необходимое количество волшебников
   * @return {Node}
   */
  var createWizards = function (nameWizards, colorWizards, quantityWizards) {
    var fragment = document.createDocumentFragment();
    var shuffleNames = window.util.shuffleElements(nameWizards.NAMES);
    var shuffleSurnames = window.util.shuffleElements(nameWizards.SURNAMES);
    var shuffleCoatColors = window.util.shuffleElements(
        colorWizards.COAT_COLORS
    );
    var shuffleEyesColors = window.util.shuffleElements(
        colorWizards.EYES_COLORS
    );

    for (var i = 0; i < quantityWizards; i++) {
      var newWizard = getWizard(
          shuffleNames[i],
          shuffleSurnames[i],
          shuffleCoatColors[i],
          shuffleEyesColors[i]
      );
      fragment.appendChild(renderWizard(newWizard));
    }
    return fragment;
  };

  /**
   * Функция отрисовки волшебников на основе шаблона
   * @param {Object} wizard
   * @return {Node}
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent =
      wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };


  window.wizard = {
  // Создаем волшебников
    create: createWizards(names, window.colorize.colors, NUMBER_WIZARDS)
  };

})();

