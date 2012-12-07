(function() {
  var isTest = window.location.href.match('/test/');

  require.config({
    deps: [ isTest ? '../../test/config' : 'main' ],
    paths: {
      jquery: '../lib/jquery/jquery',
      underscore: '../lib/underscore/underscore',
      rsvp: '../lib/rsvp',
      templates: '../templates',

      tests: '../../test/tests',
      list_of_tests: '../../test/list_of_tests',
      fixtures: '../../test/fixtures',
    },
    shim: {
      underscore: {
        exports: '_'
      }
    }
  });
}());

