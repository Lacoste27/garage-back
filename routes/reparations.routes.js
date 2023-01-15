var express = require('express');
var reparationRouter = express.Router();
const { reparationDetail } = require('../services/reparation-service');

// Detail d'une reparation
reparationRouter.get('/:idreparation/detail', reparationDetail);

module.exports = reparationRouter;