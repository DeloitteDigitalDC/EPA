'use strict';

describe('Controller: StatevstateCtrl', function () {

  // load the controller's module
  beforeEach(module('epaRfiApp'));

  var StatevstateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatevstateCtrl = $controller('StatevstateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
