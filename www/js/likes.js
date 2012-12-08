define([ 'jquery' ], function( $ ) {
  var Likes = function( el ) {
    if ( !(this instanceof Likes)) {
      return new Likes( el );
    }

    this.el = $( el );
  };

  Likes.prototype.add = function( name ) {
    this.el.find('.no-results').remove();
    $( '<li>', { text: name } ).appendTo( this.el );
  };

  return Likes;
});