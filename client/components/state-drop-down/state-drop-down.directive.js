'use strict';

angular.module('epaRfiApp')
  .directive('stateDropDown', function () {
    return {
      templateUrl: 'components/state-drop-down/state-drop-down.html',
      restrict: 'EA',
      scope: {
	stateArray: '=',
	selectedState: '='
      },
      link: function (scope, element, attrs) {

      }
    };
  });
