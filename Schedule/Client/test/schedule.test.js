var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');

describe('Routing', function() {
  const url = 'http://localhost:8091';

  describe('should test the token validation', () => {
    it('should return an error message: access denied', () => {
      request(url)
      .post('/api/sector/create')
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

    it('should create the schedule',() =>{
      let register_details = {
        'name': 'new user',
        'registration': '54321',
        'hospital': 'new user\'s hospital',
        'sector' : 'new usser\'s sector',
        'password': '1234',
        'manager': true
      }
      let login_details = {
        'registration': '54321',
        'password': '1234'
      }
      let new_schedule = {
        'date':'03/05/2018',
        'start_time':'03/05/2018 14:00:00',
        'end_time':'03/05/2018 16:00:00',
        'sector':'employee\'s sector',
        'employee':'employee user',
        'specialty':'employee\'s specialty',
      };

      request('http://localhost:8083/')
      .post('/userManager/create')
      .send(register_details)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.state).to.be.true;

        request('http://localhost:8086/')
          .post('/userManager/login')
          .send(login_details)
          .end((err, res) => {
            let token = res.body.token;
              request(url)
              .post('/schedule/create')
              .send(new_schedule)
              .set('x-access-token', token)
              .end((err, res) => {
                res.status.should.equal(200);
                expect(res.body.state).to.be.true;
                res.body.data.should.be.an('array');
              })
          })
    })
  });
});
});
