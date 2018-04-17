//var User = require('./model/user');

module.exports = function User(options) {

  this.add('role:user, cmd:create', function create( msg, respond ) {

      var user = this.make('users')

      user.name = msg.name
      user.registration = msg.registration
      user.sector = msg.sector
      user.hospital = msg.hospital
      user.password = msg.password
      user.manager = msg.manager

      user.save$(function(err,user){
        console.log(user)
        respond( null, user)
    })
});

this.add('role:user, cmd:listById', function listById (msg, respond){

      var userId = msg.id;
      var user = this.make('users')
	     user.load$(userId, function(error, user) {
		       respond(null, user);
	});
});

this.add('role:user, cmd:listUser', function listUser(msg, respond){

    var user = this.make('users');
    user.list$( { all$: true } , function(error, user){
      respond(null, user);
    });


});

this.add('role:user, cmd:editUser', function(msg, respond){

  var userId = msg.id;
  var user = this.make('users')

  user.load$(userId, function(error, user) {

    user.name = msg.name
    user.registration = msg.registration
    user.sector = msg.sector
    user.hospital = msg.hospital
    user.password = msg.password
    user.manager = msg.manager

    user.save$(function(err,user){
      console.log(user)
      respond( null, user)
    });
});



})

}
