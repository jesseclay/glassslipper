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
        message: req.flash('postAddFavs')
      });  
    }
    });
  } else {
    req.flash('loginMessage', 'You need to login first!'); 
    res.redirect('/login'); 
  }
} 

exports.addToFavs = function(req, res) {
  var user=req.user; 
  if (user) {
    var brandToFind = req.body.brand;
    var size_result = req.body.size;
    var image_url = req.body.image_url; 
    var email_user = user.local.email; 
    var user_id = user._id; 
  //var lotsOfShoes = [{'brand':'something', 'size' : "numbers n shit here"}];
  
    //res.send? local.email?
    User.update({'local.email': email_user} , { $push: { 'favorite_shoes': { 'brand': brandToFind, 'size': size_result, 'image_url': image_url}}} , function(error) {
      if (error) return error;   
      console.log('Added %s with size=%s', brandToFind, size_result);
      var cursor = User.findOne({'local.email':email_user}, function(err, user) {
        if(err) 
          return done(err); 
        if (user) {
          console.log(user); 
        }
      }); 
        req.flash('postAddFavs', 'Saved to Favorites!'); 
        res.redirect('/favorites');
    });
  } else {
    req.flash('loginMessage', 'You need to login first!'); 
      res.redirect('/login'); 
  }
}; 
