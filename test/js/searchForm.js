/*global
  test:true,
  module:true,
  ok:true,
  equal:true,
  sinon:true,
  stop:true,
  start:true
*/

module( 'search form' );

test('search form sets search term on app model', function() {
  var appModel = {
    set : sinon.spy(),
    get : sinon.spy()
  };

  var searchForm = new app.SearchForm({
    el : '#searchForm',
    app : appModel
  });

  searchForm.$el.find( 'input[name="q"]' ).val( 'cat' );
  searchForm.$el.submit();

  ok( appModel.set.calledWith( 'searchTerm', 'cat' ) );
});