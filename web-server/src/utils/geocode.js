const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGhldGtwYXJrIiwiYSI6ImNqdWh1dnhtbzEwdmszeXMwcDQ4ODc5aG0ifQ.BrieDLzxs_5lQ994AlzOig&limit=1`;

    request({ url: url, json: true }, (err, { body } = {}) => {
        //{body} = destrcturing from respon object
        if(err) {
            callback('Unable to connect to location services!', undefined);
        }
        else if(body.features.length==0){
            callback('Unable to find location. Try again with another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });

}

module.exports = geocode;