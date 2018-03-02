class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.maxX = null;
    this.maxY = null;
    this.velocity = {
      x: 5 * Math.cos(angle),
      y: 5 * Math.sin(angle)
    };
    this.remove = false;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    if (0 > this.x || this.x > this.maxX || 0 > this.y || this.y > this.maxY) {
      this.remove = true;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}
