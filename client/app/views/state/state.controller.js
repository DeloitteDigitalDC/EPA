'use strict';

angular.module('epaRfiApp')
.controller('StateCtrl', function ($scope, appConfig, resourceService, stateManager) {

	var vm = this;

	vm.yearArray = appConfig.YEAR_TIMELINE;
	var energyTypes = appConfig.ENERGY_TYPES;
	vm.selectedTime = {
		'year': 1960 // default
	};
	vm.resourceData = {}; // where the data for d3 lies
	var resourceData = null; // cache the result when a state is selected

	// when the state is selected, init()
  $scope.$watch(function() {
    return stateManager.getSelectedState();
  }, function(newVal, oldVal) {
  	if(newVal !== oldVal) {
			console.log('newVal', newVal);
			init();
		}
  });

  // when the year changes, filter through the cached result from the init()
	$scope.$watch(function() {
		return vm.selectedTime;
	}, function(newVal, oldVal) {
		if(newVal !== oldVal) {
			console.log('newVal', newVal);
			filterData(resourceData);
		}
	}, true);

	/**
	 * @return {Object} - Data to initilize visuals for d3, year 1960
	 */
	function init() {
		var state = stateManager.getSelectedState();
		resourceService.getAllResourcesForState(state).then(function(response) {
			resourceData = response;
			filterData(response);
		});
	}

	/**
	 * This function filters through the response object to feed into d3
	 * @param  {Object} - response from the service
	 * @return {Object} - vm.resourceData for d3
	 */
	function filterData(response) {
		_.forEach(energyTypes, function(item) {
			vm.resourceData[item.key] = getBtuForYear(_.find(response.data, {'resource': item.key}).result);
		});
		console.log('StateCtrl results', vm.resourceData);
	}
	
	/**
	 * This is a helper function to filter through the response data and find the data for the selected year
	 * @param  {Object} - result from the API call
	 * @return {Array} - Array representing the item with the matched year
	 */
	function getBtuForYear(result) {
		var data = result[0].data;
		var yearResp = _.find(data, function(yearInfo) {
  		return Number.parseInt(yearInfo[0]) === vm.selectedTime.year;
  	});
  	return yearResp;
	}


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
