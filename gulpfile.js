/**
 * Created by Yurii_Shpakovych on 6/23/2016.
 */
var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var del = require('del');
var watch = require('gulp-watch');
var htmlreplace = require('gulp-html-replace');

gulp.task('lint', function () {
  return gulp.src(['./src/js/**/*.js', '!./src/js/lib/*.js', '!./src/js/text.js'])
    .pipe(eslint({ mainConfigFile: '.eslintrc' }))
    .pipe(eslint.format());
});

gulp.task('karma-server', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/main.js')
    .pipe(sourcemaps.init())
    .pipe(requirejsOptimize({
      mainConfigFile: './src/js/main.js',
      out: 'app.min.js'
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('html-styles', function () {
  return gulp.src('./src/*.html')
    .pipe(
      htmlreplace({
        js: {
          src: ['js/app.min.js'],
          tpl: '<script data-main="%s" src="js/lib/require.min.js"></script>'
        }
      })
    )
    .pipe(useref())
    .pipe(gulpif('*.css', cssmin()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function () {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('src/images/*')
    .pipe(gulp.dest('./dist/images'));
  gulp.src(['src/js/lib/require.min.js'])
    .pipe(gulp.dest('./dist/js/lib'));
});

gulp.task('connect-build', function () {
  connect.server({
    root: './dist',
    port: 8080,
    livereload: false
  });
});

gulp.task('connect-dev', function () {
  connect.server({
    root: './src',
    port: 8888,
    livereload: true
  });
});

gulp.task('watch', function () {
  watch([
    './src/*.html',
    './src/css/**/*.css',
    './src/js/**/*.js',
    './src/templates/*.html'
  ]).pipe(connect.reload());
});

gulp.task('build', ['lint', 'clean:dist', 'html-styles', 'scripts', 'copy', 'connect-build']);
gulp.task('dev', ['connect-dev', 'watch']);
gulp.task('test', ['karma-server']);
gulp.task('default', ['build']);
