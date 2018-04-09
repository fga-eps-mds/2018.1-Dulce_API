var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var newUser = require('./functions/newUser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);


app.post("/user/add", newUser);

app.listen(8080, function() {
	console.log('Funcionando');
});
