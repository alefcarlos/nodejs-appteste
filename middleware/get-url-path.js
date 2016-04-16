//middleware para retornar qual url nós estamos
module.exports = function (req, res, next) {
  res.locals.path = req.url;

  next();
};
