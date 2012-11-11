var app = window.app = window.app || {};

app.Search = (function() {
  var Search = function() {};

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