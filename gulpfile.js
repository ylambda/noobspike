var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('clean', function(done) {
    del(['build/**'], done);
});

gulp.task('build:server', function() {
    var serverGlobs = [
        'src/**',
        '!src/static/**',
        '!src/views/**'
    ];

    gulp.src(serverGlobs)
        .pipe(babel())
        .pipe(gulp.dest('build'));

    // build static
    gulp.src(['src/static/**'])
        .pipe(gulp.dest('build/static'));

    // build views
    gulp.src(['src/views/**'])
        .pipe(gulp.dest('build/views'));
});

gulp.task('build:client', function(done) {
    var clientGlobs = [
        'src/client/app.jsx'
    ];

    var bundler = browserify({
        debug: true,
        extensions: ['.js', '.jsx'],
        entries: clientGlobs
    });

    function bundle() {
        return bundler
            .transform(babelify)
            .bundle()
            .on('error', function(err) { console.log(err.stack) })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('build/static/js'))
    }

    return bundle();
});

gulp.task('default', ['clean', 'build']);
