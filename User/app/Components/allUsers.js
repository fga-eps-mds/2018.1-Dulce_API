var User = require('./model/user');

module.exports = (req, res) => {
	User.find(function(err, todos) {
		if (err) res.json(err);
		else res.json(todos);
	})
}
