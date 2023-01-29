var express = require("express");
const jwt = require('jsonwebtoken');
const { login, newResponsable, receptionVoiture, validationPaiement, ValiderBonSortie } = require('../services/responsable-service');
const { authenticateToken } = require('../middleware/client-middleware');
const { authenticateAtelierToken } = require('../middleware/atelier-middleware');
const { authenticateFinancierToken } = require('../middleware/financier-middleware');

var responsableRouter = express.Router();

// login
responsableRouter.post('/login', login);

// ajouter un nouveau responsable
responsableRouter.post("/add", newResponsable);

//faire une réception d'une voiture
responsableRouter.post("/atelier/reception", receptionVoiture);

//valider le bon de sortie d'une voiture
responsableRouter.post("/atelier/valider", ValiderBonSortie)

// validation d'une paiement 
responsableRouter.post("/financier/paiements/validation", validationPaiement)

module.exports = responsableRouter;
