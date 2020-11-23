const request = require('request');

const accessKey = 'e7e1ac7e8ec9e27cbe00405cbb78682c';

const getForecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', null);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', null);
        }
        callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
        // callback(null, {
        //     description: response.body.current.weather_descriptions[0],
        //     temperature: response.body.current.temperature,
        //     precipitation: response.body.current.precip,
        //     feelsLike: response.body.current.feelslike
        // });
    });
}



module.exports = getForecast;