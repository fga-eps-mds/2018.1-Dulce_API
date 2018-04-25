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
    var token = msg.args.headers['x-access-token']

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (err) {
          return respond(null,{ success: false, message: 'Failed to authenticate token.' });
        } else {
         // if everything is good, save to request for use in other routes
           var hospital = this.make('hospitals')
           hospital.name = msg.name
           hospital.save$(function(err,hospital){
             console.log(hospital)
             respond(null,hospital)
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

  .add('role:hospital, cmd:listhospital', function listHospital(msg, respond){
    var hospital = this.make('hospitals');
    hospital.list$({all$:true}, function(error,hospital){
      respond(null,hospital);
    });
  })
