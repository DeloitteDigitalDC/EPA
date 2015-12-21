'use strict';

angular.module('epaRfiApp')
.controller('StateCtrl', function (appConfig, resourceService, stateManager) {

	var vm = this;

	vm.selectedTime = {};
	vm.yearArray = appConfig.YEAR_TIMELINE;
	
	resourceService.getAllResourcesForState('Alabama').then(function(result) {
		console.log('result', result);
	});

});
