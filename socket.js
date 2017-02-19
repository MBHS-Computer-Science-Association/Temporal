var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  var isQuizzing = false;

  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });

    isQuizzing = true;
  socket.on('quiz', (quiz) => {isQuizzing = true;});
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
        var list;
        db.getAllNodes((callback)=>{
          list = callback;
        });
        var related;
      //   for(var i = 0; i < totalNodes; i++){
      //     if(list[i].id == totalNodes){
      //       rdb.getRelatedNodes(i, (info)=>{
      //         related = info;
      //       });//RANDOMIZE WHICH RELATE
      //     //  data = [[list[i].name],[related[0]],[]];
      //   }
      // }
      var data = [["Russian Revolution","Vietnam War","both are wars"], ["Thy", "Trevor", "both are the same person"],["Renaissance","Scientific Revolution","both changed the world"],["Donald Trump", "Vladimir Putin", "both are working for Russia"]];

        console.log('about to emit');
        socket.emit('data', data);
        console.log('we tried to emit');

        while(!nextQuestion){
          var answ;
        socket.on('answer', (answer) => {
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
      }
      totalNodes--;
    }
  }
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
