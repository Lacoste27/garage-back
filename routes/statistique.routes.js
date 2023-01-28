var express = require("express");
var statistiqueRouter = express.Router();
const { moyen, chiffreParJour, chiffreParMois, depenseParMois } = require("../services/statistique-service");

// Temps moyen de réparation
statistiqueRouter.get('/tempsmoyen', moyen);

//Chiffre d'affaire par jour
statistiqueRouter.get('/chiffreday', chiffreParJour);

//Chiffre d'affaire par mois
statistiqueRouter.get('/chiffremonth', chiffreParMois);

//Depense par mois
statistiqueRouter.get('/depensemonth', depenseParMois);

module.exports = statistiqueRouter;