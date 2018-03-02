class InputHandler {
  constructor(keys) {
    this.keys = {};
    this.down = {};
    this.pressed = {};

    for (let key in keys) {
      const code = keys[key];

      this.keys[code] = key;
      this.down[key] = false;
      this.pressed[key] = false;
    }
    document.addEventListener('keydown', (event) => {
      const key = this.keys[event.keyCode];
      if (key) {
        this.down[key] = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      const key = this.keys[event.keyCode];
      this.down[key] = false;
      this.pressed[key] = false;
    });
  }

  isDown(key) {
    return this.down[key];
  }

  isPressed(key) {
    console.log(this.pressed[key]);
    if (this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      this.pressed[key] = true;
      return this.pressed[key];
    }
    return false;
  }
}
