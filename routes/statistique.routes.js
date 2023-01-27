var express = require("express");
var statistiqueRouter = express.Router();
const { moyen } = require("../services/statistique-service");

// Temps moyen de réparation
statistiqueRouter.get('/tempsmoyen', moyen);

module.exports = statistiqueRouter;