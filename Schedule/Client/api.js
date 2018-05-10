module.exports = function api(options) {

    this.add('role:api,path:create', function (msg, respond) {

        var date = msg.args.body.date
        var start_time = msg.args.body.start_time
        var end_time = msg.args.body.end_time
        var sector = msg.args.body.sector
        var employee = msg.args.body.employee
        var specialty = msg.args.body.specialty
        var id = msg.args.query.id

        // The diference between times is given in milliseconds. We are expecting hours,
        //so wu divide by 3600000.0 that is the number of milliseconds in 1 hour
        var amount_of_hours = (Date.parse(end_time) - Date.parse(start_time)) / 3600000.0

        if (Date.parse(start_time) > Date.parse(end_time)) {
            this.act('role:schedule,cmd:create', {
            }, respond(null, { success: false, message: 'Horários de Inicio e Fim estão em comflito' }))
        } else if (sector == null || (sector.length < 1)) {
            this.act('role:schedule,cmd:create', {
            }, respond(null, { success: false, message: 'Setor não pode ser vazio' }))
        } else if (employee == null || (employee.length < 1)) {
            this.act('role:schedule,cmd:create', {
            }, respond(null, { success: false, message: 'Plantonista não pode ser vazio' }))

        } else {
            this.act('role:schedule,cmd:create', {
                date: date,
                start_time: start_time,
                end_time: end_time,
                sector: sector,
                employee: employee,
                specialty: specialty,
                amount_of_hours: amount_of_hours,
                id: id,
            }, respond)
        }
    })

    this.add('role:api,path:listDay', function (msg, respond) {
        var day = msg.args.query.day;
        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listDay', {
            day: day,
            id: id
        }, respond)
    });

    this.add('role:api,path:listMonth', function (msg, respond) {
        var month = msg.args.query.month;
        var id =  msg.args.query.id;
        this.act('role:schedule,cmd:listMonth', {
            month: month,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSchedule', function (msg, respond) {
        this.act('role:schedule, cmd:listSchedule', {}, respond)

    });
    this.add('role:api,path:listYear', function (msg, respond) {
        var year = msg.args.query.year;
        var id =  msg.args.query.id;
        this.act('role:schedule,cmd:listYear', {
            year: year,
            id: id
        }, respond)
    });

    this.add('role:api,path:listWeek', function (msg, respond) {
        var week = msg.args.query.week;
        var id =  msg.args.query.id;
        console.log(week)
        this.act('role:schedule,cmd:listWeek', {
            week: week,
            id: id
        }, respond)
    });
    

    this.add('role:api,path:error', function(msg, respond){
  this.act('role:schedule, cmd:error',{}, respond)
});



    this.add('init:api', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/api/schedule',
                pin: 'role:api,path:*',
                map: {
                    create: { POST: true,
                     auth: {
                        strategy: 'jwt',
                        fail: '/api/schedule/error'
                      }
                    },
                    listDay: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listSchedule: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listMonth: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listYear: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                     listWeek: { GET: true,
                   /*     auth: {
                           strategy: 'jwt',
                           fail: '/api/schedule/error'
                        }*/
                    },
                    error: {GET: true }
                }
            }
        }, respond)
    })









}
