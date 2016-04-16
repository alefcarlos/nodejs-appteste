module.exports = function (app) {
  var HomeController = {
    index: function (req, res) {
      var sess = req.session;

      var userSession = sess.usuario;

      res.render('home/index', { usuario: userSession });
    }
  };
  return HomeController;
};
