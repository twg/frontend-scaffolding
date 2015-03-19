var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp');

gulp.task('build', [
  'styles',
  'templates'
]);

gulp.task('default', ['build', 'server', 'watch']);
