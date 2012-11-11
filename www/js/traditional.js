$(function() {

  var resultsList = $( '#results' );
  var liked = $( '#liked' );
  var pending = false;

  $( '#searchForm' ).on( 'submit', function( e ) {
    e.preventDefault();

    if ( pending ) { return; }

    var form = $( this );
    var query = $.trim( form.find( 'input[name="q"]' ).val() );

    if ( !query ) { return; }

    pending = true;

    $.ajax( '/data/search.json', {
      data : { q: query },
      dataType : 'json',
      success : function( data ) {
        var tmpl = _.template( $('#tmpl-people-detailed').text() );
        resultsList.html( tmpl({ people : data.results }) );
        pending = false;
      }
    });

    $('<li>', {
      'class' : 'pending',
      html : 'Searching &hellip;'
    }).appendTo( resultsList.empty() );
  });

  resultsList.on( 'click', '.like', function(e) {
    e.preventDefault();
    var name = $( this ).closest( 'li' ).find( 'h2' ).text();
    liked.find( '.no-results' ).remove();
    $( '<li>', { text: name } ).appendTo( liked );
  });

});
