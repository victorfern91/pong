import Ball from './ball';
import Paddle from './paddle';

const running = false;
const objects = [];
let canvas;

(function() {
  init();
  objects.push(new Paddle(45, canvas.height / 2 - 50, 15, 100));
  objects.push(new Ball(15, 10, 10));
  requestAnimationFrame(animate); // Start the animation.
})();

function init() {
  let htmlCanvas = document.getElementById('canvas');
  canvas = {
    context: htmlCanvas.getContext('2d'),
    width: htmlCanvas.width,
    height: htmlCanvas.offsetHeight
  };
};

function draw() {
  canvas.context.beginPath();
  canvas.context.fillStyle = 'black';
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);
  midcamp();
  for (let i = 0, size = objects.length; i < size; ++i) {
    objects[i].move(objects);
    objects[i].draw(canvas);
  }
};

function midcamp() {
  let length = 9.5;
  for (let i = 0; i < 21; ++i) {
    canvas.context.rect(canvas.width / 2 - length / 2, (length * i) * 3, length, length);
    canvas.context.fillStyle = 'white';
    canvas.context.fill();
  }
}

function animate() {
  requestAnimationFrame(animate);
  draw();
};

window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 38: // Down
      objects[0].moveUp = true;
    break;
    case 40: // Up
      objects[0].moveDown = true;
    break;
  }
});

window.addEventListener('keyup', function(e) {
  switch (e.keyCode) {
    case 38: // Down
      objects[ 0 ].moveUp = false;
    break;
    case 40: // Up
      objects[ 0 ].moveDown = false;
    break;
  }
});
