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
var Model = mongo.model('Tasks', taskListSchema);


app.get("/api/get/:id", function (req, res) {
	Model.find(function(err, post) {
		if (err) {
			res.json(err);
		} else {
			res.json(todos);
		}
	})
});

app.listen(8080, function() {
	console.log('Funcionando');
});

//Finalizando API Visualizar