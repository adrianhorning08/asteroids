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
    let contains = false;
    let points = this.points;

    for (let i = 0, j = points.length-2; i < points.length; i+=2) {
      let px1 = points[i] + ox;
      let px2 = points[j] + ox;
      let py1 = points[i+1] + oy;
      let py2 = points[j+1] + oy;

      if ((py1 > y != py2 > y) && (x < (px2-px1) * (y-py1) / (py2-py1) + px1)) {
        contains = !contains;
      }
      j = i;
    }
    return contains;
  }
}
