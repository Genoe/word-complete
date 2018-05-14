const io = require('socket.io')();

let users = [];

io.on('connection', function(socket) {
  console.log('a user connected');
  // TODO: Switch to arrow functions
  socket.on('username', function(username) {
    console.log(`User: ${username} has connected`);
    let matchedUserIndex = users.findIndex(function (element) {
      return element.pending
    });
    users.push({
      id: socket.id,
      username: username,
      pending: true, // is this user waiting to be matched up?
      oppenentId: null // When users disconnect, delete that user and set their opponent's pending to true and opponentId to null
    });
    if (matchedUserIndex !== -1) { // TODO: Does there need to be something to continually go through and try to match people up? Or just check each time someone connects?
      socket.emit('pending', `You have been matched with ${users[matchedUserIndex].username}`);
    } else {
      socket.emit('pending', `Hello ${username}. Plese wait for our matchmaking sauce to finish...`, socket.id);
    }
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    let index = users.findIndex(function (element) {
      return element.id === socket.id;
    });
    users.splice(index, 1);
    console.log('user disconnected');
    console.log(`Connected Users: ${JSON.stringify(users)}`);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
