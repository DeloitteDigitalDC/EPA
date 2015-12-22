'use strict';

angular.module('epaRfiApp')
.controller('StateCtrl', function ($scope, appConfig, resourceService, stateManager) {

	var vm = this;

	vm.resourceData = null; // data for d3

	// watch for changes for the Selected State
	$scope.$watch(function() {
    return stateManager.getSelectedState();
  }, function(newVal, oldVal) {
    if(newVal !== oldVal) {
      init();
    }
  });

	/**
	 * Initilizes the data for the StateCtrl
	 * @return {Object}
	 */
  function init() {
    var state = stateManager.getSelectedState();
    resourceService.getAllResourcesForState(state, 2013, 'capita').then(function(response) {
      vm.resourceData = response.data;
      //console.log('StateCtrl resourceData', vm.resourceData);
    });
  }

	/**
	 * Generic Functions for d3
	 */
	vm.showLegend = true;

  vm.energyTypeClick = function(d) {
    vm.showLegend = false;
    vm.selectedEnergyData = d;
    console.log(vm.showLegend);
    $scope.$apply();
  };

	var ENERGY_TYPES = appConfig.ENERGY_TYPES;
  vm.circleData = [
    {
      radius: 100,
      type: ENERGY_TYPES.MOTOR_GASOLINE
    },
    {
      radius: 50,
      type: ENERGY_TYPES.NATURAL_GAS
    },
    {
      radius: 35,
      type: ENERGY_TYPES.COAL
    },
    {
      radius: 20,
      type: ENERGY_TYPES.NUCLEAR
    },
    {
      radius: 15,
      type: ENERGY_TYPES.WIND
    },
    {
      radius: 65,
      type: ENERGY_TYPES.SOLAR
    }
  ];

});
