var express = require('express');
var mongo = require('mongoose');
var bodyParser = require('bodyParser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser({
    extended = true
}));

var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + '27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);

var taskListSchema = mongo.Schema({
    nome = { type : String},
    matricula = { type : String },
    setor = { type : String },
    senha = { type : String},
    hospital = { type: String },
});

var Model = mongo.model('Tasks', taskListSchema);

app.get("/api/:id", function(req, res){
    Model.find(req.params.id, req.body, function (err, post){
        
        if (err) {
			res.json(err);
		} else {
			res.json(post);
		}
    });
    
});

app.put("/api/put/:id", function(req, res) {
    
    Model.findByIdAndUpdate(req.params.id, req.body ,function(err, post) {

        'nome' = req.body.nome,
        'matricula' = req.body.matricula
        'setor' = req.body.setor,
        'senha' = req.body.senha,
        'hospital' = req.body.hospital

        if (err) return next(err);
        res.json(post); 
        res.json({ message: 'Atualizado !!' }); 

    });    
 });

 
app.listen(8080, function() {
	console.log('Funcionando');
});

 //Finalizando API para atualizar