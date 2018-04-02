import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToChat(cb) {
  socket.on('chat message', msg => cb(null, msg));
  // socket.emit('chat message', msg);
}

function emitMessage(msg) {
  socket.emit('chat message', msg);
}

export { subscribeToChat, emitMessage };