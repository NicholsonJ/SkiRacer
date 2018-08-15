//necessary
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;

//basic vars
var isGameStarted = false;
var frames = 1;
var score = 0;
var interval;

//pictures
var winningSkiier = new Image();
winningSkiier.src = '/images/youWon.jpg';

//characters
var racer = new RacerConstructor(250, racerImageL, ctx);
var theFinish = new Gate(50, canvasHeight, 400, 300, finishGate, ctx);

window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    document.getElementById('game-wrapper').scrollIntoView();
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
    document.getElementById('header').scrollIntoView();
  };

  function startGame() {
    interval = setInterval(updateCanvas, 1000 / 40); //!!
  }

  function updateCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    frames++;
    background();

    //conditionals
    countdown();
    if (frames % 75 === 0 && frames < 1000) {
      createGate();
    }
    if (frames % 100 === 0) {
      createTrees();
    }
    if (frames % 2 === 0) {
      createSnowflakes();
    }
    if (racer.y < 50) {
      racer.y++;
    }

    //move
    updateGates();
    updateTrees();
    updateSnowflakes();

    //draw
    racer.drawRacer();
    drawScore();
    drawSnowflakes();

    //check if finished
    if (frames >= 1100) {
      finishGate();
    }
    if (frames === 1200) {
      stopGame();
    }
  }

  function countdown() {
    if (frames < 25) {
      ctx.font = '80px monospace';
      ctx.fillStyle = '#BE8238';
      ctx.textAlign = 'center';
      ctx.fillText('3', 250, 300);
    }
    if (frames < 50 && frames > 25) {
      ctx.font = '80px monospace';
      ctx.fillStyle = '#BE8238';
      ctx.textAlign = 'center';
      ctx.fillText('2', 250, 300);
    }
    if (frames < 75 && frames > 50) {
      ctx.font = '80px monospace';
      ctx.fillStyle = '#BE8238';
      ctx.textAlign = 'center';
      ctx.fillText('1', 250, 300);
    }
    if (frames < 100 && frames > 75) {
      ctx.font = '80px monospace';
      ctx.fillStyle = '#BE8238';
      ctx.textAlign = 'center';
      ctx.fillText('GO!', 250, 300);
    }
  }

  function drawScore() {
    var scoreText = 'Score: ' + score;
    ctx.fillStyle = 'black';
    ctx.fillRect(175, 640, 150, 60);
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#555D68';
    ctx.fillText(scoreText, 250, 680);
  }

  function stopGame() {
    clearInterval(interval);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#F6F6F6';
    var grd = ctx.createLinearGradient(0, 0, canvasHeight, canvasWidth);
    grd.addColorStop(0, '#F6F6F6'); //white
    grd.addColorStop(1, '#78828E'); //grey
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 900);
    ctx.drawImage(winningSkiier, 0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'black';
    ctx.fillRect(30, 0, this.canvas.width - 30, 110);
    ctx.font = '40px monospace';
    ctx.fillStyle = '#BE8238';
    ctx.textAlign = 'center';
    ctx.fillText('You won!', 250, 50);
    ctx.fillText('Your score: ' + score, 250, 80);
    console.log('end of game');
    document.getElementById('refresh').style.display = 'block';
  }

  function nextLevel() {
    frames = 0;
    score = 0;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  function finishGate() {
    theFinish.y -= 10;
    theFinish.drawFinalGate();
  }
  function background() {
    ctx.fillStyle = '#F6F6F6';
    var grd = ctx.createLinearGradient(0, 0, canvasHeight, canvasWidth);

    grd.addColorStop(0, '#F6F6F6'); //white
    grd.addColorStop(1, '#78828E'); //grey

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 500, 900);
  }
};
