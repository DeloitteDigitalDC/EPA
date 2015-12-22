'use strict';

angular.module('epaRfiApp')
  .controller('IndividualCtrl', function ($scope, appConfig, resourceService, stateManager) {
  	var vm = this;

    vm.resourceData = []; // data for d3, it is set in the init()

    // watch for changes in the selected state
    $scope.$watch(function() {
      return stateManager.getSelectedState();
    }, function(newVal, oldVal) {
      if(newVal !== oldVal) {
        init();
      }
    });

    /**
     * Initilizes the data for the IndividualCtrl
     * @return {Object}
    */
    function init() {
      var state = stateManager.getSelectedState();
      resourceService.getAllResourcesForState(state, 2013, 'capita').then(function(response) {
        vm.resourceData = response.data;
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
