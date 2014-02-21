var User = require('../models/user');

exports.view = function(req, res) {
	var user = req.user; 
  if(user) {
    var email_user = user.local.email; 
    User.findOne({'local.email':email_user}, 'favorite_shoes', function(err, shoes) {
    if (err) {
      console.log(err);  
    }
    if(user) {
      res.render('favorites', {
        'favorite_shoes': shoes.favorite_shoes, 
      });  
    }
    });
  } else {
    req.flash('loginMessage', 'You need to login first!'); 
    res.redirect('/login'); 
  }
<<<<<<< HEAD
} 
=======
}
>>>>>>> 278ab7242b20dc2ac820cd2656719b4fe532f502
