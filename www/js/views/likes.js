var app = window.app = window.app || {};

app.Views.Likes = (function() {
  var Likes = function( settings ) {
    this.$el = $( settings.el );
  };

  Likes.prototype.add = function( name ) {
    this.$el.find( '.no-results' ).remove();
    $( '<li>', { html : name } ).appendTo( this.$el );
  };

  return Likes;
}());

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

var app = window.app = window.app || {};

app.Views.SearchResults = (function() {

  var SearchResults = function( settings ) {
    this.app = settings.app;
    this.$el = $( settings.el );

    this.$el.on( 'click', '.like', $.proxy( this, '_handleLike' ) );

    RSVP.EventTarget.mixin(this);
  };

  SearchResults.prototype.set = function( people ) {
    var $el = this.$el;
    $el.empty();

    return app.loadTemplate( 'people-detailed.tmpl' ).done(function( t ) {
      var html = t( { people : people } );
      $el.html( html );
    });
  };

  SearchResults.prototype._handleLike = function( evt ) {
    evt.preventDefault();
    var name = this._getName( evt.currentTarget );
    this.app.add( 'liked', name );
  };

  SearchResults.prototype._getName = function( el ) {
    return $( el ).closest( 'li' ).attr( 'data-name' );
  };

  return SearchResults;

}());