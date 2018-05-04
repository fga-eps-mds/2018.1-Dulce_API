module.exports = function api(options) {

    this.add('role:api,path:create', function(msg,respond){
        var month = msg.args.body.month
        var year = msg.args.body.year
        var day = msg.args.body.day
        var week = msg.args.body.week
        this.act("role:schedule,cmd:create",{
            month:month,
            year:year,
            week:week,
            day:day
        },respond)
    })

    this.add('role:api,path:listWeek',function (msg,respond){
         var week = msg.args.query.week;
        this.act('role:schedule,cmd:listWeek',{
            week: week
        },respond)
    });

    this.add('init:api', function (msg, respond) {
        this.act('role:web', {
            routes: {
                prefix: '/api/schedule',
                pin: 'role:api,path:*',
                map: {
                    create: { POST: true },
                    listWeek: {GET : true}
                }
            }
        },respond)
        
    })









}