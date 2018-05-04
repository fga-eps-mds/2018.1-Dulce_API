var express = require('express');
var bodyParser = require('body-parser')
var seneca = require('seneca');
var senecaWeb = require('seneca-web');
var senecaWebAdapterExpress = require('seneca-web-adapter-express');

var Router = express.Router;
var context = new Router();

var app = express()
    .use( bodyParser.json())
    .use( context )

var senecaWebConfig = {
    context: context,
    adapter: senecaWebAdapterExpress,
    options: {parseBody: false},
   // auth: Passaport
}
    seneca.use(senecaWeb,senecaWebConfig)
    .use('seneca-amqp-transport')
    .use("entity")
    .use('api')
    .client({
        type: 'amqp',
        pin: 'role:schedule',
        port: 5672,
        username: 'guest',
        password: 'guest',
        url: 'amqp://rabbitmq',
    })
    .ready(() => {
        app.listen(8080)
    })