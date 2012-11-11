(function() {

// test mode -- 'tdd', 'bdd-should', or 'bdd-expect'
var mode = 'tdd';

// location of your app files relative to this file
var appDir = '../www/js';

// any vendor libraries or plugins you are using, and their
// location relative to this configuration file.
//
// for example:
//
//    var appLibs = {
//      backbone: '../demo-app/vendor/backbone-min',
//      underscore: '../demo-app/vendor/underscore-min',
//      jquery: '../demo-app/vendor/jquery'
//    };
var appLibs = {
  jquery: '../www/lib/jquery/jquery.min',
  rsvp: '../www/lib/rsvp',
  underscore: '../www/lib/underscore/underscore.min'
};

// if your vendor libraries have dependencies on other libraries,
// or if your vendor libraries provide a global variable, use this
// object to indicate them.
//
// for example:
//
//    var shim = {
//      backbone: {
//        deps: [ 'jquery', 'underscore' ],
//        exports: 'Backbone'
//      },
//      underscore: {
//        exports: '_'
//      }
//    };

var shim = {
  underscore: {
    exports: '_'
  }
};

// if mocha detects a global leak, and you're sure you
// need the variable as a global, you can add it to this array

var globals = [
  'XMLHttpRequest' // allows sinon to fake XHRs
];

// you shouldn't need to modify anything below here, and if you do
// modify anything below here, you should know what you're doing :)

if ( mode === 'tdd' ) {
  window.assert = chai.assert;
}

if ( mode === 'bdd-should' ) {
  window.should = chai.should();
}

if ( mode === 'bdd-expect' ) {
  window.expect = chai.expect;
}

mocha.setup( {
  ui: mode.split('-')[0],
  globals: [ 'XMLHttpRequest' ]
} );

var paths = {
  app: appDir
};

var appLibsArray = [];

for (var lib in appLibs) {
  appLibsArray.push( lib );
  paths[ lib ] = appLibs[ lib ];
}

require.config({
  paths: paths,
  shim: shim
});

var listOfLibs = [ 'list_of_tests' ];

for ( var lib in appLibs ) {
  listOfLibs.push( lib );
}

require( listOfLibs, function( lot ) {
  require( lot, function() {
    mocha.run();
  });
});

}());