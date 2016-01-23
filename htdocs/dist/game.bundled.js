(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Ball class

var _class = (function () {
  function _class(canvas, width, x, y) {
    _classCallCheck(this, _class);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = width;
    this.xVelocity = 2;
    this.yVelocity = 4;
    this.hit = 0;
    this.canvas = canvas;
  }

  _createClass(_class, [{
    key: 'move',
    value: function move(objectArray) {
      this.collision(objectArray);
      this.x += this.xVelocity * (1 + this.hit * 0.2);
      this.y += this.yVelocity * (1 + this.hit * 0.2);
    }
  }, {
    key: 'collision',
    value: function collision(objectArray) {
      if (this.y > this.canvas.height - this.height || this.y < 0) {
        this.yVelocity = -this.yVelocity;
      }
      if (this.x > this.canvas.width - this.width || this.x < 0) {
        this.hit = 0;
        if (this.xVelocity > 0) {
          // player scores
          this.x = this.canvas.width / 4;
          objectArray[3].score.player++;
        } else {
          // computer scores
          this.x = 3 * this.canvas.width / 4;
          objectArray[3].score.computer++;
        }
        this.y = Math.random() * this.canvas.height;
      }

      if (objectArray[0].collision(this.x, this.y, this.width, this.width) || objectArray[1].collision(this.x, this.y, this.width, this.height)) {
        this.xVelocity = -this.xVelocity;
        this.hit++;
      }
    }
  }, {
    key: 'draw',

    // draw method
    value: function draw(canvas) {
      canvas.context.rect(this.x, this.y, this.width, this.height);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    }
  }]);

  return _class;
})();

exports.default = _class;

},{}],2:[function(require,module,exports){
'use strict';

var _ball = require('./ball');

var _ball2 = _interopRequireDefault(_ball);

var _paddle = require('./paddle');

var _paddle2 = _interopRequireDefault(_paddle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var running = false;
var objects = [];
var canvas = undefined;

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

(function (w, d) {
  w.PongGame = {
    initialize: function initialize() {
      var pongElement = d.getElementById('pong');
      pongElement.innerHTML += '<canvas id="canvas" width="' + pongElement.offsetWidth + '" height="' + pongElement.offsetHeight + '" >Your Browser doesn\'t support HTML5 capabilities. Try Google Chrome.</canvas>';
      init();
      running = true;
      var paddleWidth = canvas.height / 35;
      var paddleHeigth = canvas.height / 5;
      objects.push(new _paddle2.default(canvas, paddleWidth * 2, canvas.height / 2 - paddleHeigth / 2, paddleWidth, paddleHeigth, false));
      objects.push(new _paddle2.default(canvas, canvas.width - paddleWidth * 3, canvas.height / 2 - paddleHeigth / 2, paddleWidth, paddleHeigth, true));
      objects.push(new _ball2.default(canvas, canvas.height / 35, canvas.height / 10, canvas.height / 10));
      objects.push({
        score: {
          computer: 0,
          player: 0
        }
      });
      w.requestAnimFrame(animate); // Start the animation

      w.addEventListener('keydown', function (e) {
        if (objects[0] !== null) {
          switch (e.keyCode) {
            case 38:
              // Down
              objects[0].moveUp = true;
              e.preventDefault();
              break;
            case 40:
              // Up
              objects[0].moveDown = true;
              e.preventDefault();
              break;
          }
        }
      });

      w.addEventListener('keyup', function (e) {
        if (objects[0] !== null) {
          switch (e.keyCode) {
            case 38:
              // Down
              objects[0].moveUp = false;
              e.preventDefault();
              break;
            case 40:
              // Up
              objects[0].moveDown = false;
              e.preventDefault();
              break;
          }
        }
      });
    },
    delete: function _delete() {
      objects = [];
      running = false;
      canvas = null;
    }
  };

  function init() {
    var htmlCanvas = d.getElementById('canvas');
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

    for (var i = 0, size = objects.length - 1; i < size; ++i) {
      objects[i].move(objects);
      objects[i].draw(canvas);
    }
  };

  function drawScore() {
    canvas.context.font = canvas.height / 8 + 'px vt323';
    canvas.context.fillStyle = 'white';
    canvas.context.fillText(objects[3].score.player, canvas.width * 0.23, canvas.height / 8 + 10); // text, y, x
    canvas.context.fillText(objects[3].score.computer, canvas.width * 0.75, canvas.height / 8 + 10); // text, y, x
  }

  function midcamp() {
    var length = 10;
    for (var i = 0; i < 21; ++i) {
      canvas.context.rect(canvas.width / 2 - length / 2, length * i * 4, length, length);
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

},{"./ball":1,"./paddle":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = (function () {
  function _class(canvas, x, y, w, h, ap) {
    _classCallCheck(this, _class);

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

  _createClass(_class, [{
    key: 'move',
    value: function move(objectsArray) {
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
      } else if (this.y + this.height > this.canvas.height) {
        this.y = this.canvas.height - this.height;
      }
    }
  }, {
    key: 'draw',
    value: function draw(canvas) {
      canvas.context.rect(this.x, this.y, this.width, this.height);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    }
  }, {
    key: 'collision',
    value: function collision(x, y, width, height) {
      return this.x < x + width && this.x + this.width > x && this.y < y + height && this.y + this.height > y;
    }
  }]);

  return _class;
})();

exports.default = _class;

},{}]},{},[2]);
