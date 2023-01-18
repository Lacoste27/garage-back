var express = require('express');
const { newResponsable, receptionVoiture, validationPaiement } = require('../services/responsable-service');

var responsableRouter = express.Router();

// ajouter un nouveau responsable
responsableRouter.post("/add", newResponsable);

//faire une réception d'une voiture
responsableRouter.post("/atelier/reception", receptionVoiture);

// validation d'une paiement 
responsableRouter.post("/financier/paiements/validation", validationPaiement)

module.exports = responsableRouter;