import Ball from './ball';
import Paddle from './paddle';

const running = false;
const objects = [];
let canvas;

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame  ||
  window.mozRequestAnimationFrame     ||
  window.oRequestAnimationFrame       ||
  window.msRequestAnimationFrame      ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

(function(w, d) {
  init();
  let paddleWidth = canvas.height / 35;
  let paddleHeigth = canvas.height / 5;
  objects.push(new Paddle(canvas,
                          paddleWidth * 2,
                          (canvas.height / 2) - (paddleHeigth / 2),
                          paddleWidth,
                          paddleHeigth,
                          false));
  objects.push(new Paddle(canvas,
                          canvas.width - (paddleWidth * 3),
                          (canvas.height / 2) - (paddleHeigth / 2),
                          paddleWidth,
                          paddleHeigth,
                          true));
  objects.push(new Ball(canvas, canvas.height / 35, canvas.height / 10, canvas.height / 10));
  w.requestAnimFrame(animate); // Start the animation

  w.PongGame = function() {
    console.log('First output');
  };
})(window, document);

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
  canvas.context.clearRect(0, 0, canvas.width, canvas.height);
  midcamp();
  for (let i = 0, size = objects.length; i < size; ++i) {
    objects[i].move(objects);
    objects[i].draw(canvas);
  }
};

function midcamp() {
  let length = 10;
  for (let i = 0; i < 21; ++i) {
    canvas.context.rect(canvas.width / 2 - length / 2, (length * i) * 4, length, length);
    canvas.context.fillStyle = 'white';
    canvas.context.fill();
  }
}

function animate() {
  window.requestAnimFrame(animate);
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
      objects[0].moveUp = false;
    break;
    case 40: // Up
      objects[0].moveDown = false;
    break;
  }
});
