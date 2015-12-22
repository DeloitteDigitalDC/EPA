'use strict';

angular.module('epaRfiApp')
  .controller('NationCtrl', function (appConfig, resourceService) {
    
    var vm = this;

    init();

    /**
		 * Initilizes the data for the NationCtrl
		 * @return {Object}
		 */
	  function init() {
	    resourceService.getAllResourcesForState('United States', 2013).then(function(response) {
	      vm.resourceData = response.data;
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
