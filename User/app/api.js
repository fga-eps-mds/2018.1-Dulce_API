module.exports = function api(options) {


  this.add('role:api,path:create', function (msg, respond) {

    var name = msg.args.body.name
    var registration = msg.args.body.registration
    var sector = msg.args.body.sector
    var hospital = msg.args.body.hospital
    var password = msg.args.body.password
    var manager = msg.args.body.manager
    var id = msg.args.query.id

    this.act('role:user,cmd:create', {
      name: name,
      registration: registration,
      sector: sector,
      hospital: hospital,
      password: password,
      manager: manager,
      id: id
    }, respond)
  })

  this.add('role:api,path:listById',function(msg, respond){

    var id = msg.args.query.id

    this.act('role:user, cmd:listById', {
      id: id
    }, respond)
  });

  this.add('init:api', function (msg, respond) {
    this.act('role:web',{ routes: {
      prefix: '/api/userManager',
      pin:    'role:api,path:*',
      map: {
        create: { POST:true },
        listById: { GET:true }
      }
    }}, respond)
  })
}
