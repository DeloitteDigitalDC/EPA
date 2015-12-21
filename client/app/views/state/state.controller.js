'use strict';

angular.module('epaRfiApp')
.controller('StateCtrl', function (appConfig) {

	var vm = this;

	vm.selectedTime = {};
	vm.yearArray = appConfig.YEAR_TIMELINE;
	console.log('year array', vm.yearArray);

});
