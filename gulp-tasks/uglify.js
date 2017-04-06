(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      return gulp.src(
        [
          config.srcPath + '/**/*.js',
          '!' + config.srcPath + '/**/*.min.js',
          '!' + config.srcPath + '/plugin',
          '!' + config.srcPath + '/lib',
        ])
        .pipe(plugins.changed(config.buildPath))
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.', { sourceRoot: '.' }))
        .pipe(gulp.dest(config.buildPath))
      ;
    };
  };
})();
