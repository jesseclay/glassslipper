var shoe_data = require('../shoe_stub_data.json');


exports.landing = function(req, res) {
  res.render('landingPage', {});
};


exports.search = function(req, res) {
  res.render('search', {
    'sizes': shoe_data["shoe_sizes"],
    'brands': shoe_data["shoe_brands"]
  });
};
