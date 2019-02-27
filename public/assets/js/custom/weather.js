var Weather = function(){
  console.log('weather.js');

  function getInput() {
    $("#weather-search").find('input').keyup(function(event) {
        if (event.keyCode === 13) {
          var value = $("#weather-search").find('input').val();
          getWeather(value);
        }
    });
  };

  function getWeather(value) {
    // console.log(value);
    var data = {
      zip: value
    }
    // console.log(data);
    $.ajax({
      type: 'GET',
      data: data,
      url: '/api/weather'
    }).then(function(resp) {
      console.log('weather response');
      console.log(resp);
      createHTML(resp);
    });
  };

  function createHTML(resp) {
    var html = '';

    // Grab the template script
    var theTemplateScript = $("#weather-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Pass our data to the template
    var theCompiledHtml = theTemplate(resp);

    // Add the compiled html to the page
    $('.weather-content-placeholder').html(theCompiledHtml);

    // $('#weather-wrapper').empty().append(html);
  };

  function init() {
    getInput();
  };

  return {
    init: init
  }

}();

Weather.init();







