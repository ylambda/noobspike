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

function compile(watch) {

  var bundler = browserify({
    debug: true,
    extensions: ['.js'],
    entries: ['src/client/app.js'],
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler.add(require.resolve("babel/polyfill"));
  bundler.transform(babelify);
  bundler = watchify(bundler);
  bundler.on('log', gutil.log);

  if(watch) {
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
      .pipe(gulp.dest('build/static/js'));
  }

  return bundle();
}

gulp.task('clean', function(done) {
  del(['build/**'], done);
});

gulp.task('build', ['clean'], function() {
  var htmlGlobs = ['src/**.html'];
  var staticGlobs = ['src/static/**'];

  gulp.src(htmlGlobs)
    .pipe(watch(htmlGlobs).on('change', function(path) { gutil.log(path + ' has changed')}))
    .pipe(gulp.dest('build'))

  gulp.src(staticGlobs)
    .pipe(watch(staticGlobs))
    .pipe(gulp.dest('build/static'));

  compile(true);
});

gulp.task('default', ['clean', 'build']);
