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
      User.findOne(query, function (err, user) {
        if (err) throw err;
        console.log('tentou logar ' + query.email);

        //Se o usuário exister, usá-lo, senão criar o usuário e salvar na sessão.
        if (user){
          console.log('encontrou usuario' + user);
          sess.usuario = user;

          console.log(sess.usuario);

          res.redirect('/home');
        }
        else {
          console.log('usuario não existe');
          var usuario = new User({
              email: email
          });

          usuario.save(function (err) {
            if (err) throw err;

            console.log('Novo usuário criado');
          });

          sess.usuario = usuario;

          console.log(sess.usuario);

          res.redirect('/home');
        }
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
