const Points = {
  ASTEROIDS: [
		[-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
		[-3,0,-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0],
		[-2,0,-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0],
		[-1,-2,-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2],
		[-4,-2,-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2]
	],
  SHIP: [6,0,-3,-3,-2,0,-3,3,6,0]
};

const AsteroidSize = 8;

class GameState extends State {
  constructor(game) {
    super(game);
    this.canvasWidth = game.canvas.ctx.width;
    this.canvasHeight = game.canvas.ctx.height;
    this.generateLevel();
    this.ship = new Ship(Points.SHIP, 2, this.canvasWidth/2, this.canvasHeight/2);
    this.ship.maxX = this.canvasWidth;
    this.ship.maxY = this.canvasHeight;
  }

  generateLevel() {
    const num = 3;
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
    if (input.isDown('up')) {
      this.ship.addVelocity();
    }
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
    this.ship.update();
  }

  render(ctx) {
    ctx.clearAll();
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
    this.ship.draw(ctx);
  }
}
