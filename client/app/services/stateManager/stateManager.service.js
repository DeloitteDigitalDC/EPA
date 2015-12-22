'use strict';

angular.module('epaRfiApp')
  .factory('stateManager', function ($q, $http) {

    var stateInfo = null;

    var stateManager = {};

    stateManager.getSelectedState = function() {
      return stateInfo;
    };

    stateManager.setSelectedState = function(val) {
      stateInfo = val;
    };

    stateManager.getNearbyStates = function() {
      var deferred = $q.defer();
      $http.get('/api/stateLocation/abbr/' + stateInfo).then(function(resp) {
        $http.get('/api/stateLocation/' + resp.data).then(function(resp) {
          deferred.resolve(resp.data);
        });
      });
      return deferred.promise;
    }

    return stateManager;
  });
