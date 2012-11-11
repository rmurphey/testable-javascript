var app = window.app = window.app || {};

app.Model = (function() {
  var Model = function() {
    this._attributes = {};
    RSVP.EventTarget.mixin( this );
  };

  Model.prototype.set = function( k, v ) {
    var old = this._attributes[ k ];
    var changeData = { key : k, value : v };
    this._attributes[ k ] = v;
    this.trigger( 'change', changeData );
    this.trigger( 'change:' + k, changeData );
  };

  Model.prototype.add = function( k, v ) {
    var old = this.get( k ) || [];
    old.push( v );
    this.set( k, old );
  };

  Model.prototype.get = function( k ) {
    return this._attributes[ k ];
  };

  return Model;
}());