/*globals test:true, assert:true, suite:true, setup:true, teardown:true */
/*jshint newcap:false */

define([ 'util' ], function( util ) {
  suite( 'util', function() {
    suite( 'loadTemplate', function() {
      var xhr, requests;

      setup(function() {
        requests = [];
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function( req ) {
          requests.push( req );
        };
        util._cache = {};
      });

      teardown(function() {
        xhr.restore();
      });

      test( 'first request hits the correct url', function() {
        util.loadTemplate( 'foo.tmpl' );
        assert.equal( requests.length, 1, 'there was a request' );
        assert.equal( requests[0].url, '/templates/foo.tmpl', 'request was to the right url' );
      });

      test( 'caching', function() {
        util.loadTemplate( 'foo.tmpl' );
        util.loadTemplate( 'foo.tmpl' );
        assert.equal( requests.length, 1, 'only one request' );
      });

      test( 'return value is a promise', function() {
        var req = util.loadTemplate( 'foo.tmpl' );
        assert.isFunction( req.then, 'return has then method' );
      });

      test( 'server response is passed through', function() {
        var req = util.loadTemplate( 'foo.tmpl' );
        var xhr = requests[0];
        var spy = sinon.spy();

        xhr.respond( 200, { 'Content-type': 'text/html'}, 'fake response');

        req.then( spy );

        assert( spy.called );
        assert.equal( spy.args[0][0], 'fake response' );
      });
    });
  });
});