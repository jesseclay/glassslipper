var passport = require('passport');
require('../config/passport')(passport); 

exports.view = function(req, res) {
	res.render('login.handlebars', { message: req.flash('loginMessage') });
};


exports.loginOrSignup = passport.authenticate('local-login', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
});
