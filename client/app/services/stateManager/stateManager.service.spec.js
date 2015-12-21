'use strict';

describe('Service: stateManager', function () {

  // load the service's module
  beforeEach(module('epaRfiApp'));

  // instantiate service
  var stateManager;
  beforeEach(inject(function (_stateManager_) {
    stateManager = _stateManager_;
  }));

  it('should do something', function () {
    expect(!!stateManager).toBe(true);
  });

});
