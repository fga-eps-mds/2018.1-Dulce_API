var seneca = require ('seneca');

seneca ()
    .use('entity')
    .use('mongo-store',{
      name: 'dataBaseScheduleSector',
      host: 'mongo',
      port: 27017
    })
    .use('seneca-amqp-transport')
    .listen({
        type: 'amqp',
        pin: 'role:scheduleSector',
        port: 5672,
        username: 'guest',
        password: 'guest',
        url: 'amqp://rabbitmq'
    })

.add('role:scheduleSector,cmd:create', function (msg,respond){
    var scheduleSector = this.make('scheduleSector')
    var date = new Date(msg.date);
    scheduleSector.date = msg.date
    scheduleSector.start_time = msg.start_time
    scheduleSector.end_time = msg.end_time
    scheduleSector.sector = msg.sector
    scheduleSector.employee = msg.employee
    scheduleSector.day = date.getDay()
    scheduleSector.day = JSON.stringify(scheduleSector.day);
    scheduleSector.month = date.getMonth()
    scheduleSector.month = JSON.stringify(scheduleSector.month);
    scheduleSector.save$(function(err, scheduleSector){ 
      respond(null,scheduleSector)

    })
})

.add ('role: scheduleSector, cmd: listScheduleSector', function(msg,respond){
    var scheduleSector = this.make('scheduleSector');
    var sectorSearch = msg.sector
    scheduleSector.list$({sector}, function(error, scheduleSector){
      respond(null, scheduleSector);
    });
})

.add ('role:scheduleSector,cmd: listSectorDay', function(msg,respond){
    var scheduleSector = this.make('scheduleSector');
    var sectorDay = msg.day;
    var sector = msg.sector
    scheduleSector.list$({sectorDay, sector}, function (error, scheduleSector){
      respond(null,scheduleSector);
    });
})
