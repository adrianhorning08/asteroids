class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function(ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;

      ctx.drawPolygon = function(p,x,y) {
        // if this is wrong, you may need to make drawPolygon an annonymous function
        p = p.points;
        this.beginPath();
        this.moveTo(p[0] + x, p[1], + y);
        for (let i = 2; i < p.length;  i+= 2) {
          this.lineTo(p[i] + x, p[i + 1] + y);
        }
        this.stroke();
      };

      return ctx;
    })(this.canvas.getContext("2d"));

    document.body.appendChild(this.canvas);
  }

  animate(loop) {
    let rf = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(cb, el) {
        window.setTimeout(cb, 1000/60);
      };
    })();

    const l = () => {
      loop();
      rf(l, this.canvas);
    };
    rf(l, this.canvas);
  }
}
