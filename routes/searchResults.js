var shoe_matches = require('../shoe_matches.json');
var shoe_catalog = require('../shoe_catalog.json');

exports.showResults = function(req, res) {
  var brand1 = req.query.brand;
  var size1 = req.query.size;
  var brand2 = req.query.brandToFind.split('|');
  var brand2_name = brandToFind[0];
  var brand2_image_url = brandToFind[1];
  shoe_matches_key = [brand2_name, brand2_image_url].join(',')
  var size2 = shoe_matches[shoe_matches_key];

// do all the handling here for figuring out which shoes to match with

  res.render('result', {
    'brand': brand2_name,
    'size': size2,
    'image_url': brand2_image_url,
    'all_brands': shoe_catalog["shoe_brands"]
  });
};