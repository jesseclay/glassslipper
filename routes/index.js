var shoe_data = require('../shoe_catalog.json');

exports.landing = function(req, res) {
  res.render('landing', { message: req.flash('log_out') });
};

exports.search = function(req, res) {
  res.render('search', {
    'sizes': shoe_data["shoe_sizes"],
    'brands': shoe_data["shoe_brands"]
  });
};