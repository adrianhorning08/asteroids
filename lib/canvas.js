class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function(ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;
      return ctx;
    })(this.canvas.getContext("2d"));

    document.body.appendChild(this.canvas);
  }
}
