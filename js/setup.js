'use strict';


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
  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  NUMBER_WIZARDS: 4
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();


var shuffleElements = function (arrayElements) {
  for (var i = arrayElements.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arrayElements[j];
    arrayElements[j] = arrayElements[i];
    arrayElements[i] = temp;
  }
  return arrayElements;
};

/**
 * Функция создания волшебников
 * @param {Array} name
 * @param {Array} surname
 * @param {Array} coatColors
 * @param {Array} eyesColors
 * @param {number} quantityWizards - необходимое количество волшебников
 */
var createWizards = function (name, surname, coatColors, eyesColors, quantityWizards) {

  var shuffleName = shuffleElements(name);
  var shuffleSurname = shuffleElements(surname);
  var shuffleCoatColors = shuffleElements(coatColors);
  var shuffleEyesColors = shuffleElements(eyesColors);

  for (var i = 0; i < quantityWizards; i++) {
    var wizard = {
      name: shuffleName[i] + ' ' + shuffleSurname[i],
      coatColor: shuffleCoatColors[i],
      eyesColor: shuffleEyesColors[i]
    };
    fragment.appendChild(renderWizard(wizard));
  }
};

/**
 * Функция отрисовки волшебников на основе шаблона
 * @param {Object} wizard
 * @return {Node}
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Функция инициализации страницы
 */
var initPage = function () {
  var page = document.querySelector('.setup');
  page.classList.remove('hidden');
  page.querySelector('.setup-similar').classList.remove('hidden');
  page.querySelector('.setup-similar-list').appendChild(fragment);
};


// Создаем волшебников
createWizards(caseWizard.NAMES, caseWizard.SURNAMES, caseWizard.COAT_COLORS, caseWizard.EYES_COLORS, caseWizard.NUMBER_WIZARDS);

// Инициализируем страницу
initPage();
