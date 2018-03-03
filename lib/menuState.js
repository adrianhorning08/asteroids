class MenuState extends State {
  constructor(game) {
    super(game);
    this.game = game;
  }

  handleInputs(input) {

  }

  update() {

  }

  render(ctx) {
    ctx.clearAll();
    ctx.vectorText('asteroids', 6, null, 100);
    ctx.vectorText('press spacebar to play', 2, null, 200);
  }
}