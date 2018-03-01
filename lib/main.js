const States = {
  NO_CHANGE: 0,
  MENU: 1,
  GAME: 2,
  END: 3
};

class Game {
  constructor() {
    this.canvas = new Canvas(900,700);
    this.canvas.ctx.strokeStyle = "#fff";
    this.currentState = null;
    this.nextState = States.GAME;
  }

  run() {
    this.canvas.animate(() => {
      if (this.nextState !== States.NO_CHANGE) {
        switch (this.nextState) {
          case States.MENU:
            this.currentState = new State(this);
            break;
          case States.GAME:
            this.currentState = new GameState(this);
            break;
          case States.END:
            this.currentState = new State(this);
            break;
        }
        this.nextState = States.NO_CHANGE;
      }
      this.currentState.handleInputs();
      this.currentState.update();
      this.currentState.render(this.canvas.ctx);
    });
  }
}
