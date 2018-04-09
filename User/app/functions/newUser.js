var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Conexão com o MongoDB
var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);

//Esquema da collection do Mongo
var taskListSchema = mongo.Schema({
	nome : { type: String },
	matricula : { type: String },
  	setor : { type: String },
  	senha : { type: String },
  	hospital : { type: String },
});

//Model da aplicação
var Usuario = mongo.model('Tasks', taskListSchema);

//POST - Adiciona um Gestor
app.post("/api/add", function (req, res) {

	var register = new Usuario({
		'nome' : req.body.nome,
		'matricula' : req.body.matricula,
		'setor' : req.body.setor,
		'senha' : req.body.senha,
		'hospital' : req.body.hospital
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
});

//Porta de escuta do servidor
app.listen(8080, function() {
	console.log('Funcionando');
});
