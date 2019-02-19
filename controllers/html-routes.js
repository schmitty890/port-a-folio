var indexData = require('../data/indexData.json');
var gettingStartedData = require('../data/gettingStartedData.json');
var guidelinesData = require('../data/guidelinesData.json');
var stylesData = require('../data/stylesData.json');
var componentsData = require('../data/componentsData');
var navigation = require('../data/navigation.json');
var releaseNotesData = require('../data/releaseNotesData.json');

module.exports = function (app) {
  // Home Page
  app.get('/', function (req, res) {
    // assign the handlebar object any data to be read into the template. this separates the data from the markup.
    var hbsObject = {
      pageData: indexData,
      headerData: componentsData,
      nav: navigation
    };
    console.log(hbsObject);
    // console.log(hbsObject);
    res.render('index', {
      title: 'Home', // pass any value to handlebar template
      hbsObject: hbsObject
    });
  });

  // Getting Started Page
  app.get('/getting-started', function (req, res) {
    // assign the handlebar object any data to be read into the template. this separates the data from the markup.
    var hbsObject = {
      pageData: gettingStartedData,
      nav: navigation
    };
    // console.log(hbsObject);
    res.render('partials/pages/getting-started', {
      title: 'Home', // pass any value to handlebar template
      hbsObject: hbsObject
    });
  });

  // Components Pages
  app.get('/components/:category', function(req, res) {
    var category = req.params.category;
    var hbsObject = {
      pageData: componentsData.components[category],
      nav: navigation
    };

    res.render('pages/components', {
      hbsObject: hbsObject
    });
  });

  // Release Notes
  app.get('/release-notes', function(req, res) {
    var hbsObject = {
      pageData: releaseNotesData,
      nav: navigation
    };

    console.log(releaseNotesData);

    res.render('pages/release-notes', {
      hbsObject: hbsObject
    });
  });
};
