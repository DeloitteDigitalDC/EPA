'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'epa-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // EIA API Information
  eia: {
    'apiKey': process.env.APIKEY || '34C8B4F3D636F480298A408B8327C1F5',
    'categoryEndpoint': 'http://api.eia.gov/category/?api_key=',
    'seriesEndpoint': 'http://api.eia.gov/series/?api_key='
  },
  resources: {
    'coal': {
      'id': 40927
    },
    'nuclear': {
      'id': 40933
    },
    'solar': {
      'id': 40956
    },
    'wind': {
      'id': 40932
    },
    'naturalgas': {
      'id': 40951,
      'key': 'NATURAL_GAS'
    },
    'gasoline': {
      'id': 40946,
      'key': 'MOTOR_GASOLINE'
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});
