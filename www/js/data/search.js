var app = window.app = window.app || {};

app.Search = (function() {
  var Search = function() {
    if (! (this instanceof Search) ) {
      return new Search();
    }
  };

  var processResults = function( resp ) {
    return resp.results;
  };

  Search.prototype.fetch = function( query ) {
    return $.getJSON( '/data/search.json', {
      q : query
    }).pipe( processResults );
  };

  return Search;
}());