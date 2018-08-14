var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var racer = new RacerConstructor(250, racerImageL, ctx);
var myGates = [];

var frames = 0;
var background = {
  whiteBackground: function() {
    ctx.fillStyle = '#F6F6F6';
    ctx.fillRect(0, 0, 500, 900);
  }
};
var score = 0;

window.onload = function() {
  //start button begins game

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
    interval = setInterval(updateCanvas, 1000 / 10); //!!
  }

  function updateCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (frames % 75 === 0) {
      createGate();
    }

    background.whiteBackground();
    drawScore();
    racer.drawRacer();
    updateGates();
    frames++;
    if (frames === 1200) {
      stopGame();
    }
  }

  function updateGates() {
    for (i = 0; i < myGates.length; i++) {
      myGates[i].y -= 10;
      myGates[i].drawGates();
      if (myGates[i].y < -80) {
        myGates.splice(i, 1);
      }
    }

    if (!racer.accumulatePoints(myGates[0], myGates[1])) {
      score += 1;
    }
  }

  function drawScore() {
    var scoreText = 'Score: ' + score;
    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'green';
    ctx.fillText(scoreText, 45, 500);
  }

  function stopGame() {
    clearInterval(interval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '40px monospace';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER!', canvasWidth / 3, canvasHeight / 3);
    this.ctx.fillText('Score: ' + score, canvasWidth / 3, canvasHeight / 2);
    console.log('end of game');
    document.getElementById('refresh').style.display = 'block';
  }
};
