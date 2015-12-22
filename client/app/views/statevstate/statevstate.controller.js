'use strict';

angular.module('epaRfiApp')
  .controller('StatevstateCtrl', function ($scope, resourceService, stateManager) {

    var vm = this;

    vm.resourceData = []; // data for d3, it is set in the init()
    vm.loadingData = false;

    // watch for changes in the master/primary selected state
    $scope.$watch(function() {
      return stateManager.getSelectedState();
    }, function(newVal, oldVal) {
      if(newVal !== oldVal) {
        init();
      }
    });

    //watch for changes in this view's state
    $scope.$watch(function() {
      return vm.selectedState;
    }, function(newVal, oldVal) {
      if(newVal !== oldVal) {
        vm.loadingData = true;
        init(vm.selectedState);
      }
    });

    /**
     * Initilizes the data for the StatevstateCtrl
     * @return {Object}
    */
    function init(selectedState) {
      var state;
      if(selectedState) {
        state = selectedState.name
      } else {
        state = stateManager.getSelectedState();
      }

      resourceService.getAllResourcesForState(state, 2013, 'capita').then(function(response) {
        vm.resourceData = response.data;
        vm.btuTotal = _.sum(response.data, function(resource) {
          return resource.usage;
        });
        vm.d3api.refresh();
        vm.loadingData = false;
      });
    }

    vm.showLegend = true;

    vm.energyTypeClick = function(d) {
      vm.showLegend = false;
      vm.selectedEnergyData = d;
      $scope.$apply();
    };


  });
