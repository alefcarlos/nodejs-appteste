(()=>{
  'use strict';
  //Módulos do nodejs
  let express = require('express');
  let consign = require('consign');
  let bodyParser = require('body-parser');
  let session = require('express-session');
  let expressLayouts = require('express-ejs-layouts');
  let methodOverride = require('method-override');
  let mongoose = require('mongoose');

  //Modulos customizados
  let pathName = require('./middleware/get-url-path');
  let error = require('./middleware/error');

  //letiávelda da aplicação
  let app = express();

  //configuração da sessão
  let sess = {
    secret: 'S3ssI0n',
    name: 'app_Session_Id',
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
       secure: false,
       maxAge: 60000
     }
  }

  //setup mongodb
  mongoose.connect('mongodb://localhost/app-teste',  (err) => {
    if (err) throw err;

    console.log('Conectado ao mongo');
  });

  //configuração de qual engine usaremos para a view
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  //configuração da página de layout
  app.set('layout', '_layout');
  app.set('layout extractScripts', true); //indicar que vamos usar o extractScripts, ou seja, todos os scripts estarão unificados.
  app.set('layout extractStyles', true); //a mesma que a de cima, mas para css.

  //Configuração da aplicação
  app.use(expressLayouts)
  app.use(session(sess));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(__dirname + '/public'));
  app.use('/scripts_node', express.static(__dirname + '/node_modules/'))
  app.use(methodOverride());
  app.use(pathName);

  //mapeamento de models/controllers/rotas
  consign('models')
    .then('controllers')
    .then('routes')
    .into(app);

  //Erros
  app.use(error.notFound);
  app.use(error.serverError);

  //iniciar o servidor
  app.listen(3000, function(){ console.log('tá no ar!!');})

  module.exports = app;
})();
