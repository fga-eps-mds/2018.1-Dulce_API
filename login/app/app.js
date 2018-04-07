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
      return res.json({
        message: 'password not found.'
      });
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
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      }
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
      })
    });
});


app.listen(8080,function(){
  console.log('Funcionando!');
})
