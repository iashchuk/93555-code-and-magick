'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_X = 50;
var GAP_Y = 10;
var FONT_GAP = 10;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var WIN_MESSAGE = {
  text: 'Ура вы победили!',
  x: 120,
  y: 40
};
var MESSAGE_TITLE = {
  text: 'Список результатов:',
  x: 120,
  y: 60
};
var TEXT_FONT = '16px PT Mono';
var MAIN_TEXT_COLOR = '#000';
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW = 'rgba(0, 0, 0, 0.7)';
var SHADOW_GAP = 10;
var HIST_HEIGHT = 150;

var startBarPoint = CLOUD_X + GAP_X;
var yourColor = 'rgba(255, 0, 0, 1)';

var getColor = function () {
  var hue = 244;
  var saturation = Math.floor(Math.random() * 100);
  var lightness = 50;

  return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
};


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};


window.renderStatistics = function (ctx, players, times) {

  // Делаем тень для облака и само облако
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, CLOUD_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);


  // Задаем цвет для содержимого в облаке
  ctx.fillStyle = MAIN_TEXT_COLOR;


  // Выводим на экран сообщения для игрока
  ctx.font = TEXT_FONT;
  ctx.fillText(WIN_MESSAGE.text, WIN_MESSAGE.x, WIN_MESSAGE.y);
  ctx.fillText(MESSAGE_TITLE.text, MESSAGE_TITLE.x, MESSAGE_TITLE.y);


  // Получаем максимальное набранное количество очков
  var maxTime = getMaxElement(times);


  // Выводим статистику игроков
  for (var i = 0; i < players.length; i++) {

    // Получаем высоту бара, где максимальое значение равное высоте гистограмме
    // Остальные значения вычисляются путем умножения высоты на коэффициент (значение игрока/max значение)
    var barPoint = HIST_HEIGHT * (times[i] / maxTime);

    // Добавляем подпись ввиде полученных очков
    ctx.fillStyle = MAIN_TEXT_COLOR;
    ctx.fillText(Math.floor(times[i]), startBarPoint + (BAR_WIDTH + GAP_X) * i, CLOUD_HEIGHT - GAP_Y - FONT_GAP - TEXT_HEIGHT - barPoint);

    // Проверяем игрока и присваеваем ему цвет бара
    if (players[i] === 'Вы') {
      ctx.fillStyle = yourColor;
    } else {
      ctx.fillStyle = getColor();
    }

    // Рисуем сам бар
    ctx.fillRect(startBarPoint + (BAR_WIDTH + GAP_X) * i, CLOUD_HEIGHT - GAP_Y - TEXT_HEIGHT - barPoint, BAR_WIDTH, barPoint);

    // Добавляем подпись в виде имени игрока
    ctx.fillStyle = MAIN_TEXT_COLOR;
    ctx.fillText(players[i], startBarPoint + (BAR_WIDTH + GAP_X) * i, CLOUD_HEIGHT - GAP_Y);
  }


};
