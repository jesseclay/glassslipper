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
