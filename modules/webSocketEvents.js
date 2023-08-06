let clients = [];

const webSocketEvents = (ws, req) => {
  console.log('connected');
  console.log("url: ", req.headers.origin + req.url);
  const url = new URL(req.url, req.headers.origin);
  const params = new URLSearchParams(url.search);
  const receiverUUID = params.get('receiverUUID');
  if (receiverUUID) {
    ws.room = receiverUUID;
    ws.type = 'RECEIVER';
  }
  clients.push(ws);
  console.log("receiverUUID:", receiverUUID);

  ws.onclose = closeHandler;
  ws.onmessage = messageHandler;
  ws.onbind = bindHandler;
  ws.offer = offerHandler;
  ws.emitEvent = (eventName, payload) => {
    const mess = {
      type: eventName,
      payload
    }
    console.log('mess: ', mess);
    ws.send(JSON.stringify(mess));
  }
  ws.broadcast = function (room, event) {
    const couples = clients
      .filter(client => client !== ws && client.room === room)
    couples.forEach(client => client.send(JSON.stringify(event)))
  }
};

const closeHandler = ws => {
  clients = clients.filter(client => client !== ws.target);
};

const messageHandler = event => {
  console.log('message: ', event);
  const data = JSON.parse(event.data);
  const socket = event.target;
  console.log('data: ', data);
  const handlerName = `on${data.type}`;
  if (socket[handlerName]) {
    socket[handlerName](data.payload);
  }
};

const bindHandler = function (event) {
  console.log('BIND')
  const { receiverUUID } = event;
  const hasReceiver = clients.some(client => client.room === receiverUUID);

  if (hasReceiver) {
    this.room = receiverUUID;
    this.emitEvent('binded', event);
  } else {
    this.emitEvent('error', {
      message: 'receiver not found'
    });
  }
};

const offerHandler = function (event) {
  this.broadcast(event.room, event);
};


module.exports = webSocketEvents