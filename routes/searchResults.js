var shoe_data = require('../shoe_stub_data.json');

exports.showResults = function(req, res) {
  var brand = req.query.brand;
  var size = req.query.size;
  var brandToFind = req.query.brandToFind;

  res.render('result', {
    'brand': brand,
    'size': size,
    'image_url' : '/images/brands/aqauzzura-logo.jpg',
    'all_brands': shoe_data["shoe_brands"]
  });
};