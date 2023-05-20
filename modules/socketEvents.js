const socketEvents = socket => {
  console.log('connected');
  const { receiverUUID } = socket.handshake.query;
  if (receiverUUID) {
    socket.join(receiverUUID);
    socket.roomUUID = receiverUUID;
    const hasTransmitter = global.io.of("/").adapter.rooms.has(receiverUUID);
    if (hasTransmitter) {
      io.to(receiverUUID).emit('reciever_connected');
    }
  }

  socket.on('disconnecting', disconnecting);
  socket.on('bind', bind);
  socket.on('offer', offer);
  socket.on('answer', answer);
  socket.on('sdp', sdp);
};

// ToDo Якщо приймач, і немає кімнати, то приєднати до кімнати
// ToDo При виході, якщо приймач, викинути з кімнати

const disconnecting = async function (reason) {
  const { receiverUUID } = this.handshake.query;
  console.log('reciever: ', receiverUUID);
  console.log('roomSockets: ', global.io.of("/").adapter.rooms);
  if (receiverUUID) {
    io.to(receiverUUID).emit('reciever_disconnected');
  }
};

const bind = function (event) {
  const { receiverUUID } = event;
  const hasReceiver = global.io.of("/").adapter.rooms.has(receiverUUID);
  if (hasReceiver) {
    this.join(receiverUUID);
    this.emit('binded', event);
    this.roomUUID = receiverUUID;
  } else {
    this.emit('error', {
      message: 'receiver not found'
    });
  }
};

const offer = function (event) {
  io.to(this.roomUUID).emit('offer', event);
};

const answer = function (event) {

};

const sdp = function (event) {

}

module.exports = socketEvents