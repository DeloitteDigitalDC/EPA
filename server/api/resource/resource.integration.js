'use strict';

var app = require('../..');
import request from 'supertest';

var newResource;

describe('Resource API:', function() {

  describe('GET /api/resources', function() {
    var resources;

    beforeEach(function(done) {
      request(app)
        .get('/api/resources')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resources = res.body;
          done();
        });
    });

    it('should respond with JSON object', function() {
      resources.should.be.instanceOf(Object);
    });

  });

  describe('GET /api/resources/:resource', function() {
    var resource;

    beforeEach(function(done) {
      request(app)
        .get('/api/resources/' + 'test')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resource = res.body;
          done();
        });
    });

    afterEach(function() {
      resource = {};
    });

    it('should respond with the requested resource', function() {
      resource.Resources.should.be.instanceOf(Object);
    });

  });

});
