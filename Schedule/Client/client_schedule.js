var express = require('express');
var bodyParser = require('body-parser')
var seneca = require('seneca');
var senecaWeb = require('seneca-web');
var senecaWebAdapterExpress = require('seneca-web-adapter-express');
var Passport = require('passport');
var PassportJwt = require('passport-jwt');
var Router = express.Router;
var context = new Router();

var ExtractJwt = PassportJwt.ExtractJwt
var JwtStrategy = PassportJwt.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = '123456789'

var strategy = new JwtStrategy(jwtOptions, async function(payload, next){
  next (null, payload)
})

Passport.use(strategy)

Passport.serializeUser((schedule, cb) => {
  cb(null, schedule)
})

Passport.deserializeUser((schedule, cb) => {
  cb(null, schedule)
})

var app = express()
    .use( require('body-parser').json() )
    .use(Passport.initialize())
    .use( context )

var senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: {parseBody: false},
    auth: Passport
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
