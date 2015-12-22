'use strict';

angular.module('epaRfiApp')
  .controller('NationCtrl', function (resourceService) {
    
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

  });
