define([ 'searchForm' ], function( SearchForm ) {
  suite( 'SearchForm', function() {
    var form;

    setup(function() {
      form = $('<form><input name="q"><button>submit</button></form>');
      $('#test').empty().append( form );
    });

    test( 'constructor', function(done) {
      var sf = new SearchForm( form );
      assert( sf );
    });
  });
});