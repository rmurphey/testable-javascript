/*global
  test:true,
  module:true,
  ok:true,
  equal:true,
  sinon:true,
  stop:true,
  start:true
*/

var data = [{"name":"Liliane Brekke","username":"Aliza_Dickens","email":"Weldon@caterina.us","address":{"street":"Kuphal Rapid","suite":"Apt. 643","city":"West Vladimirbury","zipcode":"26036-2264"},"phone":"458.929.4171 x3458","website":"yazmin.us","company":{"name":"Lemke,Hauck and Dooley","catchPhrase":"Reactive radical structure","bs":"maximize strategic interfaces"}},{"name":"Earline Beier","username":"Darien","email":"Callie.Wolff@cathy.uk","address":{"street":"Cruickshank Spurs","suite":"Suite 707","city":"South Julesstad","zipcode":"11458-7246"},"phone":"238.418.1938 x42594","website":"louvenia.biz","company":{"name":"Halvorson,Berge and Kunde","catchPhrase":"Stand-alone disintermediate artificial intelligence","bs":"transform efficient initiatives"}},{"name":"Abbey Hickle","username":"Landen","email":"Cathrine@nikita.us","address":{"street":"Schroeder Station","suite":"Apt. 655","city":"New Norval","zipcode":"52146"},"phone":"466-318-8183 x5178","website":"dolly.co.uk","company":{"name":"Trantow,Ruecker and Labadie","catchPhrase":"Profound fresh-thinking algorithm","bs":"matrix e-business relationships"}},{"name":"Lurline Pacocha","username":"William.Hand","email":"Catherine.Rogahn@newell.name","address":{"street":"Graham Park","suite":"Apt. 441","city":"Destineyfort","zipcode":"52733"},"phone":"1-152-716-0211 x3988","website":"gardner.us","company":{"name":"Upton-Stanton","catchPhrase":"Right-sized dedicated hardware","bs":"deploy cutting-edge communities"}},{"name":"Catalina Rodriguez","username":"Cristobal","email":"Sofia_Schmitt@eric.us","address":{"street":"Murphy Underpass","suite":"Apt. 181","city":"Lacyfurt","zipcode":"99989-1000"},"phone":"1-163-955-7957 x009","website":"aida.info","company":{"name":"Eichmann-Hammes","catchPhrase":"Stand-alone high-level product","bs":"engineer revolutionary synergies"}}];

app.loadTemplate = function(name) {
  var dfd = new $.Deferred();
  dfd.resolve( _.template( window._templateMocks[ name ] ) );
  return dfd.promise();
};

var appModel = {
  set : sinon.spy(),
  get : sinon.spy()
};

module('search results');

test('results are displayed', function() {
  var results = new app.SearchResults({
    el : '#results'
  });

  stop();

  results.set( data ).done(function() {
    equal( $( '#results li' ).length, data.length, 'All results are shown' );
    ok( ! $( '#results li.no-results' ).length, 'No results message is removed' );
    start();
  });
});

test('individual result is correct', function() {
  var results = new app.SearchResults({
    el : '#results',
    app : appModel
  });

  var person = data[ 0 ];

  stop();

  results.set( data ).done(function() {
    var result = $( '#results li' ).first();

    equal( result.find( 'h2' ).html(), person.name, 'Name is displayed' );
    ok( result.find( '.btn.like' ).length, 'Like button is displayed' );
    ok( result.html().match( person.company.name ), 'Company name is displayed' );
    ok( result.html().match( person.email ), 'Email is displayed' );
    start();
  });
});

test('no results', function() {
  var results = new app.SearchResults({
    el : '#results',
    app : appModel
  });

  stop();

  results.set( [] ).done(function() {
    ok( $( '#results' ).html().match( 'No results found' ), 'No results message' );
    start();
  });
});

test('get name', function() {
  var results = new app.SearchResults({
    el : '#results',
    app : appModel
  });

  results.set( [ data[0] ] ).done(function() {
    var name = results._getName( $('#results a.like').first() );
    equal( name, data[0].name );
  });
});