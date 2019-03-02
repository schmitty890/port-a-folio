var jobs = require('../data/jobs.json');
var axios = require('axios');
var googleApiCrud = require("./google-api-crud.js");

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
    };

    var queryURLweather = 'https://api.openweathermap.org/data/2.5/forecast/daily?zip=' + openWeatherCreds.zipcode + '&units=imperial&appid=' + openWeatherCreds.apiKey;
    console.log(queryURLweather);
    axios.get(queryURLweather)
      .then(function (resp) {
        res.send(resp.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  });

  // Apex Legends Page
  app.get('/apex', function (req, res) {
    var hbsObject = {
    };
    console.log(hbsObject);
    // console.log(hbsObject);
    res.render('weather', {
      hbsObject: hbsObject
    });
  });

  // Apex Legends API
  app.get('/api/apex', function(req, res) {
    // fortnite api example
    // https://api.fortnitetracker.com/v1/profile/pc/SCHMITTERSTEIN', { headers: { 'TRN-Api-Key': 'b625aea3-eed6-46a3-930b-99bf5551329e' } }
    // apex legends api example
    // https://public-api.tracker.gg/apex/v1/standard/profile/{PLATFORM}/{NAME}
    axios.get('https://public-api.tracker.gg/apex/v1/standard/profile/5/yowtfkid', { headers: { 'TRN-Api-Key': '549b10d1-d533-49f0-9813-da8d3785fd4e' } })
     .then(response => {
         // If request is good...
         console.log(response.data);
         res.send(response.data);
      })
     .catch((error) => {
         console.log('error ' + error);
      });
  });


  // GOOGLE Page
  app.get('/google-api', function (req, res) {
    var hbsObject = {
    };
    console.log(hbsObject);
    // console.log(hbsObject);
    res.render('googleapi', {
      hbsObject: hbsObject
    });
  });

  // google api post - post event to calendar
  app.post('/api/google-api', function(req, res) {
    console.log('post /api/google-api');
    googleApiCrud.postEvent(req, res);
  });

  //GOOGLE API
  app.get('/api/google-api', function(req, res) {
    googleApiCrud.getEvent(req, res);
  });

};
















      // // DELETE event
      // function removeEvents(auth, calendar){
      //   calendar.events.delete({
      //     auth: auth,
      //     calendarId: 'primary',
      //     eventId: 'ch7ee3a8ivdsmql8a52pgakfdo'
      //   }, function(err) {
      //     if (err) {
      //       console.log('Error: ' + err);
      //       return;
      //     }
      //     console.log("Removed");
      //   });
      // }



      // // UPDATE event
      // function updateEvent(auth, calendar){
      //   var event = {
      //     'summary': 'a newwwwer title',
      //     'location': '1416 enchanted oaks dr',
      //     'description': 'a lovely description',
      //     'start': {
      //       'dateTime': '2019-03-13T21:10:00',
      //       'timeZone': 'America/New_York',
      //     },
      //     'end': {
      //       'dateTime': '2019-03-15T21:00:00',
      //       'timeZone': 'America/New_York',
      //     },
      //     'attendees': [
      //       {'email': 'hehehehhehhehehee@example.com'},
      //     ],
      //     'reminders': {
      //       'useDefault': false,
      //       'overrides': [
      //         {'method': 'email', 'minutes': 24 * 60},
      //         {'method': 'popup', 'minutes': 10},
      //       ],
      //     }
      //   };
      //   calendar.events.update({
      //     auth: auth,
      //     calendarId: 'primary',
      //     eventId: 'pbvpfhpm4f3qiip7jfs1t3f3ik',
      //     resource: event
      //   }, function(err, resp) {
      //     if (err) {
      //       console.log('Error: ' + err);
      //       return;
      //     }
      //     console.log('updated :' + resp.data);
      //   });
      // }









      // // GET event
      // function getEvent(auth, calendar){
      //   calendar.events.get({
      //     auth: auth,
      //     calendarId: 'primary',
      //     eventId: 'nnfind1odk12r259p6veelsi3s'
      //   }, function(err, resp) {
      //     if (err) {
      //       console.log('Error: ' + err);
      //       return;
      //     }
      //     console.log(resp.data);
      //   });
      // }