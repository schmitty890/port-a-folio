var GoogleAPI = function(){
  console.log('client - googleapi.js');

  function getCalendar() {
    $.ajax({
      type: 'GET',
      url: '/api/google-api'
    }).then(function(resp) {
      console.log('google-api response');
      console.log(resp);
    });
  };

  function postEvent() {

    // @TODO: get user input, pass it to post /api/google-api
    var event = {
      'summary': 'The main title',
      'location': '1416 enchanted oaks dr',
      'description': 'a lovely description',
      'start': {
        'dateTime': '2019-03-13T21:10:00',
        'timeZone': 'America/New_York',
      },
      'end': {
        'dateTime': '2019-03-15T21:00:00',
        'timeZone': 'America/New_York',
      },
      'attendees': [
        {'email': 'schmitty890@gmail.com',
          'additionalGuests': 1,
          'comment': 'the guests personal comment',
          'displayName': 'Jason'
        },
        {'email': 'anotherperson@example.com'},
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10},
        ],
      }
    };
    console.log(event);
    $.ajax("/api/google-api", {
      type: "POST",
      data: event
    }).then(function(resp) {
      console.log('post: google-api response');
      console.log(resp);
    });
  }

  function bindEvents() {
    $(document).on('click', '#get-events', function() {
      console.log('get-events clicked!');
      getCalendar();
    });
    $(document).on('click', '#post-event', function() {
      console.log('post-event clicked!');
      postEvent();
    });
  }

  function init() {
    // getCalendar();
    // postEvent();
    bindEvents();
  };

  return {
    init: init
  }

}();

GoogleAPI.init();







