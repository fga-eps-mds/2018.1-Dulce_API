module.exports = function api(options){

  this.add('role:api,path:create', function(msg,respond){

    var date = msg.args.body.date
    var start_time = msg.args.body.start_time
    var end_time = msg.args.body.end_time
    var sector = msg.args.body.sector
    var employee = msg.args.body.employee
    var specialty = msg.args.body.specialty
    var amount_of_hours = msg.args.body.amount_of_hours
    var id = msg.args.query.id

    if(Date.parse(start_time) > Date.parse(end_time)){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Horários de Inicio e Fim estão em comflito'}))
    }else if(sector == null || (sector.length < 1)){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Setor não pode ser vazio'}))
    }else if(employee == null || (employee.length < 1)){
      this.act('role:schedule,cmd:create',{
      }, respond(null, {success:false, message: 'Plantonista não pode ser vazio'}))

    }else{
      this.act('role:schedule,cmd:create',{
        date:date,
        start_time:start_time,
        end_time:end_time,
        sector:sector,
        employee:employee,
        specialty:specialty,
        amount_of_hours:amount_of_hours,
        id:id
      }, respond)
    }
  })

  this.add('role:api,path:error', function(msg, respond){
    this.act('role:schedule, cmd:error',{}, respond)
  });


  this.add('init:api', function (msg,respond){
    this.act('role:web',{routes: {
      prefix: '/api/schedule',
      pin:    'role:api,path:*',
      map: {
        create: { POST:true,
                    auth: {
                      strategy: 'jwt',
                      fail: '/api/schedule/error',
                    }},
        error: {GET:true}
      }
    }}, respond)
  });
}
