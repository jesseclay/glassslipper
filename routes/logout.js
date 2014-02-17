exports.logout = function(req, res) {
		req.logout();
		req.flash('log_out', 'You have logged out!'); 
		res.redirect('/', { message: req.flash('log_out')});
}