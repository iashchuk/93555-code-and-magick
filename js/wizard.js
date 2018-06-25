'use strict';

(function () {

  var caseWizard = {
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
    ],
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupPlayer = document.querySelector('.setup-player');
  var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardCoatInput = setupPlayer.querySelector('[name=coat-color]');
  var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var wizardEyesInput = setupPlayer.querySelector('[name=eyes-color]');
  var setupWizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupWizardFireball.querySelector('[name=fireball-color]');
  var NUMBER_WIZARDS = 4;

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
      colorCoat: coatColor,
      colorEyes: eyesColor
    };
    return wizard;
  };

  /**
   * Функция создания волшебников
   * @param {Object} dataWizard
   * @param {number} quantityWizards - необходимое количество волшебников
   * @return {Array.<Object>}
   */
  var createWizards = function (dataWizard, quantityWizards) {
    var shuffleNames = window.utils.shuffleElements(dataWizard.NAMES);
    var shuffleSurnames = window.utils.shuffleElements(dataWizard.SURNAMES);
    var shuffleCoatColors = window.utils.shuffleElements(dataWizard.COAT_COLORS);
    var shuffleEyesColors = window.utils.shuffleElements(dataWizard.EYES_COLORS);
    var randomWizards = [];

    for (var i = 0; i < quantityWizards; i++) {
      var newWizard = getWizard(
          shuffleNames[i],
          shuffleSurnames[i],
          shuffleCoatColors[i],
          shuffleEyesColors[i]
      );
      randomWizards.push(newWizard);
    }
    return randomWizards;
  };

  /**
   * Функция отрисовки волшебников на основе шаблона
   * @param {Object} wizard
   * @return {Node}
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
 * Функция задания цвета элементу и значения в input
 * @param {Node} element
 * @param {Array.<string>} color
 * @param {Node} input
 */
  var selectElementColor = function (element, color, input) {
    var prevColor = input.value;
    var currentColor = window.utils.getRandomElement(color);

    while (prevColor === currentColor) {
      currentColor = window.utils.getRandomElement(color);
    }

    if (element === setupWizardFireball) {
      element.style.background = currentColor;
    } else {
      element.style.fill = currentColor;
    }
    input.value = currentColor;
  };

  // Сменаа цвета плаща по клике по нему
  var wizardCoatClickHandler = function () {
    selectElementColor(setupWizardCoat, caseWizard.COAT_COLORS, wizardCoatInput);
  };

  // Смена цвета глаз при клике по ним
  var wizardEyesClickHandler = function () {
    selectElementColor(setupWizardEyes, caseWizard.EYES_COLORS, wizardEyesInput);
  };

  // Смена цвета файерболла при клике по нему
  var wizardFireballClickHandler = function () {
    selectElementColor(
        setupWizardFireball,
        caseWizard.FIREBALL_COLORS,
        wizardFireballInput
    );
  };

  var initChangeColor = function () {
    setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
  };

  var deactivateChangeColor = function () {
    setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);
  };


  window.wizard = {
    random: createWizards(caseWizard, NUMBER_WIZARDS),
    renderWizard: renderWizard,
    setHandlers: initChangeColor,
    removeHandlers: deactivateChangeColor
  };

})();

