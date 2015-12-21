'use strict';
(function () {
  angular.module('epaRfiApp').directive('footerPager', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'components/footerPager/footerPager.html',
      link    : function (scope, element) { }
    };
  });
})();

