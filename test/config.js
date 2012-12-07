(function() {

// test mode -- 'tdd', 'bdd-should', or 'bdd-expect'
var mode = 'tdd';

if ( mode === 'tdd' ) {
  window.assert = chai.assert;
}

if ( mode === 'bdd-should' ) {
  window.should = chai.should();
}

if ( mode === 'bdd-expect' ) {
  window.expect = chai.expect;
}

mocha.setup({
  ui: mode.split('-')[0],
  globals: [ 'XMLHttpRequest' ]
});

require( [ 'list_of_tests' ], function( lot ) {
  require( lot, function() {
    mocha.run();
  });
});

}());