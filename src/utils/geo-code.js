const request = require('request');

const accessToken = 'pk.eyJ1Ijoic2FsZXNiYXNzIiwiYSI6ImNraHRmeXk4aDB0dTAzNWxoaHJjNnMzbzcifQ.k0uO2iLHLrqHpXLQtOLHGg';

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service.', null);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', null);
        }
        callback(null, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        });
    });
}

module.exports = geoCode;

