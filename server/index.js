const io = require('socket.io')();

let users = {};

io.on('connection', function(socket) {
  console.log('a user connected');
  // TODO: Switch to arrow functions
  socket.on('username', function(username) {
    console.log(`User: ${username} has connected`);
    // let matchedUserIndex = users.findIndex(function (element) {
    //   return element.pending
    // });
    let matchedUserId = Object.keys(users).find(function (key) {
      return users[key].pending;
    });
    users[socket.id] = {
      // id: socket.id,
      username: username,
      pending: true, // is this user waiting to be matched up? TODO: Just rely on opponentId being false/falsy?
      oppenentId: null // When users disconnect, delete that user and set their opponent's pending to true and opponentId to null
    };
    if (matchedUserId) { // TODO: Does there need to be something to continually go through and try to match people up? Or just check each time someone connects?
      socket.emit('pending', `You have been matched with ${users[matchedUserId].username}`);
      users[socket.id].oppenentId = matchedUserId;
      users[socket.id].pending = false;
      users[matchedUserId].oppenentId = socket.id;
      users[matchedUserId].pending = false;
    } else {
      socket.emit('pending', `Hello ${username}. Plese wait for our matchmaking sauce to finish...`);
    }
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    socket.broadcast.to(users[socket.id].oppenentId).emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    let index = users.findIndex(function (element) {
      return element.id === socket.id;
    });
    // TODO: Set opponent back to pending. Alert them.
    users.splice(index, 1);
    console.log('user disconnected');
    console.log(`Connected Users: ${JSON.stringify(users)}`);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
