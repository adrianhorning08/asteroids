class Canvas {
  constructor(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function(ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;
      ctx.drawPolygon = function(points,x,y) {
        points = points.points;
        this.beginPath();
        this.moveTo(points[0] + x, points[1] + y);
        for (let i = 2; i < points.length;  i+= 2) {
          this.lineTo(points[i] + x, points[i + 1] + y);
        }
        this.stroke();
      };

      ctx.ACHARCODE = "A".charCodeAt(0);
      ctx.ZEROCHARCODE = "0".charCodeAt(0);
      ctx.SPACECHARCODE = " ".charCodeAt(0);
      ctx.vectorText = function(text, s, x, y) {
        text = text.toString().toUpperCase();
        let step = s * 6;
        if (typeof x !== "number") {
          x = Math.round((this.width - text.length * step)/2) ;
        }
        if (typeof y !== "number") {
          y = Math.round((this.height - step)/2) ;
        }
        x += .5;
        y += .5;
        for (let i = 0; i < text.length; i++) {
          const character = text.charCodeAt(i);
          if (character === this.SPACECHARCODE) {
             x += step;
             continue;
          }
          let points;
          if (character - this.ACHARCODE >= 0) {
            points = Points.LETTERS[character - this.ACHARCODE];
          } else {
            points = Points.NUMBERS[character - this.ZEROCHARCODE];
          }
          this.beginPath();
          this.moveTo(points[0] * s + x, points[1] * s + y);
          for (let j = 2; j < points.length;  j+= 2) {
            this.lineTo(points[j] * s + x, points[j + 1] * s + y);
          }
          this.stroke();
          x += step;
        }
      };

      ctx.clearAll = function() {
        this.clearRect(0,0, this.width, this.height);
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
