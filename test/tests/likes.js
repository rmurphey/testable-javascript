/*globals test:true, assert:true, suite:true, setup:true, teardown:true */
/*jshint newcap:false */

define([ 'likes', 'jquery' ], function( Likes, $ ) {
  suite( 'Likes', function() {
    var ul;

    setup(function(){
      ul = $('<ul><li class="no-results"></li></ul>');
    });

    test( 'constructor', function() {
      var l = Likes( ul );
      assert( l );
      assert( l instanceof Likes );
      assert.equal( ul.find('li.no-results').length, 1 );
    } );

    test( 'adding a name', function() {
      var l = new Likes( ul );
      l.add('Brendan Eich');

      assert.equal( ul.find('li').length, 1 );
      assert.equal( ul.find('li').first().html(), 'Brendan Eich' );
    });

  });
});