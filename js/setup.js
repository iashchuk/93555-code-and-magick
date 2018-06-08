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
  ]
};


var NUMBER_WIZARDS = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
 * @param {Object} elementsWizard
 * @param {number} quantityWizards - необходимое количество волшебников
 * @return {Node}
 */
var createWizards = function (elementsWizard, quantityWizards) {
  var fragment = document.createDocumentFragment();
  var shuffleNames = shuffleElements(elementsWizard.NAMES);
  var shuffleSurnames = shuffleElements(elementsWizard.SURNAMES);
  var shuffleCoatColors = shuffleElements(elementsWizard.COAT_COLORS);
  var shuffleEyesColors = shuffleElements(elementsWizard.EYES_COLORS);

  for (var i = 0; i < quantityWizards; i++) {
    var newWizard = getWizard(shuffleNames[i], shuffleSurnames[i], shuffleCoatColors[i], shuffleEyesColors[i]);
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
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Функция инициализации страницы
 * @param {Node} fragment
 */
var initPage = function (fragment) {
  var page = document.querySelector('.setup');
  page.classList.remove('hidden');
  page.querySelector('.setup-similar').classList.remove('hidden');
  page.querySelector('.setup-similar-list').appendChild(fragment);
};


// Создаем волшебников и инициализируем страницу
initPage(createWizards(caseWizard, NUMBER_WIZARDS));
