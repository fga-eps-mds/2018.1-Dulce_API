var assert = require('assert');
var request = require('supertest');
var mongo = require('mongoose');
var should = require('should');


describe('Routing', function() {
  const url = 'http://localhost:8090';
  const urlLogin = 'http://localhost:8091';

  describe('should test a schedule by sector view', () => {
    it('should test a schedule by sector view',(done) => {
      let schedule = {

        date = '01/01/2020',
        start_time = '15:00'
        end_time = '19:00'        //creating a schedule to send
        sector = 'UTI',
        employee = 'employee',
        specialty = 'employee',
        id = '332323232'
      };
	request(url)
		.post('/api/schedule/create')
		.send(schedule)               //sending schedule to api
		.end((err,res) => {
			if (err) {
				throw err;
			}
	    res.body.date.should.equal('01/01/2020');
	    res.body.start_time.should.equal('15:00');
      res.body.end_time.should.equal('19:00');
      res.body.sector.should.equal('UTI');
      res.body.employee.should.equal('employee');
      res.body.specialty.should.equal('employee');
      res.id.should.equal('332323232');

			done();
		});
	});
});
