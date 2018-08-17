//necessary
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var grd = ctx.createLinearGradient(0, 0, canvasHeight, canvasWidth);

//basic vars
var startButton = document.getElementById('start-button');
var canvasCSS = document.getElementById('game');
var headerImage = document.getElementById('headerImage');
var isGameStarted = false;
var frames = 1;
var score = 0;
var interval;
var level = 1;

//pictures
var winningSkiier = new Image();
winningSkiier.src = 'images/youWon.png';
var crashedSkiier = new Image();
crashedSkiier.src = 'images/fallenskiier.png';
var arrows = new Image();
arrows.src = 'images/arrows.png';

//characters
var racer = new RacerConstructor(250, racerImageL, ctx);
var theFinish = new Gate(50, canvasHeight, 400, 300, finishGate, ctx);

window.onload = function() {
  //all button responses
  startButton.onclick = function() {
    startButton.style.visibility = 'hidden';
    headerImage.style.visibility = 'hidden';
    canvasCSS.style.visibility = 'visible';
    if (!isGameStarted) {
      startGame();
      isGameStarted = true;
    }
  };
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 39:
        racer.moveRight();
        racer.racerImg = racerImageR;
        break;
      case 37:
        racer.moveLeft();
        racer.racerImg = racerImageL;
        break;
    }
  };
  document.getElementById('refresh').onclick = function() {
    location.reload();
  };

  function updateCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    frames++;
    background();
    countdown();

    //conditionals

    if (frames % 30 === 0) {
      createMogul();
    }
    if (frames % 75 === 0 && frames < 1100 * level) {
      createGate();
    }
    if (frames % (50 - 3 * level) === 0 && frames < 1100 * level) {
      createTrees();
    }
    if (frames % 2 === 0) {
      createSnowflakes();
    }
    if (racer.y < 50) {
      racer.y++;
    }

    //move
    updateSnowtrail(racer.x, racer.y, ctx);
    updateMogul();
    updateTrees();
    updateSnowflakes();
    treeLimitArray();
    mogulLimitArray();
    limitGatesArray();

    //draw
    for (var i = 0; i < mogulArray.length; i++) {
      mogulArray[i].drawMogul();
    }
    for (var i = 0; i < treesArray.length; i++) {
      treesArray[i].drawTrees();
    }
    for (var i = 0; i < myGates.length; i++) {
      myGates[i].drawGates();
    }

    //check if finished
    if (frames >= 1100 + 2 * level) {
      createFans();
      finishGate();
    }

    //draw
    updateGates();
    racer.drawRacer();
    drawScore();
    drawSnowflakes();

    //stop game
    if (theFinish.y <= 0) {
      stopGame();
    }
  }

  function startGame() {
    interval = setInterval(rules, 1000 / 40);
  }

  function rules() {
    frames++;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#D2EBE8';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalAlpha = 1;
    ctx.font = '30px monospace';
    ctx.fillStyle = '#BE8238';
    ctx.textAlign = 'center';
    ctx.fillText('To move your skiier:', 250, 250);
    ctx.drawImage(arrows, 100, 300, 300, 200);
    ctx.fillText('Use left and right arrows', 250, 550);
    if (frames >= 100) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#D2EBE8';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#BE8238';
      ctx.globalAlpha = 1;
      ctx.fillText('Get through the gates', 250, 250);
      ctx.drawImage(redGateImg, 75, 300, 150, 150);
      ctx.drawImage(blueGateImg, 325, 300, 150, 150);
      ctx.fillText('to earn points', 250, 550);
    }
    if (frames >= 200) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#D2EBE8';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#BE8238';
      ctx.globalAlpha = 1;
      ctx.fillText('Get too close to a tree?', 250, 250);
      ctx.drawImage(trees, 150, 300, 200, 200);
      ctx.fillText('Lose points!', 250, 550);
    }
    if (frames >= 300) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#D2EBE8';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#BE8238';
      ctx.fillText('Score 5 Points', 250, 250);
      ctx.fillText('to level up!', 250, 350);
    }
    if (frames >= 400) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#D2EBE8';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#BE8238';
      ctx.font = '40px monospace';
      ctx.fillText('Level: ' + level, 250, 250);
    }
    if (frames >= 500) {
      clearInterval(interval);
      frames = 1;
      interval = setInterval(updateCanvas, 1000 / 40);
    }
    createSnowflakes();
    updateSnowflakes();
    drawSnowflakes();
  }

  function background() {
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#F6F6F6';
    grd.addColorStop(0, '#DAE1F7'); //top
    grd.addColorStop(0.5, '#F3F6F9'); //middle
    grd.addColorStop(1, '#B8E1D1'); //bottom
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 700);
    ctx.restore();
  }

  function countdown() {
    if (frames < 25) {
      ctx.font = '80px monospace';
      ctx.fillStyle = '#BE8238';
      ctx.textAlign = 'center';
      ctx.fillText('3', 250, 300);
    }
    if (frames < 50 && frames > 25) {
      ctx.fillText('2', 250, 300);
    }
    if (frames < 75 && frames > 50) {
      ctx.fillText('1', 250, 300);
    }
    if (frames < 100 && frames > 75) {
      ctx.fillText('GO!', 250, 300);
    }
  }

  function drawScore() {
    ctx.save();
    var scoreText = 'Score: ' + score;
    ctx.fillStyle = 'black';
    ctx.fillRect(175, 640, 150, 60);
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#BE8238';
    ctx.fillText(scoreText, 250, 680);
    ctx.restore();
  }
  function finishGate() {
    theFinish.y -= 10;
    for (i = 0; i < fansArray.length; i++) {
      fansArray[i].y -= 10;
      fansArray[i].drawFans();
    }
    theFinish.drawFinalGate();
  }
  function stopGame() {
    clearInterval(interval);
    setTimeout(function() {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (score > 4) {
        frames = 1;
        interval = setInterval(wonGame, 1000 / 40);
      } else {
        interval = setInterval(lostGame, 1000 / 40);
        document.getElementById('refresh').style.display = 'block';
      }
    }, 2000);
  }
  function wonGame() {
    frames++;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(winningSkiier, 40, 200, canvasWidth - 80, canvasHeight - 400);
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = '40px monospace';
    ctx.fillStyle = '#BE8238';
    ctx.textAlign = 'center';
    ctx.fillText('You won!', 250, 50);
    ctx.fillText('Your score: ' + score, 250, 80);
    ctx.restore();
    createSnowflakes();
    updateSnowflakes();
    drawSnowflakes();
    if (frames >= 100) {
      clearInterval(interval);
      nextLevel();
    }
  }
  function nextLevel() {
    theFinish.y = canvasHeight;
    racer.y = -80;
    racer.x = 250;
    fansArray = [];
    frames = 1;
    score = 0;
    level++;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.save();
    ctx.font = '40px monospace';
    ctx.fillStyle = '#BE8238';
    ctx.textAlign = 'center';
    ctx.fillText('Level: ' + level, 250, 250);
    ctx.restore();
    setTimeout(function() {
      interval = setInterval(updateCanvas, 1000 / (40 + 5 * level));
    }, 1000);
  }
  function lostGame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(crashedSkiier, 40, 200, canvasWidth - 80, canvasHeight - 400);
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = '40px monospace';
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#5661A2';
    ctx.textAlign = 'center';
    ctx.fillText('Yard Sale...', 250, 70);
    ctx.font = '30px monospace';
    ctx.fillText('Better luck next time!', 250, 100);
    ctx.font = '50px monospace';
    ctx.fillStyle = '#22284A';
    ctx.fillText('Your score: ' + score, 250, 650);
    ctx.restore();
    createSnowflakes();
    updateSnowflakes();
    drawSnowflakes();
  }
};
