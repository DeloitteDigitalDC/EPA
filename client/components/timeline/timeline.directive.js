'use strict';

angular.module('epaRfiApp')
  .directive('timeline', function () {
    return {
      templateUrl: 'components/timeline/timeline.html',
      restrict: 'EA',
      scope: {
      	selectedTime: '=',
      	yearArray: '='
      },
      link: function (scope, element, attrs) {
      	scope.selectTime = function(year) {
      		scope.selectedTime.year = year;
      	};
      }
    };
  });
