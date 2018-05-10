var seneca = require('seneca');
var currentWeekNumber = require('current-week-number');

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


    .add('role:schedule,cmd:create', function create (msg,respond) {
        var schedule = this.make('schedule')
        var date = new Date(msg.date);
        schedule.date = msg.date
        schedule.start_time = msg.start_time
        schedule.end_time = msg.end_time
        schedule.sector = msg.sector
        schedule.employee = msg.employee
        schedule.specialty = msg.specialty
        schedule.amount_of_hours = msg.amount_of_hours
        schedule.year = date.getFullYear()
        schedule.year = JSON.stringify(schedule.year);
        schedule.day = date.getDate()
        schedule.day = JSON.stringify(schedule.day);
        schedule.month = date.getMonth()
        schedule.month = JSON.stringify(schedule.month);
        schedule.week = currentWeekNumber(date);
        schedule.week = JSON.stringify(schedule.week);
        schedule.save$(function(err,schedule){
          respond(null,schedule)
        })
      })
    .add('role:schedule, cmd:listSchedule', function (msg, respond){

        var schedule = this.make('schedule');
        schedule.list$( { all$: true } , function(error, schedule){
            respond(null, schedule);
        });
    })

    .add('role:schedule,cmd:listDay', function (msg, respond) {

        var day = msg.day;
        var schedule = this.make('schedule');
        schedule.list$({ day }, function (error, schedule) {
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

    .add('role:schedule, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
