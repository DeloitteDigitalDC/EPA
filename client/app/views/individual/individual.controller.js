'use strict';

angular.module('epaRfiApp')
  .controller('IndividualCtrl', function ($scope, appConfig, stateManager) {
  	var vm = this;

    $scope.$watch(function() {
      return stateManager.getSelectedState();
    }, function(newVal) {
      vm.selectedState = newVal;
    });

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
