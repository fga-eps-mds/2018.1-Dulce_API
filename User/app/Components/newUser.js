var User = require('./model/user');

module.exports = (req, res) => {

  var register = new User({
    'name' : req.body.name,
    'registration' : req.body.registration,
    'sector' : req.body.sector,
    'hospital' : req.body.hospital,
    'password' : req.body.password,
    'manager' : req.body.manager
  });

  register.save(function (err) {

    if (err) {
      console.log(err);
      res.end();
    }
  });
          
  res.send(register);
  res.end();

}
