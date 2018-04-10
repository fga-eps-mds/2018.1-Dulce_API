var User = require('./model/user');
var bcrypt = require('bcrypt');

module.exports = (req, res) => {

    bcrypt.hash(req.body.password, 10, function (err, hash){

      if (err) {
        return res.json({
          message: 'password not found.'
        });
      }
  		var register = new User({
  			'name' : req.body.name,
  			'registration' : req.body.registration,
        'sector' : req.body.sector,
        'hospital' : req.body.hospital,
  			'password' : hash,
  			'manager' : req.body.manager
        });

  		register.save(function (err) {

  			if (err) {
  				console.log(err);
  				res.end();
  			}
  		});
  	res.send(register);
  	res.end();

    });
  }
