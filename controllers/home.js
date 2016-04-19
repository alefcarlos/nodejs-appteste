(()=>{
  'use strict';
  module.exports = function (app) {
    let HomeController = {
      index: function (req, res) {
        let sess = req.session;
        
        let userSession = sess.usuario;

        res.render('home/index', { usuario: userSession });
      }
    };
    return HomeController;
  };

})();
