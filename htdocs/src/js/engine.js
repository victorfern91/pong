import Ball from './ball';
import Paddle from './paddle';

let running = false;
let objects = [];
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
  w.PongGame = {
    initialize: function() {
      let pongElement = d.getElementById('pong');
      pongElement.innerHTML += '<canvas id="canvas" width="' + pongElement.offsetWidth + '" height="' + pongElement.offsetHeight + '" >Your Browser doesn\'t support HTML5 capabilities. Try Google Chrome.</canvas>';
      init();
      running = true;
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
      objects.push(
        {
          score: {
            computer: 0,
            player: 0
          }
        });
      w.requestAnimFrame(animate); // Start the animation

      w.addEventListener('keydown', function(e) {
        if (objects[0] !== null) {
          switch (e.keyCode) {
            case 38: // Down
              objects[0].moveUp = true;
              e.preventDefault();
            break;
            case 40: // Up
              objects[0].moveDown = true;
              e.preventDefault();
            break;
          }
        }
      });

      w.addEventListener('keyup', function(e) {
        if (objects[0] !== null) {
          switch (e.keyCode) {
            case 38: // Down
              objects[0].moveUp = false;
              e.preventDefault();
            break;
            case 40: // Up
              objects[0].moveDown = false;
              e.preventDefault();
            break;
          }
        }
      });
    },
    delete: function() {
      objects = [];
      running = false;
      canvas = null;
    }
  };

  function init() {
    let htmlCanvas = d.getElementById('canvas');
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
    drawScore();

    for (let i = 0, size = objects.length - 1 ; i < size; ++i) {
      objects[i].move(objects);
      objects[i].draw(canvas);
    }
  };

  function drawScore() {
    canvas.context.font = (canvas.height / 8) + 'px vt323';
    canvas.context.fillStyle = 'white';
    canvas.context.fillText(objects[3].score.player, canvas.width * 0.23, (canvas.height / 8) + 10); // text, y, x
    canvas.context.fillText(objects[3].score.computer, canvas.width * 0.75, (canvas.height / 8) + 10);// text, y, x
  }

  function midcamp() {
      let length = 10;
      for (let i = 0; i < 21; ++i) {
        canvas.context.rect(canvas.width / 2 - length / 2, (length * i) * 4, length, length);
        canvas.context.fillStyle = 'white';
        canvas.context.fill();
      }
    }

  function animate() {
    if (running) {
      w.requestAnimFrame(animate);
      draw();
    }
  };

})(window, document);

