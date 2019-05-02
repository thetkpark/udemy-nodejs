const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); //Express do it behind the scene
const io = socketio(server); //add websocket to the server

const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New ')
    )
    socket.emit()
})

server.listen(port, () => console.log(`Listening on port ${port}`));