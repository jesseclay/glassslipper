var shoe_data = require('../shoe_stub_data.json');
var User       		= require('../models/user');

exports.showResults = function(req, res) {
  var user = req.user; 
  var brand = req.query.brand;
  var size = req.query.size;
  var brandToFind = req.query.brandToFind;
  if (user) {
  	var email_user = user.local.email; 
  	User.update({'local.email': email_user}, { $push: { 'history': {'brand_original': brand, 'size': size, 'brand_result': brandToFind}}}, function(error) {
  		if (error) return error;   
		var cursor = User.findOne({'local.email':email_user}, function(err, user) {
			if(err) 
				return done(err); 
			if (user) {
				console.log(user); 
			}
		});
	});  
  }; 

  res.render('result', {
    'brand': brand,
    'size': size,
    'image_url' : '/images/brands/bearpaw.png',
    'all_brands': shoe_data["shoe_brands"]
  });
};

exports.addToFavs = function(req, res) {
	var user=req.user; 
	if (user) {
		var brandToFind = req.body.brand;
 	var size_result = req.body.size; 
 	var email_user = user.local.email; 
 	var user_id = user._id; 
 	//var lotsOfShoes = [{'brand':'something', 'size' : "numbers n shit here"}];

  	//res.send? local.email?
	User.update({'local.email': email_user} , { $push: { 'favorite_shoes': { 'brand': brandToFind, 'size': size_result}}} , function(error) {
		if (error) return error;   
		console.log('Added %s with size=%s', brandToFind, size_result);
		var cursor = User.findOne({'local.email':email_user}, function(err, user) {
			if(err) 
				return done(err); 
			if (user) {
				console.log(user); 
			}
		}); 
    	res.redirect('/favorites');
	})
	} else {
		req.flash('loginMessage', 'You need to login first!'); 
    	res.redirect('/login'); 
	}
}; 