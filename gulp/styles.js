/*
 * Process application styles.
 */
 
var paths = require('./paths.js');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', ['clean'], function(){
  return gulp.src(paths.styles.src)

    .pipe(gulp.dest(paths.styles.dest))

    .pipe(sourcemaps.init())

    .pipe(stylus({
      cache: false,
      compress: true
    }).on('error', notify.onError({
      title: 'Stylus Error',
      message: "\n#{error.message}"
    })))

    .pipe(autoprefixer())

    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(paths.styles.dest));
});
