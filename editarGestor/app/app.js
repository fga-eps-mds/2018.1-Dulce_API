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

