//because of the scirpt in html we have access to client side of socket.io
const socket = io();

//server (emit) -> client (recive) --acknowledgement --> server 
//client (emit) -> server (recive) --acknowledgement --> client 

//Element
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');

const $messages = document.querySelector('#messages');

//Template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

//Function
const autoscroll = () => {
    //New message element
    const $newMessage = $messages.lastElementChild

    //Height of the last message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //Visable height
    const visableHeight = $messages.offsetHeight

    //Height of messages container
    const containerHeight = $messages.scrollHeight

    //How far have I scrolled
    const scrollOffset = $messages.scrollTop + visableHeight

    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}



//Send message with user submit from html
$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    //disable the form when sending to server
    $messageFormButton.setAttribute('disabled', 'disabled') 


    const message = event.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => { 
        //Function that gonna run when event is acknowledged

        //Reenable when finish with sending to server
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        
        if(error) return console.log(error)

        console.log('Message Deliverd')
    });
})



//Listen for new message
socket.on('newMessage', message => {
    console.log(message)
    //Render a message
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll();
}) 



//Send location
$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) return alert('Geolocation is not supported by your browser')

    $sendLocationButton.setAttribute('disabled', 'disabled') //set button to not to click

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')  
        })
    })
})

socket.on('locationMessage', (locationMessage) => {
    console.log(locationMessage);

    const html = Mustache.render(locationMessageTemplate, {
        username: locationMessage.username,
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll();
})

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
});

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, { room, users })
    document.querySelector('#sidebar').innerHTML = html
})