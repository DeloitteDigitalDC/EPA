'use strict';

angular.module('epaRfiApp')
.controller('MainCtrl', function ($scope, $rootScope, stateManager, appConfig) {
  var vm = this;
  vm.hideFooter = true;
  vm.hideViews = true;
  vm.footerLinks = appConfig.FOOTER_LINKS;

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

