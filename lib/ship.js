class Ship extends Polygon {
  constructor(p, s, x, y) {
    super(p);
    this.x = x;
    this.y = y;
     this.scale(s);
    this.maxX = null;
    this.maxY = null;
    this.angle = 0;
    this.velocity = {
      x: 0,
      y: 0
    };
  }

  addVelocity() {
    if (Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2) < 20 * 20) {
      this.velocity.x += 0.03 * Math.cos(this.angle);
      this.velocity.y += 0.03 * Math.sin(this.angle);
    }
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x > this.maxX) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.maxX;
    }

    if (this.y > this.maxY) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = this.maxY;
    }

  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
