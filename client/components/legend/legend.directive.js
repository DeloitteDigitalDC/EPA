'use strict';
(function () {
  angular.module('epaRfiApp').directive('energyLegend', function (appConfig) {
    return {
      restrict: 'E',
      templateUrl: 'components/legend/legend.html',
      link    : function (scope, element) {

        scope.ENERGY_TYPES = appConfig.ENERGY_TYPES;
      }
    };
  });
})();

