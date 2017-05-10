(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      var source = gulp.src(config.srcPath + '/**/*.scss')
        .pipe(plugins.changed(config.buildPath, { extension: '.css' }))
        .pipe(plugins.plumber({ errorHandler: plugins.notify.onError('Error: <%= error.message %>') }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.postcss(
          [
            plugins.postcssFontMagician({
              'formats': 'local woff2 woff',
              'hosted': ['./src/lib/fonts/fira-code'],
              'variants': {
                'Work Sans': {
                  '300': [],
                  '400': [],
                  '600': [],
                  '900': []
                },
                'Fira Code': {
                  '300': [],
                  '400': [],
                  '500': [],
                  '700': []
                }
              }
            })
          ]
        ))
        .pipe(plugins.autoprefixer({
          browsers: config.supportedBrowsers
        }))
      ;

      var max = source.pipe(plugins.clone())
        .pipe(plugins.sourcemaps.write('.', { sourceRoot: null }))
        .pipe(gulp.dest(config.buildPath))
      ;

      var min = source.pipe(plugins.clone())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.postcss(
          [
            plugins.cssnano({ autoprefixer: { browsers: config.supportedBrowsers } })
          ]
        ))
        .pipe(plugins.sourcemaps.write('.', { sourceRoot: null }))
        .pipe(gulp.dest(config.buildPath))
        .pipe(plugins.browserSync.stream({ match: '**/*.css' }))
      ;

      return plugins.mergeStream(max, min);
    };
  };
})();
