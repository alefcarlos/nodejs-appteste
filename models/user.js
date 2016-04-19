(()=>{
  'use strict';
  let mongoose = require('mongoose');
  let Schema = mongoose.Schema;

  let contato = Schema({
    nome : String,
    email: String
  });

  let userSchema = Schema({
    email:{type: String, required: true, index : {unique: true}},
    contatos: [contato]
  });

  //Métodos customizados
  userSchema.statics.addContact = function (userId, contactModel, callback) {
    this.findById(userId, function (err, user) {
        if(err) throw err;

        user.contatos.push(contactModel);
        user.save(function (err) {
          if (err) throw err;

          return callback(err);
        });
    });
  };

  userSchema.methods.createIfNotExists = function (query, callback) {
    let self = this;
    this.model('User').findOne(query, function (err, user) {
      if (err) throw err;

      //Se o usuário existir, usá-lo, senão criar o usuário e retornar no callback.
      if (user){
        console.log('Achou usuário:' + user.email);
        return callback(err, user);
      }
      else {
        console.log('vai criar um usuário:' + self.email);
        self.save(function (err, userSaved) {
          if (err) throw err;

          return callback(err, userSaved);
        });
      }
    });
  };


  let User = mongoose.model('User', userSchema);

  module.exports = User;
})();
