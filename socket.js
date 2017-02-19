var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  var isQuizzing = false;

  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });

    socket.on('quiz', (quiz) => {isQuizzing = true;});
    if(isQuizzing == true){
      var totalNodes = db.nodeCount();//use JEffrey database to see how many nodes in user set
      while(isQuizzing){
        if(totalNodes == 0){
          isQuizzing = false;
        }
        var nextQuestion = false;
        var isCorrect = false;
        var list, data;
        db.getAllNodes(function(param){
          list = param;
        });

        for(var i = 0; i < totalNodes; i++){
          if(list[i].id == totalNodes){
            data = [list[i].name, db.];
          }
        }

      socket.emit('data', data);

        while(!nextQuestion){
        socket.on('answer', (answer) => {
          if(answer == /* SOME CORRECT ANSWER 1,2,3,4*/){
            isCorrect = true;
          }
        });
        if(isCorrect){
            socket.emit('nextQ', true);
            nextQuestion = true;
        }else{
           socket.emit('nextQ', false);
        }
      }
      totalNodes--;
    }
  }

    socket.on('answer', (ans) => {
      console.log(ans);
    });
  });
  var obj = {};
  return obj;
};
