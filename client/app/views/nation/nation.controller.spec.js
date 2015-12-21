'use strict';

describe('Controller: NationCtrl', function () {

  // load the controller's module
  beforeEach(module('epaRfiApp'));

  var NationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NationCtrl = $controller('NationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
