'use strict';
(function () {
  angular.module('epaRfiApp').directive('stateSelector', function (appConfig) {
    return {
      restrict: 'E',
      templateUrl: 'components/stateSelector/stateSelector.html',
      link    : function (scope, element) {

      }
    };
  });
})();

