'use strict';

angular.module('epaRfiApp')
  .controller('StatevstateCtrl', function ($scope, resourceService, stateManager) {
    
    var vm = this;

    vm.resourceData = null; // data for d3, it is set in the init()

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
      });
    }


  });
