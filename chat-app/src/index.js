const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app); //Express do it behind the scene
const io = socketio(server); //add websocket to the server

const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => { 
    console.log('Web socket connected');
    socket.emit('newMessage', generateMessage('Welcome!')) //Send greeting message

    socket.broadcast.emit('newMessage', generateMessage('New user has joined')); //sent to everyone but myself

    socket.on('sendMessage', (message, callback) => { //wait for message that submit from html
        const filter = new Filter()
        //use ackknowledge to filter bad-words
        if(filter.isProfane(message)) {
            return callback('Profanity is not allow!')
        }

        io.emit('newMessage', generateMessage(message)); //broadcast new message to everyone
        callback() //acknowledged

    })

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(location));
        callback()
    })

    socket.on('disconnect', () => { //buit-in event when someone disconnect
        io.emit('newMessage', generateMessage('A user has left'));
    }) 


})

server.listen(port, () => console.log(`Listening on port ${port}`));