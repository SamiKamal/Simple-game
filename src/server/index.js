const express = require('express');
const uid = require("uid/single")
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.redirect('/home');
});


app.use(express.static(__dirname + '/'));
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/offline', (req, res) => {
  res.sendFile(__dirname + '/indexOffline.html');
});

app.get('/online', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



// when user connects
io.on('connection', socket => {
  socket.on('diceRolled', msg => {
      console.log(msg);
      // broadcast to all users
      io.emit('diceRolled', msg)
  })

  


  console.log(socket.id + ' ==== connected');

  // creating a room name that's unique using both user's unique username

  socket.on('join', roomName => {
    // console.log(roomName);
  let split = roomName.split('--with--'); // ['username2', 'username1']

  let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']

  let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

   Array.from(socket.rooms)
        .filter(it => it !== socket.id)
        .forEach(id => {
          socket.leave(id);
          socket.removeAllListeners(`emitMessage`);
        });

   socket.join(updatedRoomName);
   console.log(updatedRoomName);

   socket.on(`emitMessage`, message => {
      Array.from(socket.rooms)
           .filter(it => it !== socket.id)
           .forEach(id => {
              socket.to(id).emit('onMessage', message);
           });
        });
      });

    socket.on('disconnect', () => {
      console.log(socket.id + ' ==== diconnected');
      socket.removeAllListeners();
     });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});