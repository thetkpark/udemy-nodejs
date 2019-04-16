const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
//Normaly when the request come it look in 'publicDirectoryPath' according to line below and look for that specific filename (.html) 
app.use(express.static(publicDirectoryPath)); //look for html file in specific folder (we use hbs instead)

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
        helpText: 'This is some help',
        title: 'Help', 
        name: 'Sethanant'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Sethanant'
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


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Sethanant'
    })
})

//route handler work like if statement top->bottom (the last one ('*') is like a 'else')



app.listen(3000, () => {
    console.log('Server is up on port 3000');
});