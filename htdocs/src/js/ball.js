// Ball class
export default class {
    constructor(length, initialX, initialY) {
      this.length = length;
      this.x = initialX;
      this.y = initialY;
      this.xVelocity = 2;
      this.yVelocity = 5;
    };

    move(objectArray) {
      this.collision(objectArray);
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    };

    collision(objectArray) {
      if (this.y > (600 - this.length) || this.y < 0) {
        this.yVelocity = -this.yVelocity;
      }
      if (this.x > (800 - this.length) || this.x < 0) {
        this.xVelocity = -this.xVelocity;
      }
      // detect collission with left paddle
      if (this.x === 54) {
        if (objectArray[0].collision(this.y, this.y + this.length)) {
          this.xVelocity = -this.xVelocity;
        }
      }
    };

    // draw method
    draw(canvas) {
      canvas.context.rect(this.x, this.y, this.length, this.length);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    };
}
