var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

gulp.task('clean', function(done) {
    del(['build/**'], done);
});

gulp.task('build', ['clean'], function() {


    var htmlGlobs = ['src/**.html'];
    var staticGlobs = ['src/static/**'];

    gulp.src(htmlGlobs)
        .pipe(watch(htmlGlobs))
        .pipe(gulp.dest('build'));

    gulp.src(staticGlobs)
        .pipe(watch(staticGlobs))
        .pipe(gulp.dest('build/static'));

    var bundler = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: ['src/client/app.js'],
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler.add(require.resolve("babel/polyfill"));
    bundler.transform(babelify);
    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);

    function bundle() {
        return bundler
            .bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('build/static/js'));
    }

    return bundle();
});

gulp.task('default', ['clean', 'build']);
