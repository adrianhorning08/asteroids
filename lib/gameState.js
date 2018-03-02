class GameState extends State {
  constructor(game) {
    super(game);
    this.poly = new Polygon([-1, -1, 1, 1, -1, 1, -1, -1]);
    this.poly.scale(10);
  }

  update() {
  }

  render(ctx) {
    ctx.clearAll();
    ctx.drawPolygon(this.poly, 100, 100);
  }
}
