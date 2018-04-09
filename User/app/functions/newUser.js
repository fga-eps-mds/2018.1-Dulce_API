var User = require('./model/user');


module.exports = function (req, res) {

	var register = new User({
		'name' : req.body.name,
		'registration' : req.body.registration,
		'sector' : req.body.sector,
    'hospital' : req.body.hospital,
		'password' : req.body.password
	});

	register.save(function (err) {

		if (err) {
			console.log(err);
			res.send(err);
			res.end();
		}

	});
	res.send(register);
	res.end();
}
