var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
const jwt = require('jsonwebtoken');


var newUser = require('./Components/newUser');
var allUsers = require('./Components/allUsers');
var viewUser = require('./Components/viewUser');
var editUser = require('./Components/editUser');
var login = require('./Components/login');

const SECRET_KEY = '123456789';
const expiresIn = '1h';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
console.log(mongoaddr);
mongo.connect(mongoaddr);



app.post('/user/add', newUser);
app.post('/user/login', login);

appRoutes = express.Router();

appRoutes.use((req, res, next) => {

    // check header or post parameters for token
    var token = req.headers['x-access-token'];
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, SECRET_KEY, function(err, decoded) {      
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes    
          next();
        }
      });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
    }
});
   
app.use('/', appRoutes);
  

app.get('/user/view/:id', viewUser);
app.put('/user/edit/:id', editUser);
app.get('/user/all', allUsers);


 


app.listen(8080, function() {
	console.log('Funcionando');
});
