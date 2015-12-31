// Ball class
export default class {
	constructor(length){
		this.lenght = length;
		this.x = length;
		this.y = length;
		this.x_velocity = 1;
		this.y_velocity = 2;
	}
	// move mehtod
	move() {
		if(this.y > (600 - this.lenght) || this.y < 0){
            this.y_velocity = -this.y_velocity;
        }
        if(this.x > (800 - this.lenght) || this.x < 0){
            this.x_velocity = -this.x_velocity;
        }
		this.x += this.x_velocity;
		this.y += this.y_velocity;
	}
    // draw function
	draw(ctx) {
		ctx.context.beginPath();
		ctx.context.rect(this.x,this.y,this.lenght,this.lenght);
        ctx.context.fillStyle = 'white';
        ctx.context.fill();
	}	
}