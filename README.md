# Asteroids
[Live site](https://adrianhorning08.github.io/asteroids/)

Recreation of the classic arcade game using vanilla JavaScript, HTML and Canvas.

![screenshot](/assets/screenshot.png)

## Features
* Collision detection (thanks to [W. Randolph Franklin's](https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html) Ray Casting algorithm
 )
* Velocity and rotation calculation
* Different levels with increasing number of asteroids at each level

## Implementation
* Everything is drawn with Canvas
* Implemented Ray Casting algorithm for collision detection
```javascript
hasPoint(ox, oy, testX, testY) {
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
```
* Designed with Object Oriented Programming principles
    * All shapes inherit from Polygon class
* Used triginomic functions to calculate velocity and rotation for ship and asteroids
```javascript
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
addVelocity() {
    if (Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2) < 20 * 20) {
      this.velocity.x += 0.07 * Math.cos(this.angle);
      this.velocity.y += 0.07 * Math.sin(this.angle);
    }
}
```
