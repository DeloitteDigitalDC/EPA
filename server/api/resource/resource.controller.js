'use strict';

var _ = require('lodash');
var Resource = require('../../components/eia/resource');
var States = require('../../components/eia/states');
var config = require('../../config/environment');

var RESOURCES = config.resources;

var StatesArray = [];
States.getStates().then(function(result) {
  StatesArray = result;
});

var resourceApi = {};

/**
 * Handles the request to api/resources and returns list of information on all possible resources 
 * able to used in the API [coal, nuclear, solar, wind, naturalgas, gasoline]
 * @param  {Object} - Request Object
 * @param  {Object} - Response Object
 * @return {Object} - Object of resources that are in the API
 */
resourceApi.index = function index(req, res) {
  return res.send({
    'Resources': RESOURCES,
    'States': StatesArray
  });
};

/**
 * This function handles the requests for api/resources/:resource or api/resources/all with (optional) query strings
 * @param  {Object} - Request Object
 * @param  {Object} - Response Object
 * @return {Object} - Results
 */
 resourceApi.getResource = function getResource(req, res) {
  var resourceParam = req.params.resource;
  var stateQuery = req.query['state'];
  var yearQuery = req.query['year'];
  var formatQuery = req.query['format'];

  // validate params and query strings
  var resource = validateResource(resourceParam);
  var state = validateState(stateQuery);
  var year = validateYear(yearQuery);
  var format = validateFormat(formatQuery);

  // api/resources/all?state=Alabama&year=2013&format=capita
  if(resourceParam === 'all' && state && year && format) {
    return Resource.getAllResourcesByYearCapita(state, year)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/all?state=Alabama&year=2013
  if(resourceParam === 'all' && state && year) {
    return Resource.getAllResourcesByYear(state, year)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/all?state=Alabama
  if(resourceParam === 'all' && state) {
    return Resource.getAllResources(state)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/coal?state=Alabama&year=2013&format=capita —> resource definition, BTU per capita usage of Coal in Alabama for 2013
  if(resource && state && year && format) {
    return Resource.getResourceByYearCapita(resource, state, year)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/coal?state=Alabama&year=2013 —> resource definition, BTU usage of Coal in Alabama for 2013
  if(resource && state && year && !format) {
    return Resource.getResourceByYear(resource, state, year)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/coal?state=Alabama —> resource definition, List of BTU usage of Coal in Alabama from 1960 to 2013
  if(resource && state && !year && !format) {
    return Resource.getResource(resource, state)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  // api/resources/coal —> resource definition, list of states
  if(resource && !state && !year && !format) {
    var obj = {};
    obj[resource] = RESOURCES[resource];
    obj.States = StatesArray;
    return res.send(obj);
  }

  return resourceApi.index(req, res);
};

module.exports = resourceApi;

/**
 * @param  {Object} - Response Object
 * @param  {Number} - Status Code
 * @return {Function} - Function to send response on errors
 */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * @param  {Object} - Response Object
 * @param  {Number} - Status Code
 * @return {Function} - Function to send response on success
 */
function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/////////// Validate Functions
/**
 * Validates the Resource from the request and returns the Resource, if valid.
 * @param  {String} - ResourceParam from the request
 * @return {String} - Resource or undefined
 */
function validateResource(resourceParam) {
  var resource = resourceParam.toLowerCase();
  return RESOURCES[resource] && resource;
}

/**
 * Validates the State from the request and returns the State, if valid.
 * @param  {String} - State Query String from the request
 * @return {String} - State Name or undefined
 */
function validateState(stateInput) {
  if(stateInput) {
    return _.find(StatesArray, {'name': stateInput}) && stateInput;
  }
}

/**
 * Validates the Year from the request and returns the Year, if valid.
 * @param  {Number} - Year Query String from the request
 * @return {Number} - Year or undefined
 */
function validateYear(yearInput) {
  var year = yearInput && Number.parseInt(yearInput);
  return (year >= 1960 && year <= 2013) && year;
}

/**
 * Validates the Format from the request and returns the Format, if valid.
 * @param  {String} - Format Query String from the request
 * @return {String} - Format or undefined
 */
function validateFormat(formatInput) {
  return (formatInput === 'capita') && formatInput;
}




