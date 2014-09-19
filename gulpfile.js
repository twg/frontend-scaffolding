//-- Includes -----------------------------------------------------
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    notify = require('gulp-notify')

var vendorJS = [
  './bower_components/jquery/dist/jquery.js'
];

var vendorCSS = [
];

//-- HTML -----------------------------------------------------
gulp.task('html', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .on("error", notify.onError(function (error) {
      return "Jade error: " + error.message;
    }))
    .pipe(gulp.dest('./dist/'));
});

//-- CSS -----------------------------------------------------
gulp.task('css', function() {
  // custom CSS
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus())
    .on("error", notify.onError(function (error) {
      return "Stylus error: " + error.message;
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'));

  // vendor CSS
  if(vendorCSS.length > 1){
    gulp.src(vendorCSS)
      .pipe(minify())
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('./dist/css'));
  }
});

//-- JS -----------------------------------------------------
gulp.task('javascript', function() {
  // custom JS
  gulp.src('./src/js/**/*.js')
    .pipe(order([
      'app.js',
      '*.js'
    ]))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));

  // vendor JS
  if(vendorJS.length > 1){
    gulp.src(vendorJS)
      .pipe(order([
        'jquery.js',
        '*.js'
      ]))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
  }
});

//-- Server -----------------------------------------------------
gulp.task('server', function() {
  nodemon({
    verbose: false,
    script: 'server.js',
    watch: ['source', 'server.js'],
    ext: 'js json',
    env: {
      NODE_ENV: 'development'
    }
  })
});

//-- Watch -----------------------------------------------------
gulp.task('watch', function(){
  gulp.watch('./src/jade/**/*.jade', ['html']);
  gulp.watch('./src/js/**/*.js', ['javascript']);
  gulp.watch('./src/stylus/**/*.styl', ['css']);
})

//-- Default -----------------------------------------------------
gulp.task('default', ['html', 'css', 'javascript', 'server', 'watch']);
