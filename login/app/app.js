var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var User = require('./user');
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);



app.post("/api/add", function (req, res) {



		var register = new User({
			'name' : req.body.name,
			'registration' : req.body.registration,
			'password' : req.body.password,
			'manager' : req.body.manager
		});
	if (req.body.registration && req.body.password) {
		register.save(function (err) {

			if (err) {
				console.log(err);
				res.send(err);
				res.end();
			}

		});
	}
	res.send(register);
	res.end();


});


app.post('/authenticate',function(req,res){
  User.findOne({name: req.body.name}, function(err,user){
    if(err) throw err;

    if(!user){
      res.json({success:false, message:'Authentication failed! User not found.'});
    }
    else if(user){
      if(user.password != req.body.password){
		res.json({
			success:false,
			message:'Authentication failed! Invalid password.'
		});
      } else {
		var token = jwt.sign({name:user.name}, app.get('superSecret'),{ expiresInMinutes: 1440});
		res.json({
		  success: true,
		  message: 'Enjoy your token!',
		  token: token
		});
      }
    }
  });
});


app.listen(8080,function(){
  console.log('Funcionando!');
})
