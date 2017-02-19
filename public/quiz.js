var socket = io();

socket.emit('quiz', true);
socket.on('data', (data) => {
  console.log(data);
  document.getElementById('label1').innerHTML = data[0][0] + ' is related to ' + data[0][1] + ' because ' + data[0][2];
  document.getElementById('label2').innerHTML = data[1][0] + ' is related to ' + data[1][1] + ' because ' + data[1][2];
  document.getElementById('label3').innerHTML = data[2][0] + ' is related to ' + data[2][1] + ' because ' + data[2][2];
  document.getElementById('label4').innerHTML = data[3][0] + ' is related to ' + data[3][1] + ' because ' + data[3][2];
});

$('.button').click(function(){
  var isCorrect = false;
  socket.emit('answer', $('input:radio[name=quiz]:checked').val());
  socket.on('nextQ', (bool) => {
    isCorrect = bool;
  });
  if(isCorrect){
  document.getElementById('correctness').innerHTML = 'True';
  }else {
  document.getElementById('correctness').innerHTML = 'False';
}
});
