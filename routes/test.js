exports.view = function(req, res){
  var username = "Jesse";
  var month = "January";
  res.render('test', {
    'name' : username,
    'month' : month
  });
};