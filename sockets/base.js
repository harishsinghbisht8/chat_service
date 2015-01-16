module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('join', function(room) {
      socket.join(room);
      socket.on('message', function(msg) {
        socket.broadcast.to(room).emit('message', msg);
      });
    });
   /* socket.emit('message', { user: 'Server', message:'Welcome to harish quich chat service :P' });
    socket.on('message', function (data) {
      console.log('again');
      //socket.broadcast.emit('message', data);
      io.sockets.emit('message', data);
    });*/
  });
}
