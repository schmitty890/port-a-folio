var GoogleAPI = function(){
  console.log('googleapi.js');

  function getCalendar() {
    $.ajax({
      type: 'GET',
      url: '/api/google-api'
    }).then(function(resp) {
      console.log('google-api response');
      console.log(resp);
    });
  };

  function init() {
    getCalendar();
  };

  return {
    init: init
  }

}();

GoogleAPI.init();







