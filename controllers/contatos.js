//Controller de contatos(CRUD completo)
module.exports = function (app) {
  var ContatosController = {
    index: function (req, res) {
      var sess = req.session;

      var userSession = sess.usuario;

      res.render('contatos/index', { usuario: userSession });
    },
    create:function(req, res){
      if (!req.body) return res.sendStatus(400);

      var email = req.body.email;
      var nome = req.body.nome;

      if (email && nome)
      {
        var userSession = req.session.usuario;
        userSession.contatos.push({email: email, nome: nome});
      }

      res.redirect('/contatos');
    },
    update: function (req, res) {
      if (!req.body) return res.sendStatus(400);

      var id = req.params.id;
      var user = req.session.usuario;

      var email = req.body.email;
      var nome = req.body.nome;

      user.contatos[id] = {nome: nome, email: email};

      res.redirect('/contatos');
    },
    delete:function (req, res) {
      var id = req.params.id;

      var contato = req.session.usuario.contatos[id];

      if (!contato)
        return res.sendStatus(404);

      res.render('contatos/delete', { contato: contato, id: id });
    },
    confirmDelete:function (req, res) {
      var id = req.params.id;

      req.session.usuario.contatos.splice(id, 1);

      res.redirect('/contatos');
    },
    edit: function(req, res)
    {
      var id = req.params.id;

      var contato = req.session.usuario.contatos[id];

      if (!contato)
        return res.sendStatus(404);

      res.render('contatos/edit', { contato: contato, id: id });
    }
  };

  return ContatosController;
};
