const Points = {
  ASTEROIDS: [
		[-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
		[-3,0,-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0],
		[-2,0,-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,1,-2,4,-4,1,-2,0],
		[-1,-2,-2,-4,1,-4,4,-2,4,-1,1,0,4,2,2,4,1,3,-2,4,-4,1,-4,-2,-1,-2],
		[-4,-2,-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2]
	]
};

class GameState extends State {
  constructor(game) {
    super(game);

    this.asteroids = [];
    for (let i = 0; i < 10; i++) {
      const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1))
      const asteroid = new Asteroid(Points.ASTEROIDS[n], 20, 100, 100);
      asteroid.maxX = game.canvas.ctx.width;
      asteroid.maxY = game.canvas.ctx.height;

      this.asteroids.push(asteroid);
    }
  }

  update() {
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].update();
    }
  }

  render(ctx) {
    ctx.clearAll();
    for (let i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
  }
}
