// IMPL
define([ 'jquery' ], function( $ ) {
  var SearchData = function( opts ) {
    if ( !(this instanceof SearchData) ) {
      return new SearchData( opts );
    }
  };

  SearchData.prototype.fetch = function( query ) {
    if ( !query ) {
      var dfd = $.Deferred();
      dfd.resolve( [] );
      return dfd.promise();
    }

    return $.ajax( '/data/search.json', {
      data : { q: query },
      dataType : 'json'
    }).pipe(function( resp ) {
      return resp.results;
    });
  };

  return SearchData;
});