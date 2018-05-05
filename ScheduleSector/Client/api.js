modules.exports = function api(options){

  this.add('role:api, path:create', function(msg, respond){

    var date = msg.args.body.date
    var start_time = msg.args.body.start_time
    var end_time = msg.args.body.end_time
    var sector = msg.args.body.sector
    var employee = msg.args.body.employee
    var id = msg.args.query.id

    this.act ('role:scheduleSector,cmd:create',{
      date: date,
      start_time: start_time,
      end_time: end_time,
      sector: sector,
      employee: employee,
      id: id,
    }, respond)
  }
})

  this.add ('role:api,path: listScheduleSector', function(msg,respond){
    var sector = msg.args.query.sector;
    this.act ('role:scheduleSector,cmd:listScheduleSector',{
      sector: sector
    }, respond)
  });


  this.add ('role:api,path: listSectorDay', function(msg,respond){
      var day = msg.args.query.day;
      var sector = msg.args.query.sector;
      this.act ('role:scheduleSector, cmd: listSectorDay'{
        day: day
        sector : sector
      }, respond)
    });

  this.add('init:api', function (msg, respond) {
            this.act('role:web', {
                routes: {
                    prefix: '/api/schedule',
                    pin: 'role:api,path:*',
                    map: {
                        create: { POST: true },
                        listScheduleSector: { GET: true },
                        listSectorDay: { GET: true },
                    }
                }
            }, respond)

        })
    }
