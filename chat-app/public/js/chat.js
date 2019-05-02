//because of the scirpt in html we have access to client side of socket.io
const socket = io();



document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value;
    socket.emit('sendMessage', message);
})

socket.on('welcome', message => {
    console.log(message)
}) 

socket.on('newMessage', message => {
    console.log(message)
}) 
