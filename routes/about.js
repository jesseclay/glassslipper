exports.view = function(req, res) {
  res.render('about', {
  		'user': req.user,
  	}); 
}
