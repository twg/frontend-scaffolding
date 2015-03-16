/*
 * Concat and uglify the scripts.
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

gulp.task('scripts', ['clean'], function(){
  return gulp.src(paths.scripts.src)

    .pipe(concat({path: 'scripts.js', cwd: ''}))

    .pipe(uglify().on('error', notify.onError({
      title: 'Uglify Error',
      message: "\n#{error.message}"
    })))

    .pipe(gulp.dest(paths.scripts.dest));
});
