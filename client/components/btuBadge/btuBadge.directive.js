'use strict';
(function () {
  angular.module('epaRfiApp').directive('btuBadge', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/btuBadge/btuBadge.html',
      scope: {
        btu: "="
      },
      link    : function (scope, element) {

      }
    };
  });
})();

