"use strict";

import Ball from './ball';

const running = false;
const objects = [];
var canvas;

(function(){
	init();
	objects.push(new Ball(10));
    objects.push(new Ball(60));
    objects.push(new Ball(40));
	// Start the animation.
	requestAnimationFrame(animate);
})()

function init(){
	let canvas_ = document.getElementById("canvas");
	canvas = {
		context : canvas_.getContext("2d"),
		width : canvas_.width,
		height : canvas_.height
	};
}

function draw(){
	canvas.context.fillStyle = 'white';
	canvas.context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0, size = objects.length; i < size; ++i){
      objects[i].move();
	  objects[i].draw(canvas);  
    }
    
}

function animate() {
	requestAnimationFrame(animate);
	draw();
}

