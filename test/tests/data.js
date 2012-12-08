/*globals test:true, assert:true, suite:true, setup:true, teardown:true */
/*jshint newcap:false */
define([ 'data' ], function( SearchData ) {
  suite( 'SearchData', function() {
    test( 'constructor', function() {
      var sd = SearchData();
      assert( sd );
      assert( sd instanceof SearchData );
    });

    suite( 'fetch', function() {
      var xhr, requests;

      setup(function() {
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function( req ) {
          requests.push( req );
        };
      });

      teardown(function() {
        xhr.restore();
      });

      test( 'fetches from correct URL', function() {
        var sd = SearchData();
        sd.fetch( 'cat' );

        assert.equal( requests[0].url, '/data/search.json?q=cat' );
      });

      test( 'returns a promise', function() {
        var sd = SearchData();
        var req = sd.fetch( 'cat' );

        assert.isFunction( req.then );
      });

      test( 'no request if no query', function() {
        var sd = SearchData();
        var req = sd.fetch();
        assert.equal( requests.length, 0 );
      });

      test( 'return a promise even if no query', function() {
        var sd = SearchData();
        var req = sd.fetch();

        assert.isFunction( req.then );
      });

      test( 'no query promise that resolves with empty array', function() {
        var sd = SearchData();
        var req = sd.fetch();
        var spy = sinon.spy();

        req.then( spy );

        assert.deepEqual( spy.args[0][0], [] );
      });

      test( 'returns contents of results property of the response', function() {
        var sd = SearchData();
        var req = sd.fetch( 'cat' );
        var spy = sinon.spy();

        requests[0].respond(
          200, { 'Content-type': 'text/json' },
          JSON.stringify({ results: [ 1, 2, 3 ] })
        );

        req.then( spy );

        assert.deepEqual( spy.args[0][0], [ 1, 2, 3 ] );
      });
    });
  });
});