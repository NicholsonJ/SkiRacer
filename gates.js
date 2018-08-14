var gateRed = 'images/ski-gate-red.jpg';
var gateBlue = 'images/ski-gate-blue.jpg';

function Gate(x, y, width, height, imgSrc, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.width = width;
  this.height = height;

  this.img = new Image();
  this.img.src = imgSrc;

  this.drawGates = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width / 10, this.height); //!!
  };
}
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
