const Points = {
  ASTEROIDS: [
		[-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
		[-3,0,-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0],
		[-2,0,-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0],
		[-1,-2,-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2],
		[-4,-2,-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2]
	],
  SHIP: [6,0,-3,-3,-2,0,-3,3,6,0],
  FLAMES: [-2,0,-3,-1,-5,0,-3,1,-2,0]
};

const AsteroidSize = 8;

class GameState extends State {
  constructor(game) {
    super(game);
    this.canvasWidth = game.canvas.ctx.width;
    this.canvasHeight = game.canvas.ctx.height;
    this.generateLevel();
    this.ship = new Ship(Points.SHIP, Points.FLAMES, 5, this.canvasWidth/2, this.canvasHeight/2);
    this.ship.maxX = this.canvasWidth;
    this.ship.maxY = this.canvasHeight;
  }

  generateLevel() {
    const num = 3;
    this.bullets = [];
    this.asteroids = [];
    for (let i = 0; i < num; i++) {
      const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
      const asteroid = new Asteroid(Points.ASTEROIDS[n], AsteroidSize, 100, 100);
      asteroid.maxX = this.canvasWidth;
      asteroid.maxY = this.canvasHeight;

      this.asteroids.push(asteroid);
    }
  }

  handleInputs(input) {
    if (input.isDown('right')) {
      this.ship.rotate(0.06);
    }
    if (input.isDown('left')) {
      this.ship.rotate(-0.06);
    }

    this.ship.drawFlames = false;
    if (input.isDown('up')) {
      this.ship.addVelocity();
    }

    if (input.isPressed('spacebar')) {
      this.bullets.push(this.ship.shoot());
    }
  }

  update() {
    for (let i = 0, len1 = this.asteroids.length;  i < len1; i++) {
      const asteroid = this.asteroids[i];
      asteroid.update();
      // collision detection
      // This needs some MAJOR refactoring
      // Haseeb does it this way: MovingObject.prototype.isCollidedWith
      for (var j = 0, len = this.bullets.length; j < len; j++) {
        const bullet = this.bullets[j];
        if (asteroid.hasPoint(bullet.x, bullet.y)) {
          this.bullets.splice(j,1);
          len--;
          j--;

          if (asteroid.size > AsteroidSize/4) {
            for (let k = 0; k < 2; k++) {
              const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
              const splitAsteroid = new Asteroid(Points.ASTEROIDS[n], asteroid.size/2, asteroid.x, asteroid.y);
              asteroid.maxX = this.canvasWidth;
              asteroid.maxY = this.canvasHeight;
              this.asteroids.push(splitAsteroid);
              len1++;
            }
          }
          this.asteroids.splice(i,1);
          len1--;
          i--;
        }
      }
    }

    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.update();

      if (bullet.remove) {
        this.bullets.splice(i,1);
        // decrement length and i?
      }
    }
    this.ship.update();
  }

  render(ctx) {
    ctx.clearAll();
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(ctx);
    }
    this.ship.draw(ctx);
  }
}
