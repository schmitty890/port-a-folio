var indexData = require('../data/indexData.json');
var gettingStartedData = require('../data/gettingStartedData.json');
var guidelinesData = require('../data/guidelinesData.json');
// var stylesData = require('../data/stylesData.json');
var componentsData = require('../data/componentsData');
var navigation = require('../data/navigation.json');
var releaseNotesData = require('../data/releaseNotesData.json');
var jobs = require('../data/jobs.json');

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

  app.get('/api/jobs', function(req, res) {
    res.send(jobs);
  });
  

 

};
