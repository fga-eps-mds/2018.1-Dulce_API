var currentWeekNumber = require('current-week-number');

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
    var schedule = this.make('schedules')
    schedule.date = msg.date
    schedule.start_time = msg.start_time
    schedule.end_time = msg.end_time
    schedule.sector = msg.sector
    schedule.employee = msg.employee
    schedule.specialty = msg.specialty
    schedule.amount_of_hours = msg.amount_of_hours
    schedule.month = msg.month
    schedule.year = msg.year

    schedule.list$({date:schedule.date, employee:schedule.employee}, function(err,list){
      list.forEach(function(time){
        console.log("entra no for each do horario")
          if (Date.parse(schedule.start_time) >= Date.parse(time.start_time) && Date.parse(schedule.start_time) <= Date.parse(time.end_time)) {
            respond(null, {success:false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado'})
          }else if (Date.parse(schedule.end_time) >= Date.parse(time.start_time) && Date.parse(schedule.end_time) <= Date.parse(time.end_time)) {
            respond(null, {success:false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado'})
          }else if(Date.parse(schedule.start_time) <= Date.parse(time.start_time) && Date.parse(schedule.end_time) >= Date.parse(time.end_time)){
            respond(null, {success:false, message: 'Este funcionário possui uma escala em conflito com o horário selecionado'})
          }
      })
    })
  })

    .add('role:schedule, cmd:listSchedule', function (msg, respond) {

        var schedule = this.make('schedule');
        var id = msg.id;
        schedule.list$({ all$: true }, function (error, schedule) {
            respond(null, schedule);
        });
    })

    .add('role:schedule,cmd:listDay', function (msg, respond) {
        var id = msg.id;
        var day = msg.day;
        var schedule = this.make('schedule');
        schedule.list$({ day, id }, function (error, schedule) {
            respond(null, schedule);
        });
    })

    .add('role:schedule,cmd:listMonth', function (msg, respond) {
        var id = msg.id;
        var month = msg.month;
        var schedule = this.make('schedule');
        schedule.list$({ month, id }, function (error, schedule) {
          respond(null, schedule);
      });
    })

  .add('role:schedule, cmd:createScale', function error(msg, respond){
    var scale = this.make('scales')
    scale.maximum_hours_month = msg.maximum_hours_month
    scale.maximum_hours_week = msg.maximum_hours_week
    scale.minimum_hours_month = msg.minimum_hours_month
    scale.minimum_hours_week = msg.minimum_hours_week
    scale.employee = msg.employee
    scale.month = msg.month
    scale.year = msg.year
    scale.id = msg.id

    scale.amount_of_hours = 0
    scale.schedule_list = []

    var schedule = this.make('schedules');
    schedule.list$( { employee: scale.employee } , function(error, list){
      list.forEach(function(time){
        if(time.month.toString() == scale.month && time.year.toString() == scale.year){
          scale.schedule_list.push(time)
          console.log("LISTA:");
          console.log(scale.schedule_list);
          console.log("HORAS DO TIME:");
          console.log(time.amount_of_hours);
          scale.amount_of_hours += time.amount_of_hours
          console.log("HORAS ATE AGORA:");
          console.log(scale.amount_of_hours);
        }
      })
    })

    console.log("HORAS TOTAIS FINAIS:");
    console.log("hours: " + scale.amount_of_hours)
    //Validations

  /*  if (getDaysInMonth(scale.month, scale.year) < scale.schedule_list.length) {
      respond(null, {success:false, message: 'Número de horários é maior que a quantidade de dias no mês'})
    } else*/if (scale.minimum_hours_week == null || (scale.minimum_hours_week.length < 1)) {
      respond(null, {success:false, message: 'O minimo de horas por semana não deve ser vazio'})
    } else if(scale.minimum_hours_month == null || (scale.minimum_hours_month < 1) ){
      respond(null, {success:false, message: 'O minimo de horas por mês não deve ser vazio'})
    } else if (scale.amount_of_hours < scale.minimum_hours_month) {
      respond(null, {success:false, message: 'A escala possui menos horas que o minimo estabelecido'})
    }

    // scale.list$({month:scale.month, year:scale.year, employee:scale.employee}, function(err,list){
    //   list.forEach(function(s){
    //     respond(null, {success:false, message: 'Já existe uma escala para este mês'})
    //   })
    // })

    scale.save$(function(err,scale){
      respond(null,scale)
    })

  })
    .add('role:schedule,cmd:listYear', function (msg, respond) {
      var id = msg.id;
      var year = msg.year;
      console.log(id);
      var schedule = this.make('schedule');
      schedule.list$({ id, year }, function (error, schedule) {
        respond(null, schedule);

      });
    })

    .add('role:schedule,cmd:listWeek', function (msg, respond) {
      var id = msg.id;
      var week = msg.week;
      var schedule = this.make('schedule');
      schedule.list$({ id, week }, function (error, schedule) {
        respond(null, schedule);

      });
    })

    .add('role:schedule,cmd:listHourWeek', function (msg, respond) {
        var id = msg.id;
        var week = msg.week;
        var hoursForWeek = 0;
        var schedule = this.make('schedule');
        schedule.list$({ id, week }, function (error, list) {
            list.forEach(function (schedule) {
                if (schedule.amount_of_hours != null) {
                    hoursForWeek += parseInt(schedule.amount_of_hours, 10);
                }
            })
            hoursForWeek = JSON.stringify(hoursForWeek);
            respond(null, { hoursForWeek });
        });
    })

    .add('role:schedule,cmd:listSectorDay', function (msg, respond) {
      var sector = msg.sector;
      var day = msg.day;
      var schedule = this.make('schedule');
      schedule.list$({ day , sector }, function (error, schedule) {
        respond(null, schedule);
      });
    })

    .add('role:schedule,cmd:listSectorMonth', function (msg, respond) {
        var sector = msg.sector;
         var month = msg.month;
          var schedule = this.make('schedule');
          schedule.list$({ month , sector }, function (error, schedule) {
              respond(null, schedule);
          });
      })

      .add('role:schedule,cmd:listSectorYear',function(msg,respond){
        var sector = msg.sector;
        var year = msg.year;
        var schedule = this.make('schedule');
        schedule.list$({year , sector},function(error,schedule){
            respond(null,schedule);
        });
    })

    .add('role:schedule,cmd:listSectorWeek',function(msg,respond){
        var sector = msg.sector;
        var week = msg.week;
        var schedule = this.make('schedule');
        schedule.list$({sector , week}, function(error,schedule){
            respond(null,schedule);
        });
    })

    .add('role:schedule, cmd:error', function error(msg, respond) {
        respond(null, { success: false, message: 'acesso negado' });
    })
