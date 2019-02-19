/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');
/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
// set port to 8888
app.set('port', 8888);
// set the path read the views folder that holds the handlebar html templates
app.set('views', path.join(__dirname, 'views'));
// set the teplating engine to render handlebars with default layout and any custom handlebar helper functions
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    upperCase: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    classcheck: function(str) {
      if(str) return str.replace(/ /g,"-");
    }
  }
}));
// set the view engine to handlebars
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// read the build folder when server is running
app.use('/build', express.static(__dirname + '/build'));
app.use('/public', express.static(__dirname + '/public'));

/**
 * Get all routes
 */
require('./controllers/html-routes.js')(app);

/**
 * show 404 page if no route has been hit
 */
app.get('*', function(req, res) {
  res.render('404');
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('Success!'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
