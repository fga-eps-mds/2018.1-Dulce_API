var express = require('express');
var bodyParser = require('body-parser');
var SenecaWeb = require('seneca-web')
var Router = express.Router
var context = new Router()

var app = express()
      .use( require('body-parser').json() )
      .use( context )
      .listen(8080)

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false }
}

var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('seneca-amqp-transport')
      .use('api')
      .client( {
          type:'amqp',
          pin:'role:login',
          port: 5672,
          username: 'guest',
          password: 'guest',
          url: 'amqp://rabbitmq',
       } )
