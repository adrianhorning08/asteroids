class Polygon {
  constructor(points) {
    this.points = points.slice(0);
  }

  rotate(rotation) {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    for (let i = 0; i < this.points.length; i+=2) {
      const x = this.points[i];
      const y = this.points[i+1];

      this.points[i] = cos * x - sin*y;
      this.points[i + 1] = sin * x + cos * y;
    }
  }

  scale(c) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i] *= c;
    }
  }

  hasPoint(ox, oy, testX, testY) {
    // Based off of W. Randolph Franklin's Ray Casting algorithm
    // https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html

  // "The idea of the algorithm is pretty simple: Draw a virtual ray
  // from anywhere outside the polygon to your point and count how often
  // it hits a side of the polygon. If the number of hits is even,
  // it's outside of the polygon, if it's odd, it's inside."

    let contains = false;
    let points = this.points;
    for (let i = 0, j = points.length-2; i < points.length; i+=2) {
      let px1 = points[i] + ox;
      let px2 = points[j] + ox;
      let py1 = points[i+1] + oy;
      let py2 = points[j+1] + oy;

      if ((py1 > testY !== py2 > testY) && (testX < (px2-px1) * (testY-py1) / (py2-py1) + px1)) {
        contains = !contains;
      }
      j = i;
    }
    return contains;
  }
}
