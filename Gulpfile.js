var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var connect = require('gulp-connect');
var globby = require('globby');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

var appBundleName = "bundle.js";
var testBundleName = "testBundle.js";

var SOURCE_FILES = ['!./app/bower_components/**/*.js', '!./app/bundle/*.js', './app/**/*.js'];
var HTML_FILES = [];
var LESS_FILES = [];

// Runs JSHint Report against all JS files in app
gulp.task('lint', function () {
    return gulp.src(SOURCE_FILES)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watchify', function () {

    // Lint the JS files when they change
    gulp.watch(SOURCE_FILES, ['lint']);

    // Rebuild the template cache when any HTML file changes
    gulp.watch(HTML_FILES, ['templates']);

    gulp.watch(LESS_FILES, function(event) {
        gulp.run('less-css');
    });

    var appBundler = watchify(browserify('./app/app.js', watchify.args));

    // Only run files in the modules directory through Babelify
    appBundler.transform(babelify.configure({
        only : /modules/
    }));

    function rebundle() {
        return appBundler.bundle()
            .pipe(source(appBundleName))
            .pipe(gulp.dest('./app/bundle'));
    }

    appBundler.on('update', rebundle);

    return rebundle();
});

gulp.task('watchify-tests', function() {

    var testFiles = globby.sync(['./app/**/*_test.js', '!./app/bundle/' + testBundleName]);

    var watchified = watchify(browserify(testFiles, watchify.args));

    function bundleWatched() {
        return watchified
            .bundle()
            .pipe(source(testBundleName))
            .pipe(gulp.dest('./app/bundle/'));
    }

    watchified.on('update', bundleWatched);
    watchified.on('time', function (time) {
        gutil.log('Watchify', gutil.colors.cyan("'tests'"), 'after', gutil.colors.magenta(time), gutil.colors.magenta('ms'));
    });

    return bundleWatched();
});

gulp.task('connect', function () {

    // Uses gulp-connect plugin to start up a server
    connect.server({
        root: ['app'],
        port: 9000
    });
});

gulp.task('default', ['watchify', 'watchify-tests', 'connect']);