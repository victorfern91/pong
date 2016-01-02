export default class{
    constructor(x, y, h, l) {
      this.x = x;
      this.y = y;
      this.height = h;
      this.length = l;
      this.moveUp = false;
      this.moveDown = false;
    }

    move() {
      if (this.moveUp) {
        this.y -= 5;
      } else if (this.moveDown) {
        this.y += 5;
      }
      if (this.y < 0) {
        this.y = 0;
      } else if (this.y > 600 - this.length) {
        this.y = 600 - this.length;
      }
    }

    draw(canvas) {
      canvas.context.rect(this.x, this.y, this.height, this.length);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    }

    collision(yValue1, yValue2) {
      return (yValue1 >= this.y && yValue1 <= this.y + this.length) ||
             (yValue2 >= this.y && yValue2 <= this.y + this.length);
    }
}
