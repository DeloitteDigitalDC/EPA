/**
 * This is where the API calls to http://www.eia.gov/ for energy resource data for states
 */

'use strict';

var http = require('http');
var rp = require('request-promise');
var _ = require('lodash');
var common = require('./common.js');
var stateEIA = require('./states.js');
var Promise = require("bluebird");
var config = require('../../config/environment');

var apiKey = config.eia.apiKey;
var categoryEndpoint = config.eia.categoryEndpoint + apiKey;
var resourceEndpoint = config.eia.categoryEndpoint + apiKey + '&category_id=40203&category_id=40204&category_id=40236';
var RESOURCES = config.resources;

var eiaResourceApi = {};

/**
 * @param  {String} - Resource Name
 * @param  {String} - State
 * @return {Object} - Information on Resource BTU Usage for the specified Resource and State params.
 */
eiaResourceApi.getResource = function getResource(resource_name, state_name) {
  return getSpecificResourceData(RESOURCES[resource_name].id, state_name).then(function(body) {
    var obj = {};
    obj.resource = resource_name;
    obj.state = state_name;
    obj.units = body[0].units;
    obj.result = body[0].data;
    return obj;
  });
};

/**
 * @param  {String} - Resource Name
 * @param  {State} - State
 * @param  {Number} - Year
 * @return {Object} - Information on Resource BTU Usage for the specified Resource, State, and Year params.
 */
eiaResourceApi.getResourceByYear = function getResourceByYear(resource_name, state_name, year) {
  return getSpecificResourceData(RESOURCES[resource_name].id, state_name).then(function(body) {
  	var yearData = body[0].data;
  	var yearResp = _.find(yearData, function(yearInfo) {
  		return Number.parseInt(yearInfo[0]) === year;
  	});
  	body[0].data = yearResp;
    var obj = {};
    obj.resource = resource_name;
    obj.state = state_name;
    obj.units = body[0].units;
    obj.result = body[0].data;
  	return obj;
  });
};

/**
 * @param  {String} - Resource Name
 * @param  {String} - State Name
 * @param  {Number} - Year
 * @return {Object} - Information on Resource BTU Usage PER CAPITA for the specified Resource, State, and Year params.
 */
eiaResourceApi.getResourceByYearCapita = function getResourceByYearCapita(resource_name, state_name, year) {
	var resourceData = eiaResourceApi.getResourceByYear(resource_name, state_name, year);
  var populationData = stateEIA.getPopulationData(state_name, year);
  return Promise.all([resourceData, populationData]).then(function(body) {
    var resourceResult = body[0].result;
    var populationResult = body[1][0];
    var units = resourceResult.units;
    var resourceBtu = convertBillionBTUtoBTU(resourceResult[1]);
    var population = convertThousandsPeopletoPeople(populationResult.data[1]);
    var perCapita = parseInt(resourceBtu / population, 10); // round the result
    return {
      'resource': resource_name,
      'usage': perCapita,
      'units': 'BTU per Capita'
    };
  });
};

/**
 * @param  {String} - State
 * @return {Object} - Object with All Resource Information for the Specific State
 */
eiaResourceApi.getAllResources = function getAllResources(state_name) {
  var resourceKeys = _.keys(RESOURCES);
  var resourceDataArray = [];
  _.forEach(resourceKeys, function(key) {
    var resourcePromise = eiaResourceApi.getResource(key, state_name);
    resourceDataArray.push(resourcePromise);
  });
  return Promise.all(resourceDataArray);
};

/**
 * @param  {String} - State
 * @param  {Number} - Year
 * @return {Object} - Object with All Resource Information for the Specific State and Year params
 */
eiaResourceApi.getAllResourcesByYear = function getAllResourcesByYear(state_name, year) {
  var resourceKeys = _.keys(RESOURCES);
  var resourceDataArray = [];
  _.forEach(resourceKeys, function(key) {
    var resourcePromise = eiaResourceApi.getResourceByYear(key, state_name, year);
    resourceDataArray.push(resourcePromise);
  });
  return Promise.all(resourceDataArray);
};

/**
 * @param  {String} - State
 * @param  {Number} - Year
 * @return {Object} - Object with All Resource Information per capita for the Specific State and Year params
 */
eiaResourceApi.getAllResourcesByYearCapita = function getAllResourcesByYearCapita(state_name, year) {
  var resourceKeys = _.keys(RESOURCES);
  var resourceDataArray = [];
  _.forEach(resourceKeys, function(key) {
    var resourcePromise = eiaResourceApi.getResourceByYearCapita(key, state_name, year);
    resourceDataArray.push(resourcePromise);
  });
  return Promise.all(resourceDataArray);
};

module.exports = eiaResourceApi;

/**
 * Converts Billion BTU unit to BTU
 * @param  {Number} - Billions of BTU
 * @return {Number} - BTU (unprefixed)
 */
function convertBillionBTUtoBTU(BBTU) {
  return BBTU * Math.pow(10,9);
}

/**
 * 1 Thousand Unit * 1000 to calculate population
 * @param  {Number} - Thousand Units
 * @return {Number} - People
 */
function convertThousandsPeopletoPeople(TPeople) {
  return TPeople * 1000;
}

/////////// Generic Functions to get btu and series information for a specific state

/**
 * This function gets the BTU category_id to get BTU data for a specific state and resource
 * @param  {Number} - Resource Id / EIA Resource Category_id
 * @param  {String} - State 
 * @return {Object} - Data about Total BTU usage for specified Resource and State params.
 */
function getSpecificResourceData(resource_id, state_name) {
  return rp(resourceEndpoint + '&category_id=' + resource_id).then(function (body) {
	var parsed = JSON.parse(body);
	var data = parsed.category.childcategories;
	var btu_id = _.find(data, {'name': 'Btu'}).category_id;
	return getBtuData(btu_id, state_name);
  });
}

/*
  This is a helper function gets the btu data for a specific state and resource
*/
/**
 * @param  {Number} - BTU id / EIA BTU Category_id
 * @param  {String} - State 
 * @return {Object} - Data about Total BTU usage for the specified State param.
 */
function getBtuData(btu_id, state_name) {
  return rp(categoryEndpoint + '&category_id=' + btu_id).then(function (body) {
    var parsed = JSON.parse(body);
    var states = parsed.category.childseries;
    var state = common.findState(states, state_name);
    return common.getSeries(state.series_id);
  });
}

