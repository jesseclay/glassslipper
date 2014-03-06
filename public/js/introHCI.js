'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	/* 2 measurements: 
	* a) time from entry to submit
	* b) number of submits in a session
	*/

	ga("send", "event", "pageLoad", "init");
	var startTime = new Date().getTime();
	$(".shoeSearchForm").submit(recordSubmit);

	function recordSubmit() {
		var endTime = new Date().getTime();
		var timeSpent = endTime - startTime;
		ga('send', 'event', 'userInteractionTime', 'submit', 'loadToSearchTime', timeSpent);
		ga('send', 'timing', 'userInteractionTime', 'timeToSearch', timeSpent);
		ga("send", "event", "searchSubmit", "submit");
	}
}