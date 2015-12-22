'use strict';

angular.module('epaRfiApp')
  .controller('TimelineCtrl', function ($scope, appConfig, resourceService, stateManager) {
    var vm = this;

    vm.yearArray = appConfig.YEAR_TIMELINE;
		var energyTypes = appConfig.ENERGY_TYPES;
		vm.selectedTime = {
			'year': 1960 // default
		};
		vm.resourceData = {}; // where the data for d3 lies
		var resourceApiResult = null; // cache the result when a state is selected

		// when the state is selected, init()
	  $scope.$watch(function() {
	    return stateManager.getSelectedState();
	  }, function(newVal, oldVal) {
	  	if(newVal !== oldVal) {
				init();
			}
	  });

	  // when the year changes, filter through the cached result from the init()
		$scope.$watch(function() {
			return vm.selectedTime;
		}, function(newVal, oldVal) {
			if(newVal !== oldVal) {
				vm.resourceData = resourceService.getBtuForYear(resourceApiResult.data, vm.selectedTime.year);
			}
		}, true);

		/**
		 * @return {Object} - Data to initilize visuals for d3, year 1960
		 */
		function init() {
			var state = stateManager.getSelectedState();
			resourceService.getAllResourcesForState(state).then(function(response) {
				resourceApiResult = response; // cache the response
				vm.resourceData = resourceService.getBtuForYear(response.data, vm.selectedTime.year); // filter for the year
			});
		}

		/**
		 * Generic Functions for d3 visuals
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
