
const socketHeandshake = (socket, next) => {
  console.log('T: ', socket.handshake.query);
  if (socket.handshake.query.receiverUUID) {
    socket.join(socket.handshake.query.receiverUUID);
  }
  next();
};

module.exports = socketHeandshake;