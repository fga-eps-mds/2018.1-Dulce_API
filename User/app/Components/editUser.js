var User = require('./model/user');

module.exports = (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body ,function(err, user) {

        if (err) return console.log(err);

        res.json({ message: 'Atualizado !!' });

    });
}