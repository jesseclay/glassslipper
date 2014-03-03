'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	validateForm(); 	
}

function validateForm() {
	var pswd = document.forms["myForm"]["password"].value; 
	var confirm_pswd = document.forms["myForm"]["confirm_password"].value; 
	if (pswd != confirm_pswd) {
		alert("Your passwords don't match!"); 
		return false; 
	}
	//return true; 
}