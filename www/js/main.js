$(function() {
  var appModel = new app.Model();

  var searchForm = new app.SearchForm({
    el : '#searchForm',
    app : appModel
  });

  var likes = new app.Likes( { el : '#liked' } );

  var results = new app.SearchResults({
    el : '#results',
    app : appModel
  });

  var data = new app.Search();

  appModel.on( 'change:searchTerm', function( evt ) {
    data.fetch( evt.value ).done(function( resp ) {
      results.set( resp );
    });
  });

  appModel.on( 'change:liked', function( evt ) {
    likes.add( _.last( evt.value ) );
  });
});