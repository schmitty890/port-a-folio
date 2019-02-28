    // Register a helper
    Handlebars.registerHelper('capitalize', function(str){
      // str is the argument passed to the helper when called
      str = str || '';
      return str.slice(0,1).toUpperCase() + str.slice(1);
    });

    // Register a helper
    Handlebars.registerHelper('momentFromNowTime', function(time){
      return moment.unix(time).fromNow();
    });

    // Register a helper
    Handlebars.registerHelper('weathericon', function(icon){
      console.log(icon);
      switch(icon) {
        // sunny day
        case '01d':
          return 'wi-day-sunny'
          break;
        // clear night
        case '01n':
          return 'wi-night-clear'
          break;
        // few clouds day
        case '02d':
        case '03d':
        case '04d':
          return 'wi-day-cloudy'
          break;
        // few clouds night
        case '02n':
        case '03n':
        case '04n':
          return 'wi-night-alt-cloudy'
          break;
        // day rain
        case '09d':
        case '10d':
          return 'wi-day-rain'
          break;
        // night rain
        case '09n':
        case '10n':
          return 'wi-night-alt-rain'
          break;
        // thunderstorm day
        case '11d':
          return 'wi-day-thunderstorm'
          break;
        // thunderstorm night
        case '11n':
          return 'wi-night-thunderstorm'
          break;
        // day snow
        case '13d':
          return 'wi-day-snow'
          break;
        // night snow
        case '13n':
          return 'wi-night-snow'
          break;
        // day mist
        case '50d':
          return 'wi-cloudy'
          break;
        // night mist
        case '50n':
          return 'wi-cloudy'
          break;
        default:
          return 'wi-na'
      }
    });