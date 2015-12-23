'use strict';

angular.module('epaRfiApp')
  .controller('NationCtrl', function ($scope, appConfig, resourceService) {
    
    var vm = this;
    vm.resourceData = []; // data for d3

    init();

    /**
		 * Initilizes the data for the NationCtrl
		 * @return {Object}
		 */
	  function init() {
	    resourceService.getAllResourcesForState('United States', 2013, 'capita').then(function(response) {
	      vm.resourceData = response.data;
	      vm.d3api.refresh();
	    });
	    resourceService.getTotalResourcesForState('United States', 2013, 'capita').then(function(response) {
	    	vm.btuTotal = response.data.usage;
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
