'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвин'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_WIZARDS = 4;
var wizards = [];
var wizardsNames = [];
var uniqueWizardsNames = [];


var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomElement = function (arrayElements) {
  var index = Math.floor(Math.random() * arrayElements.length);

  return arrayElements[index];
};

/**
 * Получаем случайно сгенирированное имя волшебника
 * @param {Array} name
 * @param {Array} surname
 * @return {string}
 */
var generateWizardsNames = function (name, surname) {
  return getRandomElement(name) + ' ' + getRandomElement(surname);
};

/**
 * Уникализируем элементы массива
 * @param {Array} arrayElements
 * @return {Array}
 */
var unique = function (arrayElements) {
  var obj = {};

  for (var i = 0; i < arrayElements.length; i++) {
    var str = arrayElements[i];
    obj[str] = true;
  }

  return Object.keys(obj);
};

/**
 * Создает волшебника исходя из переданных параметров
 * @param {string} name
 * @param {Array} coatColors
 * @param {Array} eyesColors
 * @return {Object}
 */
var createWizard = function (name, coatColors, eyesColors) {
  var wizard = {
    name: name,
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };

  return wizard;
};

/**
 * Функция отрисовки волшебников на основе шаблона
 * @param {Object} wizard
 * @return {HTMLElement}
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


// Показываем блок .setup
userDialog.classList.remove('hidden');

// Генерируем имена волшебников
for (var i = 0; i < WIZARD_NAMES.length; i++) {
  wizardsNames.push(generateWizardsNames(WIZARD_NAMES, WIZARD_SURNAMES));
}

// Удаляем повторяющиеся имена
uniqueWizardsNames = unique(wizardsNames);

// Создаем массив волшебников
for (i = 0; i < WIZARD_NAMES.length; i++) {
  var createdWizard = createWizard(uniqueWizardsNames[i], COAT_COLORS, EYES_COLORS);
  wizards.push(createdWizard);
}

// Генерируем DOM-элементы
for (i = 0; i < NUMBER_WIZARDS; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Вставляем элементы
similarListElement.appendChild(fragment);

// Показываем блок .setup-similar, удалив у него CSS-класс hidden
userDialog.querySelector('.setup-similar').classList.remove('hidden');
