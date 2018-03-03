const AsteroidSize = 8;

class GameState extends State {
  constructor(game) {
    super(game);
    this.canvasWidth = game.canvas.ctx.width;
    this.canvasHeight = game.canvas.ctx.height;
    this.level = 1;
    this.ship = new Ship(Points.SHIP, Points.FLAMES, 5, 0, 0);
    this.ship.maxX = this.canvasWidth;
    this.ship.maxY = this.canvasHeight;
    this.lives = 3;
    this.smallShip = new Polygon(Points.SHIP);
    this.smallShip.scale(2);
    this.smallShip.rotate(Math.PI/2);
    this.gameOver = false;
    this.points = 0;
    this.generateLevel();
  }

  generateLevel() {
    const num = this.level * 3;
    this.ship.x = this.canvasWidth/2;
    this.ship.y = this.canvasHeight/2;
    this.bullets = [];
    this.asteroids = [];
    for (let i = 0; i < num; i++) {
      const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
      let x = 0, y = 0;
      if (Math.random() > 0.5) {
        x = Math.random() * this.canvasWidth;
      } else {
        y = Math.random() * this.canvasHeight;
      }
      const asteroid = new Asteroid(Points.ASTEROIDS[n], AsteroidSize, x, y);
      asteroid.maxX = this.canvasWidth;
      asteroid.maxY = this.canvasHeight;

      this.asteroids.push(asteroid);
    }
  }

  handleInputs(input) {
    if (!this.ship.visible && input.isDown('spacebar')) {
      this.ship.visible = true;
    }
    if (input.isDown('right') && this.ship.visible) {
      this.ship.rotate(0.06);
    }
    if (input.isDown('left') && this.ship.visible) {
      this.ship.rotate(-0.06);
    }
    if (input.isDown('up') && this.ship.visible) {
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
      if (this.ship.collide(asteroid)) {
        this.ship.x = this.canvasWidth/2;
        this.ship.y = this.canvasHeight/2;
        this.ship.velocity = {
          x: 0,
          y: 0
        };
        this.ship.visible = false;
        this.lives--;
        if (this.lives === 0) {
          this.gameOver = true;
        }
      }
      // collision detection
      // This needs some MAJOR refactoring
      // Haseeb does it this way: MovingObject.prototype.isCollidedWith
      for (var j = 0, len = this.bullets.length; j < len; j++) {
        const bullet = this.bullets[j];
        if (asteroid.hasPoint(bullet.x, bullet.y)) {
          this.bullets.splice(j,1);
          len--;
          j--;

          switch (asteroid.size) {
            case AsteroidSize:
              this.points += 10;
              console.log(this.points);
              break;
            case AsteroidSize/2:
              this.points += 20;
              break;
          }

          if (asteroid.size > AsteroidSize/2) {
            for (let k = 0; k < 2; k++) {
              const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
              const splitAsteroid = new Asteroid(Points.ASTEROIDS[n], asteroid.size/2, asteroid.x, asteroid.y);
              splitAsteroid.maxX = this.canvasWidth;
              splitAsteroid.maxY = this.canvasHeight;
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
      }
    }
    this.ship.update();
    if (this.asteroids.length === 0) {
      this.level++;
      this.generateLevel();
    }
  }

  render(ctx) {
    ctx.clearAll();
    ctx.vectorText(this.points,3,35,15 );
    for (let i = 0; i < this.lives; i++) {
      ctx.drawPolygon(this.smallShip, 40+15*i, 50);
    }
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(ctx);
    }
    if (this.ship.visible) {
      this.ship.draw(ctx);
    }
  }
}
