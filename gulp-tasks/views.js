(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      var fs = require('fs');
      var path = require('path');
      var pug = require('pug');

      var decksPath = config.srcPath + '/decks';

      return gulp.src([
          decksPath + '/**/*.pug',
          '!' + decksPath + '/**/_*.pug',
        ])
        // .pipe(plugins.changed(config.buildPath, { extension: '.html' }))
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(plugins.data(function (file) {
          var fileDir = path.dirname(file.path);
          var relPath = path.relative(decksPath, fileDir);
          var slides;

          if (relPath) {
            slides = fs.readdirSync(decksPath + '/' + relPath);
          }

          return {
            slides: slides,
            absPath: fileDir
          }
        }))
        .pipe(plugins.data(function (file) {
          var absPath = file.data.absPath;
          var html = '';

          if (file.data.slides) {
            var len = file.data.slides.length;
            for (var i = 0; i < len; i++) {
              if (file.data.slides[i] !== 'index.pug' && file.data.slides[i] !== 'media') {
                html += pug.renderFile(absPath + '/' + file.data.slides[i], { pretty: true });
              }
            }
          }

          return {
            renderedSlides: html
          };
        }))
        .pipe(plugins.pug({
          basedir: decksPath,
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
