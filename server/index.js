const io = require('socket.io')();

const users = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  // TODO: Switch to arrow functions
  socket.on('username', (username) => {
    console.log(`User: ${username} has connected`);
    // let matchedUserIndex = users.findIndex(function (element) {
    //   return element.pending
    // });
    const matchedUserId = Object.keys(users).find(key => users[key].pending);
    users[socket.id] = {
      // id: socket.id,
      username,
      pending: true, // is this user waiting to be matched up? TODO: Just rely on opponentId being false/falsy?
      oppenentId: null, // When users disconnect, delete that user and set their opponent's pending to true and opponentId to null
    };
    if (matchedUserId) { // TODO: Handle people leaving but not others joining. Match w/ others who's opponent also left
      socket.emit('pending', `You have been matched with ${users[matchedUserId].username}`);
      users[socket.id].oppenentId = matchedUserId;
      users[socket.id].pending = false;
      users[matchedUserId].oppenentId = socket.id;
      users[matchedUserId].pending = false;
    } else {
      socket.emit('pending', `Hello ${username}. Plese wait for our matchmaking sauce to finish...`);
    }
  });

  socket.on('chat message', (msg) => {
    console.log(`message: ${msg}`);
    socket.broadcast.to(users[socket.id].oppenentId).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    // const index = users.findIndex(element => element.id === socket.id);
    delete users[socket.id];
    // TODO: Set opponent back to pending. Alert them.
    // users.splice(index, 1);
    console.log('user disconnected');
    console.log(`Connected Users: ${JSON.stringify(users)}`);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
