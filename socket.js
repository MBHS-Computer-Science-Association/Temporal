var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  var isQuizzing = false;

  io.on('connection', (socket) => {
    console.log("User connected.");
  });

    io.on('disconnect', () => {
      console.log("User disconnected.");
    });

  io.on('quiz', (quiz) => {isQuizzing = true;});
    if(isQuizzing == true){
      var totalNodes;
      db.getNodeCount((dat) => {
        totalNodes = dat;
      });

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
        var related;
        for(var i = 0; i < totalNodes; i++){
          if(list[i].id == totalNodes){
            rdb.getRelatedNodes(i, (info)=>{
              related = info;
            });//RANDOMIZE WHICH RELATE
            data = [[list[i].name],[related[0]],[]];
        }
      }
        data = [["Russian Revolution"],["Vietnam War"],["both are wars"], ["Thai", "Trevor", "both are the same person"],["Renaissance","Scientific Revolution","both changed the world"],["Donald Trump", "Vladimir Putin", "both are working for Russia"]];
        console.log(data);
      io.emit('data', data);

        while(!nextQuestion){
        io.on('answer', (answer) => {
          //TODO: change the answer checker
          console.log(answer+ '');
          if(answer == 1){
            isCorrect = true;
          }
        });
        if(isCorrect){
            io.emit('nextQ', true);
            nextQuestion = true;
        }else{
           io.emit('nextQ', false);
        }
      }
      totalNodes--;
    }
  }
    io.on('answer', (ans) => {
      console.log(ans);
    });

    io.on('graph', function(graph) {
      io.emit('graph', graph);
      console.log('Sending graph.');
      console.log(graph);
    });

    io.on('request_final_graph', function(callback) {
      db.getSigmaGraph(callback);
    });

  var obj = {};
  return obj;
}
