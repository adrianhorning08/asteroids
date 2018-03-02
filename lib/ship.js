class Ship extends Polygon {
  constructor(p, flames, s, x, y) {
    super(p);
    this.flames = new Polygon(flames);
    this.flames.scale(s);
    this.drawFlames = false;
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

  shoot() {
    const bullet = new Bullet(this.points[0] + this.x, this.points[1] + this.y, this.angle);
    bullet.maxX = this.maxX;
    bullet.maxY = this.maxY;
    return bullet;
  }

  addVelocity() {
    if (Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2) < 20 * 20) {
      this.velocity.x += 0.07 * Math.cos(this.angle);
      this.velocity.y += 0.07 * Math.sin(this.angle);
    }
    this.drawFlames = true;
  }

  rotate(theta) {
    super.rotate(theta);
    this.angle += theta;
    this.flames.rotate(theta);
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
    if (this.drawFlames) {
      ctx.drawPolygon(this.flames, this.x, this.y);
    }
  }
}
