'use strict';

angular.module('epaRfiApp')
.controller('TitleCtrl', ['$scope', 'resourceService', 'stateManager', function ($scope, resourceService, stateManager) {
  var vm = this;

  vm.selectedState = stateManager.getSelectedState();
  vm.disableDownButton = true;

  resourceService.getResourceList().then(function(result) {
    vm.stateArray = _.reject(result.data.States, function(item) {
      return (item.name === 'United States') || (item.name === 'District of Columbia');
    });
  });

  vm.stateChangedEvent = function(newState) {
    if(newState) {
      vm.disableDownButton = false;
    }
  }

}]);
