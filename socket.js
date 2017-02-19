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
            //data = [list[i].name];
          }
        }
        data = [["Russian Revolution"],["Vietnam War"],["both are wars"], ["Thai", "Trevor", "both are the same person"],["Renaissance","Scientific Revolution","both changed the world"],["Donald Trump", "Vladimir Putin", "both are working for Russia"]];

      socket.emit('data', data);

        while(!nextQuestion){
        socket.on('answer', (answer) => {
          //TODO: change the answer checker
          if(answer == 1){
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
