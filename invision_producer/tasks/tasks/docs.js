var gulp = require( ‘gulp‘ );
var shell = require( ‘gulp-shell‘ );

gulp.task( ‘js-doc‘, shell.task( [
  ‘./node_modules/jsdoc/jsdoc .‘
] ) );
