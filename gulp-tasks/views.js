(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      var fs = require('fs');

      return gulp.src([config.srcPath + '/**/*.pug', '!' + config.srcPath + '/**/_*.pug'])
        .pipe(plugins.changed(config.buildPath, { extension: '.html' }))
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(plugins.pug({
          basedir: config.srcPath,
          pretty: true,
          locals: {
            buildPath: ''
          }
        }))
        .pipe(gulp.dest(config.buildPath))
      ;
    };
  };
})();
