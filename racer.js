var racerImageL = new Image();
racerImageL.src = 'images/SkiierLeft.jpg';
var racerImageR = new Image();
racerImageR.src = 'images/SkiierRight.jpg';

function RacerConstructor(x, racerImg, ctx) {
  this.x = x;
  this.y = -80;
  this.ctx = ctx;
  this.racerImg = racerImg;
  this.width = 80 * 0.799;
  this.height = 80;
  this.drawRacer = function() {
    ctx.drawImage(this.racerImg, this.x, this.y, this.width, this.height);
  };
  this.moveLeft = function() {
    this.x -= 25;
    if (this.x < 10) {
      this.x = 30;
    }
  };
  this.moveRight = function() {
    this.x += 25;
    if (this.x > 390) {
      this.x = 390;
    }
  };
  this.accumulatePoints = function(gateL, gateR) {
    var racerRight = this.x + this.width;
    var racerLeft = this.x;
    var racerTop = this.y;
    var racerBottom = this.y + this.height;

    var gapLeft = gateL.x + gateL.width - 10;
    var gapRight = gateR.x + 10;
    var gapTop = gateL.y - 40;
    var gapBottom = gateL.y + gateL.height;
    var points = true;
    if (
      racerBottom <= gapBottom &&
      racerLeft >= gapLeft &&
      racerRight <= gapRight &&
      racerTop >= gapTop
    ) {
      console.log("I'm inside!");
      points = false;
    }
    return points;
  };
  this.deductPoints = function(trees) {
    var racerRight = this.x + this.width;
    var racerLeft = this.x;
    var racerTop = this.y + 40;
    var racerBottom = this.y + this.height;

    var treeR = trees.x * 3;
    var treeL = (trees.x + trees.width) * 3;
    var treeT = trees.y;
    var treeB = trees.y + trees.height;
    var points = true;
    if (
      racerBottom >= treeT &&
      ((racerLeft <= treeR && racerRight >= treeR) || (racerRight >= treeL && racerLeft >= treeL))
    ) {
      console.log('Trees deduction');
      points = false;
    }
    return points;
  };
}
