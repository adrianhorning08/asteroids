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
    const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1))
    this.asteroid = new Asteroid(Points.ASTEROIDS[n], 20, 100, 100);
  }

  update() {
  }

  render(ctx) {
    ctx.clearAll();
    this.asteroid.draw(ctx);
  }
}
