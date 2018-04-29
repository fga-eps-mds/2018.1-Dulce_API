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
    pin:'role:hospital',
    port: 5672,
    username: 'guest',
    password: 'guest',
    url: 'amqp://rabbitmq',
})

  .add('role:hospital,cmd:create', function create (msg,respond) {
    var hospital = this.make('hospitals')
    hospital.name = msg.name
    hospital.save$(function(err,hospital){
      respond(null,hospital)
    })
  })

  .add('role:hospital, cmd:listHospital', function listHospital(msg, respond){
    var hospital = this.make('hospitals');
    hospital.list$({all$:true}, function(error,hospital){
      respond(null,hospital);
    });
  })

  .add('role:hospital, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
