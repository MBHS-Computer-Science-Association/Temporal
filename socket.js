var db = require('./graphdb');

var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });

    socket.on('answer', (ans) => {
      console.log(ans);
    });



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
};
