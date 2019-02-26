console.log('main.js');


$("#weather-search").keyup(function(event) {
    if (event.keyCode === 13) {
      console.log('enter');
      $("#weather-search").find('input').val('');
    }
});


var Weather = function(){
  console.log('weather');

  function getInput() {
    $("#weather-search").find('input').keyup(function(event) {
        if (event.keyCode === 13) {
          var value = $("#weather-search").find('input').val();
          getWeather(value);
        }
    });
  };

  function getWeather(value) {
    console.log(value);
    var data = {
      zip: value
    }
    console.log(data);
    $.ajax({
      type: 'GET',
      data: data,
      url: '/api/weather'
    }).then(function(resp) {
      console.log('ayo we got a response!');
      console.log(resp);
      // createIcon(resp);
    });
  };

  // function createIcon(data) {
  //   var icon = data.weather[0].icon;
  //   switch(icon) {
  //     // sunny day
  //     case '01d':
  //       icon = 'wi-day-sunny'
  //       break;
  //     // clear night
  //     case '01n':
  //       icon = 'wi-night-clear'
  //       break;
  //     // few clouds day
  //     case '02d':
  //     case '03d':
  //     case '04d':
  //       icon = 'wi-day-cloudy'
  //       break;
  //     // few clouds night
  //     case '02n':
  //     case '03n':
  //     case '04n':
  //       icon = 'wi-night-alt-cloudy'
  //       break;
  //     // day rain
  //     case '09d':
  //     case '10d':
  //       icon = 'wi-day-rain'
  //       break;
  //     // night rain
  //     case '09n':
  //     case '10n':
  //       icon = 'wi-night-alt-rain'
  //       break;
  //     // thunderstorm day
  //     case '11d':
  //       icon = 'wi-day-thunderstorm'
  //       break;
  //     // thunderstorm night
  //     case '11n':
  //       icon = 'wi-night-thunderstorm'
  //       break;
  //     // day snow
  //     case '13d':
  //       icon = 'wi-day-snow'
  //       break;
  //     // night snow
  //     case '13n':
  //       icon = 'wi-night-snow'
  //       break;
  //     // day mist
  //     case '50d':
  //       icon = 'wi-cloudy'
  //       break;
  //     // night mist
  //     case '50n':
  //       icon = 'wi-cloudy'
  //       break;
  //     default:
  //       icon = 'wi-na'
  //   }
  //   var iconHTML = '<i class="weather-icon wi '+icon+'"></i>';
  //   appendHTML(data, iconHTML);
  // };

  // function appendHTML(data, icon) {
  //   $('.weather').append('<span>'+data.name+'</span>|<span>'+data.main.temp.toFixed()+'<sup>°F</sup></span>|<span>'+icon+'</span></span>');
  // };

  function init() {
    getInput();
  };

  return {
    init: init
  }

}();

Weather.init();