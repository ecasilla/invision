var gulp   = require('gulp'),
    mocha  = require('gulp-mocha'),
    config = require('../config');

gulp.task('test:runner',['runner'],function() {
 return gulp.src(config.spec.path, {read: false})
        .pipe(mocha(config.spec.options)); 
});

gulp.task('test:unit', function () {
    return gulp.src(config.spec.path, {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});
