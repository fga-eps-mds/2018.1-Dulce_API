module.exports = function newUser(options) {

  this.add( 'role:user,cmd:create', function create( msg, respond ) {

    var register = this.make('users')

      register.name = msg.name
      register.registration = msg.registration
      register.sector = msg.sector
      register.hospital = msg.hospital
      register.password = msg.password
      register.manager = msg.manager

      register.save$(function(err,register){
      console.log(register)
    })
    this.close(function(err){
      console.log('database closed!')
    })

  respond( null, register)

  })
}
