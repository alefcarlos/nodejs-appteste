(()=>{
  'use strict';
  //Controller de login
  module.exports = function (app) {
    let User = require('./../models/user');

    let LoginController = {
      index: function (req, res, next) {
        res.render('login/index', { layout: '_layoutBase' });
      },
      login: function (req, res) {

        if (!req.body) return res.sendStatus(400);

        let sess = req.session

        let email = req.body.email;

        if (!email)
        return res.redirect('/');

        //Validar se o usuário existe:
        let query = { email: email };
        let userLogin = new User({email: email});

        userLogin.createIfNotExists(query, function (err, user) {
          if (err) throw err;
          sess.usuario = user;
          res.redirect('/home');
        });
      },
      logout: function (req, res) {
        let sess = req.session;
        sess.destroy();
        res.redirect('/');
      }
    };
    return LoginController;
  };
})();
