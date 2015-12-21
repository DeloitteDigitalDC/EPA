'use strict';
(function () {
  angular.module('epaRfiApp').directive('detailBox', function () {
    return {
      restrict: 'E',
      scope: {
        energyData: "="
      },
      templateUrl: 'components/detailBox/detailBox.html',
      link    : function (scope, element) {

      }
    };
  });
})();

