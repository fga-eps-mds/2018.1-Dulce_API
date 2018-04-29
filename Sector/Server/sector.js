require('seneca')()
 .use("entity")
 .use('mongo-store',{
    name:'dataBaseHospitals',
    host:'mongo',
    port:27017
  })
 .use('seneca-amqp-transport')
 .listen({
    type:'amqp',
    pin:'role:sector',
    port: 5672,
    username: 'guest',
    password: 'guest',
    url: 'amqp://rabbitmq',
})

  .add('role:sector,cmd:create', function create (msg,respond) {
    var sector = this.make('sectors')
    sector.name = msg.name
    sector.save$(function(err,sector){
      respond(null,sector)
    })
  })

  .add('role:sector, cmd:listSector', function listSector(msg, respond){
    var sector = this.make('sectors');
    sector.list$({all$:true}, function(error,sector){
      respond(null,sector);
    });
  })

  .add('role:sector, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
