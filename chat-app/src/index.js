const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users'); 


const app = express();
const server = http.createServer(app); //Express do it behind the scene
const io = socketio(server); //add websocket to the server

const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => { 
    console.log('Web socket connected');


    socket.on('join', ({ username, room }, callback) => {

        //Add user to the list and wait for complete or error
        const { error, user } = addUser({ id: socket.id, username, room });
        if(error) return callback(error)
        

        socket.join(user.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome!')) //Send greeting message
        socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.username} has joined!`)); //sent to everyone but myself
        //socket.broadcast.to(room).emit //Send broadcast to everyone except myself in specifci room
        // io.to(room).emit() //send emit to everyone in specfic room
        callback();
    })


    socket.on('sendMessage', (message, callback) => { //wait for message that submit from html

        const user = getUser(socket.id);

        const filter = new Filter()
        //use ackknowledge to filter bad-words
        if(filter.isProfane(message)) {
            return callback('Profanity is not allow!')
        }

        io.to(user.room).emit('newMessage', generateMessage(user.username, message)); //broadcast new message to everyone
        callback() //acknowledged

    })

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, location));
        callback()
    })

    socket.on('disconnect', () => { //buit-in event when someone disconnect
        const user = removeUser(socket.id)

        if(user) return io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.username} has left!`));
        
    }) 


})

server.listen(port, () => console.log(`Listening on port ${port}`));