(function () {
  'use strict';

  module.exports = function (gulp, plugins, config) {
    return function (done) {
      return plugins.runSequence('uglify', 'copy', ['styles', 'views'], 'sitemap', done);
    };
  };
})();
