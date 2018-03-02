class Asteroid extends Polygon {
  constructor(p, s, x, y) {
    super(p);
    this.x = x;
    this.y = y;
    this.scale(s);

    this.rotAngle = 0.01 * (Math.random() * 2 - 1);
    const r = 2*Math.PI*Math.random();
    const v = Math.random()* 4 + 1;
    this.vel = {
      x: v * Math.cos(r),
      y: v * Math.sin(r)
    };
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.rotate(this.rotAngle);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
