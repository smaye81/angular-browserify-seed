var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var connect = require('gulp-connect');

gulp.task('watch', function () {
    var appBundler = watchify(browserify('./app/app.js', watchify.args));

    function rebundle () {
        return appBundler.bundle()
            .pipe(source('app/bundle.js'))
            .pipe(gulp.dest('.'));
    }

    appBundler.on('update', rebundle);

    return rebundle();
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['watch', 'connect']);