
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

var strategy = new JwtStrategy(jwtOptions, async function(payload, next) {
      console.log('payload received', payload)
      console.log(next)
      next(null, payload)
})

Passport.use(strategy)

Passport.serializeUser((hospital, cb) => {
      cb(null, hospital)
  })

Passport.deserializeUser((hospital, cb) => {
      cb(null, hospital)
  })


var app = express()
      .use( require('body-parser').json() )
      .use(Passport.initialize())
      .use( context )

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
          pin:'role:hospital',
          port: 5672,
          username: 'guest',
          password: 'guest',
          url: 'amqp://rabbitmq',
         } )
      .ready(() => {
            console.log('here eye am')
            app.listen(8080)
      })
