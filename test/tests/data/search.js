define([ 'app/data/search' ], function() {
  suite('search data', function() {
    var xhr, requests;

    setup(function() {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function( req ) { requests.push(req); };
    });

    teardown(function() {
      xhr.restore();
    });

    test('search data is fetched from the right URL', function() {
      var search = new app.Search();
      var result = search.fetch('cat');

      assert.equal( requests[0].url, '/data/search.json?q=cat' );
    });

    test('fetch returns a promise', function() {
      var search = new app.Search();
      var result = search.fetch('cat');

      assert( result.then, 'result is a promise' );
    });

    test('promise resolves with array of data', function() {
      var search = new app.Search();
      var result = search.fetch('cat');

      requests[0].respond(
        200,
        { "Content-type" : "text/json" },
        JSON.stringify( { results : [ 'cat' ] } )
      );

      result.done(function( data ) {
        assert.equal( data[0], 'cat' );
      });
    });
  });
});