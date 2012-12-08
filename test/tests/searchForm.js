/*globals test:true, assert:true, suite:true, setup:true, teardown:true */
/*jshint newcap:false */

define([
  'searchForm',
  'jquery',
  'jquery.simulate'
], function( SearchForm, $ ) {
  suite( 'SearchForm', function() {
    var formElement;

    setup(function(){
      formElement = $('<form><input name="q"><input type="submit"></form>');
    });

    teardown(function(){

    });

    test( 'constructor', function() {
      var sf = SearchForm( formElement );
      assert( sf );
    });

    test( 'search event is triggered with query', function() {
      var sf = SearchForm( formElement );
      var spy = sinon.spy();

      sf.on( 'search', spy );

      formElement.find( 'input[name="q"]' ).val( 'cat' );
      formElement.trigger( 'submit' );

      assert.equal( spy.args[0][0].detail, 'cat' );
    });

    test( 'no search event with empty query', function() {
      var sf = SearchForm( formElement );
      var spy = sinon.spy();

      sf.on( 'search', spy );

      formElement.find( 'input[name="q"]' ).val( '   ' );
      formElement.trigger( 'submit' );

      assert( !spy.called );
    });

  });
});