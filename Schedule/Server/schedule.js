
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
        schedule.month = date.getMonth()+1
        schedule.month = JSON.stringify(schedule.month);
        schedule.week = currentWeekNumber(date);
        schedule.week = JSON.stringify(schedule.week);
        schedule.list$({ date: schedule.date, employee: schedule.employee }, function (err, list) {
        list.forEach(function (time) {
          if (Date.parse(schedule.start_time) >= Date.parse(time.start_time) && Date.parse(schedule.start_time) <= Date.parse(time.end_time)) {
            respond(null, { success: false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado' })
          } else if (Date.parse(schedule.end_time) >= Date.parse(time.start_time) && Date.parse(schedule.end_time) <= Date.parse(time.end_time)) {
            respond(null, { success: false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado' })
          } else if (Date.parse(schedule.start_time) <= Date.parse(time.start_time) && Date.parse(schedule.end_time) >= Date.parse(time.end_time)) {
            respond(null, { success: false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado' })
          }
        schedule.save$(function(err,schedule){
          respond(null,schedule)
        })
      })
    .add('role:schedule, cmd:listSchedule', function (msg, respond){

        var schedule = this.make('schedule');
        var id = msg.id;
        schedule.list$( { all$: true } , function(error, schedule){
            respond(null, schedule);
        });
    })

      .add('role:schedule,cmd:listYear',function(msg,respond){
        var id = msg.id;
        var year = msg.year;
        console.log(id);
        var schedule = this.make('schedule');
        schedule.list$({id, year}, function(error,schedule){
            respond(null,schedule);
            
        });
    })
  })

    .add('role:schedule,cmd:listDay', function (msg, respond) {
        var id = msg.id;
        var day = msg.day;
        var schedule = this.make('schedule');
        schedule.list$({ day , id }, function (error, schedule) {
            respond(null, schedule);
        });
    })

    .add('role:schedule,cmd:listMonth', function (msg, respond) {
        var id = msg.id; 
         var month = msg.month;
          var schedule = this.make('schedule');
          schedule.list$({ month , id }, function (error, schedule) {
              respond(null, schedule);
          });
      })

      .add('role:schedule,cmd:listYear',function(msg,respond){
        var id = msg.id;
        var year = msg.year;
        console.log(id);
        var schedule = this.make('schedule');
        schedule.list$({id, year}, function(error,schedule){
            respond(null,schedule);
            
        });
    })

    .add('role:schedule,cmd:listWeek',function(msg,respond){
        var id = msg.id;
        var week = msg.week;
        var schedule = this.make('schedule');
        schedule.list$({id , week}, function(error,schedule){
            respond(null,schedule);
            
        });
    })

    .add('role:schedule,cmd:listHourWeek',function(msg,respond){
        var id = msg.id;
        var week = msg.week;
        var hoursForWeek = 0;
        var schedule = this.make('schedule');
        schedule.list$({ week}, function(error,list){
            list.forEach(function(schedule){
        if(schedule.amount_of_hours != null){   
             hoursForWeek += parseInt(schedule.amount_of_hours,10);
            }})
            hoursForWeek = JSON.stringify(hoursForWeek);
            respond(null,{hoursForWeek});
        });
    })

    .add('role:schedule, cmd:error', function error(msg, respond){
    respond(null, {success:false, message: 'acesso negado'});
  })
})
