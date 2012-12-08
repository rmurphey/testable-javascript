define([
  'jquery',
  'searchForm',
  'searchResults',
  'likes',
  'data'
], function( $, SearchForm, SearchResults, Likes, SearchData ) {
  $(function() {

    var pending = false;

    var searchForm = new SearchForm( $('#searchForm') );
    var searchResults = new SearchResults( $('#results') );
    var likes = new Likes( $('#liked') );
    var searchData = new SearchData();

    searchForm.on( 'search', function( event ) {
      if ( pending ) { return; }

      var query = event.detail;
      pending = true;

      searchData.fetch( query ).then(function( results ) {
        searchResults.setResults( results );
        pending = false;
      });

      searchResults.pending();
    });

    searchResults.on( 'like', function( evt ) {
      var name = evt.detail;
      likes.add( name );
    });

  });

});