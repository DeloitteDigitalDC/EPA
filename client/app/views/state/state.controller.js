'use strict';

angular.module('epaRfiApp')
  .controller('StateCtrl', ['$scope', 'stateManager', function ($scope, stateManager) {
    var vm = this;

    vm.state = stateManager.getSelectedState();
  }]);
  