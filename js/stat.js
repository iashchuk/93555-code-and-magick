'use strict';


var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  SHADOW_GAP: 10,
  TEXT_FONT: '16px PT Mono',
  TEXT_COLOR: '#000'
};

var winMessageParams = {
  TEXT: 'Ура вы победили! Список результатов:',
  WIDTH_TEXT: 200,
  LINE_TEXT: 20,
  MARGIN_X: 20,
  MARGIN_Y: 30
};

var barChart = {
  HEIGHT: 150,
  BAR_WIDTH: 40,
  MARGIN_X: 50,
  MARGIN_Y: 10,
  LINE_HEIGHT: 20,
  YOUR_COLOR: 'rgba(255, 0, 0, 1)',
};

var startBarChartX = cloudParams.X + barChart.MARGIN_X;
var startBarChartY = cloudParams.HEIGHT - barChart.MARGIN_Y;

/**
 * Функция отрисовка облака (окна вывода сообщения)

 * @param {Object} ctx
 * @param {number} x - Расположение окна по оси Х
 * @param {number} y - Расположеник окна по оси Y
 * @param {string} color
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

/**
 * Делит получаемое сообщение на строки взависимости от заданной ширина
 *
 * @param {Object} ctx
 * @param {string} text
 * @param {number} maxWidth
 * @param {number} lineHeight
 * @param {number} marginLeft - Отступ слева относительно начала окна сообщения
 * @param {number} marginTop - Отступ сверху относительно начала окна сообщения
*/
function getWinMessage(ctx, text, maxWidth, lineHeight, marginLeft, marginTop) {
  var words = text.split(' ');
  var line = '';

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft + cloudParams.X, marginTop + cloudParams.Y);
      line = words[i] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, marginLeft + cloudParams.X, marginTop + cloudParams.Y);
}

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getHueBlueColor = function () {
  return 'hsl(240,' + Math.floor(Math.random() * 100) + '%, 50%)';
};

/**
 * Функция отрисовки столбца гистограммы
 *
 * @param {Object} ctx
 * @param {number} playerPoints
 * @param {string} playerName
 * @param {number} maxPoints - Максимально набранное количество очков в игре
 * @param {number} numberOfBar - Номер столбца / количество столбцов (первый - 0, второй - 1)
*/
var renderBar = function (ctx, playerPoints, playerName, maxPoints, numberOfBar) {
  var barHeight = barChart.HEIGHT * (playerPoints / maxPoints);
  var nextBarMargin = (barChart.BAR_WIDTH + barChart.MARGIN_X) * numberOfBar;

  ctx.fillStyle = cloudParams.TEXT_COLOR;
  ctx.fillText(Math.floor(playerPoints), startBarChartX + nextBarMargin, startBarChartY - barHeight - barChart.LINE_HEIGHT - barChart.MARGIN_Y);

  ctx.fillStyle = getHueBlueColor();
  if (playerName === 'Вы') {
    ctx.fillStyle = barChart.YOUR_COLOR;
  }

  ctx.fillRect(startBarChartX + nextBarMargin, startBarChartY - barHeight - barChart.LINE_HEIGHT, barChart.BAR_WIDTH, barHeight);

  ctx.fillStyle = cloudParams.TEXT_COLOR;
  ctx.fillText(playerName, startBarChartX + nextBarMargin, startBarChartY);
};


window.renderStatistics = function (ctx, players, times) {

  // Делаем тень для облака и само облако
  renderCloud(ctx, cloudParams.X + cloudParams.SHADOW_GAP, cloudParams.Y + cloudParams.SHADOW_GAP, cloudParams.SHADOW_COLOR);
  renderCloud(ctx, cloudParams.X, cloudParams.Y, cloudParams.COLOR);

  // Выводим сообщение о победе на экран
  ctx.font = cloudParams.TEXT_FONT;
  ctx.fillStyle = cloudParams.TEXT_COLOR;
  getWinMessage(ctx, winMessageParams.TEXT, winMessageParams.WIDTH_TEXT, winMessageParams.LINE_TEXT, winMessageParams.MARGIN_X, winMessageParams.MARGIN_Y);

  // Получаем максимальное набранное количество очков
  var maxTime = getMaxElement(times);

  // Выводим статистику игроков (гистограмму)
  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, times[i], players[i], maxTime, i);
  }

};
