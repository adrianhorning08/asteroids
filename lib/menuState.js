class MenuState extends State {
  constructor(game) {
    super(game);
    this.game = game;
    this.asteroids = [];
    // what is game.canvas.ctx.width/height?
    this.canvasWidth = game.canvas.ctx.width;
    this.canvasHeight = game.canvas.ctx.height;

    // create a bunch of asteroids on the screen
    for (let i = 0; i < 10; i++) {
      const n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
      let x = Math.random() * this.canvasWidth;
      let y = Math.random() * this.canvasHeight;
      let size = [1,2,3][Math.round(Math.random() * 2)];
      const asteroid = new Asteroid(Points.ASTEROIDS[n], AsteroidSize/size, x, y);
      asteroid.maxX = this.canvasWidth;
      asteroid.maxY = this.canvasHeight;

      this.asteroids.push(asteroid);
    }
  }

  handleInputs(input) {
    if (input.isPressed('spacebar')) {
      this.game.nextState = States.GAME;
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
    ctx.vectorText('asteroids', 10, null, 100);
    ctx.vectorText('Controls', 3, null, 200);
    ctx.vectorText('Use spacebar to shoot and respawn', 2, null, 240);
    ctx.vectorText('Use arrows to control ship', 2, null, 270);
    ctx.vectorText('press spacebar to play', 4, null, 400);
  }
}
