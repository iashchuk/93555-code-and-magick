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
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
 * Функция инициализации страницы
 * @param {Node} fragment
 */
var initPage = function (fragment) {
  var page = document.querySelector('.setup');
  page.querySelector('.setup-similar').classList.remove('hidden');
  page.querySelector('.setup-similar-list').appendChild(fragment);
};

// Открытие(закрытие) диалогового окна пользователя
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Сценарий валидации формы при заполнении имени пользователя
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Задаем цвет плаща волшебника при клике
setupWizardCoat.addEventListener('click', function () {
  var colorCoat = getRandomElement(caseWizard.COAT_COLORS);
  setupWizardCoat.style.fill = colorCoat;
  wizardCoatInput.value = colorCoat;
});

// Задаем цвет глаз волшебника при клике
setupWizardEyes.addEventListener('click', function () {
  var colorEyes = getRandomElement(caseWizard.EYES_COLORS);
  setupWizardEyes.style.fill = colorEyes;
  wizardEyesInput.value = colorEyes;
});

// Задаем цвет файерболла волшебника при клике
setupWizardFireball.addEventListener('click', function () {
  var colorFireball = getRandomElement(caseWizard.FIREBALL_COLORS);
  setupWizardFireball.style.background = colorFireball;
  wizardFireballInput.value = colorFireball;
});


// Создаем волшебников и инициализируем страницу
initPage(createWizards(caseWizard, NUMBER_WIZARDS));
