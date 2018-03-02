class Ship extends Polygon {
  constructor(p, s, x, y) {
    super(p);
    this.x = x;
    this.y = y;
     this.scale(s);
    this.maxX = null;
    this.maxY = null;
    this.vel = {
      x: 0,
      y: 0
    };
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

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
