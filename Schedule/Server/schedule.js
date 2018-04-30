require('seneca')()
 .use("entity")
 .use('mongo-store',{
    name:'dataBaseSchedules',
    host:'mongo',
    port:27017
  })
 .use('seneca-amqp-transport')
 .listen({
    type:'amqp',
    pin:'role:schedule',
    port: 5672,
    username: 'guest',
    password: 'guest',
    url: 'amqp://rabbitmq',
})

  .add('role:schedule,cmd:create', function create (msg,respond) {
    var schedule = this.make('schedule')
    schedule.name = msg.name
    schedule.save$(function(err,schedule){
      respond(null,schedule)
    })
  })

  .add('role:schedule, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
