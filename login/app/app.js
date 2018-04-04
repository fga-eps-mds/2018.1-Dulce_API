var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var mongoose = require('require');
var config = require('./config');
var User = require('./users');
var jwt = require('jsonwebtoken');

var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);





app.get("/api/get/:id", function (req, res) {
  User.find(function(err, post) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});

app.post("/api/add", function(req,res){

  var criar = new User({
    'nome' : req.body.nome,
    'matricula' : req.body.nome,
    'setor' : req.body.nome,
    'senha' : req.body.nome,
    'hospital' : req.body.nome
  });

  criar.save(function(err){

    if(err){
      console.log(err);
      res.send(err);
      res.end();
    }
  });

  res.send(criar);
  res.end();
});


var apiRoutes = express.Router();

apiRoutes.post('/authenticate',function(req,res){
  User.findOne({name: req.body.name}, function(err,user){
    if(err) throw err;

    if(!user){
      res.json({success:false, message:'Authentication failed! User not found.'});
    }
    else if(user){
      if(user.password != req.body.password){
		res.json({success:false,message:'Authentication failed! Invalid password.'});
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
