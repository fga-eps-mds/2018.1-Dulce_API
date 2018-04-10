var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('User', new Schema({
   name: {
     type: String,
     required: true,
   },
   registration: {
     type: String,
     unique: true,
     required: true
   },
   sector: {
     type: String
   },
   hospital: {
     type: String,
     required: true,
   },
   password: {
     type: String,
     required: true,
   },
   manager: Boolean
}));
