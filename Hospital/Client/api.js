module.exports = function api(options){

    this.add('role:api,path:create', function(msg,respond){
  
      var name = msg.args.body.name
      var id = msg.args.query.id
  
      this.act('role:hospital,cmd:create',{
        name:name,
        id:id
      }, respond)
    })
  
    this.add('role:api,path:listHospital', function(msg,respond) {
      this.act('role:hospital, cmd:listHospital',{
      },respond)
    });
  
    this.add('init:api', function (msg,respond){
      this.act('role:web',{routes: {
        prefix: '/api/hospital',
        pin:    'role:api,path:*',
        map: {
          create: { POST:true},
          listHospital: { GET:true}
        }
      }}, respond)
    });
  }