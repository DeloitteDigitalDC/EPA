'use strict';
(function () {
  angular.module('epaRfiApp').directive('stateSelector', function (appConfig, stateManager) {
    return {
      restrict: 'EA',
      scope: {
        selectedState: "="
      },
      templateUrl: 'components/stateSelector/stateSelector.html',
      link    : function (scope, element) {
        scope.stateList = [];
        scope.selectedStateIndex = 0;

        scope.$watch(function() {
          return stateManager.getSelectedState();
        }, function(newVal) {
          if(newVal) {
            stateManager.getNearbyStates(scope.selectedState).then(function(stateList) {
              scope.stateList = stateList;
              scope.selectedState = scope.stateList[scope.selectedStateIndex];
            });
          }
        });

        scope.nextState = function() {
          if(scope.selectedStateIndex < scope.stateList.length-1) {
            scope.selectedStateIndex++;
            scope.selectedState = scope.stateList[scope.selectedStateIndex];
          }
        }

        scope.prevState = function() {
          if(scope.selectedStateIndex > 0) {
            scope.selectedStateIndex--;
            scope.selectedState = scope.stateList[scope.selectedStateIndex];
          }
        }
      }
    };
  });
})();

