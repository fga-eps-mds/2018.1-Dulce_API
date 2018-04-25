require('seneca')()
 .use("entity")
 .use('mongo-store',{
    name:'dataBaseSectors',
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
    var token = msg.args.headers['x-access-token']

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (err) {
          return respond(null,{ success: false, message: 'Failed to authenticate token.' });
        } else {
         // if everything is good, save to request for use in other routes
           var sector = this.make('sectors')
           sector.name = msg.name
           sector.save$(function(err,sector){
             console.log(sector)
             respond(null,sector)
           })
       }
     });

   } else {
       // if there is no token
       // return an error
       return respond(null,{
           success: false,
           message: 'No token provided.'
       });
   }
  })

  .add('role:sector, cmd:listSector', function listSector(msg, respond){
    var sector = this.make('sectors');
    sector.list$({all$:true}, function(error,sector){
      respond(null,sector);
    });
  })
