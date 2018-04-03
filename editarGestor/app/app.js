//Exemplo de Web Service REST utilizando NodeJS e MongoDB em Containers Docker
//
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
	descricao : { type: String },
	concluido : Boolean,
	updated_at: { type: Date, default: Date.now },
});

//Model da aplicação
var Usuario = mongo.model('Tasks', taskListSchema);

//GET - Retorna todos os gestores existentes no banco
app.get("/api/all", function (req, res) {
	Usuario.find(function(err, todos) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});

app.put("/api/put/:id", function(req, res) {

    Model.findByIdAndUpdate(req.params.id, req.body ,function(err, post) {

        if (err) return next(err);
        	res.json(post);
        	res.json({ message: 'Atualizado !!' });

    });
 });

//Porta de escuta do servidor
app.listen(8080, function() {
	console.log('Funcionando');
});
