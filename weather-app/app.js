const request = require('request');

const url = `https://api.darksky.net/forecast/89aa36009c779e7050a7fdad84f43440/37.8267,-122.4233?units=si`;

request({ url: url, json: true } , (error, response) => {
    if(error){
        console.log('Unable to connect to weather service!');
    }
    else if (response.body.error){
        console.log('Unable to find location');
    }
    else {
        console.log(`${response.body.daily.data[0].summary} It's currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain`);
    }
});

//Geocoding
//Address --> Lat/Long --> Weather


const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Nonthaburi.json?access_token=pk.eyJ1IjoidGhldGtwYXJrIiwiYSI6ImNqdWh1dnhtbzEwdmszeXMwcDQ4ODc5aG0ifQ.BrieDLzxs_5lQ994AlzOig&limit=1`;
request({ url: geocodeURL, json: true }, (err, res) => {
    if(err){
        console.log('Unable to connect to location service!');
    }
    else if(res.body.features.length == 0){
        console.log('Unable to find location. Try again with another search');
    }
    else {
    const longitude = res.body.features[0].center[0]
    const latitude = res.body.features[0].center[1]
    console.log(`Long: ${longitude}, Lat: ${latitude}`);
    }
});
