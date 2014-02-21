var shoe_matches = require('../shoe_matches.json');
var shoe_catalog = require('../shoe_catalog.json');
var User         = require('../models/user');

exports.results = function(req, res) {
  var user = req.user; 
  var brand1 = req.query.brand;
  var size1 = req.query.size;
  console.log(brandToFind);
  var brand2 = req.query.brandToFind.split('|');
  var brand2_name = brandToFind[0];
  var brand2_image_url = brandToFind[1];
  shoe_matches_key = [brand2_name, brand2_image_url].join(',')
  var size2 = shoe_matches[shoe_matches_key];

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
    'brand': brand2_name,
    'size': size2,
    'image_url': brand2_image_url,
    'all_brands': shoe_catalog["shoe_brands"]
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
