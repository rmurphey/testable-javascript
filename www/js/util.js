// IMPLEMENTATION

define([ 'jquery', 'fixtures/templates' ], function( $, templates ) {
  return {
    loadTemplate: function( name ) {
      if ( templates[ name ] ) {
        var dfd = $.Deferred();
        dfd.resolve( templates[ name ]);
        return dfd.promise();
      }

      if ( !this._cache[ name ] ) {
        this._cache[ name ] = $.get( '/templates/' + name );
      }

      return this._cache[ name ];
    },

    _cache: {}
  };
});