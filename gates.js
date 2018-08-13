function Gate(x, y, width, height, imgSrc, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.width = width;
  this.height = height;

  this.img = new Image();
  this.img.src = imgSrc;
  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  this.drawGates = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height); //!!
  };
}
