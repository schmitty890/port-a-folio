var jobs = require('../data/jobs.json');
var sideprojects = require('../data/sideprojects.json');
var axios = require('axios');
var googleApiCrud = require("./google-api-crud.js");
const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
var db = require("../models");

const randomBytesAsync = promisify(crypto.randomBytes);

module.exports = function (app) {
  // Home Page
  app.get('/', function (req, res) {
    // assign the handlebar object any data to be read into the template. this separates the data from the markup.
    var hbsObject = {
      user: req.user,
      pageData: jobs,
      sideprojects: sideprojects
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

  /////////////////////////////////////////////////////////
    /**
   * GET /login
   * Login page.
   */
  app.get('/login', function (req, res) {
    if(req.user) {
      return res.redirect('/');
    }
    res.render('account/login', {
      title: 'Login'
    });
  });

  /**
   * POST /login
   * Sign in using email and password.
   */

  app.post('/login', function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/login');
    }

    passport.authenticate('local', (err, user, info) => {
      if(err) { return next(err); }
      if(!user) {
        req.flash('errors', info);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if(err) { return next(err); }
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect('/');
        // res.redirect to req.session.returnTo returned this to /api/digitalData endpoint - we want to redirect to homepage
        // res.redirect(req.session.returnTo || '/');
      });
    })(req, res, next);
  });

    /**
   * GET /logout
   * Log out.
   */
  app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy((err) => {
      if(err) console.log('Error : Failed to destroy the session during logout.', err);
      req.user = null;
      res.redirect('/');
    });
  });

  /**
   * GET /forgot
   * Forgot Password page.
   */
  app.get('/forgot', function(req, res) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.render('account/forgot', {
      title: 'Forgot Password'
    });
  });

  /**
   * POST /forgot
   * Create a random token, then the send user an email with a reset link.
   */
  app.post('/forgot', function(req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/forgot');
    }

    const createRandomToken = randomBytesAsync(16)
      .then(buf => buf.toString('hex'));

    console.log('----------------------------------');
    console.log(req.body.email);
    console.log('----------------------------------');
    const setRandomToken = token =>
      User
        .findOne({ email: req.body.email })
        .then((user) => {
          if(!user) {
            req.flash('errors', { msg: 'Account with that email address does not exist.' });
          } else {
            user.passwordResetToken = token;
            user.passwordResetExpires = Date.now() + 3600000; // 1 hour
            user = user.save();
          }
          return user;
        });

    const sendForgotPasswordEmail = (user) => {
    console.log('------------USER----------------------');
    console.log(user);
    console.log('----------------------------------');
      if(!user) { return; }
      const token = user.passwordResetToken;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAILEMAIL,
          pass: process.env.GMAILPASS
        }
      });
      console.log('---------------TRANSPORTER-------------------');
      console.log(transporter);
      console.log('----------------------------------');
      const mailOptions = {
        to: user.email,
        from: process.env.GMAILEMAIL,
        subject: 'Reset your password on thejasonschmitt.com',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      return transporter.sendMail(mailOptions)
        .then(() => {
          req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
        });
    };

    createRandomToken
      .then(setRandomToken)
      .then(sendForgotPasswordEmail)
      .then(() => res.redirect('/forgot'))
      .catch(next);
  });

  /**
   * GET /signup
   * Signup page.
   */
  app.get('/signup', function(req, res) {
    if(req.user) {
      return res.redirect('/');
    }
    res.render('account/signup', {
      title: 'Create Account'
    });
  });

  /**
   * POST /signup
   * Create a new local account.
   */
  app.post('/signup', function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/signup');
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if(err) { return next(err); }
      if(existingUser) {
        console.log('Account with that email address already exists!')
        req.flash('errors', { msg: 'Account with that email address already exists.' });
        return res.redirect('/signup');
      }
      user.save((err) => {
        if(err) { return next(err); }
        req.logIn(user, (err) => {
          if(err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    });
  });

  /**
   * GET /reset/:token
   * Reset Password page.
   */
  app.get('/reset/:token', function(req, res, next) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .exec((err, user) => {
        if(err) { return next(err); }
        if(!user) {
          req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
          return res.redirect('/forgot');
        }
        res.render('account/reset', {
          title: 'Password Reset'
        });
      });
  });

/**
 * POST /reset/:token
 * Process the reset password request.
 */
  app.post('/reset/:token', function(req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('back');
    }

    const resetPassword = () =>
      User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .then((user) => {
          if(!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          return user.save().then(() => new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
              if(err) { return reject(err); }
              resolve(user);
            });
          }));
        });

    const sendResetPasswordEmail = (user) => {
      console.log('sendResetPasswordEmail');
      if(!user) { return; }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAILEMAIL,
          pass: process.env.GMAILPASS
        }
      });
      const mailOptions = {
        to: user.email,
        from: process.env.GMAILEMAIL,
        subject: 'Your La Liga password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      console.log(mailOptions);
      console.log('sending nodemailer email');
      return transporter.sendMail(mailOptions)
        .then(() => {
          req.flash('success', { msg: 'Success! Your password has been changed.' });
        });
    };

    resetPassword()
      .then(sendResetPasswordEmail)
      .then(() => { if(!res.finished) res.redirect('/'); })
      .catch(err => next(err));
  });
  ////////////////////////////////////////////////////////////

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