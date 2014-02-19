var User       		= require('../models/user');

exports.view = function(req, res) {
	var user = req.user; 
	var email_user = user.local.email; 
	//console.log("The email is: " + email_user); 
//pass in the arrays
  User.findOne({'local.email':email_user}, 'favorite_shoes', function(err, shoes) {
  	if (err) {
  		console.log(err);  
  	}
  	if(user) {
  		//var favoriteShoes = user.favorite_shoes; 
  		console.log("here is where shoes should be:" + shoes); 
  		res.render('favorites', {
  			'favs': shoes.favorite_shoes, 
  		});  
  	}
  });
} 