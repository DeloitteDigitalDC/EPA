/**
 * This is where the API calls to http://www.eia.gov/ for state information data
 */

'use strict';

var http = require('http');
var rp = require('request-promise');
var _ = require('lodash');
var common = require('./common.js');
var config = require('../../config/environment');

var apiKey = config.eia.apiKey;
console.log("apikey", apiKey);
var populationEndpoint = config.eia.categoryEndpoint + apiKey + '&category_id=40367';

var eiaStatesApi = {};

/**
 * Get population data for the given state and year from the EIA API
 * @param  {String} - State
 * @param  {Number} - Year
 * @return {Object} - Population data for the given state and year
 */
eiaStatesApi.getPopulationData = function getPopulationData(state_name, year) {
  // get series_id (state key)
  return rp(populationEndpoint).then(function (body) {
	var parsed = JSON.parse(body);
	var data = parsed.category.childseries;
	var stateInfo = common.findState(data, state_name);

	// get series_id information (population data)
	return common.getSeries(stateInfo.series_id).then(function(body) {
		var yearData = body[0].data;
	  	var yearResp = _.find(yearData, function(yearInfo) {
	  		return Number.parseInt(yearInfo[0]) === year;
	  	});
	  	body[0].data = yearResp;
	  	return body;
	});
  });
};

/**
 * Gets states that are in the API
 * @return {Array} - List of States from the EIA Population API
 */
eiaStatesApi.getStates = function getStates() {
  return rp(populationEndpoint).then(function (body) {
	var parsed = JSON.parse(body);
	var data = parsed.category.childseries;
	var result = _.pluck(data, 'name');
	var states = _.map(result, function(item) {
	  var index = item.indexOf(',');
	  return {'name': item.substring(index + 2)};
	});
		return states;
  });
};

module.exports = eiaStatesApi;
