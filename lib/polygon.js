class Polygon {
  constructor(points) {
    this.points = points.slice(0);
  }

  rotate(theta) {

  }

  scale(c) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] *= c;
    }
  }

  hasPoint(ox, oy, x, y) {

  }
}
