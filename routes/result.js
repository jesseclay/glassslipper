var shoe_matches = require('../shoe_matches.json');
var shoe_catalog = require('../shoe_catalog.json');
var User = require('../models/user');

exports.result = function(req, res) {
  var user = req.user; 
  var input_brand_name = req.query.input_brand;
  var input_size = req.query.input_size;
  var output_brand = req.query.output_brand.split('|');
  var output_brand_name = output_brand[0];
  var output_brand_image_url = output_brand[1];
  var shoe_matches_key = input_brand_name + ',' + Number(input_size).toFixed(1);
  // currently takes the first element in this array, ultimately want to avg
  var matches = shoe_matches[shoe_matches_key];
  if (matches) {
    var output_size = matches[output_brand_name];
    if (output_size) {
      output_size = output_size[0];
    }
  } else {
    output_size = input_size;
  }

  if (user) {
    var email_user = user.local.email; 
    User.update({'local.email': email_user}, { $push: { 'history': {'brand_original': input_brand_name, 'size': input_size, 'brand_result': output_brand_name}}}, function(error) {
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
    'brand': output_brand_name,
    'output_size': output_size,
    'image_url': output_brand_image_url,
    'all_brands': shoe_catalog["shoe_brands"],
    'user': req.user 
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
  	});
	} else {
		req.flash('loginMessage', 'You need to login first!'); 
    	res.redirect('/login'); 
	}
}; 
