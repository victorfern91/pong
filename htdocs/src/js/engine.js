"use strict";

import Ball from './ball';
import Paddle from './paddle';

const running = false;
const objects = [];
let canvas;

(function(){
	init();
	objects.push(new Ball(15));
    objects.push(new Paddle(45, canvas.height/2 - 40, 15, 80))
	// Start the animation.
	requestAnimationFrame(animate);
})();

function init(){
	let htmlCanvas = document.getElementById("canvas");
	canvas = {
		context : htmlCanvas.getContext("2d"),
		width : htmlCanvas.width,
		height : htmlCanvas.height
	};
};

function draw(){
	canvas.context.fillStyle = 'black';
	canvas.context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0, size = objects.length; i < size; ++i){
        objects[i].move();
        objects[i].draw(canvas);  
    }
    
};

function animate() {
	requestAnimationFrame(animate);
	draw();
};

window.addEventListener('keydown', function(e) {
    e.preventDefault;
    switch(e.keyCode) {
        case 38: // down
        objects[1].moveDown(10);
        break;
        case 40: // up
        objects[1].moveUp(10);
        break;
    }
});