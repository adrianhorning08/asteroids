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
      if (this.keys[event.keyCode]) {
        this.down[this.keys[event.keyCode ]] = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      this.down[this.keys[event.keyCode ]] = false;
      this.pressed[this.keys[event.keyCode ]] = true;

    });
  }

  isDown(key) {
    this.down[key];
  }

  isPressed(key) {
    if (this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      return this.pressed[key] = true;
    }
    return false;
  }
}
