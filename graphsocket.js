var db = require('./graphdb');

var exports = module.exports = function(socket) {

  socket.on('graph', function(graph) {
    socket.emit('graph', graph);
    console.log('Sending graph.');
  });

  socket.on('request_final_graph', function(callback) {
    db.getSigmaGraph(callback);
  });
};
