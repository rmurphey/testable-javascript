define([ 'app/views/likes' ], function() {
  suite('likes view', function() {
    var likesEl;

    beforeEach(function() {
      likesEl = $('<ul id="likes"><li class="no-results">No results</li></ul>').appendTo('body');
    });

    afterEach(function() {
      likesEl.remove();
    });

    test('likes are properly displayed', function() {
      var likes = new app.Likes({ el : '#likes' });

      likes.add( 'Brendan Eich' );

      assert( $( '#likes' ).html().match( 'Brendan Eich' ), 'Like is added' );
    });

    test('no results message', function() {
      var likes = new app.Likes({ el : '#likes' });
      assert.equal( $( '#likes .no-results' ).length, 1, 'Message shows initially' );

      likes.add( 'Remy Sharp' );

      assert.equal( $( '#likes .no-results').length, 0, 'Message is removed' );
    });
  });

})