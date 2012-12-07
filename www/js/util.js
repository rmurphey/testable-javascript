define([ 'jquery' ], function( $ ) {
  var tmplCache = {};

  return {
    loadTemplate: function( name ) {
      if ( !tmplCache[ name ] ) {
        tmplCache[ name ] = $.get( '/templates/' + name );
      }
      return tmplCache[ name ];
    }
  }
});