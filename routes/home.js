(()=>{
  'use strict';
  //configuração das rotas de home.
  module.exports = function (app) {
    let filterAction = require('./../middleware/autenticador');

    let home = app.controllers.home;
    app.get('/home', filterAction, home.index);
  };

})();
