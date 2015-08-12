// https://babeljs.io/docs/setup/#gulp
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var shell = require('gulp-shell');

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', ['build'], shell.task('esdoc -c esdoc.json'));

gulp.task('default', ['build', 'html']);
