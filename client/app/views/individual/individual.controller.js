'use strict';

angular.module('epaRfiApp')
  .controller('IndividualCtrl', function ($scope, appConfig, resourceService, stateManager) {
  	var vm = this;

    vm.resourceData = []; // data for d3, it is set in the init()
    vm.btuTotal = 0;

    // watch for changes in the selected state
    $scope.$watch(function() {
      return stateManager.getSelectedState();
    }, function(newVal, oldVal) {
      if(newVal !== oldVal) {
        vm.selectedState = newVal;
          init();
      }
    });

    /**
     * Initilizes the data for the IndividualCtrl
     * @return {Object}
    */
    function init() {
      resourceService.getAllResourcesForState(vm.selectedState, 2013, 'capita').then(function(response) {
        var maxUsage = _.max(response.data, function(resource) {
          return resource.usage;
        });
        vm.resourceData = [maxUsage];
        vm.btuTotal = maxUsage.usage;
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
