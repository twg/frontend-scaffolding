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
  './bower_components/jquery/jquery.js'
]

var vendorCSS = [
]

var polyfillIe ={
    'js': [
    'bower_components/respond/dest/respond.min.js',
    'bower_components/html5shiv/dist/html5shiv.min.js',
    'bower_components/selectivizr/selectivizr.js',
    'bower_components/background-size-polyfill/backgroundsize.min.htc',
    'bower_components/html5-placeholder-polyfill/dist/placeholder_polyfill.jquery.min.combo.js',
    'bower_components/box-sizing-polyfill/boxsizing.htc'
    ],
    'css': [
    'bower_components/html5-placeholder-polyfill/dist/placeholder_polyfill.min.css'
    ]
}


//-- Pollyfills for IE -----------------------------------------------------
gulp.task('polyfillIe', function() {
  gulp.src(polyfillIe.js)
    .pipe(gulp.dest('./dist/js/'));
  gulp.src(polyfillIe.css)
    .pipe(gulp.dest('./dist/css/'));
});


//-- HTML -----------------------------------------------------
gulp.task('html', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .on("error", notify.onError(function (error) {
      return "Jade error: " + error.message
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify('Compiled HTML'))
})

//-- CSS -----------------------------------------------------
gulp.task('css', function() {
  // custom CSS
  gulp.src('./src/stylus/app.styl')
    .pipe(stylus({cache: false}))
    .on("error", notify.onError(function (error) {
      return "Stylus error: " + error.message
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify('Compiled CSS'))

  // vendor CSS
  if(vendorCSS.length > 0){
    gulp.src(vendorCSS)
      .pipe(minify())
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('./dist/css'))
  }
})

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
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify('Compiled JS'))

  // vendor JS
  if(vendorJS.length > 0){
    gulp.src(vendorJS)
      .pipe(order([
        'jquery.js',
        '*.js'
      ]))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
  }
})

//-- Guidedog -----------------------------------------------------
gulp.task('guidedog', function() {
  // Guidedog js
  gulp.src('bower_components/guidedog/dist/guidedog.min.js')
    .pipe(gulp.dest('dist/js/'))

  // Guidedog css
  gulp.src('bower_components/guidedog/dist/guidedog.css')
    .pipe(gulp.dest('dist/css/'))

  .pipe(notify('Compiled Guidedog'))
})

//-- Server -----------------------------------------------------
gulp.task('server', function() {
  nodemon({
    verbose: false,
    script: 'server.js',
    watch: ['src', 'server.js'],
    ext: 'js json',
    env: {
      NODE_ENV: 'development'
    }
  })
})

//-- Watch -----------------------------------------------------
gulp.task('watch', function(){
  gulp.watch('./src/jade/**/*.jade', ['html'])
  gulp.watch('./src/js/**/*.js', ['javascript'])
  gulp.watch('./src/stylus/**/*.styl', ['css'])
})

//-- Default -----------------------------------------------------
gulp.task('default', ['html', 'css', 'javascript', 'guidedog', 'server', 'polyfillIe', 'watch'])
