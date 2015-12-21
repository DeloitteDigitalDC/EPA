'use strict';

angular.module('epaRfiApp')
  .factory('stateManager', function () {

    var stateInfo = {};

    var stateManager = {};

    stateManager.getSelectedState = function() {
      return stateInfo;
    };

    return stateManager;
  });
