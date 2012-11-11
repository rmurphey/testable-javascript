define([ 'app/util' ], function() {
  suite('utilities', function() {
    var xhr, requests;

    setup(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function( req ) { requests.push( req ); };
    });

    teardown(function() {
      xhr.restore && xhr.restore();
    });

    test('getTemplate', function(done) {
      var tmpl = app.loadTemplate( 'foo.html' );
      var req = requests[ 0 ];
      var fn;

      assert( tmpl.then, 'result is a promise' );
      assert.equal( req.url, '/templates/foo.html' );

      req.respond(
        200,
        { 'Content-type' : 'text/html' },
        'This is a template'
      );

      tmpl.done(function( t ) {
        assert.equal( t(), 'This is a template');
        done();
      });
    });
  });
});