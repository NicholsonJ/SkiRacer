console.log('hello world');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var isGameStarted = false;
var canvasWidth = ctx.canvas.width;
var canvasHeight = ctx.canvas.height;
var racer = new RacerConstructor(250, ctx);
var myGates = [];
var gateRed = 'images/ski-gate-red.jpg';
var gateBlue = 'images/ski-gate-blue.jpg';
var frames = 0;
var background = {
  whiteBackground: function() {
    ctx.fillStyle = '#E7E7E7';
    ctx.fillRect(0, 0, 500, 900);
  }
};

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
        console.log('move right');
        break;
      case 37:
        racer.moveLeft();
        console.log('move left');
        break;
    }
    updateCanvas();
  };

  function updateCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (frames % 75 === 0) {
      createGate();
    }
    drawScore();
    background.whiteBackground();
    racer.drawRacerL();
    updateGates();
    frames++;
  }

  //   function startGame() {
  //     ctx.fillStyle = '#FDF6E1';
  //     ctx.fillRect(0, 0, 500, 900);
  //     racer.drawRacer();
  //   }

  function createGate() {
    var y = canvasHeight;
    var minWidth = 20;
    var maxWidth = 400;
    var width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    var minGap = 50;
    var maxGap = 200;
    var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myGates.push(new Gate(0, y, width, 40, gateRed, ctx));
    myGates.push(new Gate(width + gap, y, y - width - gap, 40, gateBlue, ctx));
  }

  function updateGates() {
    for (i = 0; i < myGates.length; i++) {
      myGates[i].y -= 10;
      myGates[i].drawGates();
      //   if (racer.checkIfCrash(myGates[i])) {
      //     stopGame();
      //     console.log('gate logs a crash');
      //     return;
      //   }
    }
  }

  function drawScore() {
    var scoreText = 'Score: ' + frames;
    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'green';
    ctx.fillText(scoreText, 700, 45);
  }

  function startGame() {
    interval = setInterval(function() {
      updateCanvas();
    }, 1000 / 40); //!!
  }
  function stopGame() {
    clearInterval(interval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '40px monospace';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER!', canvasWidth / 3, canvasHeight / 3);
    this.ctx.fillText('Score: ' + frames, canvasWidth / 3, canvasHeight / 2);
    console.log('end of game');
  }
};
