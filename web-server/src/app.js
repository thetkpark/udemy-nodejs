const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
//app.use(express.static(publicDirectoryPath)); look for html file in specific folder (we use hbs instead)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sethanant'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sethanant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help'
    })
})

/*
//Not gonna work while 'app.use' is working
app.get('', (req ,res) => {
    res.send('<h1>Weather</h1>');
})


app.get('/help', (req, res) => {
    res.send({name: 'Sethanant' ,age: 19});
})

app.get('/about', (req, res) => {
    res.send('<h1>This is about page</h1>');
})
*/
app.get('/weather', (req, res) => {
    res.send({
        forcast: `It's hot af`,
        location: 'Nonthaburi'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});