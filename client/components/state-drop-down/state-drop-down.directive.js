'use strict';

angular.module('epaRfiApp')
  .directive('stateDropDown', function (stateManager) {
    return {
      templateUrl: 'components/state-drop-down/state-drop-down.html',
      restrict: 'EA',
      scope: {
	stateArray: '=',
	selectedState: '=',
        selectedStateCallback: "="
      },
      link: function (scope, element, attrs) {
        scope.selectedState = {};

        scope.$watch(function() {
          return scope.selectedState.selected;
        }, function(newVal) {
          if(newVal) {
            scope.selectedStateCallback(newVal.name);
            stateManager.setSelectedState(newVal.name);
          }

        });
      }
    };
  });
