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
  FIREBALL_COLORS: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var NUMBER_WIZARDS = 4;

var keyCodes = {
  ESC: 27,
  ENTER: 13
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupWizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('[name=coat-color]');
var setupWizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('[name=eyes-color]');
var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setupWizardFireball.querySelector('[name=fireball-color]');
var userNameInput = setup.querySelector('.setup-user-name');

/**
 * Функция получения случайного элемента массива
 * @param {Array} arrayElements
 * @return {*}
 */
var getRandomElement = function (arrayElements) {
  var index = Math.floor(Math.random() * arrayElements.length);
  return arrayElements[index];
};

/**
 * Функция тасования массива по алгоритму Фишера-Йетса
 * @param {Array} arrayElements
 * @return {Array}
 */
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
 * Функция валидации поля ввода имени пользователя
 * @param {Node} input
 */
var validUserInput = function (input) {
  if (input.validity.tooShort) {
    input.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (input.validity.tooLong) {
    input.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (input.validity.valueMissing) {
    input.setCustomValidity('Обязательное поле');
  } else {
    input.setCustomValidity('');
  }
};

// Задание правильного имени пользователя
var setupValidUserName = function () {
  validUserInput(userNameInput);
};

// Сброс невалидного состояния
var resetInvalidInput = function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
};


// Закрытие диалогового окна пользователя при нажатии ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === keyCodes.ESC) {
    closePopup();
  }
};

// Закрытие диалогового окна пользователя при нажатии ENTER на Х
var onPopupCloseEnterPress = function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    closePopup();
  }
};

/**
 * Функция задания цвета элементу и значения в input
 * @param {Node} element
 * @param {Array.<string>} colors
 * @param {Node} input
 */
var selectElementColor = function (element, colors, input) {
  var prevColor = input.value;
  var currentColor = getRandomElement(colors);

  while (prevColor === currentColor) {
    currentColor = getRandomElement(colors);
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
  selectElementColor(setupWizardFireball, caseWizard.FIREBALL_COLORS, wizardFireballInput);
};


// Функция событий при закрытии диалогового окна
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('keydown', onPopupCloseEnterPress);
  setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
  setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);
  userNameInput.removeEventListener('click', setupValidUserName);
  userNameInput.removeEventListener('input', resetInvalidInput);
};

// Функция событий при открытии диалогового окна
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('keydown', onPopupCloseEnterPress);
  setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
  setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
  userNameInput.addEventListener('click', setupValidUserName);
  userNameInput.addEventListener('input', resetInvalidInput);
};


/**
 * Функция инициализации страницы
 * @param {Node} fragment
 */
var initPage = function (fragment) {
  var page = document.querySelector('.setup');
  page.querySelector('.setup-similar').classList.remove('hidden');
  page.querySelector('.setup-similar-list').appendChild(fragment);

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodes.ENTER) {
      openPopup();
    }
  });
};


// Создаем волшебников и инициализируем страницу
initPage(createWizards(caseWizard, NUMBER_WIZARDS));

