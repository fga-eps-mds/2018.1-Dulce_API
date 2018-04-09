var User = require('./model/user');

module.exports = function (req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.json(err);
		} else {
			res.json(user);
		}
	});
}
