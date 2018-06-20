'use strict';

(function () {

  var setupPlayer = document.querySelector('.setup-player');
  var setupWizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardCoatInput = setupPlayer.querySelector('[name=coat-color]');
  var setupWizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var wizardEyesInput = setupPlayer.querySelector('[name=eyes-color]');
  var setupWizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupWizardFireball.querySelector('[name=fireball-color]');

  /**
 * Функция задания цвета элементу и значения в input
 * @param {Node} element
 * @param {Array.<string>} color
 * @param {Node} input
 */
  var selectElementColor = function (element, color, input) {
    var prevColor = input.value;
    var currentColor = window.util.getRandomElement(color);

    while (prevColor === currentColor) {
      currentColor = window.util.getRandomElement(color);
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
    selectElementColor(setupWizardCoat, window.colorize.colors.COAT_COLORS, wizardCoatInput);
  };

  // Смена цвета глаз при клике по ним
  var wizardEyesClickHandler = function () {
    selectElementColor(setupWizardEyes, window.colorize.colors.EYES_COLORS, wizardEyesInput);
  };

  // Смена цвета файерболла при клике по нему
  var wizardFireballClickHandler = function () {
    selectElementColor(
        setupWizardFireball,
        window.colorize.colors.FIREBALL_COLORS,
        wizardFireballInput
    );
  };

  window.colorize = {

    colors: {
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
    },

    init: function () {
      setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
      setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
      setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
    },

    deactivate: function () {
      setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
      setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
      setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);
    }
  };

})();
