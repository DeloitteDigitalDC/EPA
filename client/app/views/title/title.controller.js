'use strict';

angular.module('epaRfiApp')
.controller('TitleCtrl', ['$scope', 'resourceService', 'stateManager', function ($scope, resourceService, stateManager) {
  var vm = this;

  vm.selectedState = stateManager.getSelectedState();

  resourceService.getResourceList().then(function(result) {
    vm.stateArray = _.reject(result.data.States, {'name': 'United States'});
  });

}]);
