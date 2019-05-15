const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
    if(req.query.address){
        const address = req.query.address;
        geocode(address, (err, { latitude, longitude, location } = {}) => {
            //set default value for { latitude, longitude, location } (destructure from res that return from geocode) to empty object 
            if(err){
                res.send({ error: err });
            }
            else { 
                //set default res object to {} if it's undefined
                forecast(latitude, longitude, (error, forcastData) => {
                    if(error){
                        res.send({ error: error });
                    }
                    else {
                        res.send({
                            location: location,
                            forcastData: forcastData,
                            address: address
                        });
                    }
                }
                )}
        })
    }
    

    else { 
        res.send({ error: 'You must provide address' });
    }
})

/*
//Example of string query
app.get('/products', (req, res) => {
    if(req.query.search){
        return res.send({
            product: []
        });
        //after return it quit without running another res.send down below
    }
    
    res.send({
        error: 'You must provide search term'
    });


})
*/

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Sethanant'
    })
})

//route handler work like if statement top->bottom (the last one ('*') is like a 'else')

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});