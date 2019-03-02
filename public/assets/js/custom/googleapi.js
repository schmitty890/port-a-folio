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

  function postEvent(event) {
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
      var summary = $('.summary').val();
      var startTime = $('.start-date').val();
      var endTime = $('.end-date').val();


      startTime = convertTimeRealQuick(startTime);
      endTime = convertTimeRealQuick(endTime);

      // regex add a T at space, add :00 at end
      function convertTimeRealQuick(time) {
        time = time.replace(/ /g,"T");
        time += ':00';
        return time;
      }

      // create payload to send to server
      var event = {
        'summary': summary,
        'location': $('.location').val(),
        'description': $('.description').val(),
        'start': {
          'dateTime': startTime,
          'timeZone': 'America/New_York',
        },
        'end': {
          'dateTime': endTime,
          'timeZone': 'America/New_York',
        },
        'attendees': [
          {'email': $('.attendee-email').val(),
            'additionalGuests': $('.attendee-guests').val(),
            'comment': $('.attendee-comment').val()
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
      // send event to server
      postEvent(event);
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







var Form = function(){

  /**
   * [initDate. Our date fields should have an ID of #date. Any field with this id, will have the flatpickr calendar enabled on it
   * NOTE: There should not be more than one of the same ID on a form. if we need mulitple dates, create another id and add that handler here]
   */
  function initDate() {
    $(".start-date, .end-date").flatpickr({
      enableTime: true,
      dateFormat: "Y-m-d H:i"
    });
  }

  /**
   * [init. list of all the functions we run when we initalize the module.]
   */
  function init() {
    initDate();
  }

  return {
    init: init
  }

}();

Form.init();