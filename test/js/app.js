/*global
  test:true,
  module:true,
  ok:true,
  equal:true,
  sinon:true,
  stop:true,
  start:true
*/

module( 'model' );

test('attribute setting/getting', function() {
  var m = new app.Model();

  equal( m.get('key'), undefined );
  m.set( 'key', 'value' );
  equal( m.get('key'), 'value' );
});

test('adding', function() {
  var m = new app.Model();
  m.set( 'key', [ 'value' ]);
  m.add( 'key', 'newValue' );

  equal( m.get('key').length, 2, 'value is added');
  equal( m.get('key')[1], 'newValue', 'value is pushed' );

  m.add( 'key2', 'value2' );
  equal( m.get('key2')[0], 'value2', 'array is created if empty' );
});

test('change events', function() {
  var m = new app.Model();

  var changeSpy = sinon.spy();
  var keyChangeSpy = sinon.spy();

  m.on( 'change', function( data ) {
    equal( data.key, 'key' );
    equal( data.value, 'value' );
  });

  m.on( 'change:key', function( data ) {
    equal( data.key, 'key' );
    equal( data.value, 'value' );
  });

  m.set( 'key', 'value' );
});