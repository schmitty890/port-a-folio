/* footer
 *
 * @type Object
 * @description $.footer Will hold options and functions.
 */
$.footer = {};

/* ---------------------
 * /// Footer Options ///
 * ---------------------
 * You can enable disable functions here
 */
$.footer.options = {

};


/* addDate()
 * ==========
 * Adds the year in the footer (ex: 2017)
 *
 * @type Function
 * @usage: $.footer.addDate()
 */
$.footer.addDate = function() {
  console.log('footer.addDate - function');
  var date = new Date(),
      year = date.getFullYear();
  $('.year').html(year);
};