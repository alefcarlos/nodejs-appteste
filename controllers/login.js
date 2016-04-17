//Controller de login
module.exports = function (app) {
  var User = require('./../models/user');

  var LoginController = {
    index: function (req, res) {
        res.render('login/index', { layout: '_layoutLogin' })
    },
    login: function (req, res) {
      if (!req.body) return res.sendStatus(400);

      var sess = req.session

      var email = req.body.email;

      if (!email)
        return res.redirect('/');

      //Validar se o usuário existe:
      var query = { email: email };
      var userLogin = new User({email: email});

      userLogin.createIfNotExists(query, function (err, user) {
        if (err) throw err;
        sess.usuario = user;
        res.redirect('/home');
      });
    },
    logout: function (req, res) {
      var sess = req.session;
      sess.destroy();
      res.redirect('/');
    }
  };
  return LoginController;
};
