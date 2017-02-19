var socket = io();

socket.emit('imhere', 5);

socket.on('responsefromscaredserver', (theirresponse) => {

});

$('form').submit(function(){
    socket.emit('chat message', $('#').val());
    $('#m').val('');
    return false;
});

$('.button').click(function(){
  document.getElementById('label4').innerHTML = 'hello';
});
