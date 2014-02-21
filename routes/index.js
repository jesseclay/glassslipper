var shoe_data = require('../shoe_catalog.json');

exports.landing = function(req, res) {
  res.render('landing', { 
  	message: req.flash('log_out') ,
  	'user': req.user 
  });
};

exports.search = function(req, res) {
  res.render('search', {
    'sizes': shoe_data["shoe_sizes"],
    'brands': shoe_data["shoe_brands"],
    'user': req.user 
  });
};

exports.postAddShoe = function(req, res) {
	req.flash('log_out', 'Thanks for submitting your brand, we got it :)'); 
	res.redirect('/'); 
}