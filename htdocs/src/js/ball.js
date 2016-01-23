// Ball class
export default class {
    constructor(canvas, width, x, y) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = width;
      this.xVelocity = 2;
      this.yVelocity = 4;
      this.hit = 0;
      this.canvas = canvas;
    };

    move(objectArray) {
      this.collision(objectArray);
      this.x += this.xVelocity * (1 + this.hit * 0.2);
      this.y += this.yVelocity * (1 + this.hit * 0.2);
    };

    collision(objectArray) {
      if (this.y > (this.canvas.height - this.height) || this.y < 0) {
        this.yVelocity = -this.yVelocity;
      }
      if (this.x > (this.canvas.width - this.width) || this.x < 0) {
        this.hit = 0;
        if (this.xVelocity > 0) { // player scores
          this.x = this.canvas.width / 4;
          objectArray[3].score.player++;
        } else { // computer scores
          this.x = (3 * this.canvas.width) / 4;
          objectArray[3].score.computer++;
        }
        this.y = (Math.random() * this.canvas.height);
      }

      if (objectArray[0].collision(this.x, this.y, this.width, this.width) ||
      objectArray[1].collision(this.x, this.y, this.width, this.height)) {
        this.xVelocity = -this.xVelocity;
        this.hit++;
      }
    };

    // draw method
    draw(canvas) {
      canvas.context.rect(this.x, this.y, this.width, this.height);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    };
}
