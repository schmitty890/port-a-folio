var jobs = require('../data/jobs.json');
var axios = require('axios');

module.exports = function (app) {
  // Home Page
  app.get('/', function (req, res) {
    // assign the handlebar object any data to be read into the template. this separates the data from the markup.
    var hbsObject = {
      jobs: jobs
    };
    console.log(hbsObject);
    // console.log(hbsObject);
    res.render('index', {
      title: 'Home', // pass any value to handlebar template
      hbsObject: hbsObject
    });
  });

  app.get('/api/jobs', function(req, res) {
    res.send(jobs);
  });

  // Weather Page
  app.get('/weather', function (req, res) {
    var hbsObject = {
    };
    console.log(hbsObject);
    // console.log(hbsObject);
    res.render('weather', {
      hbsObject: hbsObject
    });
  });


  app.get('/api/weather', function(req, res) {
    var openWeatherCreds = {
      apiKey: process.env.openWeatherMap,
      zipcode: req.query.zip
    }
    console.log(openWeatherCreds);
    var queryURLweather = 'https://api.openweathermap.org/data/2.5/weather?zip=' + openWeatherCreds.zipcode + '&units=imperial&appid=' + openWeatherCreds.apiKey;

    axios.get(queryURLweather)
      .then(function (resp) {
        console.log(resp.data);
        res.send(resp.data);
      })
      .catch(function (error) {
        // console.log(error);
      });

  });

};
