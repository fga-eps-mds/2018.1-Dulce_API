var assert = require('assert');
var request = require('supertest');
var mongo    = require('mongoose');
var should = require('should');

let login_details = {
  'registration': 'bosta',
  'password': '1234'
}
 
let register_details = {
  'name': 'Rexford',
  'registration': 'bosta',
  'hospital': 'Gama',
  'sector' : '1234',
  'password': '1234',
  'manager': true
};
 

describe('Routing', function() {
  var url = 'http://localhost:8080';

  describe('should test new user creation', () => {
    it('should create a new user',(done) => {
      var profile = {
        name: 'gui',
        registration: '12345',
        hospital: 'gama',
        sector: 'gama',
        password: 'test',
        manager: true
      };
	request(url)
		.post('/user/add')
		.send(profile)//Status code
		.end((err,res) => {
			if (err) {
				throw err;
			}
	    res.body.name.should.equal('gui');
	    res.body.registration.should.equal('12345');
      res.body.manager.should.equal(true);
      res.body.hospital.should.equal('gama');
      res.body.sector.should.equal('gama');
      res.body.password.should.equal('test');
      res.status.should.equal(200);

			done();
		});
	});
});

 

describe('should test login', () => {
  it('should return a json', (done) => {
    var profile = {
      registration: '1234',
      password: 'test',
    };
request(url)
  .post('/user/login')
  .send(profile)//Status code
  .end((err,res) => {
    if (err) {
      throw err;
    }
    res.should.be.json;
    done();
  });
});

  });

describe('should test the token validation', () => {
  it('should return an error message: not token provided', () => {
    request(url)
    .get('/user/all')
    .send()//Status code
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
    res.body.message.should.equal('No token provided.');
    res.body.success.should.equal(false);
     });
   });

    it('should return an error of: Failed to authenticate token.', () => {
      request(url)
        .get('/user/all')
        .send()
        .end((err,res) => {
          if (err) {
            throw err;
          }
      res.should.be.json;
      res.body.message.should.equal('No token provided.');
      res.body.success.should.equal(false);
      
     });
   });

});



describe('should test viewing one user', () => {
  it('should return one user', () => {
    request(url)
    .get('/user/view')
    .set('x-access-token', 'any string')
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
    res.body.message.should.equal('Failed to authenticate token.');
    res.body.success.should.equal(false);
    
     });
   });
});


describe('should test editing user', () => {
  it('should return a json response', () => {
    var profile = {
      hospital: 'gama',
      sector: 'sul',
    };
    request(url)
    .put('/user/edit')
    .send(profile)//Status code
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
     });
   });
});

describe('/POST Register', () => {
  it('it should Register, Login, and check token', () => {
      request(url)
      .post('/user/add')
      .send(register_details) // this is like sending a post with a new User
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(201);
        // the property, res.body.state, we expect it to be true.
        expect(res.body.state).to.be.true;

        // follow up with login
          request(url)
          .post('/user/login')
          .send(login_details)
          .end((err, res) => {
            console.log('this was run the login part');
            res.should.have.status(200);
            expect(res.body.state).to.be.true;
            res.body.should.have.property('token'); 
            
            let token = res.body.token;
            // follow up with requesting user protected page
              request(url)
              .get('/user/all')
              // we set the auth header with our token
              .set('x-access-token', token)
              .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.state).to.be.true;
                res.body.data.should.be.an('array');

              })
          })
           
      })
    })
  })

});