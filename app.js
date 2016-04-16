//Módulos do nodejs
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');

//Modulos customizados
var pathName = require('./middleware/get-url-path');

//variávelda da aplicação
var app = express();

//configuração da sessão
var sess = {
  secret: 'keyntalk',
  resave: true,
  saveUninitialized: false,
  cookie: {
     secure: false,
     maxAge: 60000
   }
}

//configuração de qual engine usaremos para a viw
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
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

//iniciar o servidor
app.listen(3000, function(){ console.log('tá no ar!!');})

module.exports = app;
