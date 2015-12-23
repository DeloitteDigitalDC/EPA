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
var ENERGY_TYPES = config.ENERGY_TYPES;

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
    obj.energyType = ENERGY_TYPES[RESOURCES[resource_name].key || resource_name.toUpperCase()];
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
  	var yearResp = findYearinData(yearData, year);
  	body[0].data = yearResp;
    var obj = {};
    obj.resource = resource_name;
    obj.energyType = ENERGY_TYPES[RESOURCES[resource_name].key || resource_name.toUpperCase()];
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
    var resourceResult = body[0].result[1];
    var populationResult = body[1][0].data[1];
    var perCapita = calculateBtuPerCapita(resourceResult, populationResult);
    return {
      'resource': resource_name,
      'energyType': ENERGY_TYPES[RESOURCES[resource_name].key || resource_name.toUpperCase()],
      'usage': perCapita,
      'units': 'BTU per Capita'
    };
  });
};

/**
 * This function returns information of Total BTU per capita for ALL Energy Resources in the EIA API
 * @param  {String} - State
 * @param  {Number} - Year
 * @return {Object} - Object with BTU per capita for Total Energy Consumption for the given parameters
 */
eiaResourceApi.getTotalResourceByYearCapita = function getTotalResource(state_name, year) {
  var totalData = getTotalResourceData(state_name);
  var populationData = stateEIA.getPopulationData(state_name, year);
  return Promise.all([totalData, populationData]).then(function(body) {
    var totalResult = body[0][0];
    var yearResp = findYearinData(totalResult.data, year);
    var totalBtu = yearResp[1];
    var population = body[1][0].data[1];
    var perCapita = calculateBtuPerCapita(totalBtu, population);
    return {
      'resource': 'Total',
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

var stateData = [
  {
    "state"  : "AL",
    "name"   : "Alabama",
    "capital": "Montgomery",
    "lat"    : "32.361538",
    "long"   : "-86.279118"
  },
  {
    "state"  : "AK",
    "name"   : "Alaska",
    "capital": "Juneau",
    "lat"    : "58.301935",
    "long"   : "-134.419740"
  },
  {
    "state"  : "AZ",
    "name"   : "Arizona",
    "capital": "Phoenix",
    "lat"    : "33.448457",
    "long"   : "-112.073844"
  },
  {
    "state"  : "AR",
    "name"   : "Arkansas",
    "capital": "Little Rock",
    "lat"    : "34.736009",
    "long"   : "-92.331122"
  },
  {
    "state"  : "CA",
    "name"   : "California",
    "capital": "Sacramento",
    "lat"    : "38.555605",
    "long"   : "-121.468926"
  },
  {
    "state"  : "CO",
    "name"   : "Colorado",
    "capital": "Denver",
    "lat"    : "39.7391667",
    "long"   : "-104.984167"
  },
  {
    "state"  : "CT",
    "name"   : "Connecticut",
    "capital": "Hartford",
    "lat"    : "41.767",
    "long"   : "-72.677"
  },
  {
    "state"  : "DE",
    "name"   : "Delaware",
    "capital": "Dover",
    "lat"    : "39.161921",
    "long"   : "-75.526755"
  },
  {
    "state"  : "FL",
    "name"   : "Florida",
    "capital": "Tallahassee",
    "lat"    : "30.4518",
    "long"   : "-84.27277"
  },
  {
    "state"  : "GA",
    "name"   : "Georgia",
    "capital": "Atlanta",
    "lat"    : "33.76",
    "long"   : "-84.39"
  },
  {
    "state"  : "HI",
    "name"   : "Hawaii",
    "capital": "Honolulu",
    "lat"    : "21.30895",
    "long"   : "-157.826182"
  },
  {
    "state"  : "ID",
    "name"   : "Idaho",
    "capital": "Boise",
    "lat"    : "43.613739",
    "long"   : "-116.237651"
  },
  {
    "state"  : "IL",
    "name"   : "Illinois",
    "capital": "Springfield",
    "lat"    : "39.783250",
    "long"   : "-89.650373"
  },
  {
    "state"  : "IN",
    "name"   : "Indiana",
    "capital": "Indianapolis",
    "lat"    : "39.790942",
    "long"   : "-86.147685"
  },
  {
    "state"  : "IA",
    "name"   : "Iowa",
    "capital": "Des Moines",
    "lat"    : "41.590939",
    "long"   : "-93.620866"
  },
  {
    "state"  : "KS",
    "name"   : "Kansas",
    "capital": "Topeka",
    "lat"    : "39.04",
    "long"   : "-95.69"
  },
  {
    "state"  : "KY",
    "name"   : "Kentucky",
    "capital": "Frankfort",
    "lat"    : "38.197274",
    "long"   : "-84.86311"
  },
  {
    "state"  : "LA",
    "name"   : "Louisiana",
    "capital": "Baton Rouge",
    "lat"    : "30.45809",
    "long"   : "-91.140229"
  },
  {
    "state"  : "ME",
    "name"   : "Maine",
    "capital": "Augusta",
    "lat"    : "44.323535",
    "long"   : "-69.765261"
  },
  {
    "state"  : "MD",
    "name"   : "Maryland",
    "capital": "Annapolis",
    "lat"    : "38.972945",
    "long"   : "-76.501157"
  },
  {
    "state"  : "MA",
    "name"   : "Massachusetts",
    "capital": "Boston",
    "lat"    : "42.2352",
    "long"   : "-71.0275"
  },
  {
    "state"  : "MI",
    "name"   : "Michigan",
    "capital": "Lansing",
    "lat"    : "42.7335",
    "long"   : "-84.5467"
  },
  {
    "state"  : "MN",
    "name"   : "Minnesota",
    "capital": "Saint Paul",
    "lat"    : "44.95",
    "long"   : "-93.094"
  },
  {
    "state"  : "MS",
    "name"   : "Mississippi",
    "capital": "Jackson",
    "lat"    : "32.320",
    "long"   : "-90.207"
  },
  {
    "state"  : "MO",
    "name"   : "Missouri",
    "capital": "Jefferson City",
    "lat"    : "38.572954",
    "long"   : "-92.189283"
  },
  {
    "state"  : "MT",
    "name"   : "Montana",
    "capital": "Helana",
    "lat"    : "46.595805",
    "long"   : "-112.027031"
  },
  {
    "state"  : "NE",
    "name"   : "Nebraska",
    "capital": "Lincoln",
    "lat"    : "40.809868",
    "long"   : "-96.675345"
  },
  {
    "state"  : "NV",
    "name"   : "Nevada",
    "capital": "Carson City",
    "lat"    : "39.160949",
    "long"   : "-119.753877"
  },
  {
    "state"  : "NH",
    "name"   : "New Hampshire",
    "capital": "Concord",
    "lat"    : "43.220093",
    "long"   : "-71.549127"
  },
  {
    "state"  : "NJ",
    "name"   : "New Jersey",
    "capital": "Trenton",
    "lat"    : "40.221741",
    "long"   : "-74.756138"
  },
  {
    "state"  : "NM",
    "name"   : "New Mexico",
    "capital": "Santa Fe",
    "lat"    : "35.667231",
    "long"   : "-105.964575"
  },
  {
    "state"  : "NY",
    "name"   : "New York",
    "capital": "Albany",
    "lat"    : "42.659829",
    "long"   : "-73.781339"
  },
  {
    "state"  : "NC",
    "name"   : "North Carolina",
    "capital": "Raleigh",
    "lat"    : "35.771",
    "long"   : "-78.638"
  },
  {
    "state"  : "ND",
    "name"   : "North Dakota",
    "capital": "Bismarck",
    "lat"    : "48.813343",
    "long"   : "-100.779004"
  },
  {
    "state"  : "OH",
    "name"   : "Ohio",
    "capital": "Columbus",
    "lat"    : "39.962245",
    "long"   : "-83.000647"
  },
  {
    "state"  : "OK",
    "name"   : "Oklahoma",
    "capital": "Oklahoma City",
    "lat"    : "35.482309",
    "long"   : "-97.534994"
  },
  {
    "state"  : "OR",
    "name"   : "Oregon",
    "capital": "Salem",
    "lat"    : "44.931109",
    "long"   : "-123.029159"
  },
  {
    "state"  : "PA",
    "name"   : "Pennsylvania",
    "capital": "Harrisburg",
    "lat"    : "40.269789",
    "long"   : "-76.875613"
  },
  {
    "state"  : "RI",
    "name"   : "Rhode Island",
    "capital": "Providence",
    "lat"    : "41.82355",
    "long"   : "-71.422132"
  },
  {
    "state"  : "SC",
    "name"   : "South Carolina",
    "capital": "Columbia",
    "lat"    : "34.000",
    "long"   : "-81.035"
  },
  {
    "state"  : "SD",
    "name"   : "South Dakota",
    "capital": "Pierre",
    "lat"    : "44.367966",
    "long"   : "-100.336378"
  },
  {
    "state"  : "TN",
    "name"   : "Tennessee",
    "capital": "Nashville",
    "lat"    : "36.165",
    "long"   : "-86.784"
  },
  {
    "state"  : "TX",
    "name"   : "Texas",
    "capital": "Austin",
    "lat"    : "30.266667",
    "long"   : "-97.75"
  },
  {
    "state"  : "UT",
    "name"   : "Utah",
    "capital": "Salt Lake City",
    "lat"    : "40.7547",
    "long"   : "-111.892622"
  },
  {
    "state"  : "VT",
    "name"   : "Vermont",
    "capital": "Montpelier",
    "lat"    : "44.26639",
    "long"   : "-72.57194"
  },
  {
    "state"  : "VA",
    "name"   : "Virginia",
    "capital": "Richmond",
    "lat"    : "37.54",
    "long"   : "-77.46"
  },
  {
    "state"  : "WA",
    "name"   : "Washington",
    "capital": "Olympia",
    "lat"    : "47.042418",
    "long"   : "-122.893077"
  },
  {
    "state"  : "WV",
    "name"   : "West Virginia",
    "capital": "Charleston",
    "lat"    : "38.349497",
    "long"   : "-81.633294"
  },
  {
    "state"  : "WI",
    "name"   : "Wisconsin",
    "capital": "Madison",
    "lat"    : "43.074722",
    "long"   : "-89.384444"
  },
  {
    "state"  : "WY",
    "name"   : "Wyoming",
    "capital": "Cheyenne",
    "lat"    : "41.145548",
    "long"   : "-104.802042"
  }
];

var resourceKeys = _.keys(RESOURCES);

//getlowest('coal');
//getlowest('solar');
//getlowest('wind');
//getlowest('nuclear');
//getlowest('gasoline');
//getlowest('naturalgas');

function getlowest(resource_name) {
  var count = 0;
  var resourceDataArray = [];
  _.forEach(stateData, function(state) {
    var resourcePromise = eiaResourceApi.getResourceByYearCapita(resource_name, state.name, 2013);
    resourceDataArray.push(resourcePromise);
  });
  Promise.all(resourceDataArray).then(function(result) {
    console.log('resource', resource_name);
    console.log('result', _.sortBy(_.pluck(result, 'usage')));
  });
}

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

/**
 * This ia a helper function to help calculate the BTU per capita given the params
 * @param  {Number} - BTU in Billion BTU
 * @param  {Number} - Population in Thousands
 * @return {Number} - Number result from the BTU per capita calculation
 */
function calculateBtuPerCapita(btuResult, populationResult) {
  var resourceBtu = convertBillionBTUtoBTU(btuResult);
  var population = convertThousandsPeopletoPeople(populationResult);
  var perCapita = parseInt(resourceBtu / population, 10); // round the result
  return perCapita;
}

/**
 * This is a helper function to parse through data and find the information for the given year
 * @param  {Object} - Data from the EIA API
 * @param  {Number} - Year
 * @return {Object} - The data object that matches the given year
 */
function findYearinData(data, year) {
  var result = _.find(data, function(yearInfo) {
    return Number.parseInt(yearInfo[0]) === year;
  });
  return result;
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

/**
 * This function gets the total energy consumption for the specified state
 * @param  {String} - State
 * @return {Object} - Data about Total BTU usage for all resources in the EIA API
 */
function getTotalResourceData(state_name) {
  return rp(resourceEndpoint).then(function (body) {
    var parsed = JSON.parse(body);
    var states = parsed.category.childseries;
    var state = common.findState(states, state_name);
    return common.getSeries(state.series_id);
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

