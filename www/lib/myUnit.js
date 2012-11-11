window.test = function( msg, fn ) {
  var fail, el;

  try {
    fn();
  } catch( e ) {
    fail = true;
  }

  el = document.createElement( 'p' );
  el.innerHTML = ( fail ? 'FAIL: ' : 'PASS: ' ) + msg;
  el.className = fail ? 'fail' : 'pass';
  document.body.appendChild( el );
};

window.assert = function( val, msg ) {
  if ( !val ) {
    throw new Error( msg );
  }
};