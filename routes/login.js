(()=>{
  'use strict';
  //configuração das rotas de login.
  module.exports = function (app) {
    let login = app.controllers.login;
    app.get('/', login.index);
    app.post('/entrar', login.login);
    app.get('/sair', login.logout);
  };

})();
