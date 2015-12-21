'use strict';

/**
 * This is a service that interacts with the express API to retrieve resource data from the resource API.
 */
angular.module('epaRfiApp')
  .factory('resourceService', ['$http', '$q', function ($http, $q) {

    var resourceListData = null;

    var resourceService = {
      getResourceList: getResourceList,
      getResource: getResource,
      getAllResourcesForState: getAllResourcesForState
    };

    /**
     * This function gets the list of resources in the API
     * @return {Object} - List of Resources in the API
     */
    function getResourceList() {
      if(resourceListData) {
        return $q.when(resourceListData);
      } else {
        var resourcePromise = $http.get("/api/resources");
        return resourcePromise.then(function(data) {
          resourceListData = data;
          return data;
        }).catch(function(error) {
          console.log('error', error);
        });
      }
    }

    /**
     * @param  {String} - Resource Name (i.e. coal, naturalgas, etc.)
     * @param  {String} - State (i.e. Alabama, California, Rhode Island), Optional
     * @param  {Number} - Year, Optional
     * @param  {Format} - Format Type ('capita'), Optional
     * @return {Object} - Object representing the data requested from the API
     */
    function getResource(resourceName, state, year, format) {
      var queryParams = {
        'state': state,
        'year': year,
        'format': format
      };
      return $http.get("/api/resources/" + resourceName, {'params': queryParams}).catch(function(error) {
        console.log('error', error);
      });
    }

    /**
     * @param  {String} - State (i.e. Alabama, California, Rhode Island)
     * @param  {Number} - Year, Optional
     * @param  {Format} - Format Type ('capita'), Optional
     * @return {Object} - Object representing the data requested from the API
     */
    function getAllResourcesForState(state, year, format) {
      var queryParams = {
        'state': state,
        'year': year,
        'format': format
      };
      return $http.get("/api/resources/all", {'params': queryParams}).catch(function(error) {
        console.log('error', error);
      });
    }

    return resourceService;
  }]);
