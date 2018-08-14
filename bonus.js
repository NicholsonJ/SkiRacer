var maxFlakes = 25;
var flakesArray = [];
var angle = 0;
var trees = new Image();
trees.src = 'images/Snowy_Tree.jpg';

function Bonus(x, y, width, height, imgSrc, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.width = width;
  this.height = height;
}

function Tree(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;

  this.drawTrees = function() {
    this.ctx.drawImage(trees, this.x, this.y, this.width, this.height);
    //console.log(this.ctx.drawImage);
  };
}

function createTrees() {
  var y = canvasHeight;
  var x = Math.floor(Math.random() * canvasWidth);
  treesArray.push(new Tree(x, y, 40, 40, ctx));
}

/*
function createGate() {
  var y = canvasHeight;
  var minWidth = 1;
  var maxWidth = 360;
  var width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
  var minGap = 90;
  var maxGap = 200;
  var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
  if (width + gap >= 430) {
    width = 330;
    gap = 80;
  }
  myGates.push(new Gate(width, y, 10, 40, gateRed, ctx));
  myGates.push(new Gate(width + gap, y, 10, 40, gateBlue, ctx));
}*/

//snowflakes
function createSnowflakes() {
  for (var i = 0; i < maxFlakes; i++) {
    flakesArray.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      r: Math.random() * 4 + 1,
      d: Math.random() * maxFlakes
    });
  }
}

function drawSnowflakes() {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  for (var i = 0; i < maxFlakes; i++) {
    var p = flakesArray[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  ctx.restore();
}

function updateSnowflakes() {
  angle += 0.01;
  for (var i = 0; i < maxFlakes; i++) {
    var p = flakesArray[i];

    //Updating X and Y coordinates
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(angle) * 2;

    //Sending flakes back from the top when it exits
    //Lets make it a bit more organic and let flakes enter from the left and right also.
    if (p.x > canvasWidth + 5 || p.x < -5 || p.y > canvasHeight) {
      if (i % 3 > 0) {
        //66.67% of the flakes
        flakesArray[i] = { x: Math.random() * canvasWidth, y: -10, r: p.r, d: p.d };
      } else {
        //If the flake is exitting from the right
        if (Math.sin(angle) > 0) {
          //Enter from the left
          flakesArray[i] = { x: -5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        } else {
          //Enter from the right
          flakesArray[i] = { x: canvasWidth + 5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        }
      }
    }
  }
}
