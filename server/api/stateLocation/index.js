'use strict';

var express = require('express');
var controller = require('./stateLocation.controller');

var router = express.Router();

router.get('/:state', controller.getNearbyStates);
router.get('/abbr/:state', controller.stateAbbreviation);
router.get('/name/:state', controller.stateName);

module.exports = router;
