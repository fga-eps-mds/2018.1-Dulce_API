module.exports = function api(options) {

  var valid_ops = { create:'create' }

  this.add('role:api,path:userManager', function (msg, respond) {

    console.log(msg)
    var operation = msg.args.params.operation
    var name = msg.args.body.name
    var registration = msg.args.body.registration
    var sector = msg.args.body.sector
    var hospital = msg.args.body.hospital
    var password = msg.args.body.password
    var manager = msg.args.body.manager

    this.act('role:user', {
      cmd:   valid_ops[operation],
      operation: operation,
      name: name,
      registration: registration,
      sector: sector,
      hospital: hospital,
      password: password,
      manager: manager,
    }, respond)
  })

  this.add('init:api', function (msg, respond) {
    this.act('role:web',{routes:{
      prefix: '/api',
      pin:    'role:api,path:*',
      map: {
        userManager: { POST:true, suffix:'/:operation' }
      }
    }}, respond)
  })
}
