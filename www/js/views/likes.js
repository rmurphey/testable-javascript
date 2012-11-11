var app = window.app = window.app || {};

app.Likes = (function() {
  var Likes = function( settings ) {
    this.$el = $( settings.el );
  };

  Likes.prototype.add = function( name ) {
    this.$el.find( '.no-results' ).remove();
    $( '<li>', { html : name } ).appendTo( this.$el );
  };

  return Likes;
}());
