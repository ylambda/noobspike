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

gulp.task('build', function() {

/*

    var serverGlobs = [
        'src/**',
        '!src/static/**',
        '!src/views/**'
    ];

    gulp.src(serverGlobs)
        .pipe(watch(serverGlobs))
        .pipe(babel())
        .pipe(gulp.dest('build'));

    // build static
    gulp.src(['src/static/**'])
        .pipe(watch('/src/static/**'))
        .pipe(gulp.dest('build/static'));

    // build views
    gulp.src(['src/views/**'])
        .pipe(watch('/src/static/**'))
        .pipe(gulp.dest('build/views'));

 */

    // build clientside
    var clientGlobs = [
        'src/client/app.js'
    ];

    var bundler = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: clientGlobs,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    var bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);

    function bundle() {
        return bundler
            .transform(babelify)
            .bundle()
            .on('error', function(err) { console.log(err.stack) })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('build/static/js'))
    }

    return bundle();
})

gulp.task('default', ['clean', 'build']);
