'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [['babelify', {'presets': ['es2015']}]]
        },
        files: {
          'htdocs/dist/game.bundled.js': 'htdocs/src/js/engine.js'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'htdocs/dist/game.bundled.min.js': ['htdocs/dist/game.bundled.js']
        }
      }
    }
  });
  // Grunt load packages
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['browserify','uglify']);
};
