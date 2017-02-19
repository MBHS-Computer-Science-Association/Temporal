var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  var isQuizzing = false;

  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });

    if(socket.on('quiz', (quiz) => {return isQuizzing = true;} == true){
      var totalNodes = ;//use JEffrey database to see how many nodes in user set
      var nextQuestion = false;
      var isCorrect = false;
      var data;
      while(isQuizzing){

      //TODO: do some array handling with the database
      db.getAnswer()....
      socket.emit('data', data);

        while(!nextQuestion){
        isCorrect = socket.on('answer', (answer) => {
          if(answer == /* SOME CORRECT ANSWER */){
            return true;
          }
        });
        if(isCorrect){
            socket.emit('nextQ', true);
            nextQuestion = true;
        }else{
           socket.emit('nextQ', false);
        }
      }

    }
  }

    socket.on('answer', (ans) => {
      console.log(ans);
    });
  });
  var obj = {};
  return obj;
};
