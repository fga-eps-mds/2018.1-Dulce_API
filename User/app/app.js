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
      .use('user')
      .use('api')
      .use("entity")
      .use('mongo-store',{
          name:'dataBaseUsers',
          host:'mongo',
          port:27017
        })
      .client( { type:'tcp', pin:'role:user' } )
