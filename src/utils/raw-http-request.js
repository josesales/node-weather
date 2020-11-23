const http = require('http');

const url = `http://api.weatherstack.com/current?access_key=e7e1ac7e8ec9e27cbe00405cbb78682c&query=42.3605,-71.0596&units=m`;

const request = http.request(url, (response) => {
    let data = '';
    response.on('data', chunk => {
        data += chunk.toString();
    });
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body);
    });
});

// request.on('error', error => {
//     console.log('An error: ' + error);
// });

request.end();