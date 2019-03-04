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
    console.log('sending event');
    // console.log('send to ajax function');
    // $.each( event, function( key, value ) {
    //   $.ajax("/api/google-api", {
    //     type: "POST",
    //     async: true,
    //     data: value
    //   }).then(function(resp) {
    //     $('#google-api-msg').prepend(`
    //       <div class="notification is-success">
    //         <button class="delete"></button>
    //         <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
    //       </div>
    //       `);
    //     });
    // });
    // for(var i = 0; i < event.length; i++) {
    //     $.ajax("/api/google-api", {
    //       type: "POST",
    //       async: true,
    //       data: event[i]
    //     }).done(function(resp) {
    //       $('#google-api-msg').prepend(`
    //         <div class="notification is-success">
    //           <button class="delete"></button>
    //           <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
    //         </div>
    //         `);
    //       });
    // }

    $.ajax("/api/google-api", {
      type: "POST",
      async: true,
      data: event[0]
    }).then(function(resp) {
      $('#google-api-msg').prepend(`
        <div class="notification is-success">
          <button class="delete"></button>
          <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
        </div>
        `);
      // console.log('send to ajax function');
      $.ajax("/api/google-api", {
        type: "POST",
        async: true,
        data: event[1]
      }).then(function(resp) {
        $('#google-api-msg').prepend(`
          <div class="notification is-success">
            <button class="delete"></button>
            <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
          </div>
          `);
        // console.log('send to ajax function');
        $.ajax("/api/google-api", {
          type: "POST",
          async: true,
          data: event[2]
        }).then(function(resp) {
          $('#google-api-msg').prepend(`
            <div class="notification is-success">
              <button class="delete"></button>
              <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
            </div>
            `);
            // console.log('send to ajax function');
            $.ajax("/api/google-api", {
              type: "POST",
              async: true,
              data: event[3]
            }).then(function(resp) {
              $('#google-api-msg').prepend(`
                <div class="notification is-success">
                  <button class="delete"></button>
                  <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
                </div>
                `);
                // console.log('send to ajax function');
                $.ajax("/api/google-api", {
                  type: "POST",
                  async: true,
                  data: event[4]
                }).then(function(resp) {
                  $('#google-api-msg').prepend(`
                    <div class="notification is-success">
                      <button class="delete"></button>
                      <strong>Success! </strong>${resp.summary} has been created on ${resp.end.date}.
                    </div>
                    `);
                  $('.google-api-progress').addClass('hide');
                });
            });
        });
      });
    });
  }



  function bindEvents() {

    // when detete notification is clicked
    $(document).on('click', '.delete', function() {
      $(this).parent('.notification').remove();
    });
    // clear the form values
    $(document).on('click', '.clear-google-form', function() {
      $('#google-calendar input').val('');
      $('#google-api-msg').empty();
    });
    // get the events from our calendar
    $(document).on('click', '#get-events', function() {
      console.log('get-events clicked!');
      getCalendar();
    });
    // gather input form values and send object to ajax post method
    $(document).on('click', '#post-event', function() {
      console.log('remove progress hide class');
      $('.google-api-progress').removeClass('hide');
      var summary = $('.summary').val();
      var startDate = $('.date').val();
      var twoWeeksOut = moment(startDate).subtract(14,'d').format('YYYY-MM-DD');
      var fourWeeksOut = moment(startDate).subtract(28,'d').format('YYYY-MM-DD');
      var sixWeeksOut = moment(startDate).subtract(42,'d').format('YYYY-MM-DD');
      var eightWeeksOut = moment(startDate).subtract(56,'d').format('YYYY-MM-DD');

      // // we need a start date for the google api
      if(startDate !== '') {

        // create payload to send to server
        var event = [{
          'summary': summary,
          'location': $('.location').val(),
          'description': $('.description').val(),
          'start': {
            'date': startDate,
            'timeZone': 'America/New_York',
          },
          'end': {
            'date': startDate,
            'timeZone': 'America/New_York',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': (1 * 24 * 60) - (60 * 7)}
            ],
          }
        }, {
          'summary': summary + ' - two weeks out',
          'location': $('.location').val(),
          'description': 'final checklist',
          'start': {
            'date': twoWeeksOut,
            'timeZone': 'America/New_York',
          },
          'end': {
            'date': twoWeeksOut,
            'timeZone': 'America/New_York',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': (1 * 24 * 60) - (60 * 7)}
            ],
          }
        }, {
          'summary': summary + ' - four weeks out',
          'location': $('.location').val(),
          'description': 'gather permissions',
          'start': {
            'date': fourWeeksOut,
            'timeZone': 'America/New_York',
          },
          'end': {
            'date': fourWeeksOut,
            'timeZone': 'America/New_York',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': (1 * 24 * 60) - (60 * 7)}
            ],
          }
        }, {
          'summary': summary + ' - six weeks out',
          'location': $('.location').val(),
          'description': 'submit paper 2',
          'start': {
            'date': sixWeeksOut,
            'timeZone': 'America/New_York',
          },
          'end': {
            'date': sixWeeksOut,
            'timeZone': 'America/New_York',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': (1 * 24 * 60) - (60 * 7)}
            ],
          }
        }, {
          'summary': summary + ' - eight weeks out',
          'location': $('.location').val(),
          'description': 'submit paper 1',
          'start': {
            'date': eightWeeksOut,
            'timeZone': 'America/New_York',
          },
          'end': {
            'date': eightWeeksOut,
            'timeZone': 'America/New_York',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': (1 * 24 * 60) - (60 * 7)}
            ],
          }
        }];
        // send event to server
        
        postEvent(event);
        
        
      } else {
        // let user know they need to enter a start date
        $('#google-api-msg').append(`
          <div class="notification is-danger">
            <button class="delete"></button>
            Enter a date!
          </div>`);
        $('.google-api-progress').addClass('hide');
      }

      
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
    $(".date").flatpickr({
      // enableTime: true,
      // dateFormat: "Y-m-d H:i"
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