/*
 * Process the vendor styles.
 */
 
var paths = require('./paths.js');
var gulp = require('gulp');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');

gulp.task('vendor:styles', ['clean'], function(){
  return gulp.src(paths.vendor.styles.src)
    .pipe(concat('vendor.css'))
    .pipe(minify().on('error', notify.onError({
      title: 'Vendor Styles Error',
      message: "\n#{error.message}"
    })))
    .pipe(gulp.dest(paths.vendor.styles.dest));
});
