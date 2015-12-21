'use strict';

var http = require('http');
var rp = require('request-promise');
var _ = require('lodash');
var config = require('../../config/environment');

var apiKey = config.eia.apiKey;
var seriesEndpoint = config.eia.seriesEndpoint + apiKey;

var commonApi = {};

/**
 * This function gets the data series for the given series_id
 * @param  {Number} - EIA Series_id
 * @return {Object} - Information from the EIA API for the given series_id
 */
commonApi.getSeries = function getSeries(series_id) {
  return rp(seriesEndpoint + '&series_id=' + series_id).then(function (body) {
    var parsed = JSON.parse(body);
    var data = parsed.series;
    return data;
  });
};

/**
 * This function find the name of the state in the list of state data items
 * @param  {Object} - List of data items with a name property with states
 * @param  {String} - State
 * @return {Object} - Object from the list of data items with the specified state name
 */
commonApi.findState = function findState(data, state_name) {
  return _.find(data, function(item) {
    return item !== null && item.name.toLowerCase().indexOf(state_name.toLowerCase()) > 1;
  });
};

module.exports = commonApi;