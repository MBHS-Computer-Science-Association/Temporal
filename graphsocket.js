var db = require('./graphdb');

var exports = module.exports = function(socket) {

  socket.on('graph', function(graph) {
    socket.emit('graph', graph);
    console.log('Sending graph.');
  });

  socket.on('request_final_graph', function(callback) {
    db.getSigmaGraph(callback);
  });

  socket.on('create_node', (obj) => {
    db.createNode(obj.title, obj.description);
  });

  socket.on('create_rel', (obj) => {
    db.createRelationship(obj.src, obj.dest, obj.title, obj.description);
  });
};
