console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      koala_name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_for_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
  $('#viewKoalas').on('click', '.deleteBtn', function(){
    var koalaId = $(this).data('koalaid');
    console.log($(this));
    deleteKoalas(koalaId);
  });
  $('#viewKoalas').on('click', '.transferBtn', function(){
    var koalaId = $(this).data('koalaid');
    console.log($(this));
    transferKoala(koalaId);
  });
}); // end doc ready

function getKoalas(){
  $('#viewKoalas').empty();
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( response ){
      console.log( 'got some koalas: ', response );
      if(koalaId)
      appendToDom(response.koalas);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( response ){
      console.log('got some koalas: ', response );
      getKoalas();
    } // end success
  }); //end ajax
}

  function deleteKoalas(koalaId){
    console.log( 'in deleteKoalas' );
    // ajax call to server to get koalas
    $.ajax({
      url: '/koalas/' + koalaId,
      type: 'DELETE',
      success: function(response){
        console.log(response);
        getKoalas();
      } // end success
    }); //end ajax
    // display on DOM with buttons that allow edit of each
  } // end getKoalas

  function transferKoala(koalaId){
    console.log( 'in transferKoala', koalaId );
    // ajax call to server to get koalas
    $.ajax({
      url: '/koalas',
      type: 'PUT',
      data: koalaId,
      success: function( response ){
        console.log('transfer some koalas: ', response );
        getKoalas();
      } // end success
    }); //end ajax
  }


function appendToDom(koalas){
  for (var i = 0; i < koalas.length; i++) {
    var koala = koalas[i];
    $('#viewKoalas').append('<tr><td>'+ koala.koala_name+ '</td>'+
                            '<td>'+ koala.gender + '</td>' +
                            '<td>'+ koala.age + '</td>' +
                            '<td>'+ koala.ready_for_transfer + '</td>' +
                            '<td>'+ koala.notes + '</td>' +
                            '<td><button class="deleteBtn" data-koalaid="' + koala.id + '">Delete</button>' +
                            '<td><button class="transferBtn" data-koalaid="' + koala.id + '">Ready for Transfer</button>' + '</tr>');
  }
  
}
