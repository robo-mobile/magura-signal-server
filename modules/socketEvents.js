const socketEvents = socket => {
  console.log('connected');
  const { receiverUUID } = socket.handshake.query;
  if (receiverUUID) {
    console.log(socket.rooms); // Set { <socket.id> }
    socket.join(receiverUUID);

  } else {
    console.log('R: ', socket.rooms);
  }

  socket.on('disconnecting', disconnecting);
  socket.on('bind', bind);
};

// ToDo Якщо приймач, і немає кімнати, то приєднати до кімнати
// ToDo При виході, якщо приймач, викинути з кімнати

const disconnecting = function (reason) {
  const { receiverUUID } = this.handshake.query;
  // const roomSockets = global.io.sockets.clients(receiverUUID);
  console.log('roomSockets: ', Object.keys(this.rooms));
};

const bind = function (event) {
  const { receiverUUID } = event;
  const hasReceiver = global.io.of("/").adapter.rooms.has(receiverUUID);
  if (hasReceiver) {
    this.join(receiverUUID);
  }
}

module.exports = socketEvents