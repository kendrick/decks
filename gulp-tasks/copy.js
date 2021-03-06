(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      var parent = '';

      gulp.src([config.srcPath + '/**/media/**/*'], { base: config.srcPath + '/decks' })
        .pipe(gulp.dest(config.buildPath))
      ;

      gulp.src([config.srcPath + '/lib/**/*'])
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(gulp.dest(config.buildPath + '/lib'))
      ;

      gulp.src([config.srcPath + '/plugin/**/*.html', config.srcPath + '/plugin/**/*.js'])
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(gulp.dest(config.buildPath + '/plugin'))
      ;
    };
  };
})();
