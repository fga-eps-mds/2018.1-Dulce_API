var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');

describe('Routing', function() {
  const url = 'http://localhost:8084';
  /*

  describe('should test new sector creation', () => {
    it('should create a new sector',(done) => {
      let sector = {
        name: 'New Sector'
      };
	request(url)
		.post('/api/sector/create')
		.send(sector)
		.end((err,res) => {
			if (err) {
				throw err;
			}
	    res.args.body.name.should.equal('New Sector');
      //res.status.should.equal(200);
			done();
		});
	});
});
*/

describe('should test the token validation', () => {
  it('should return an error message: access denied', () => {
    request(url)
    .get('/api/sector/listSector')
    .send()
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
    res.body.message.should.equal('acesso negado');
    res.body.success.should.equal(false);
    res.status.should.equal(403);
     });
   });

});
/*


describe('/POST Register', () => {
  it('it should Register, Login, and check token', () => {
    let login_details = {
      'registration': 'bosta',
      'password': '1234'
    }

    let register_details = {
      'name': 'John',
      'registration': '54321',
      'hospital': 'Gama',
      'sector' : '1234',
      'password': '1234',
      'manager': true
    };
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
                res.status.should.equal(200);
                expect(res.body.state).to.be.true;
                res.body.data.should.be.an('array');
              })
          })

      })
    })
  })
*/
});
