function RacerConstructor(x, ctx) {
  this.x = x;
  this.y = 50;
  this.ctx = ctx;
  this.drawRacerL = function() {
    ctx.fillStyle = 'black';
    this.racerImageL = new Image();
    this.racerImageL.src = '/images/SkiierLeft.jpg';
    ctx.drawImage(this.racerImageL, this.x, this.y, 60 * 0.799, 60);
    //ctx.fillRect(this.x, 50, 30, 30);
  };
  this.drawRacerR = function() {
    this.racerImageR = new Image();
    this.racerImageR.src = '/images/SkiierRight.jpg';
    ctx.drawImage(this.drawRacerR, this.x, this.y, 60 * 0.799, 60);
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
  this.checkIfCrash = function(gate) {
    var myright = this.x + this.width;
    var myleft = this.x;
    var mytop = this.y;
    var mybottom = this.y + this.height;

    var otherleft = gate.x;
    var othertop = gate.y;
    var otherbottom = gate.y + gate.height;
    var otherright = gate.x + gate.width;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  };
}

// var myright = this.x + this.width;
// var mytop = this.y;
// var mybottom = this.y + this.height;
// var myleft = this.x;

// var otherleft = obstacle.x;
// var othertop = obstacle.y;
// var otherbottom = obstacle.y + obstacle.height;
// var otherright = obstacle.x + obstacle.width;

// if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
//   crash = false;
// }
