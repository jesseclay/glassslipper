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
	$(".shoeSearchForm").submit(recordSubmit);

	function recordSubmit() {
		ga("send", "event", "searchSubmit", "submit");
	}
}