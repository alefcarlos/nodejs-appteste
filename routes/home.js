//configuração das rotas de home.
module.exports = function (app) {
  var filterAction = require('./../middleware/autenticador');

  var home = app.controllers.home;
  app.get('/home', filterAction, home.index);
};
