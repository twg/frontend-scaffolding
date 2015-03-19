/*
 * Process application styles.
 */
 
var paths = require('./paths.js');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var order = require('gulp-order');
var rename = require('gulp-rename');

gulp.task('styles', ['clean'], function(){
  return gulp.src(paths.styles.src)

    .pipe(order([
      '_mixins.styl',
      '_variables.styl',
      '_reset.styl',
      '*.styl'
    ]))

    .pipe(concat('_scaffolding.styl'))

    .pipe(gulp.dest(paths.styles.dest))

    .pipe(stylus({
      cache: false,
      compress: false
    }).on('error', notify.onError({
      title: 'Stylus Error',
      message: "\n<%=error.message%>"
    })))

    .pipe(autoprefixer())

    .pipe(rename('scaffolding.css'))

    .pipe(gulp.dest(paths.styles.dest))

    .pipe(minify())

    .pipe(rename('scaffolding.min.css'))

    .pipe(gulp.dest(paths.styles.dest));
});
