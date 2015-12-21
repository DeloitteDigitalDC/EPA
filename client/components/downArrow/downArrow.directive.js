'use strict';
(function () {
  angular.module('epaRfiApp').directive('downArrow', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/downArrow/downArrow.html',
      scope: {
        btu: "="
      },
      link    : function (scope, element) {

      }
    };
  });
})();
