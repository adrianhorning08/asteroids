class Polygon {
  constructor(points) {
    this.points = points.slice(0);
  }

  rotate(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    for (let i = 0; i < this.points.length; i+=2) {
      const x = this.points[i];
      const y = this.points[i+1];

      this.points[i] = c * x - s*y;
      this.points[i + 1] = s * x + c * y;
    }
  }

  scale(c) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] *= c;
    }
  }

  hasPoint(ox, oy, x, y) {

  }
}
