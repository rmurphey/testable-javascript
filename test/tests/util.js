define([ 'util' ], function( util ) {
  suite( 'util', function() {
    suite( 'loadTemplate', function() {
      var xhr, requests;

      setup(function() {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function( req ) {
          requests.push( req );
        };
      });

      teardown(function() {
        xhr.restore();
      });

      test( 'returns a promise', function() {
        assert( util.loadTemplate('foo.tmpl').then );
      });

      test( 'requests from proper location', function() {
        util.loadTemplate( 'bar.tmpl' );
        assert( requests[0].url, '/templates/bar.tmpl' );
      });

      test( 'passes response through', function( done ) {
        var req = util.loadTemplate( 'baz.tmpl' );

        req.then(function(t) {
          assert.equal( t, 'Fake template' );
          done();
        });

        requests[0].respond(
          200,
          { 'Content-type': 'text/html' },
          'Fake template'
        );
      });
    });
  });
});