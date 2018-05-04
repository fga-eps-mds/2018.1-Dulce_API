var seneca = require('seneca');

seneca()
    .use('entity')
    .use('mongo-store', {
        name: 'dataBaseSchedule',
        host: 'mongo',
        port: 27017
    })
    .use('seneca-amqp-transport')
    .listen({
        type: 'amqp',
        pin: 'role:schedule',
        port: 5672,
        username: 'guest',
        password: 'guest',
        url: 'amqp://rabbitmq'
    })


    .add('role:schedule,cmd:create', function (msg, respond) {
        var schedule = this.make('schedule');
        schedule.month = msg.month;
        schedule.year = msg.year;
        schedule.week = msg.week;
        schedule.day = msg.day;
        schedule.save$(function (err, schedule) {
            respond(null, schedule)
        })
    })

    .add('role:schedule, cmd:listSchedule', function (msg, respond){
        
        var schedule = this.make('schedule');
        schedule.list$( { all$: true } , function(error, schedule){
            respond(null, schedule);
        });
    })
    
    .add('role:schedule,cmd:listWeek', function (msg, respond) {

        var week = msg.week;
        var schedule = this.make('schedule');
        schedule.list$({ week }, function (error, schedule) {
            respond(null, schedule);
        });
    })

    .add('role:schedule,cmd:listMonth', function (msg, respond) {
          var month = msg.month;
          var schedule = this.make('schedule');
          schedule.list$({ month }, function (error, schedule) {
              respond(null, schedule);
          });
      })
    
      .add('role:schedule,cmd:listYear',function(msg,respond){
        var year = msg.year;
        var schedule = this.make('schedule');
        schedule.list$({year},function(error,schedule){
            respond(null,schedule);
        });
    })
