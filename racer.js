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
      points = false;
    }
    return points;
  };
  this.deductPoints = function(trees) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = trees.x;
    var otherright = trees.x + trees.width;
    var othertop = trees.y;
    var otherbottom = trees.y + trees.height;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  };
}
