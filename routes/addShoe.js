exports.view = function(req, res) {
  res.render('addShoe', {
  	'user': req.user,
  }); 
}