//Controller de contatos(CRUD completo)
module.exports = function (app) {
  var User = require('./../models/user');

  var ContatosController = {
    index: function (req, res) {
      var _id = req.session.usuario._id;

      User.findById(_id, function (err, user) {
        if(err) throw err;

        res.render('contatos/index', { usuario: user });
      });
    },
    create:function(req, res){
      if (!req.body) return res.sendStatus(400);

      var email = req.body.email;
      var nome = req.body.nome;

      if (email && nome)
      {
        var _id = req.session.usuario._id;

        User.findById(_id, function (err, user) {
          if(err) throw err;

          user.contatos.push({ email: email, nome: nome });
          user.save(function (err) {
            if (err) throw err;

            console.log('contato salvo com sucesso!');

            res.redirect('/contatos');
          });
        });
      }
    },
    update: function (req, res) {
      if (!req.body) return res.sendStatus(400);

      var contatoId = req.params.id;
      var _id = req.session.usuario._id;

      User.findById(_id, function (err, user) {
        if(err) throw err;

        var contato = user.contatos[contatoId];

        contato.nome = req.body.nome;
        contato.email = req.body.email;

        user.save(function (err) {
          if (err) throw err;

          console.log('contato atualizado com sucesso!');

          res.redirect('/contatos');
        });
      });
    },
    delete:function (req, res) {
      var contatoId = req.params.id;
      var _id = req.session.usuario._id;

      User.findById(_id, function (err, user) {
        if(err) throw err;

        var contato = user.contatos[contatoId];

        if (!contato)
          return res.sendStatus(404);

        res.render('contatos/delete', { contato: contato, id: contatoId });

      });
    },
    confirmDelete:function (req, res) {
      var _contatoId = req.params.id;
      var _id = req.session.usuario._id;

      User.findById(_id, function (err, user) {
        if(err) throw err;

        var contatoId = user.contatos[_contatoId]._id;
        user.contatos.id(contatoId).remove();

        user.save(function (err) {
          if (err) throw err;

          console.log('contato deletado com sucesso!');

          res.redirect('/contatos');
        });
      });
    },
    edit: function(req, res){
      var contatoId = req.params.id;
      var _id = req.session.usuario._id;

      User.findById(_id, function (err, user) {
        if(err) throw err;

        var contato = user.contatos[contatoId];

        if (!contato)
          return res.sendStatus(404);

        res.render('contatos/edit', { contato: contato, id: contatoId });

      });
    }
  };

  return ContatosController;
};
