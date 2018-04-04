var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = moongose.model('User', new Schema({
   name: String,
   password: String,
   manager: Boolean
}));
