'use strict';
(function () {
  angular.module('epaRfiApp').directive('btuBadge', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/btuBadge/btuBadge.html',
      scope: {
        btu: "=",
        preText: "@pre",
        postText: "@post"
      },
      link    : function (scope, element) {

      }
    };
  });
})();

