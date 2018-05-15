currentWeekNumber = require('current-week-number');

module.exports = function api(options){

    this.add('role:api,path:create', function (msg, respond) {
        var time_init = new Date();
        var time_final = new Date();
        var date = msg.args.body.date
        var start_time = msg.args.body.start_time
        var end_time = msg.args.body.end_time
        var sector = msg.args.body.sector
        var employee = msg.args.body.employee
        var specialty = msg.args.body.specialty
        var id = msg.args.query.id

        time_init.setHours(parseInt(start_time, 10) - 1)
        time_init.setMinutes(0)
        time_init.setSeconds(0);

        time_final.setHours(parseInt(end_time, 10) - 1)
        time_final.setMinutes(0)
        time_final.setSeconds(0);

        var amount_of_hours = (time_final.getHours() - time_init.getHours());

        var amount_of_hours = JSON.stringify(amount_of_hours);

        if (time_init > time_final) {
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
    });

    this.add('role:api,path:listDay', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
            day = JSON.stringify(day);
        }
        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listDay', {
            day: day,
            id: id
        }, respond)
    });

    this.add('role:api,path:listMonth', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var month = msg.args.query.month;
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
            month = JSON.stringify(month);
        }

        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listMonth', {
            month: month,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSchedule', function (msg, respond) {
        this.act('role:schedule, cmd:listSchedule', {}, respond)

    });
    this.add('role:api,path:listYear', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        if (year == undefined) {
            year = currentDate.getFullYear();
            year = JSON.stringify(year);
        }
        var id = msg.args.query.id;
        this.act('role:schedule,cmd:listYear', {
            year: year,
            id: id
        }, respond)
    });

    this.add('role:api,path:listWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;
        console.log(week);
        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
        } else {
            currentDate.setDate(day);
        }
        if (week == undefined) {

            var week = currentWeekNumber(currentDate);

            week = JSON.stringify(week);

        }

        var id = msg.args.query.id;

        console.log(id);


        this.act('role:schedule,cmd:listWeek', {
            week: week,
            id: id
        }, respond)
    });


    this.add('role:api,path:listHourWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;

        if (year == undefined) {
            year = currentDate.getFullYear();
        } else {
            currentDate.setFullYear(year);
        }
        if (month == undefined) {
            month = currentDate.getMonth() + 1;
        } else {
            currentDate.setMonth(month);
        }
        if (day == undefined) {
            day = currentDate.getDate() - 1;
        } else {
            currentDate.setDate(day);
        }
        if (week == undefined) {

            var week = currentWeekNumber(currentDate);

            week = JSON.stringify(week);

        }

        var id = msg.args.query.id;


        this.act('role:schedule,cmd:listHourWeek', {
            week: week,
            id: id
        }, respond)
    });

    this.add('role:api,path:listSectorDay', function (msg, respond) {
        var day = msg.args.query.day;
        var sector = msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorDay', {
            day: day,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorMonth', function (msg, respond) {
        var month = msg.args.query.month;
        var sector =  msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorMonth', {
            month: month,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorYear', function (msg, respond) {
        var year = msg.args.query.year;
        var sector =  msg.args.query.sector;
        this.act('role:schedule,cmd:listSectorYear', {
            year: year,
            sector: sector
        }, respond)
    });

    this.add('role:api,path:listSectorWeek', function (msg, respond) {
        var currentDate = new Date();
        var year = msg.args.query.year;
        var day = msg.args.query.day;
        var month = msg.args.query.month;
        var week = msg.args.query.week;
        if(year == undefined){
            year = currentDate.getFullYear();
        }else {
            currentDate.setFullYear(year);
        }
        if(day == undefined){
            day = currentDate.getDate() - 1;
        }else {
            currentDate.setDate(day);
        }
        if(month == undefined){
            month = currentDate.getMonth() + 1;
        }else{
            currentDate.setMonth(month);
        }
        if(week == undefined){

        var week = currentWeekNumber(currentDate);

        week = JSON.stringify(week);

        }

        var sector =  msg.args.query.sector;


        this.act('role:schedule,cmd:listSectorWeek', {
            week: week,
            sector: sector
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
                    listDay: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listSchedule: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listMonth: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listYear: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listWeek: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listHourWeek: {
                        GET: true,
                        auth: {
                            strategy: 'jwt',
                            fail: '/api/schedule/error'
                        }
                    },
                    listSectorDay: { GET: true,
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
                    listSectorMonth: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                    listSectorYear: { GET: true,
                      auth: {
                         strategy: 'jwt',
                         fail: '/api/schedule/error'
                       }
                     },
                     listSectorWeek: { GET: true,
                       auth: {
                           strategy: 'jwt',
                           fail: '/api/schedule/error'
                        }
                    },
                    error: {GET: true }
                }
            }
        }, respond)
    })









}
