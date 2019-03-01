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

  //GOOGLE API
  app.get('/api/google-api', function(req, res) {
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////GOOGLE API//////////////////////////////
    //////////////////////////////////////////////////////////////////////
    const readline = require('readline');
    const {google} = require('googleapis');
    const fs = require('fs');

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), listEvents);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    function listEvents(auth) {
      const calendar = google.calendar({version: 'v3', auth});
      calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, resp) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = resp.data.items;
        var hbsObject = resp.data.items;

        res.send(resp.data.items);
        // res.render('googleapi', {
        //   hbsObject: hbsObject
        // });
        if (events.length) {
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
//////////////////////////////////////
// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2019-02-28T21:10:00',
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': '2019-03-01T21:00:00',
    'timeZone': 'America/New_York',
  },
  'attendees': [
    {'email': 'schmitty890@gmail.com',
      'additionalGuests': 1,
      'comment': 'the guests personal comment',
      'displayName': 'Jason'
    },
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
//////////////////////////////////////
      });
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////GOOGLE API//////////////////////////////
    //////////////////////////////////////////////////////////////////////
  });

};
