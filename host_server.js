const express = require('express')
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 5501;

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile('scrum-board-UI.html', { root: __dirname });
})

io.on('connection', (socket) => {
  console.log("Hello! ^^");
  socket.on('disconnect', () => {
    console.log("Good Bye! :)");
  });
});

server.listen(port, function () {
  console.log(`My website is listening on port ${port}`);
})











