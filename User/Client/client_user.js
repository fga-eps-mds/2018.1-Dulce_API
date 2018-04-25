var express = require('express');
var bodyParser = require('body-parser');
var SenecaWeb = require('seneca-web');
var Passport = require('passport');
var PassportJwt = require('passport-jwt')
var Router = express.Router;
var context = new Router();

var ExtractJwt = PassportJwt.ExtractJwt
var JwtStrategy = PassportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = '123456789'

var strategy = new JwtStrategy(jwtOptions, function(payload, next) {
    console.log('payload received', payload)
    if (next){
        console.log(next);
    }
  })

Passport.use(strategy)

var app = express()
      .use( require('body-parser').json() )
      .use( context )
      .use(Passport.initialize())
      .listen(8080)

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false },
      auth: Passport
}

var seneca = require('seneca')()
      .use(SenecaWeb, senecaWebConfig )
      .use('seneca-amqp-transport')
      .use("entity")
      .use('api')
      .client( {
          type:'amqp',
          pin:'role:user',
          port: 5672,
          username: 'guest',
          password: 'guest',
          url: 'amqp://rabbitmq',
         } )
