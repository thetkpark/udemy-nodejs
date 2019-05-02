//because of the scirpt in html we have access to client side of socket.io
const socket = io();

socket.on('countUpdated', (count) => {
    console.log('the count has been updated', count) //3. Print the count that got from server
    //7. Print the upadted count to console and loop
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log(`Clicked`);
    socket.emit('increment'); //4.When 'click' sent back 'increment' to server
})