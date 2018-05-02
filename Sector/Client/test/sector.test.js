var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');

describe('Routing', function() {
  const url = 'http://localhost:8084';

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

});
