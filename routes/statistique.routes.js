var express = require("express");
var statistiqueRouter = express.Router();
const { moyen, chiffreParJour } = require("../services/statistique-service");

// Temps moyen de réparation
statistiqueRouter.get('/tempsmoyen', moyen);

//Chiffre d'affaire par jour
statistiqueRouter.get('/chiffreday', chiffreParJour);

module.exports = statistiqueRouter;