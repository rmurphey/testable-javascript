define([ 'app/views/searchResults', 'fixtures/templates' ], function() {
  var data = [{"name":"Liliane Brekke","username":"Aliza_Dickens","email":"Weldon@caterina.us","address":{"street":"Kuphal Rapid","suite":"Apt. 643","city":"West Vladimirbury","zipcode":"26036-2264"},"phone":"458.929.4171 x3458","website":"yazmin.us","company":{"name":"Lemke,Hauck and Dooley","catchPhrase":"Reactive radical structure","bs":"maximize strategic interfaces"}},{"name":"Earline Beier","username":"Darien","email":"Callie.Wolff@cathy.uk","address":{"street":"Cruickshank Spurs","suite":"Suite 707","city":"South Julesstad","zipcode":"11458-7246"},"phone":"238.418.1938 x42594","website":"louvenia.biz","company":{"name":"Halvorson,Berge and Kunde","catchPhrase":"Stand-alone disintermediate artificial intelligence","bs":"transform efficient initiatives"}},{"name":"Abbey Hickle","username":"Landen","email":"Cathrine@nikita.us","address":{"street":"Schroeder Station","suite":"Apt. 655","city":"New Norval","zipcode":"52146"},"phone":"466-318-8183 x5178","website":"dolly.co.uk","company":{"name":"Trantow,Ruecker and Labadie","catchPhrase":"Profound fresh-thinking algorithm","bs":"matrix e-business relationships"}},{"name":"Lurline Pacocha","username":"William.Hand","email":"Catherine.Rogahn@newell.name","address":{"street":"Graham Park","suite":"Apt. 441","city":"Destineyfort","zipcode":"52733"},"phone":"1-152-716-0211 x3988","website":"gardner.us","company":{"name":"Upton-Stanton","catchPhrase":"Right-sized dedicated hardware","bs":"deploy cutting-edge communities"}},{"name":"Catalina Rodriguez","username":"Cristobal","email":"Sofia_Schmitt@eric.us","address":{"street":"Murphy Underpass","suite":"Apt. 181","city":"Lacyfurt","zipcode":"99989-1000"},"phone":"1-163-955-7957 x009","website":"aida.info","company":{"name":"Eichmann-Hammes","catchPhrase":"Stand-alone high-level product","bs":"engineer revolutionary synergies"}}];

  var appModel;
  var resultsEl;
  var oldLoadTemplate = app.loadTemplate;

  suite('search results', function() {
    setup(function() {
      app.loadTemplate = function(name) {
        var dfd = new $.Deferred();
        dfd.resolve( _.template( window._templateMocks[ name ] ) );
        return dfd.promise();
      };

      appModel = {
        set : sinon.spy(),
        get : sinon.spy()
      };

      resultsEl = $('<ul id="results"/>').appendTo('body');
    });

    teardown(function() {
      resultsEl.remove();
      app.loadTemplate = oldLoadTemplate;
    });

    test('results are displayed', function( done ) {
      var results = new app.SearchResults({
        el : '#results'
      });

      results.set( data ).done(function() {
        assert.equal( $( '#results li' ).length, data.length, 'All results are shown' );
        assert( ! $( '#results li.no-results' ).length, 'No results message is removed' );
        done();
      });
    });

    test('individual result is correct', function() {
      var results = new app.SearchResults({
        el : '#results',
        app : appModel
      });

      var person = data[ 0 ];

      results.set( data ).done(function( done ) {
        var result = $( '#results li' ).first();

        assert.equal( result.find( 'h2' ).html(), person.name, 'Name is displayed' );
        assert( result.find( '.btn.like' ).length, 'Like button is displayed' );
        assert( result.html().match( person.company.name ), 'Company name is displayed' );
        assert( result.html().match( person.email ), 'Email is displayed' );
      });
    });

    test('no results', function( done ) {
      var results = new app.SearchResults({
        el : '#results',
        app : appModel
      });

      results.set( [] ).done(function() {
        assert( $( '#results' ).html().match( 'No results found' ), 'No results message' );
        done();
      });
    });

    test('get name', function() {
      var results = new app.SearchResults({
        el : '#results',
        app : appModel
      });

      results.set( [ data[0] ] ).done(function() {
        var name = results._getName( $('#results a.like').first() );
        assert.equal( name, data[0].name );
      });
    });

  });

});