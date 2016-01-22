// Ball class
export default class {
    constructor(canvas, width, initialX, initialY) {
      this.x = initialX;
      this.y = initialY;
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
        this.xVelocity = -this.xVelocity;
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
