'use strict';

var express = require('express');
var controller = require('./resource.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:resource', controller.getResource);

module.exports = router;
