class Asteroid extends Polygon {
  constructor(p, s, x, y) {
    super(p);
    this.x = x;
    this.y = y;
    this.size = s;
    this.scale(s);
    this.maxX = null;
    this.maxY = null;
    this.rotAngle = 0.02 * (Math.random() * 2 - 1);
    const r = 2*Math.PI*Math.random();
    const v = Math.random()+ 1;
    this.vel = {
      x: v * Math.cos(r),
      y: v * Math.sin(r)
    };
  }

  hasPoint(x,y) {
    // this definitely might not work
    return super.hasPoint(this.x, this.y, x, y);
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

    this.rotate(this.rotAngle);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
