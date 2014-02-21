	var passport = require('passport');
require('../config/passport')(passport); 

exports.view = function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.handlebars', {message: req.flash('signupMessage') });
};

exports.sendData = passport.authenticate('local-signup', {
		successRedirect : '/favorites', // redirect to the favorites page
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
});