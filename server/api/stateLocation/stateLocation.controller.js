'use strict';

var _ = require('lodash');

var stateApi = {};

stateApi.getNearbyStates = function getNearbyStates(req, res) {
  var state = req.params.state;
  if(state.length === 2) {
    return res.send(getSortedStateArray(state.toUpperCase()));
  } else {
    return res.status(400).json({ error: 'Please enter a two letter state abbreviation.' })
  }
}

stateApi.stateAbbreviation = function(req, res) {
  var state = req.params.state;
  res.send(getStateAbbreviation(state));
}

stateApi.stateName = function(req, res) {
  var state = req.params.state;
  res.send(getStateName(state));
}

module.exports =  stateApi;

/**
 * Gets the 2 letter abbreviation from the state name
 * @param stateName
 * @returns {String}
 */
function getStateAbbreviation(stateName) {
  return _.find(stateData, function (stateObj) {
    return stateName === stateObj.name;
  }).state;
}

/**
 * Gets the full state name from the two letter abbr
 * @param statebbreviation
 * @returns {String}
 */
function getStateName(statebbreviation) {
  return _.find(stateData, function (stateObj) {
    return statebbreviation === stateObj.state;
  }).name;
}


/**
 * Calculates distance of selected state to all others and returns an array of states, sorted by distance
 * @param selectedStateId {String} Two letter state abbreviation
 * @returns {Array}
 */
function getSortedStateArray(selectedStateId) {
  var selectedState = _.find(stateData, function (stateObj) {
    return selectedStateId === stateObj.state;
  });

  var stateArrayWithDistance = _.each(stateData, function (stateObj) {
    stateObj.distance = calculateDistance(stateObj.lat, stateObj.long, selectedState.lat, selectedState.long)
  });

  return _.sortBy(stateArrayWithDistance, 'distance');
}

/**
 * Calculates the approxmiate distance between two points. Relative as it doesn't take into account the curvature of the earth.
 * @param lat1 {Number} Latitude of first point
 * @param lng1 {Number} Longitude of first point
 * @param lat2 {Number} Latitude of second point
 * @param lng2 {Number} Longitude of second point
 * @returns {Number} Approxmiate distance between points
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  var latDiff = Math.abs(lat2 - lat1);
  var lngDiff = Math.abs(lng2 - lng1);
  return Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2));
}

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
    "state"  : "DC",
    "name"   : "District of Columbia",
    "capital": "Washington",
    "lat"    : "38.904722",
    "long"   : "-77.016389"
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
