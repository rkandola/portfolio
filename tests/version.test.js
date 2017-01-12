
var app = require('../../server.js');
var host = 'http://localhost:4000/';
var request = require('superagent');
var chai = require('chai');
var assert = chai.assert;

var agent = request.agent();

describe('GET api/portfolio/version', function() {
  it('Check that version is return is 1.0.0', function(done) {
    agent
      .get(host + 'api/portfolio/version')
      .end(function(err, res) {
          assert.equal(res.body.version, '1.0.0');
          assert.equal(res.status, 200);
        done();
      });
  });
});

