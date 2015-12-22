'use strict';

/**
 * This is a service that interacts with the express API to retrieve resource data from the resource API.
 */
angular.module('epaRfiApp')
  .factory('resourceService', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {

    var resourceListData = null;

    var resourceService = {
      getResourceList: getResourceList,
      getResource: getResource,
      getAllResourcesForState: getAllResourcesForState,
      getBtuForYear: getBtuForYear
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
    
    /**
     * This is a helper function to filter through the response data and return the data for the selected year
     * @param  {Object} - Data result from an API call to the resources API
     * @param  {Number} - Year
     * @return {Array} - Array representing each resource item with info for the matched year
     */
    function getBtuForYear(data, year) {
      var info = [];
      _.forEach(data, function(item) {
        var resourceInfo = {};
        angular.extend(resourceInfo, item);
        var yearResp = _.find(resourceInfo.result, function(yearInfo) {
          return Number.parseInt(yearInfo[0]) === year;
        });
        resourceInfo.result = yearResp;
        info.push(resourceInfo);
      });
      return info;
    }

    return resourceService;
  }]);
