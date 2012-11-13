var app = window.app = window.app || {};

app.SearchForm = (function() {
  var SearchForm = function( settings ) {
    if (! (this instanceof SearchForm) ) {
      return new SearchForm( settings );
    }

    this.$el = $( settings.el );
    this.app = settings.app;
    this._pending = false;

    this.$el.on( 'submit', $.proxy( this, 'handleSearch' ) );
    RSVP.EventTarget.mixin( this );
  };

  SearchForm.prototype.handleSearch = function( evt ) {
    evt.preventDefault();

    if ( this._pending ) {
      return;
    }

    this._pending = true;

    var term = $.trim( this.$el.find( 'input[name="q"]' ).val() );
    this.app.set( 'searchTerm', term );
  };

  SearchForm.prototype.release = function() {
    this._pending = false;
  };

  return SearchForm;
}());
