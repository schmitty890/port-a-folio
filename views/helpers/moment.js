/**
 * Description:   Handlebar moment.js helper functions 
 * Created:       04.05.2019
 **/
const moment = require('moment');

var momentHelpers = {
  momentFromNowTime: function(time){
    if(time === "present") {
      time = moment();
    }
    return moment(time).fromNow();
  },
  dayMonthYear: function(time) {
    return moment(time, 'YYYY-MM-DD').format('MMMM DD YYYY');
  },
  bar: function(){
    return "BAR";
  },
  monthsBetweenDates: function(start, end) {
    if(end === "present") {
      end = moment();
    }
    return Math.abs(moment(start).diff(end, "months"));
  },
  weeksBetweenDates: function(start, end) {
    if(end === "present") {
      end = moment();
    }
    return Math.abs(moment(start).diff(end, "weeks"));
  },
  daysBetweenDates: function(start, end) {
    if(end === "present") {
      end = moment();
    }
    return Math.abs(moment(start).diff(end, "days")); 
  }
};

module.exports = momentHelpers;