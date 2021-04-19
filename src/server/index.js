const express = require('express');
const {uid} = require("uid/single")
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
let connectedUsers = 0

app.get('/', (req, res) => {
  res.redirect('/home');
});


app.use(express.static(__dirname));

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/offline', (req, res) => {
  res.sendFile(__dirname + '/indexOffline.html');
});

app.get('/online', (req, res) => {
  res.redirect('/online/' + uid());
  
});

app.get('/online/:id', (req, res) => {
  console.log();
  res.sendFile(__dirname + '/index.html');


  io.on('connection', socket => {
    var clients_in_the_room = 0;
    // socket.on('diceRolled', msg => {
      //     console.log(msg);
      //     // broadcast to all users
      //     io.emit('diceRolled', msg)
      // })
      
      socket.on('join room', (roomID) => {
        clients_in_the_room = io.sockets.adapter.rooms.get(roomID)?.size
        if(clients_in_the_room < 2 || clients_in_the_room === undefined){
          console.log('Waiting for an opponent')
          socket.join(roomID)
        } else if (clients_in_the_room === 2){
          console.log('SORRY, Lobby is full');
        }
        socket.to(roomID).emit('some event', 'You joined the room');
        
      })

      


    console.log(socket.id + ' ==== connected');
    
      socket.on('disconnect', () => {
        console.log(socket.id + ' ==== diconnected');
        socket.removeAllListeners();
       });
  
})



// when user connects
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});