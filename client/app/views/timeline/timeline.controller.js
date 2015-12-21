'use strict';

angular.module('epaRfiApp')
  .controller('TimelineCtrl', function (appConfig) {
    var vm = this;

    vm.selectedTime = {};
    vm.yearArray = appConfig.YEAR_TIMELINE;
  });
