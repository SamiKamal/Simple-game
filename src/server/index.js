const express = require('express');
const {uid} = require("uid/single")
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
let connectedUsers = 0
var players = {};
var rooms = {};


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
  res.sendFile(__dirname + '/onlineHome.html')
  
});

app.get('/online/:id', (req, res) => {
  
  res.sendFile(__dirname + '/index.html');
  
setInterval(() => {
  for (const [key, value] of Object.entries(rooms)) {
    if (value.players.length === 0){
      delete key
    }
  }
}, 10000)


// when user connects
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', socket => {
  var clients_in_the_room = 0;
  
  socket.on('join room', ({socketRoomId, username}) => {
    clients_in_the_room = io.sockets.adapter.rooms.get(socketRoomId)?.size
    if(clients_in_the_room < 2 || clients_in_the_room === undefined){
      if (!rooms[socketRoomId]){
        
        rooms[socketRoomId] = {// add an example starter room
          id: socketRoomId,
          players: [],
          setCount: 0
      };
      }
      console.log('Waiting for an opponent')
      socket.join(socketRoomId)
      socket._username = username
      rooms[socketRoomId].players.push(socket)
      rooms[socketRoomId].setCount++
      
      var newPlayer = {
        id: socket.id,
        name: username,
        room: rooms[socketRoomId],
        roundScore: 0,
        currentScore: 0
       };
       players[socket.id] = newPlayer;
      // Choose who is playing 
      console.log(clients_in_the_room);
      clients_in_the_room === undefined ?  players[socket.id]._isPlaying = true : players[socket.id]._isPlaying = false
      } else if (clients_in_the_room === 2){
        console.log('SORRY, Lobby is full');
      }        
    })

    socket.on('rollDice', ({dice, socketID, roomID}) => {
      console.log(players[socketID]._isPlaying);
      if (!players[socketID]._isPlaying) return;
      // players[socketID].roundScore += dice
      io.in(roomID).emit('socketRollDice', dice)
    })
  
    
  socket.on('test', s => {
    console.log(rooms, players);
  })



  console.log(socket.id + ' ==== connected');
  
    socket.on('disconnect', () => {

      console.log(socket.id + ' ==== diconnected');
      for (const [key, value] of Object.entries(players)) {
        if (value.id === socket.id){
          delete key
        }
      }
    
      socket.removeAllListeners();
     });
      
})
