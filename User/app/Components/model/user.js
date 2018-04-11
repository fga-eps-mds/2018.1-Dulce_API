var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var Schema = mongoose.Schema;

UserSchema = new Schema({
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
})

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', UserSchema);
