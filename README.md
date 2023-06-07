# magura-signal-server
Signal server for magura project. Provides signaling between two peers - receiver and transmitter

## Receiver algoritm
1. The receiver connects to the signal server using the socket io library.
2. In the get parameter of the handshake, the **receiverUUID** parameter must be passed unique id of reveiver
```
  const socket = io({
    transports: ['websocket', 'polling'],
    query: new URLSearchParams({
      receiverUUID: '<%= uuid %>'
    }).toString()
  });
```
3. Then the receiver waits for the **offer** event, in the parameters of which SDP. 
It needs to be set in setRemoteDescription. 
At this stage, a video stream is added to the peerconnection and waiting for the datachannel to open.
4. Then the receiver takes longer to generate a response and send the **answer** event.
5. The next step is to exchange ice candidates between the receiver and transmitter. 
This is done by dispatching an ice event with a load of icecandidate.