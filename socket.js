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
  });
  var obj = {};
  return obj;
};
