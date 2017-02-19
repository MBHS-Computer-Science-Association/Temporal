var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });


      var totalNodes;
      db.getNodeCount((dat) => {
        totalNodes = dat;
      });

      var data = [["Russian Revolution","Vietnam War","both are wars"], ["Thy", "Trevor", "both are the same person"],["Renaissance","Scientific Revolution","both changed the world"],["Donald Trump", "Vladimir Putin", "both are working for Russia"]];

        console.log('about to emit');
        socket.emit('data', data);
        console.log('we tried to emit');

          var answ;
          var isCorrect = false;
        socket.on('answer', (answer) => {
          console.log(answer+ '');
          answ = answer;
        });
          if(answ == 1){
            isCorrect = true;
          }
        if(isCorrect){
            socket.emit('nextQ', true);
            nextQuestion = true;
        }else{
           socket.emit('nextQ', false);
        }

      totalNodes--;


    socket.on('graph', function(graph) {
      socket.emit('graph', graph);
      console.log('Sending graph.');
      console.log(graph);
    });

    socket.on('request_final_graph', function(callback) {
      db.getSigmaGraph(callback);
    });
  });
  var obj = {};
  return obj;
}
