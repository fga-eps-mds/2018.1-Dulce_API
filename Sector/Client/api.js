module.exports = function api(options){

  this.add('role:api,path:create', function(msg,respond){
    
    var name = msg.args.body.name
    var id = msg.args.query.id

    this.act('role:sector,cmd:create',{
      name:name,
      id:id
    }, respond)
  });

  this.add('role:api,path:listSector', function(msg,respond) {
    this.act('role:sector, cmd:listSector',{
    },respond)
  });

  this.add('init:api', function (msg,respond){
    this.act('role:web',{routes: {
      prefix: '/api/sector',
      pin:    'role:api,path:*',
      map: {
        create: { POST:true},
        listSector: { GET:true}
      }
    }}, respond)
  });
}
