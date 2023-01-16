var express = require('express');
const { newResponsable, receptionVoiture } = require('../services/responsable-service');

var responsableRouter = express.Router();

// ajouter un nouveau responsable
responsableRouter.post("/add", newResponsable);

//faire une réception d'une voiture
responsableRouter.post("/atelier/reception", receptionVoiture);



module.exports = responsableRouter;