// /* resume
//  *
//  * @type Object
//  * @description $.resume Will hold options and functions.
//  */
// $.resume = {};

// /* ---------------------
//  * /// Resume Options ///
//  * ---------------------
//  * You can enable disable functions here
//  */
// $.resume.options = {

// };


// /* lowes()
//  * ==========
//  * Add information to the Lowe's part of the resume
//  *
//  * @type Function
//  * @usage: $.resume.lowes()
//  */
// $.resume.lowes = function() {
//     console.log('resume.lowes - function');
// };


// /* addJobs()
//  * ==========
//  * Add information to the Employment part of the resume
//  *
//  * @type Function
//  * @usage: $.resume.addJobs()
//  */
// $.resume.addJobs = function() {
//     console.log('resume.addJobs - function');
//     var getJobData = (function() {

//         var getData = function() {
//             $.ajax({
//                 url: 'jobs.json',
//                 type: 'GET',
//                 success: function(data) {
//                     console.log(data);
//                     handleData(data);
//                 },
//                 error: function(xhr, status, error) {
//                     console.log('brooks bell data error');
//                 }
//             });
//         };

//         var handleData = function(data) {
//             addJobDiv(data);
//         };

//         var addJobDiv = function(data) {
//         	var jobs = data.jobs;
//         	var htmlToAdd = '';
//         	for(var i = 0; i < jobs.length; i++) {
//         		var job = jobs[i], // the job we are looping through
//         			jobCity = job.city, // the city the job is in
//         			jobState = job.state, // the state the job is in
//         			jobCompany = job.company, // the company worked for
//         			jobDesc = job.desc.copy, // the job description
//         			jobDescShow = job.desc.show, //the job description display option "true/false"
//         			jobEndDate = job.endDate, // the job end date
//         			jobStartDate = job.startDate, //the job start date
//         			jobTitle = job.title, //the job title
//         			jobResponsibilities = job.responsibilities, // the job responsibilities
//         			jobResponsibilitiesShow = jobResponsibilities.show, // the job responsibilities display option "true/false"
//         			jobResponsibilitiesDesc = jobResponsibilities.copy, // the job responsibilities description
//         			jobResponsibilitiesListItems = jobResponsibilities.list, // the job responsibilities list items
//         			jobLogo = job.logo, // the job company logo
//         			li = ''; // the list items html

//         		// add all list items to a variable to add into the html
// 				for(var j = 0; j < jobResponsibilitiesListItems.length; j++) {
// 					var theLi = jobResponsibilitiesListItems[j];

// 					if(jobResponsibilitiesShow === true) { //if job responsibilites are set to show
// 						li += '<li class="list-unstyled margin-bottom-10">' + theLi + '</li>';
// 					}

// 				}

// 				// add all html to a variable
//         		htmlToAdd += `<div class="resume-item row">
// 						        <div class="col-md-6 col-sm-6 resume-left wow fadeInUp" data-wow-delay="0.15s">
// 						          <div>
// 						          <a href="#"><img style="height: 50px; width: 50px" src="` + jobLogo + `"></a>
// 						            <h2 class="capitalize">` + jobCompany + `</h2>
// 						            <p>` + jobStartDate + `-` + jobEndDate + `</p>
// 						            <p class="capitalize">` + jobCity + `, ` + jobState + `</p>
// 						          </div>
// 						        </div>
// 						        <div class="col-md-6 col-sm-6 resume-right">
// 						          <h2 class="capitalize">`+jobTitle+`</h2>
// 						          <p>` + jobDesc + `</p>
// 						          <ul>` + li + `</ul>
// 						        </div>
// 						      </div>`;
//         	}

//         	$('.resume-js').append(htmlToAdd); // add html to the page

//         };

//         return {
//             init: getData // assign the return function
//         }
//     })();

//     getJobData.init(); // init job data

// };


// /* serviceSection()
//  * ==========
//  * Add information to the Lowe's part of the resume
//  *
//  * @type Function
//  * @usage: $.resume.serviceSection()
//  */
// $.resume.serviceSection = function() {
//     console.log('resume.serviceSection - function');
// };


// /* freelance()
//  * ==========
//  * Add information to the Freelance part of the resume
//  *
//  * @type Function
//  * @usage: $.resume.freelance()
//  */
// $.resume.freelance = function() {
//     console.log('resume.freelance - function');


// };