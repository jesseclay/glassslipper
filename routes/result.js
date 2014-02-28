var shoe_matches = require('../shoe_matches.json');
var shoe_catalog = require('../shoe_catalog.json');
var User = require('../models/user');

exports.result = function(req, res) {
  var user = req.user; 
  var input_brand = req.query.input_brand.split('|');
  var input_brand_name = input_brand[0];
  var input_brand_image_url = input_brand[1];
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
  }

  if (user) {
    var email_user = user.local.email; 
    User.update({'local.email': email_user}, { $push: { 'history': {'brand_original': input_brand_name, 'size': input_size, 'brand_result': output_brand_name, 'original_image_url': input_brand_image_url, 'result_image_url': output_brand_image_url}}}, function(error) {
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

exports.alternateResult = function(req, res) {
  var user = req.user; 
  var input_brand_name = req.query.want;
  var output_brand_name = req.query.have;
  // var input_brand = req.query.want
  // var input_brand = req.query.input_brand.split('|');
  // var input_brand_name = input_brand[0];
  var input_brand_image_url;
  var output_brand_image_url;
  for (var i = 0; i < shoe_catalog["shoe_brands"].length; i++) {
    var brand = shoe_catalog["shoe_brands"][i]["brand"];

    var input = input_brand_name.toLowerCase();
    var output = output_brand_name.toLowerCase();
    var json_brand = brand["name"].toLowerCase();


    // console.log(brand);

    if (json_brand == input) {
      input_brand_image_url = brand["image_url"];
      console.log("input brand match!");
    }
    if (json_brand == output) {
      output_brand_image_url = brand["image_url"];
    }
  }

  var input_size = req.query.input_size;
  // var output_brand = req.query.output_brand.split('|');
  // var output_brand_name = output_brand[0];
  // var output_brand_image_url = output_brand[1];
  var shoe_matches_key = input_brand_name + ',' + Number(input_size).toFixed(1);
  // currently takes the first element in this array, ultimately want to avg
  var matches = shoe_matches[shoe_matches_key];
  if (matches) {
    var output_size = matches[output_brand_name];
    if (output_size) {
      output_size = output_size[0];
    }
  }

  if (user) {
    var email_user = user.local.email; 
    User.update({'local.email': email_user}, { $push: { 'history': {'brand_original': input_brand_name, 'size': input_size, 'brand_result': output_brand_name, 'original_image_url': input_brand_image_url, 'result_image_url': output_brand_image_url}}}, function(error) {
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
      	res.redirect('/favorites');
  	});
	} else {
		req.flash('loginMessage', 'You need to login first!'); 
    	res.redirect('/login'); 
	}
}; 
