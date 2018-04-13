var User = require('./model/user');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';


module.exports = (req,res) => {
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
            var payload = req.body;
            var token = jwt.sign(payload, SECRET_KEY, {expiresIn});
            res.json({
              success: true,
              message: 'Authentication succeded.',
              token: token,
              id: user._id
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
