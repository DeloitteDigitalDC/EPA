'use strict';

angular.module('epaRfiApp')
.controller('TitleCtrl', ['$scope', 'resourceService', 'stateManager', function ($scope, resourceService, stateManager) {
  var vm = this;

  vm.selectedState = stateManager.getSelectedState();
  vm.disableDownButton = true;

  resourceService.getResourceList().then(function(result) {
    vm.stateArray = [{ name: 'va' }, { name: 'md'}]; //_.reject(result.data.States, {'name': 'United States'});
  });

  vm.stateChangedEvent = function(newState) {
    if(newState) {
      vm.disableDownButton = false;
    }
  }

}]);
