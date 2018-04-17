module.exports = function api(options) {

  this.add('role:api, path:login', function (msg, respond) {

    var registration = msg.args.body.registration
    var password = msg.args.body.password

    this.act('role:login, cmd:authenticate', {
      registration: registration,
      password: password,
    }, respond)
  })

  this.add('init:api', function (msg, respond) {

    this.act('role:web',{ routes: {
      prefix: '/api/userManager',
      pin:    'role:api,path:*',
      map: {
        login: { POST:true }
      }
    }}, respond)
  });
}
