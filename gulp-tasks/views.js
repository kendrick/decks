(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      var fs = require('fs');
      var path = require('path');
      var data = require('gulp-data');
      var pug = require('pug');

      return gulp.src([config.srcPath + '/**/*.pug', '!' + config.srcPath + '/**/_*.pug'])
        // .pipe(plugins.changed(config.buildPath, { extension: '.html' }))
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(data(function (file) {
          var fileDir = path.dirname(file.path);
          var relPath = path.relative(config.srcPath, fileDir);
          var slides;

          if (relPath) {
            slides = fs.readdirSync(config.srcPath + '/' + relPath);
          }

          return {
            slides: slides,
            absPath: fileDir
          }
        }))
        .pipe(data(function (file) {
          var absPath = file.data.absPath;
          var html = '';

          if (file.data.slides) {
            var len = file.data.slides.length;
            for (var i = 0; i < len; i++) {
              if (file.data.slides[i] !== 'index.pug') {
                html += pug.renderFile(absPath + '/' + file.data.slides[i], { pretty: true });
              }
            }
          }

          return {
            renderedSlides: html
          };
        }))
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
