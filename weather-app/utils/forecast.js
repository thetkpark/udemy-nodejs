const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = `https://api.darksky.net/forecast/89aa36009c779e7050a7fdad84f43440/${latitude},${longitude}?units=si`

    request({ url, json: true }, (err, res) => {
        // Normal way => 'url: url' but its key and value is in the same name so shoten
        if(err){
            callback('Unable to connect to weather service!', undefined);
        }
        else if (res.body.error){
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, `${res.body.daily.data[0].summary} It's currently ${res.body.currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain`);
        }
    });
}

module.exports = forecast;