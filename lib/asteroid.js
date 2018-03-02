class Asteroid extends Polygon {
  constructor(p, s, x, y) {
    super(p);
    this.x = x;
    this.y = y;
    this.scale(s);
  }

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
}
