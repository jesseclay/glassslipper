var shoe_data = require('../shoe_stub_data.json');

exports.showResults = function(req, res) {
  var brand = req.query.brand;
  console.log("brand:" + brand);
  var size = req.query.size;
  console.log("size: " + size);

  res.render('results', {
    'brand': brand,
    'size': size,
    'all_brands': shoe_data["shoe_brands"]
  });
};