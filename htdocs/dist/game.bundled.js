(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Ball class

var _class = (function () {
  function _class(length, initialX, initialY) {
    _classCallCheck(this, _class);

    this.length = length;
    this.x = initialX;
    this.y = initialY;
    this.xVelocity = 2;
    this.yVelocity = 5;
  }

  _createClass(_class, [{
    key: 'move',
    value: function move(objectArray) {
      this.collision(objectArray);
      this.x += this.xVelocity;
      this.y += this.yVelocity;
    }
  }, {
    key: 'collision',
    value: function collision(objectArray) {
      if (this.y > 600 - this.length || this.y < 0) {
        this.yVelocity = -this.yVelocity;
      }
      if (this.x > 800 - this.length || this.x < 0) {
        this.xVelocity = -this.xVelocity;
      }
      // detect collission with left paddle
      if (this.x === 54) {
        if (objectArray[0].collision(this.y, this.y + this.length)) {
          this.xVelocity = -this.xVelocity;
        }
      }
    }
  }, {
    key: 'draw',

    // draw method
    value: function draw(canvas) {
      canvas.context.rect(this.x, this.y, this.length, this.length);
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

(function () {
  init();
  objects.push(new _paddle2.default(45, canvas.height / 2 - 50, 15, 100));
  objects.push(new _ball2.default(15, 10, 10));
  requestAnimationFrame(animate); // Start the animation.
})();

function init() {
  var htmlCanvas = document.getElementById('canvas');
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
  for (var i = 0, size = objects.length; i < size; ++i) {
    objects[i].move(objects);
    objects[i].draw(canvas);
  }
};

function midcamp() {
  var length = 9.5;
  for (var i = 0; i < 21; ++i) {
    canvas.context.rect(canvas.width / 2 - length / 2, length * i * 3, length, length);
    canvas.context.fillStyle = 'white';
    canvas.context.fill();
  }
}

function animate() {
  requestAnimationFrame(animate);
  draw();
};

window.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 38:
      // Down
      objects[0].moveUp = true;
      break;
    case 40:
      // Up
      objects[0].moveDown = true;
      break;
  }
});

window.addEventListener('keyup', function (e) {
  switch (e.keyCode) {
    case 38:
      // Down
      objects[0].moveUp = false;
      break;
    case 40:
      // Up
      objects[0].moveDown = false;
      break;
  }
});

},{"./ball":1,"./paddle":3}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = (function () {
  function _class(x, y, h, l) {
    _classCallCheck(this, _class);

    this.x = x;
    this.y = y;
    this.height = h;
    this.length = l;
    this.moveUp = false;
    this.moveDown = false;
  }

  _createClass(_class, [{
    key: 'move',
    value: function move() {
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
  }, {
    key: 'draw',
    value: function draw(canvas) {
      canvas.context.rect(this.x, this.y, this.height, this.length);
      canvas.context.fillStyle = 'white';
      canvas.context.fill();
    }
  }, {
    key: 'collision',
    value: function collision(yValue1, yValue2) {
      return yValue1 >= this.y && yValue1 <= this.y + this.length || yValue2 >= this.y && yValue2 <= this.y + this.length;
    }
  }]);

  return _class;
})();

exports.default = _class;

},{}]},{},[2]);
