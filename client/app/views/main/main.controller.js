'use strict';

angular.module('epaRfiApp')
.controller('MainCtrl', function ($scope, stateManager) {
  var vm = this;
  vm.hideViews = false;// true;

  $scope.$watch(function () {
    return stateManager.getSelectedState();
  }, function (newVal) {
    if(newVal) {
      vm.hideViews = false;
      vm.fullpageInterface.rebuildFullpage();
    }
  });

});

