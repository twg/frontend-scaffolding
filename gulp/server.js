/*
 * Start the local server (index.js)
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', ['build'], function() {
  nodemon({
    verbose: false,
    script: 'index.js',
    watch: ['src', 'index.js'],
    ext: 'js',
    env: {
      NODE_ENV: 'development'
    }
  });
});
