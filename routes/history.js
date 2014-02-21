var User       		= require('../models/user');

exports.view = function(req, res) {
	var user = req.user; 
  if(user) {
    var email_user = user.local.email; 
  //console.log("The email is: " + email_user); 
//pass in the arrays
  User.findOne({'local.email':email_user}, 'history', function(err, hist) {
    if (err) {
      console.log(err);   
    }
      //var favoriteShoes = user.favorite_shoes; 
      console.log("here is where shoes should be:" + hist); 
      res.render('history', {
        'hist': hist.history, 
      });  
    });
  } else {
    req.flash('loginMessage', 'You need to login first!'); 
    res.redirect('/login'); 
  }
}