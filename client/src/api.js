import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
let socketId;

// In chatroom.js, the method passed in adds the received message to the chat.
// If that's all the event needs to do, it can go here
function subscribeToChat(cb) {
  socket.on('chat message', msg => cb(null, msg));
  // socket.emit('chat message', msg);
  // socket.on('pending', msg => cb(null, msg));
}
// TODO: showPendingMsg is not being used yet. However, should it be set up
// where the "please wait" is always shown, and there is another "connected to player" event
// that will give the socketId of the opponent?
function subscribeToMatchingService(cb) {
  socket.on('pending', msg => cb(null, msg, socketId));
}

function emitMessage(msg) {
  socket.emit('chat message', msg);
}

function emitUsername(username) {
  socket.emit('username', username);
}

export { subscribeToChat, emitMessage, emitUsername, subscribeToMatchingService };