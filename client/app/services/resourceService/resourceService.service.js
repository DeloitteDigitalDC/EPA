'use strict';

/**
 * This is a service that interacts with the express API to retrieve resource data from the resource API.
 */
angular.module('epaRfiApp')
  .factory('resourceService', ['$http', '$q', function ($http, $q) {

    var resourceService = {
      getResourceList: getResourceList,
      getResource: getResource,
      getAllResourcesForState: getAllResourcesForState,
      getTotalResourcesForState: getTotalResourcesForState,
      getBtuForYear: getBtuForYear
    };

    /**
     * This function gets the list of resources in the API
     * @return {Object} - List of Resources in the API
     */
    function getResourceList() {
      var config = {
        cache: true
      };
      var resourcePromise = $http.get('/api/resources', config);
      return resourcePromise.then(function(data) {
        var resourceListData = data.data.States;
        _.forEach(resourceListData, function(item) {
          item.displayName = item.name;
        });
        var result = _.find(resourceListData, function(item) {
          return item.name === 'District of Columbia';
        });
        result.displayName = 'Washington, DC';
        return _.sortByOrder(resourceListData, ['displayName']);
      }).catch(function(error) {
        console.log('error', error);
      });
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
      var config = {
        cache: true,
        params: queryParams
      };
      return $http.get("/api/resources/" + resourceName, config).catch(function(error) {
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
      var config = {
        cache: true,
        params: queryParams
      };

      return $http.get("/api/resources/all", config).catch(function(error) {
        console.log('error', error);
      });
    }

    /**
     * @param  {String} - State (i.e. Alabama, California, Rhode Island)
     * @param  {Number} - Year, Optional
     * @param  {Format} - Format Type ('capita'), Optional
     * @return {Object} - Object representing the data requested from the API
     */
    function getTotalResourcesForState(state, year, format) {
      var queryParams = {
        'state': state,
        'year': year,
        'format': format
      };
      var config = {
        cache: true,
        params: queryParams
      };

      return $http.get("/api/resources/total", config).catch(function(error) {
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
