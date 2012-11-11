var app = window.app = window.app || {};

app.SearchForm = (function() {
  var SearchForm = function( settings ) {
    this.$el = $( settings.el );
    this.app = settings.app;

    this.$el.on( 'submit', $.proxy( this, 'handleSearch' ) );
    RSVP.EventTarget.mixin( this );
  };

  SearchForm.prototype.handleSearch = function( evt ) {
    evt.preventDefault();
    var term = $.trim( this.$el.find( 'input[name="q"]' ).val() );
    this.app.set( 'searchTerm', term );
  };

  return SearchForm;
}());
