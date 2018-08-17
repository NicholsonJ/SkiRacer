var maxFlakes = 25;
var flakesArray = [];
var treesArray = [];
var fansArray = [];
var mogulArray = [];
var angle = 0;
var motionTrailLength = 30;
var positions = [];

//Images
var trees = new Image();
trees.src = 'images/Snowy_Tree.png';
var fans = new Image();
fans.src = 'images/fans.jpg';
var mogulImg = new Image();
mogulImg.src = 'images/moguls.png';

function Tree(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.crashed = false;
  this.drawTrees = function() {
    this.ctx.drawImage(trees, this.x, this.y, this.width, this.height);
  };
}

function createTrees() {
  var y = canvasHeight;
  var x = Math.floor(Math.random() * canvasWidth);
  treesArray.push(new Tree(x, y, 80, 80, ctx));
}
function updateTrees() {
  for (i = 0; i < treesArray.length; i++) {
    treesArray[i].y -= 10;
    if (treesArray.length > 0 && !treesArray[i].crashed && racer.deductPoints(treesArray[i])) {
      treesArray[i].crashed = true;
      score--;
    }
  }
}

function treeLimitArray() {
  for (i = 0; i < treesArray.length; i++) {
    if (treesArray[i].y < -80) {
      treesArray.splice(i, 1);
    }
  }
}

//moguls
function Mogul(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;

  this.drawMogul = function() {
    this.ctx.drawImage(mogulImg, this.x, this.y, this.width, this.height);
  };
}

function createMogul() {
  var y = canvasHeight;
  var x = Math.floor(Math.random() * canvasWidth);
  mogulArray.push(new Mogul(x, y, 200, 30, ctx));
}

function updateMogul() {
  for (i = 0; i < mogulArray.length; i++) {
    mogulArray[i].y -= 10;
    mogulArray[i].drawMogul();
    if (mogulArray[i].y < -80) {
      mogulArray.splice(i, 1);
    }
  }
}

function mogulLimitArray() {
  for (i = 0; i < mogulArray.length; i++) {
    if (mogulArray[i].y < -80) {
      mogulArray.splice(i, 1);
    }
  }
}

//fans

function Fans(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.drawFans = function() {
    this.ctx.drawImage(fans, this.x, this.y, this.width, this.height);
  };
}

function createFans() {
  var y = canvasHeight + 300;
  var x = Math.floor(Math.random() * (canvasWidth + 300) - 300);
  fansArray.push(new Fans(x, y, 200, 200, ctx));
}

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
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(angle) * 2;
    if (p.x > canvasWidth + 5 || p.x < -5 || p.y > canvasHeight) {
      if (i % 3 > 0) {
        flakesArray[i] = { x: Math.random() * canvasWidth, y: -10, r: p.r, d: p.d };
      } else {
        if (Math.sin(angle) > 0) {
          flakesArray[i] = { x: -5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        } else {
          flakesArray[i] = { x: canvasWidth + 5, y: Math.random() * canvasHeight, r: p.r, d: p.d };
        }
      }
    }
  }
}

//create snow trail
function updateSnowtrail(xPos, yPos, ctx) {
  for (var i = 0; i < positions.length; i++) {
    var ratio = i + 1; // / positions.length;
    drawCircle(positions[i].x, positions[i].y, i, ratio);
  }
  storeLastPosition(xPos, yPos);
}

function drawCircle(x, y, radius, ratio) {
  ratio / 3;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = 'rgba(265,265,265, ' + ratio + ')';
  ctx.fill();
  ctx.restore();
}

function storeLastPosition(xPos, yPos) {
  positions.push({
    x: xPos + 40,
    y: yPos + 40
  });
  if (positions.length > motionTrailLength) {
    positions.shift();
  }
}
