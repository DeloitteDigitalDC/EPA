'use strict';

angular.module('epaRfiApp')
.controller('StateCtrl', function ($scope, appConfig, resourceService, stateManager) {

	var vm = this;

	vm.resourceData = []; // data for d3

	// watch for changes for the Selected State
	$scope.$watch(function() {
    return stateManager.getSelectedState();
  }, function(newVal, oldVal) {
    if(newVal !== oldVal) {
      vm.selectedState = newVal;
      init();
    }
  });

	/**
	 * Initilizes the data for the StateCtrl
	 * @return {Object}
	 */
  function init() {
    resourceService.getAllResourcesForState(vm.selectedState, 2013, 'capita').then(function(response) {
      vm.resourceData = response.data;
      vm.btuTotal = _.sum(response.data, function(resource) {
        return resource.usage;
      });
      vm.d3api.refresh();
    });
  }

	/**
	 * Generic Functions for d3
	 */
  vm.energyTypeClick = function(d) {
    vm.selectedEnergyData = d;
    $scope.$apply();
  };

});
