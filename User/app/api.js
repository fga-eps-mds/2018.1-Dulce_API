module.exports = function api(options) {

  var valid_ops = { create:'create' }

  this.add('role:api,path:userManager', function (msg, respond) {

    var operation = msg.args.params.operation
    var name = msg.args.query.name
    var registration = msg.args.query.registration
    var sector = msg.args.query.sector
    var hospital = msg.args.query.hospital
    var password = msg.args.query.password
    var manager = msg.args.query.manager

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
        userManager: { GET:true, suffix:'/:operation' }
      }
    }}, respond)
  })
}
