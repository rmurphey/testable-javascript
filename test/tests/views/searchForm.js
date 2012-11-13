define([ 'app/views/searchForm' ], function() {
  suite('search form view', function() {
    var form;

    beforeEach(function() {
      form = $('<form id="searchForm"><input name="q"/></form>').appendTo('body');
    });

    afterEach(function() {
      form.remove();
    });

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

      assert( appModel.set.calledWith( 'searchTerm', 'cat' ) );
    });

    test('locking/releasing', function() {
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
      searchForm.$el.submit();

      assert.equal( appModel.set.callCount, 1 );

      searchForm.release();
      searchForm.$el.submit();
      assert.equal( appModel.set.callCount, 2 );
    });

  });


});