(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function () {
      plugins.browserSync.init({
        reloadThrottle: 3000,
        server: {
          injectChanges: true,
          baseDir: config.buildPath
        }
      });
    };
  };
})();
