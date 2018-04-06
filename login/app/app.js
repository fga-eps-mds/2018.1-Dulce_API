var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var User = require('./user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);

app.post("/api/add", function (req, res) {

  bcrypt.hash(req.body.password, 10, function (err, hash){

    if (err) {
      return next(err);
    }
		var register = new User({
			'name' : req.body.name,
			'registration' : req.body.registration,
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
});


app.post('/authenticate',function(req,res){
  User.findOne({ registration: req.body.registration})
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('Usuario nao enco');
        err.status = 401;
        return console.log("Erro!")
      }
      bcrypt.compare(req.body.password , user.password, function (err, result) {
        if (result === true) {
          return console.log("Usuario logado!!");
        } else {
          return console.log("Erro! Senha invalida!");
        }
      })
    });
});

app.listen(8080,function(){
  console.log('Funcionando!');
})
