const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// when user connects
io.on('connection', socket => {
    console.log('a User connected');
    // when recive from user
    socket.on('diceRolled', msg => {
        console.log(msg);
        // broadcast to all users
        io.emit('diceRolled', msg)
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
