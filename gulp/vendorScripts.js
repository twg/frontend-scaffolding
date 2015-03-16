/*
 * Concat and uglify the vendor scripts.
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

gulp.task('vendor:scripts', ['clean'], function(){
  gulp.src(paths.vendor.scripts.src)
    .pipe(concat('vendor.js'))
    .pipe(uglify().on('error', notify.onError({
      title: 'Vendor Scripts Error',
      message: "\n#{error.message}"
    })))
    .pipe(gulp.dest(paths.vendor.scripts.dest));
});
