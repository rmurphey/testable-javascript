/*global
  test:true,
  module:true,
  ok:true,
  equal:true,
  sinon:true,
  stop:true,
  start:true
*/

module( 'likes' );

test('likes are properly displayed', function() {
  var likes = new app.Likes({ el : '#liked' });

  likes.add( 'Brendan Eich' );

  ok( $( '#liked' ).html().match( 'Brendan Eich' ), 'Like is added' );
});

test('no results message', function() {
  var likes = new app.Likes({ el : '#liked' });
  equal( $( '#liked .no-results' ).length, 1, 'Message shows initially' );

  likes.add( 'Remy Sharp' );

  equal( $( '#liked .no-results').length, 0, 'Message is removed' );
});