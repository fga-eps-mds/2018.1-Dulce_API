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

//Model da aplicação
var Usuario = mongo.model('Tasks', taskListSchema);


app.get("/api/get/:id", function (req, res) {
	Usuario.find(function(err, post) {
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
