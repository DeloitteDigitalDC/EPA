'use strict';

angular.module('epaRfiApp')
  .factory('stateManager', function () {

    var stateInfo = null;

    var stateManager = {};

    stateManager.getSelectedState = function() {
      return stateInfo;
    };

    stateManager.setSelectedState = function(val) {
      stateInfo = val;
    };

    return stateManager;
  });
