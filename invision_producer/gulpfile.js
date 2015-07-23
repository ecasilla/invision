/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/
var require_dir = require('require-dir'),
    gulp        = require('gulp'),
    clean       = require('gulp-rimraf'),
    config      = require('./tasks/config')

require_dir('./tasks/tasks',{recurse:true});

// CLEAN
gulp.task('clean', function () {
  return gulp.src([config.build.path], { read: false })
    .pipe(clean());
});
