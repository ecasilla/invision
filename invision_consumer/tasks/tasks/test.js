var gulp   = require('gulp'),
    mocha  = require('gulp-mocha'),
    config = require('../config');

gulp.task('test:unit', function () {
    return gulp.src(config.spec.path, {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

