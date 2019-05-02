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

// let count = 0;

io.on('connection', (socket) => { 
    console.log('Web socket connected');
    socket.emit('newMessage', 'Welcome!') //Send greeting message

    socket.broadcast.emit('newMessage', 'New user has joined'); //sent to everyone but myself

    socket.on('sendMessage', (message) => { //wait for message that submit from html
        io.emit('newMessage', message); //broadcast new message to everyone
    })

    socket.on('disconnect', () => { //buit-in event when someone disconnect
        io.emit('newMessage', 'A user has left');
    }) 

})

server.listen(port, () => console.log(`Listening on port ${port}`));