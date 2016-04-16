//Controller de login
module.exports = function (app) {
  var LoginController = {
    index: function (req, res) {
        res.render('login/index', { layout: '_layoutLogin' })
    },
    login: function (req, res) {
      if (!req.body) return res.sendStatus(400);

      var sess = req.session

      var email = req.body.email;
      var senha = req.body.senha;

      if (!email && !senha)
        return res.redirect('/');

      var usuario = { email: email, senha: senha};
      usuario['contatos'] = [];

      //inserir para teste
      usuario.contatos.push({nome:'alef', email: 'alef.carlos@gmail.com'});

      sess.usuario = usuario;

      res.redirect('/home');
    },
    logout: function (req, res) {
      var sess = req.session;
      sess.destroy();
      res.redirect('/');
    }
  };
  return LoginController;
};
