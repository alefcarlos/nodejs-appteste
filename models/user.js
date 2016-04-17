var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contato = new Schema({
  nome : String,
  email: String
});

var userSchema = new Schema({
  email:{type: String, required: true, index : {unique: true}},
  contatos: [contato]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
