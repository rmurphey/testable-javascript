define([ 'app/app' ], function() {
  suite('app model', function() {
    test('constructor', function() {
      assert( app.Model() );
      assert( new app.Model() );
    });

    test('attributes', function() {
      var m = new app.Model();

      assert.equal( m.get('key'), undefined );
      m.set( 'key', 'value' );
      assert.equal( m.get('key'), 'value' );
    });

    test('adding', function() {
      var m = new app.Model();
      m.set( 'key', [ 'value' ]);
      m.add( 'key', 'newValue' );

      assert.equal( m.get('key').length, 2, 'value is added');
      assert.equal( m.get('key')[1], 'newValue', 'value is pushed' );

      m.add( 'key2', 'value2' );
      assert.equal( m.get('key2')[0], 'value2', 'array is created if empty' );
    });

    test('change events', function() {
      var m = new app.Model();

      var changeSpy = sinon.spy();
      var keyChangeSpy = sinon.spy();

      m.on( 'change', function( data ) {
        assert.equal( data.key, 'key' );
        assert.equal( data.value, 'value' );
      });

      m.on( 'change:key', function( data ) {
        assert.equal( data.key, 'key' );
        assert.equal( data.value, 'value' );
      });

      m.set( 'key', 'value' );
    });
  });
});