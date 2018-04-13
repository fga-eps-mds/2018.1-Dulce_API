var entities = require('seneca-entity')

module.exports = function newUser(options) {

  this.use('mongo-store',{
    name:'dbname',
    host:'mongo',
    port:27017
  })
    .use("entity")

  this.add( 'role:user,cmd:create', function create( msg, respond ) {

    var register = this.make$('register')

      reister.name = msg.name
      reister.registration = msg.registration
      reister.sector = msg.sector
      reister.hospital = msg.hospital
      reister.password = msg.password
      reister.manager = msg.manager

      register.save$(function(err,register){
      console.log(register)
    })

  respond( null, register)

  })
}
