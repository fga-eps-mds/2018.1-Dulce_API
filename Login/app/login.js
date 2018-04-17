var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

module.exports = function Login(options) {

  this.add('role:login, cmd:authenticate', function(msg, respond) {

          var registration = msg.registration;
          var user = this.make('users')
    	     user.load$({registration},function(error, user) {
             if (!user) {
               respond( null,{
                 success: false,
                 message: 'Authentication failed. User not found.'
               });
             } else {
                if(msg.password == user.password ){
                  var payload = {
                    registration: msg.registration,
                    password: msg.password
                  }
                  var token = jwt.sign(payload, SECRET_KEY, {expiresIn});
                  respond(null,{
                    success: true,
                    message: 'Authentication succeded.',
                    token: token,
                    id: user._id
                  });
                } else {
                  respond(null,{
                    success: false,
                    message: 'Authentication failed. Wrong password'
                  })
                }
              }
    	});
    });
}
