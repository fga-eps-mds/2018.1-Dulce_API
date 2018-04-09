var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var newUser = require('./functions/newUser');
var allUsers = require('./functions/allUsers');
var viewUser = require('./functions/viewUser');
var login = require('./functions/login');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);


app.post('/user/add', newUser);
app.get('/user/all', allUsers);
app.post('/user/login', login);
app.get('/user/view/:id', viewUser);



app.listen(8080, function() {
	console.log('Funcionando');
});
