exports.index = function(req, res){
  res.render('bid-ok', {url : req.query["url"]});
};
