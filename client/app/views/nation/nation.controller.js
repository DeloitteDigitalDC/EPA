'use strict';

angular.module('epaRfiApp')
  .controller('NationCtrl', function (appConfig, resourceService) {
    
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
	      vm.btuTotal = _.sum(response.data, function(resource) {
	        return resource.usage;
	      });
	      vm.d3api.refresh();
	    });
	  }

		/**
		 * Generic Functions for d3
		 */
		vm.showLegend = true;

	  vm.energyTypeClick = function(d) {
	    vm.showLegend = false;
	    vm.selectedEnergyData = d;
	    $scope.$apply();
	  };

  });
