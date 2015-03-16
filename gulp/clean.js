/* 
 * Destorys the destination folder before re-populating it.
 * Clean will not run while Gulp is watching.
 */

var paths = require('./paths.js');
var gulp = require('gulp');
var del = require('del');
var cleaned = false;

gulp.task('clean', function(cb){

  if(!cleaned){
    del(paths.root, cb);
    cleaned = true;
  }
  else{
    return cb();
  }

});