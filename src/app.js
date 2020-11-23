const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geo-code');
const getForecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Defines paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sales'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sales'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help Text',
        name: 'Sales'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }
        getForecast(data.latitude, data.longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecast,
                location: data.location,
                address: req.query.address
            });
        });
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('server is up on port ' + port);
});