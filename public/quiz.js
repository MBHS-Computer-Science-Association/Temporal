var socket = io();

socket.on('data', (data) => {
  document.getElementById('label1').innerHTML = data[0][0] + ' is related to ' + data[0][1] + ' because ' data[0][2];
  document.getElementById('label1').innerHTML = data[1][0] + ' is related to ' + data[1][1] + ' because ' data[1][2];
  document.getElementById('label1').innerHTML = data[2][0] + ' is related to ' + data[2][1] + ' because ' data[2][2];
  document.getElementById('label1').innerHTML = data[3][0] + ' is related to ' + data[3][1] + ' because ' data[3][2];
});

$('.button').click(function(){
  socket.on('answer', (answer) => {
    socket.emit('answer', $('input:radio[name=abc]:checked').val());
  });
});
