'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ DEBUG: false, pattern: '*' });

var srcPath = 'src';
var buildPath = 'dist';
var buildCssPath = buildPath + '/css';
var tasksPath = './gulp-tasks';

var supportedBrowsers =
  ['last 10 Chrome versions',
   'last 10 Firefox versions',
   'Safari >= 9',
   'ie >= 9',
   'Edge >= 1',
   'iOS >= 8',
   'Android >= 4.4'];

var config = {
  srcPath: srcPath,
  buildPath: buildPath,
  buildCssPath: buildCssPath,
  supportedBrowsers: supportedBrowsers
};

function getTask(task) {
  return require(tasksPath + '/' + task)(gulp, plugins, config);
}

gulp.task('default', getTask('default'));
gulp.task('build', getTask('build'));
gulp.task('copy', getTask('copy'));
gulp.task('server', getTask('server'));
gulp.task('sitemap', getTask('sitemap'));
gulp.task('styles', getTask('styles'));
gulp.task('uglify', getTask('uglify'));
gulp.task('views', getTask('views'));
gulp.task('watch', getTask('watch'));
