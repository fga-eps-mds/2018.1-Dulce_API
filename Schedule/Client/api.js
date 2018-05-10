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
        this.act('role:schedule,cmd:listDay', {
            day: day
        }, respond)
    });

    this.add('role:api,path:listMonth', function (msg, respond) {
        var month = msg.args.query.month;
        this.act('role:schedule,cmd:listMonth', {
            month: month
        }, respond)
    });

    this.add('role:api,path:listSchedule', function (msg, respond) {
        this.act('role:schedule, cmd:listSchedule', {}, respond)

    });
    this.add('role:api,path:listYear', function (msg, respond) {
        var year = msg.args.query.year;
        this.act('role:schedule,cmd:listYear', {
            year: year
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
                    create: { POST: true
                    /*  auth: {
                        strategy: 'jwt',
                        fail: '/api/schedule/error'
                      }*/
                    },
                    listDay: { GET: true },
                    listSchedule: { GET: true },
                    listMonth: { GET: true },
                    listYear: { GET: true },
                    error: {GET: true }
                }
            }
        }, respond)
    })









}
