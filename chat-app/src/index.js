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


    socket.on('join', ({ username, room }) => {
        socket.join(room)

        socket.emit('newMessage', generateMessage('Welcome!')) //Send greeting message
        socket.broadcast.to(room).emit('newMessage', generateMessage(`${username} has joined!`)); //sent to everyone but myself
        //socket.broadcast.to(room).emit //Send broadcast to everyone except myself in specifci room
        // io.to(room).emit() //send emit to everyone in specfic room
    })


    socket.on('sendMessage', (message, callback) => { //wait for message that submit from html
        const filter = new Filter()
        //use ackknowledge to filter bad-words
        if(filter.isProfane(message)) {
            return callback('Profanity is not allow!')
        }

        io.to('1234').emit('newMessage', generateMessage(message)); //broadcast new message to everyone
        callback() //acknowledged

    })

    socket.on('sendLocation', (location, callback) => {
        io.to('1234').emit('locationMessage', generateLocationMessage(location));
        callback()
    })

    socket.on('disconnect', () => { //buit-in event when someone disconnect
        io.emit('newMessage', generateMessage('A user has left'));
    }) 


})

server.listen(port, () => console.log(`Listening on port ${port}`));