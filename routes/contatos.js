//configuração das rotas de contatos.
module.exports = function (app) {
  var filterAction = require('./../middleware/autenticador');
  var contatos = app.controllers.contatos;

  app.get('/contatos', filterAction, contatos.index);
  app.get('/contatos/:id/edit', filterAction, contatos.edit);
  app.get('/contatos/:id/delete', filterAction, contatos.delete);
  app.post('/contatos/create', filterAction, contatos.create);
  app.post('/contatos/:id/update', filterAction, contatos.update);
  app.post('/contatos/:id/confirmDelete',filterAction,  contatos.confirmDelete);
};
