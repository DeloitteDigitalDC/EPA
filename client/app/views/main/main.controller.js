'use strict';

angular.module('epaRfiApp')
.controller('MainCtrl', function ($scope, stateManager, $rootScope) {
  var vm = this;
  vm.hideFooter = true;

  $scope.$watch(function () {
    return stateManager.getSelectedState();
  }, function (newVal, oldVal) {
    if(newVal && !oldVal) {
      vm.hideViews = false;
      vm.fullpageInterface.rebuildFullpage();
    }
  });

  //Hide footer on first page only based on slide index
  $rootScope.$on('slideChanged', function(event, args) {
    vm.hideFooter = (args.nextIndex === 1 && args.direction === 'up');
    $scope.$apply();
  })

});

