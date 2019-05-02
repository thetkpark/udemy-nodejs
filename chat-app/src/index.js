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

io.on('connection', (socket) => { //1. Wait for connection from client
    console.log('Web socket connected');

    socket.emit('countUpdated', count) //2.sending countUpdated 'event' to client

    socket.on('increment', () => { //5. Wait for 'increment' to be sent from client
        count++;
        // socket.emit('countUpdated', count) //6. Send back the updated count (emit to specific connection)
        io.emit('countUpdated', count) //Do the same as above but emit to all connection
    })
})

server.listen(port, () => console.log(`Listening on port ${port}`));