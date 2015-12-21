'use strict';

describe('Controller: IndividualCtrl', function () {

  // load the controller's module
  beforeEach(module('epaRfiApp'));

  var IndividualCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndividualCtrl = $controller('IndividualCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
