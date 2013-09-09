
exports.index = function(req, res) {
  res.render('index',{city: city  });
};

exports.search_page = function(req, res) {
	var tar= req.params.target;
  res.render('search_page',{newtarget: tar});
};
exports.see = function(req, res) {
	res.send('<div style="text-align:center; color: #5bc0de; padding:20px;"><h1>Opps! 404, page not found</h1><a href="http://hotelsquare.azurewebsites.net/">Go Home!</a></div>');
};

