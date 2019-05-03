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

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


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
        message: message.text,
        createdAt: moment(message.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
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
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format('H:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.emit('join', { username, room });