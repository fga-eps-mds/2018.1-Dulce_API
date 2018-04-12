var User = require('./model/user');
var seneca = require( 'seneca' )( );

  seneca.add( 'role:user,cmd:create', function create( msg, respond ) {

    var register = new User({
      'name' : msg.name,
      'registration' : msg.registration,
      'sector' : msg.sector,
      'hospital' : msg.hospital,
      'password' : msg.password,
      'manager' : msg.manager
    });

  register.save(function (err) {

    if (err) {
      console.log(err);
      res.end();
    }
  });

  res.send(register);
  res.end();

    respond( null, { answer: msg.left + msg.right } )
  })
