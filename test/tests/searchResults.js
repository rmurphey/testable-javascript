/*globals test:true, assert:true, suite:true, setup:true, teardown:true */
/*jshint newcap:false */

define([
  'fixtures/searchData',
  'jquery',
  'searchResults'
], function( data, $, SearchResults ) {

    suite('SearchResults', function() {
      var ul;

      setup(function() {
        ul = $('<ul><li class="no-results"></li></ul>');
      });

      test( 'constructor', function() {
        var sr = SearchResults( ul );
        assert( sr );
        assert( sr instanceof SearchResults );
      });

      test( 'start with no results element', function() {
        var sr = SearchResults( ul );
        assert.equal( ul.find('.no-results').length, 1 );
      });

      test( 'display received results', function() {
        var sr = SearchResults( ul );
        sr.setResults( data );

        assert.equal( ul.find('.no-results').length, 0 );
        assert.equal( ul.find('li.result').length, data.length );
        assert.equal(
          ul.find('li.result').first().attr('data-name'),
          data[0].name
        );
      });

      test( 'set view to "searching" state', function() {
        var sr = SearchResults( ul );

        sr.setResults( data );
        sr.pending();

        assert.equal( ul.find('li').length, 1 );
        assert.equal( ul.find('li.searching').length, 1 );
      });

      test( 'announce likes', function() {
        var sr = SearchResults( ul );
        var spy = sinon.spy();

        sr.setResults( data );
        sr.on( 'like', spy );

        ul.find('li').first().find('.like.btn').click();

        assert( spy.called, 'event handler called' );
        assert.equal( spy.args[0][0].detail, data[0].name, 'event handler receives data' );
      });
    });

});