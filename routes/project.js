exports.viewProject = function(req, res) {
  var name = req.params.name;
  console.log(name);
  var image = req.params.image_url;
  console.log(image);
  res.render('project', {
    'title' : name,
    'description' : "Description of project here",
    'image': image
  });

};