var express = require("express");
var statistiqueRouter = express.Router();
const { moyen, chiffreParJour, chiffreParMois, depenseParMois, countAtelierReparation, countClientReparation } = require("../services/statistique-service");

// Temps moyen de réparation
statistiqueRouter.get('/tempsmoyen', moyen);

//Chiffre d'affaire par jour
statistiqueRouter.get('/chiffreday', chiffreParJour);

//Chiffre d'affaire par mois
statistiqueRouter.get('/chiffremonth', chiffreParMois);

//Depense par mois
statistiqueRouter.get('/depensemonth', depenseParMois);

// nombre de reparation d'un client
statistiqueRouter.get("/client", countClientReparation);

// nombre de reparation d'un atelier
statistiqueRouter.get("/atelier", countAtelierReparation);

module.exports = statistiqueRouter;