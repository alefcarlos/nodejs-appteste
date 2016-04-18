exports.notFound = function (req, res, next) {
  res.status(404);
  res.render('not-found', {layout: '_layoutBase'});
};

exports.serverError = function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render('server-error', {error: err, layout: '_layoutBase'});
};
