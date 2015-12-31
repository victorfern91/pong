var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  var bundler = browserify("./htdocs/src/js/engine.js")
	.transform("babelify", {presets: ["es2015"]});

  return bundler.bundle()
    .pipe(source('game.bundled.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./htdocs/dist'))
});