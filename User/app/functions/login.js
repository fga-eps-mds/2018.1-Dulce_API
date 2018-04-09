var User = require('./model/user');
var bcrypt = require('bcrypt');

module.exports = function(req,res){
  User.findOne({ registration: req.body.registration})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }
      else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result === true) {
            res.json({
              success: true,
              message: 'Authentication succeded.'
            });
          } else {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password'
            })
          }
        });
      }
    });
}
