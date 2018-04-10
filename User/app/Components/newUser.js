var User = require('./model/user');
var bcrypt = require('bcrypt');

module.exports = (req, res) => {

    bcrypt.hash(req.body.password, 10, function (err, hash){

      if (err) {
        return res.json({
          message: 'password not found.'
        });
      }
      if (req.body.name, req.body.registration, req.body.sector, req.body.hospital, req.body.password, req.body.manager) {

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

   } else{
    res.json({
      success: false,
      message: 'something is missing or wrong.'
    });
   }

    });
  }
