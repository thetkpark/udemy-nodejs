//fetch() is only avaliable on web brower
console.log(`Client's side JS is running`);

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    messageOne.textContent = 'Loading'
    const location = searchElement.value;
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response => {
        response.json()
        .then(data => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcastData;
            }
        })
    })

})


