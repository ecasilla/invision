var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    error   = require('../util/handleErrors'),
    config  = require('../config');

gulp.task('lint', function() {
  return gulp.src(config.lint.all)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .on('error',error);
});
