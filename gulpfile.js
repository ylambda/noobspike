var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var del = require('del');
var watch = require('gulp-watch');

function compile(debug, callback) {

  var bundler = browserify({
    debug: debug,
    extensions: ['.js'],
    entries: ['src/client/app.js'],
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler.add(require.resolve("babel/polyfill"));
  bundler.transform(babelify);

  if (!debug) {
    bundler.transform({
      global: true,
    }, 'uglifyify');
  }

  if (debug) {
    bundler = watchify(bundler);
    bundler.on('log', gutil.log);
    bundler.on('update', bundle);
  }

  function bundle() {
    return bundler
      .bundle()
      .on('error', function(err) {
        gutil.log(err);
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('build/static/js'))
      .on('end', callback);
  }

  return bundle();
}

function build (debug, done) {
  var htmlGlobs = ['src/**.html'];
  var staticGlobs = ['src/static/**'];
  var html = gulp.src(htmlGlobs);
  var static = gulp.src(staticGlobs)

  if(debug) {
    html = html.pipe(watch(htmlGlobs));
    static = static.pipe(watch(staticGlobs));
  }

  html.pipe(gulp.dest('build'))
  static.pipe(gulp.dest('build/static'));
  compile(debug, done);
}

gulp.task('clean', function(done) {
  del(['build/**'], done);
});

gulp.task('build:development', ['clean'], function(done) {
  var debug = true;
  build(debug, done);
});

gulp.task('build:production', ['clean'], function(done) {
  var debug = false;
  build(debug, done);
});

gulp.task('default', ['clean', 'build:development']);
