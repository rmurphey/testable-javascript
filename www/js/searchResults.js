define([
  'jquery',
  'util',
  'underscore',
  'rsvp'
], function( $, util, _, RSVP ) {
  var SearchResults = function( el ) {
    if ( !(this instanceof SearchResults)) {
      return new SearchResults( el );
    }

    this.el = $( el );
    this._bindEvents();
  };

  SearchResults.prototype.setResults = function( results ) {
    util.loadTemplate( 'people-detailed.tmpl' )
      .then( _.bind( this._populate, this, results ) );
  };

  SearchResults.prototype.pending = function() {
    this.el.html( '<li class="searching">Searching &hellip;</li>' );
  };

  SearchResults.prototype._bindEvents = function() {
    this.el.on( 'click', '.btn.like', _.bind( this._handleClick, this ) );
  };

  SearchResults.prototype._handleClick = function( evt ) {
    var name = $( evt.target ).closest( 'li.result' ).attr( 'data-name' );
    this.trigger( 'like', name );
  };

  SearchResults.prototype._populate = function( results, tmpl ) {
    var html = _.template( tmpl, { people: results } );
    this.el.html( html );
  };

  RSVP.EventTarget.mixin( SearchResults.prototype );

  return SearchResults;
});