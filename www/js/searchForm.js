define([
  'jquery',
  'rsvp',
  'underscore'
], function( $, RSVP, _ ) {
  var SearchForm = function( form ) {
    if ( !(this instanceof SearchForm) ) {
      return new SearchForm( form );
    }

    this.$el = $( form );
    this.$el.on( 'submit', _.bind( this._handleSubmit, this ) );
  };

  SearchForm.prototype._handleSubmit = function( evt ) {
    evt.preventDefault();

    var query = $.trim( this.$el.find('[name="q"]').val() );
    if ( !query ) { return; }

    this.trigger( 'search', query );
  };

  RSVP.EventTarget.mixin( SearchForm.prototype );

  return SearchForm;
});