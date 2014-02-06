var shoe_data = require('../shoe_stub_data.json');

exports.view = function(req, res) {
  res.render('index', {
    'sizes': shoe_data["shoe_sizes"],
    'brands': shoe_data["shoe_brands"]
  });
};
