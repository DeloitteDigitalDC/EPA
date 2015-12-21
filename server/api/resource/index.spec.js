'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var resourceCtrlStub = {
  index: 'resourceCtrl.index',
  getResource: 'resourceCtrl.getResource'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var resourceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './resource.controller': resourceCtrlStub
});

describe('Resource API Router:', function() {

  it('should return an express router instance', function() {
    resourceIndex.should.equal(routerStub);
  });

  describe('GET /api/resources', function() {

    it('should route to resource.controller.index', function() {
      routerStub.get
        .withArgs('/', 'resourceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/resources/:resource', function() {

    it('should route to resource.controller.getResource', function() {
      routerStub.get
        .withArgs('/:resource', 'resourceCtrl.getResource')
        .should.have.been.calledOnce;
    });

  });

});
