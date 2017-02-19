var exports = module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', (socket) => {
    console.log("User connected.");

    socket.on('disconnect', () => {
      console.log("User disconnected.");
    });
    socket.emit('data', [["Russian Revolution","Vietnam War","both are wars"], ["Thai", "Trevor", "both are the same person"], ["Renaissance","Scientific Revolution","both changed the world"], ["Donald Trump", "Vladimir Putin", "both are working for Russia"]]);


    socket.on('answer', (ans) => {
      console.log(ans);
    });
  });
  var obj = {};
  return obj;
};
