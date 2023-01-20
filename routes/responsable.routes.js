var express = require('express');
var responsableRouter = express.Router();
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { login } = require('../services/responsable-service');
const { authenticateToken } = require('../middleware/client-middleware');
const { authenticateAtelierToken } = require('../middleware/atelier-middleware');
const { authenticateFinancierToken } = require('../middleware/financier-middleware');

responsableRouter.post('/login', login);

module.exports = responsableRouter