var assert = require('assert');
var request = require('supertest');
var mongo    = require('mongoose');
var should = require('should');

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

describe('should test showing all users', () => {
  it('should return all users', () => {
    request(url)
    .get('/user/all')
    .send()//Status code
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
    done();
     });
   });
});




describe('should test viewing one user', () => {
  it('should return one user', () => {
    request(url)
    .get('/user/view')
    .send()//Status code
    .end((err,res) => {
       if (err) {
         throw err;
       }
    res.should.be.json;
    done();
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
    done();
     });
   });
});


});