export default class{
    constructor(canvas, x, y, w, h, ap) {
      this.x = x;
      this.y = y;
      this.height = h;
      this.width = w;
      this.speed = 5;
      this.moveUp = false;
      this.moveDown = false;
      this.autoPilot = ap;
      this.canvas = canvas;
    }

    move(objectsArray) {
      if (!this.autoPilot) {
        if (this.moveUp) {
          this.y -= this.speed;
        } else if (this.moveDown) {
          this.y += this.speed;
        }
      } else if (objectsArray[2].x > this.canvas.height / 2) {
        if (objectsArray[2].y >= (this.y + (this.y + this.width)) / 2) {
          this.y += this.speed;
        } else {
          this.y -= this.speed;
        }
      }
      if (this.y < 0) {
        this.y = 0;
      } else if ((this.y + this.height) > this.canvas.height) {
        this.y = this.canvas.height - this.height;
      }
    }

    draw(canvas) {
      canvas.context.rect(this.x, this.y, this.width, this.height);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    }

    collision(x, y, width, height) {
      return (this.x < x + width &&
             this.x + this.width > x &&
             this.y < y + height &&
             this.y + this.height > y);
    }
}
