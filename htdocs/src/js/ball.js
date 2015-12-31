"use strict";

export default class {
	constructor(length){
		this.lenght = length;
		this.x = length;
		this.y = length;
		this.x_velocity = length*0.2;
		this.y_velocity = length*0.1;
		this.x_friction = 0.8;
		this.y_friction = 0.9;
	}
	
	move() {
		if(this.x <= length || this.x >= 800-length*2){
			this.x_velocity = -this.x_velocity;
		}
		if(this.y <= length || this.y >= 600-length*2){
			this.y_velocity = -this.y_velocity;
		}
		this.x += this.x_velocity;
		this.y += this.y_velocity;
		
	}
	draw(c) {
		c.context.beginPath();
		c.context.arc(this.x,this.y,10,0,2*Math.PI);
		c.context.stroke();
	}	
}