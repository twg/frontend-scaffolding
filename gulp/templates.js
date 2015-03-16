/*
 * Build the jade templates.
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('templates', ['clean', 'scripts', 'styles'], function(){
  return gulp.src(paths.templates.src)

    .pipe(jade())

    .pipe(gulp.dest(paths.templates.dest));
});

