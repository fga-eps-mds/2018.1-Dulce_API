var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);

var taskListSchema = mongo.Schema({
	nome : { type: String },
	matricula : { type: String },
  setor : { type: String },
  senha : { type: String },
  hospital : { type: String },
});

var Model = mongo.model('Tasks', taskListSchema);

//Cria usuario gestor

app.post("/api/add", function(req,res){

  var criar = new Model({
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

app.listen(8080, function(){
  console.log(Rodando);
})

//Fim da API
