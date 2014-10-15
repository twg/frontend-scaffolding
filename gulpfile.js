const ASSET_DIR = './assets'
const DIST_DIR  = './dist'
const SRC_DIR   = './src'
const BOWER_DIR = './bower_components'

//-- Includes ---------------------------------------------------------------
const gulp      = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  rename        = require('gulp-rename'),
  rev           = require('gulp-rev'),
  stylus        = require('gulp-stylus'),
  minify        = require('gulp-minify-css'),
  uglify        = require('gulp-uglify'),
  order         = require('gulp-order'),
  jade          = require('gulp-jade'),
  concat        = require('gulp-concat'),
  nodemon       = require('gulp-nodemon'),
  notify        = require('gulp-notify'),
  revall        = require('gulp-rev-all'),
  merge         = require('merge-stream')
  // TODO: add gulp-changed

const VENDOR_JS = [
  BOWER_DIR + '/jquery/jquery.js'
]

const VENDOR_CSS = [

]

const POLYFILL_IE ={
  'js': [
    BOWER_DIR + '/respond/dest/respond.min.js',
    BOWER_DIR + '/html5shiv/dist/html5shiv.min.js',
    BOWER_DIR + '/selectivizr/selectivizr.js',
    BOWER_DIR + '/background-size-polyfill/backgroundsize.min.htc',
    BOWER_DIR + '/html5-placeholder-polyfill/dist/placeholder_polyfill.jquery.min.combo.js',
    BOWER_DIR + '/box-sizing-polyfill/boxsizing.htc'
  ],
  'css': [
    BOWER_DIR + '/html5-placeholder-polyfill/dist/placeholder_polyfill.min.css'
  ]
}

//-- Images -----------------------------------------------------------------
gulp.task('images', function(){
  return gulp.src(SRC_DIR + '/images/**/*')
    .pipe(gulp.dest(DIST_DIR + '/images'))
})

//-- Pollyfills for IE ------------------------------------------------------
gulp.task('polyfills', function(){
  var stream_js = gulp.src(POLYFILL_IE.js)
    .pipe(gulp.dest(DIST_DIR + '/js/polyfill'))

  var stream_css = gulp.src(POLYFILL_IE.css)
    .pipe(gulp.dest(DIST_DIR + '/css/polyfill'))

  return merge(stream_js, stream_css)
})

//-- CSS --------------------------------------------------------------------
gulp.task('css', function() {
  
  var stream_app = gulp.src(SRC_DIR + '/stylus/app.styl')
    .pipe(stylus({ cache: false }))
    .on('error', notify.onError(function (error) {
      return 'Stylus error: ' + error.message
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest(DIST_DIR + '/css'))

  if (VENDOR_CSS.length > 0) {
    var stream_vendor = gulp.src(VENDOR_CSS)
      .pipe(minify())
      .pipe(concat('vendor.min.css'))
      .pipe(gulp.dest(DIST_DIR + '/css'))
    return merge(stream_app, stream_vendor)
  } else {
    return stream_app
  }
})

//-- JS ---------------------------------------------------------------------
gulp.task('javascript', function() {

  var stream_app = gulp.src(SRC_DIR + '/js/**/*.js')
    .pipe(order(['app.js', '*.js']))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_DIR + '/js'))

  if (VENDOR_JS.length > 0) {
    var stream_vendor = gulp.src(VENDOR_JS)
      .pipe(order(['jquery.js', '*.js']))
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(DIST_DIR + '/js'))
    return merge(stream_app, stream_vendor)
  } else {
    return stream_app
  }
})

//-- HTML -------------------------------------------------------------------
gulp.task('html', function() {
  return gulp.src(SRC_DIR + '/jade/*.jade')
    .pipe(jade({ pretty: true }))
    .on('error', notify.onError(function (error) {
      return "Jade error: " + error.message
    }))
    .pipe(gulp.dest(DIST_DIR))
})

//-- Guidedog ---------------------------------------------------------------
gulp.task('guidedog', function() {
  var stream_js = gulp.src(BOWER_DIR + '/guidedog/dist/guidedog.min.js')
    .pipe(gulp.dest(DIST_DIR + '/js'))

  var stream_css = gulp.src(BOWER_DIR + '/guidedog/dist/guidedog.css')
    .pipe(gulp.dest(DIST_DIR + '/css'))
  
  return merge(stream_js, stream_css)
})

//-- Rails Assets -----------------------------------------------------------
gulp.task('assets', ['html', 'polyfills', 'css', 'javascript', 'images'], function(){
   return gulp.src(DIST_DIR + '/**')
    .pipe(revall({ ignore: [/^\/favicon.ico$/g, '.html'] }))
    .pipe(gulp.dest(ASSET_DIR))
    .pipe(revall.manifest({ fileName: 'assets.json' }))
    .pipe(gulp.dest(ASSET_DIR))
})

//-- Server -----------------------------------------------------------------
gulp.task('server', function() {
  nodemon({
    verbose: false,
    script: 'server.js',
    watch:  ['src', 'server.js'],
    ext:    'js json',
    env:    {
      NODE_ENV: 'development'
    }
  })
})

//-- Watch -----------------------------------------------------
gulp.task('watch', function(){
  gulp.watch('./src/jade/**/*.jade',    ['html'])
  gulp.watch('./src/js/**/*.js',        ['javascript'])
  gulp.watch('./src/stylus/**/*.styl',  ['css'])
})

//-- Default -----------------------------------------------------
gulp.task('default', ['html', 'css', 'javascript', 'polyfills', 'images', 'guidedog', 'server', 'watch'])
