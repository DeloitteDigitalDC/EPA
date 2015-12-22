'use strict';

angular.module('epaRfiApp')
.controller('MainCtrl', function ($scope, stateManager) {
  var vm = this;
  vm.hideViews = true;

  $scope.$watch(function () {
    return stateManager.getSelectedState();
  }, function (newVal, oldVal) {
    if(newVal && !oldVal) {
      vm.hideViews = false;
      vm.fullpageInterface.rebuildFullpage();
    }
  });

});

