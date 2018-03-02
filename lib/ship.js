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
      this.velocity.x += 0.07 * Math.cos(this.angle);
      this.velocity.y += 0.07 * Math.sin(this.angle);
    }
  }

  rotate(theta) {
    // I should be able to use #rotate in Polygon, but it screws up when I try it
    // something like this ->
     // BaseClass.prototype.someMethod.call(this);
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    for (let i = 0; i < this.points.length; i+=2) {
      const x = this.points[i];
      const y = this.points[i+1];

      this.points[i] = c * x - s*y;
      this.points[i + 1] = s * x + c * y;
    }
    this.angle += theta;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;

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
